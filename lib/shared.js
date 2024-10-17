const DEFAULT_SKIP_TIME = 8;
const DEFAULT_SKIP_COUNTDOWN_MESSAGE = 'Skip in {seconds}...';
const DEFAULT_SKIP_MESSAGE = 'Skip';
const ARMANET_JS_URL = 'https://assets.armanet.us/armanet-pxl.js';

export const settings = (s) => ({
  preroll: {
    enabled: s['armanet-preroll-enabled'] ?? false,
    adUnit: s['armanet-preroll-adunit'],
  },
  midroll: {
    enabled: s['armanet-midroll-enabled'] ?? false,
    adUnit: s['armanet-midroll-adunit'],
    offset: s['armanet-midroll-offset'] ?? '25%',
  },
  postroll: {
    enabled: s['armanet-postroll-enabled'] ?? false,
    adUnit: s['armanet-postroll-adunit'],
  },
  embededEnabled: s['armanet-embeded-enabled'] ?? true,
  controlsEnabled: s['armanet-player-controls-enabled'] ?? true,
  skipTime: s['armanet-skip-time'] ?? DEFAULT_SKIP_TIME,
  messageSkipCountdown:
    s['armanet-message-skip-countdown'] ?? DEFAULT_SKIP_COUNTDOWN_MESSAGE,
  messageSkip: s['armanet-message-skip'] ?? DEFAULT_SKIP_MESSAGE,
  messageRemainingTime: s['armanet-message-remainingTime'],
  clientDebugEnabled: s['armanet-client-debug-enabled'] ?? false,

});

export const loadArmanetPxl = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = ARMANET_JS_URL;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const loadContribAds = async (player) => {
  try {
    const { default: contrib } = await import(
      '../public/scripts/videojs.ads.min.js'
    );
    player.ads({
      debug: false,
      liveCuePoints: true,
      stitchedAds: false,
      allowVjsAutoplay: true
    });
  } catch (error) {
    console.error('Error loading ads plugin:', error);
  }
};

export const getRollsStatus = (pluginSettings) => {
  const isRollEnabled = (roll) => roll.adUnit && roll.enabled;

  const rolls = {
    preroll: isRollEnabled(pluginSettings.preroll),
    midroll: isRollEnabled(pluginSettings.midroll),
    postroll: isRollEnabled(pluginSettings.postroll),
  };

  return {
    ...rolls,
    hasAtLeastOneRollEnabled: Object.values(rolls).some(Boolean),
  };
};

export const createVastSettings = (
  pluginSettings,
  Armanet,
  channelName,
  channelAdUnit,
  userData,
  videoTags,
) => {
  const {
    skipTime,
    controlsEnabled,
    messageSkip,
    messageSkipCountdown,
    messageRemainingTime,
    clientDebugEnabled,
  } = pluginSettings;

  const vastSettings = {
    skip: skipTime,
    controlsEnabled: controlsEnabled,
    seekEnabled: controlsEnabled,
    withCredentials: false,
    messages: {
      skip: messageSkip,
      skipCountdown: messageSkipCountdown,
    },
    schedule: [],
  };

  if (messageRemainingTime?.includes('{seconds}')) {
    Object.assign(vastSettings, {
      displayRemainingTime: true,
      displayRemainingTimeIcons: true,
      messages: {
        ...vastSettings.messages,
        remainingTime: messageRemainingTime,
      },
    });
  }

  const getArmanetVastUrl = (adUnit, roll) => {
    const armanetParams = {
      roll,
      channel: channelName,
      skippable: skipTime > 0,
      ...(userData?.username &&
        userData?.email && { viewer: [userData.username, userData.email] }),
      ...(videoTags.length > 0 && { tags: videoTags }),
    };

    if (clientDebugEnabled) {
      console.log("[ARMANET INTEGRATION PLUGIN] [debug] [createVastSettings] [getArmanetVastUrl]", { adUnit, armanetParams })
    }

    return Armanet.getVastTag(adUnit, armanetParams) || '';
  };

  const rollsStatus = getRollsStatus(pluginSettings);

  const rollConfigs = {
    preroll: { offset: 'pre', roll: 'pre' },
    midroll: { offset: pluginSettings.midroll.offset, roll: 'mid' },
    postroll: { offset: 'post', roll: 'post' },
  };

  Object.entries(rollConfigs).forEach(([rollType, { offset, roll }]) => {
    if (rollsStatus[rollType]) {
      const rollAdUnit = channelAdUnit || pluginSettings[rollType].adUnit;

      if (rollAdUnit && offset) {
        const vastUrl = getArmanetVastUrl(rollAdUnit, roll);
        if (clientDebugEnabled) {
          console.log("[ARMANET INTEGRATION PLUGIN] [debug] [createVastSettings] adding roll schedule", { rollAdUnit, offset, vastUrl })
        }

        vastSettings.schedule.push({
          offset: offset,
          url: vastUrl,
        });
      }
    }
  });

  return vastSettings;
};

export const buildVastPlayer = async (vastSettings, player) => {
  try {
    const { default: VastPlugin } = await import(
      '../public/scripts/videojsx.vast.js'
    );
    player.vast(vastSettings);
  } catch (error) {
    console.error('Error loading VastPlugin:', error);
  }
};
