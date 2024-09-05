import { version } from '../package.json';

const PLUGIN_NAME = 'armanet-integration';
const DEFAULT_SKIP_TIME = 8;
const DEFAULT_SKIP_COUNTDOWN_MESSAGE = 'Skip in {seconds}...';
const DEFAULT_SKIP_MESSAGE = 'Skip';
const ARMANET_JS_URL = 'https://assets.armanet.us/armanet-pxl.js';

const getPluginVersion = () => version;

export const getPluginStaticPath = () => `/plugins/${PLUGIN_NAME}/${getPluginVersion()}/static`;

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
    skipTime: s['armanet-skip-time'] ?? DEFAULT_SKIP_TIME,
    messageSkipCountdown: s['armanet-message-skip-countdown'] ?? DEFAULT_SKIP_COUNTDOWN_MESSAGE,
    messageSkip: s['armanet-message-skip'] ?? DEFAULT_SKIP_MESSAGE,
    messageRemainingTime: s['armanet-message-remainingTime'],
});

export const loadCssStyles = (baseUrl) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = `${baseUrl}/styles/style.css`;
  document.head.appendChild(link);
};

export const loadArmanetPxl = async () => {
  const script = document.createElement('script');
  script.src = ARMANET_JS_URL;
  script.defer = true;
  await new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const loadContribAds = async (player) => {
  try {
    const { default: contrib } = await import('../public/scripts/videojs.ads.min.js');
    player.ads({debug: false, allowVjsAutoplay: true})
  } catch (error) {
    console.error('Error loading ads plugin:', error);
  }
}

export const getRollsStatus = (pluginSettings) => {
  const rolls = {
    pre: pluginSettings.preroll.adUnit && pluginSettings.preroll.enabled,
    mid: pluginSettings.midroll.adUnit && pluginSettings.midroll.enabled,
    post: pluginSettings.postroll.adUnit && pluginSettings.postroll.enabled,
  }
  return {
    preroll: rolls.pre,
    midroll: rolls.mid,
    postroll: rolls.post,
    hasAtLeastOneRollEnabled: rolls.pre || rolls.mid || rolls.post,
  }
}

export const createVastSettings = (pluginSettings, Armanet) => {
  const vastSettings = {
    skip: pluginSettings.skipTime,
    controlsEnabled: true,
    seekEnabled: true,
    withCredentials: false,
    messages: {
      skip: pluginSettings.messageSkip,
      skipCountdown: pluginSettings.messageSkipCountdown,
    },
    schedule: [],
  };

  if (pluginSettings.messageRemainingTime.includes('{seconds}')) {
    vastSettings.displayRemainingTime = true;
    vastSettings.displayRemainingTimeIcons = true;
    vastSettings.messages.remainingTime = pluginSettings.messageRemainingTime;
  }

  const rollsStatus = getRollsStatus(pluginSettings);

  if (rollsStatus.preroll) {
    vastSettings.schedule.push({
      offset: 'pre',
      url: Armanet.getVastTag(pluginSettings.preroll.adUnit, 'pre') || '',
    });
  }

  if (rollsStatus.midroll) {
    vastSettings.schedule.push({
      offset: pluginSettings.midroll.offset,
      url: Armanet.getVastTag(pluginSettings.midroll.adUnit, 'mid') || '',
    });
  }

  if (rollsStatus.postroll) {
    vastSettings.schedule.push({
      offset: 'post',
      url: Armanet.getVastTag(pluginSettings.postroll.adUnit, 'post') || '',
    });
  }

  return vastSettings;
}

export const buildVastPlayer = async (vastSettings, player) => {
  try {
    const { default: VastPlugin } = await import('../public/scripts/videojsx.vast.js');
    player.vast(vastSettings);
  } catch (error) {
    console.error('Error loading VastPlugin:', error);
  }
}
