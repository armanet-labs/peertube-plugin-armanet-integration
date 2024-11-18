const DEFAULT_SKIP_TIME = 8;
const DEFAULT_SKIP_COUNTDOWN_MESSAGE = 'Skip in {seconds}...';
const DEFAULT_SKIP_MESSAGE = 'Skip';
const ARMANET_JS_URL = 'https://assets.armanet.us/armanet-pxl.js';
const COMPANION_CONFIGS = {
  video: {
    selector: '.video-info-first-row-bottom',
    className: 'companion-video-holder px-3',
    insertAfter: true,
  },
  sidebar: {
    selector: '.other-videos',
    className: 'companion-sidebar-holder mb-3',
    insertAfter: false,
  },
};
const ARMANET_RESOURCES = {
  domains: {
    image: 'i.armanet.us',
    service: 'srv.armanet.us',
  },
};

let scriptLoadPromise = null;

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
  companion: {
    video: {
      enabled: s['armanet-companion-video-enabled'] ?? false,
      adUnit: s['armanet-companion-video-adunit'],
    },
    sidebar: {
      enabled: s['armanet-companion-sidebar-enabled'] ?? false,
      adUnit: s['armanet-companion-sidebar-adunit'],
    },
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

const isArmanetPxlLoaded = () => {
  return !!document.querySelector(`script[src="${ARMANET_JS_URL}"]`);
};

export const loadArmanetPxl = () => {
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    if (isArmanetPxlLoaded()) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = ARMANET_JS_URL;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
};

export const setupResourceHints = () => {
  const hints = [
    {
      rel: 'dns-prefetch',
      urls: Object.values(ARMANET_RESOURCES.domains).map(
        (domain) => `//${domain}`,
      ),
    },
    {
      rel: 'preconnect',
      urls: Object.values(ARMANET_RESOURCES.domains).map(
        (domain) => `https://${domain}`,
      ),
    },
  ];

  const existingHints = new Set(
    Array.from(
      document.querySelectorAll(
        'link[rel="dns-prefetch"], link[rel="preconnect"]',
      ),
    ).map((link) => `${link.rel}:${link.href}`),
  );

  const fragment = document.createDocumentFragment();

  hints.forEach(({ rel, urls }) => {
    urls.forEach((url) => {
      const hintKey = `${rel}:${url}`;
      if (!existingHints.has(hintKey)) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = url;
        fragment.appendChild(link);
      }
    });
  });

  if (fragment.hasChildNodes()) {
    document.head.appendChild(fragment);
  }
};

export const cleanupCompanions = () => {
  const companionHolders = document.querySelectorAll('.companion-video-holder, .companion-sidebar-holder');
  companionHolders.forEach(holder => holder.remove());
};

export const loadContribAds = async (player) => {
  try {
    if (!player.ads) {
      const { default: contrib } = await import(
        '../public/scripts/videojs.ads.min.js'
      );
      player.ads({
        debug: true,
        liveCuePoints: true,
        stitchedAds: false,
        allowVjsAutoplay: true,
      });
    }
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

export const getCompanionsStatus = (pluginSettings) => {
  const isCompanionEnabled = (companion) =>
    companion.adUnit && companion.enabled;

  const companions = {
    video: isCompanionEnabled(pluginSettings.companion.video),
    sidebar: isCompanionEnabled(pluginSettings.companion.sidebar),
  };

  return {
    ...companions,
    hasAtLeastOneCompanionEnabled: Object.values(companions).some(Boolean),
  };
};

export const handleCompanions = async (settings, clientDebug) => {
  const enabledCompanions = Object.entries(settings.companion).filter(
    ([_, config]) => config.enabled && config.adUnit,
  );

  const insertCompanion = async ([type, config]) => {
    const companionConfig = COMPANION_CONFIGS[type];
    if (!companionConfig) {
      clientDebug('COMPANION', `Invalid companion type: ${type}`);
      return;
    }

    const reference = document.querySelector(companionConfig.selector);
    if (!reference) {
      clientDebug('COMPANION', `Reference element not found for ${type}`);
      return;
    }

    try {
      const holder = document.createElement('div');
      holder.className = companionConfig.className;
      holder.innerHTML = `<div data-armanet="${config.adUnit}"></div>`;

      if (companionConfig.insertAfter) {
        reference.parentNode.insertBefore(holder, reference.nextSibling);
      } else {
        reference.insertBefore(holder, reference.firstChild);
      }

      clientDebug('COMPANION', `Successfully inserted ${type} companion`);
    } catch (error) {
      console.error(
        `[ARMANET INTEGRATION PLUGIN] Error inserting ${type} companion:`,
        error,
      );
    }
  };

  await Promise.all(enabledCompanions.map(insertCompanion));
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
      console.log(
        '[ARMANET INTEGRATION PLUGIN] [debug] [createVastSettings] [getArmanetVastUrl]',
        { adUnit, armanetParams },
      );
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
          console.log(
            '[ARMANET INTEGRATION PLUGIN] [debug] [createVastSettings] adding roll schedule',
            { rollAdUnit, offset, vastUrl },
          );
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

export const createClientDebug = (clientDebugEnabled) => {
  return (section, message, data) => {
    if (!clientDebugEnabled) return;

    const prefix = '[ARMANET INTEGRATION PLUGIN] [debug]';
    const sectionTag = section ? ` [${section}]` : '';

    if (data) {
      console.log(`${prefix}${sectionTag}`, message, data);
    } else {
      console.log(`${prefix}${sectionTag}`, message);
    }
  };
};
