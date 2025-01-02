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
    minTime: s['armanet-midroll-min-minutes'] ?? 0,
    offset: s['armanet-midroll-offset'] ?? '25%',
  },
  postroll: {
    enabled: s['armanet-postroll-enabled'] ?? false,
    adUnit: s['armanet-postroll-adunit'],
    minTime: s['armanet-postroll-min-minutes'] ?? 0,
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
  const companionHolders = document.querySelectorAll(
    '.companion-video-holder, .companion-sidebar-holder',
  );
  companionHolders.forEach((holder) => holder.remove());
};

export const cleanupVastElements = () => {
  document
    .querySelectorAll(
      '.vast-blocker, .vast-skip-button, .vast-remaining-time, .vast-remaining-time-icon',
    )
    .forEach((element) => element.remove());
};

export const loadContribAds = async (player) => {
  try {
    if (!player.ads) {
      const { default: contrib } = await import(
        '../public/scripts/videojs.ads.min.js'
      );
      player.ads({
        debug: false,
        liveCuePoints: true,
        stitchedAds: false,
        allowVjsAutoplay: true,
      });
      console.log('Contrib ads plugin loaded');
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

      clientDebug(
        'COMPANION',
        `Successfully inserted ${type} companion with AdUnit ${config.adUnit}`,
      );
    } catch (error) {
      console.error(
        `[ARMANET INTEGRATION PLUGIN] Error inserting ${type} companion:`,
        error,
      );
    }
  };

  await Promise.all(enabledCompanions.map(insertCompanion));
};

export const createVastSettings = async (
  pluginSettings,
  Armanet,
  channelName,
  channelAdUnit,
  userData,
  videoTags,
  video,
  //vastParser,
  //vastClient,
  //VASTClient,
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
    vastData: [],
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
    preroll: { offset: 'pre', roll: 'pre', minTime: 0 },
    midroll: {
      offset: pluginSettings.midroll.offset,
      roll: 'mid',
      minTime: pluginSettings.midroll.minTime,
    },
    postroll: {
      offset: 'post',
      roll: 'post',
      minTime: pluginSettings.postroll.minTime,
    },
  };

  Object.entries(rollConfigs).forEach(
    ([rollType, { offset, roll, minTime }]) => {
      if (rollsStatus[rollType]) {
        const rollAdUnit = channelAdUnit || pluginSettings[rollType].adUnit;

        if (rollAdUnit && offset) {
          if (video.duration != 0) {
            const videoDurationInMins = parseInt(video.duration / 60);
            if (videoDurationInMins < minTime) return;
          }

          const vastUrl = getArmanetVastUrl(rollAdUnit, roll);
          //console.log('vastUrl', vastUrl);
          // const vastClient2 = new VASTClient();
          //console.log('vastClient2', vastClient2);
          // vastParser.parseVAST(vastXml)
          // .then(parsedVAST => {
          //   console.log("parsedVAST", parsedVAST);
          // })
          // .catch(err => {
          //   console.error("parsedVAST err", err);
          // });
          // vastClient2.get(vastUrl)
          // .then(response => {
          //   console.log("vastClient response", response);
          //   //console.log("vastClient response2", parseAdsFromXml(response));
          // })
          // .catch(err => {
          //   console.error("vastClient response err", err);
          // });

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

          // vastSettings.vastData.push({
        }
      }
    },
  );

  //vastSettings.vastData = await processVastSchedule(vastSettings, VASTClient);

  return vastSettings;
};

export const buildVastPlayer = async (vastSettings, player) => {
  // try {
  //   console.log('called buildVastPlayer....xxxx');
  //   const { default: VastPlugin } = await import(
  //     '../public/scripts/videojsx.vast.js'
  //   );
  //   //player.vast(vastSettings);
  // } catch (error) {
  //   console.error('Error loading VastPlugin:', error);
  // }
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

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === -1) return 'Unlimited';
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const drawIcon = (iconType, size = 14, viewBox = 14, className = '') => {
  const ICONS = {
    first: {
      path: `<path fill="currentColor" fill-rule="evenodd" d="M5.716 11.164q.139.058.29.057c.196.01.388-.06.534-.192a.757.757 0 0 0 0-1.069L3.514 6.934 6.54 3.91a.756.756 0 0 0-1.069-1.01l-3.5 3.5a.756.756 0 0 0 0 1.07l3.5 3.53q.106.107.245.165m5.333-.195c.129.147.31.237.504.252a.756.756 0 0 0 .504-1.26L9.032 6.933l3.025-3.025a.757.757 0 0 0-1.008-1.01l-3.53 3.47a.756.756 0 0 0 0 1.07z" clip-rule="evenodd"/>`,
    },
    prev: {
      path: `<path fill="currentColor" d="M8.75 11.185a.74.74 0 0 1-.53-.22l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.47a.75.75 0 0 1 1.06 1l-3 3 3 3a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.19"/>`,
    },
    next: {
      path: `<path fill="currentColor" d="M5.25 11.173a.74.74 0 0 1-.53-.25.75.75 0 0 1 0-1.06l3-3-3-3a.75.75 0 0 1 1.06-.94l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.44a.74.74 0 0 1-.53.25"/>`,
    },
    last: {
      path: `<path fill="currentColor" fill-rule="evenodd" d="M7.688 11.145c.091.038.19.057.288.057a.74.74 0 0 0 .533-.252l3.52-3.46a.754.754 0 0 0 0-1.065l-3.52-3.52a.754.754 0 0 0-1.066.975l3.018 3.017-3.018 3.018a.754.754 0 0 0 .245 1.23m-5.746-.194a.74.74 0 0 0 .503.25.74.74 0 0 0 .503-.25l3.52-3.46a.754.754 0 0 0 0-1.066l-3.52-3.52A.754.754 0 0 0 1.942 3.91L4.96 6.928 1.942 9.945a.754.754 0 0 0 0 1.005" clip-rule="evenodd"/>`,
    },
    external: {
      path: `
        <path fill="currentColor" d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1"/>
        <path fill="currentColor" d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2"/>
      `,
    },
  };

  if (!ICONS[iconType]) {
    return '';
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      viewBox="0 0 ${viewBox} ${viewBox}"
      fill="none"
      aria-hidden="true"
      class="p-icon ${className}"
    >
      ${ICONS[iconType].path}
    </svg>
  `;
};

export const parseAdsFromXml = (vastResponse) => {
  if (!vastResponse.ads || vastResponse.ads.length === 0) {
    throw new Error('no ads found in VAST');
  }

  function linearFn(creative) {
    return creative.type === 'linear' && creative.mediaFiles.length;
  }

  const adsWithLinear = vastResponse.ads
    .filter(ad => ad.creatives.some(linearFn));

  if (!adsWithLinear.length) {
    throw new Error('no linear ads found in VAST');
  }

  const adPod = adsWithLinear.filter(ad => ad.sequence);

  if (adPod.length) {
    return adPod.sort((ad1, ad2) => ad1.sequence - ad2.sequence);
  }
  else {
    const standaloneAds = adsWithLinear.filter(ad => !adPod.includes(ad));
    return standaloneAds.slice(0, 1);
  }
}

export const processVastSchedule = async (vastSettings, VASTClient) => {
  // 1. Primero extraemos offset y url de cada item del schedule
  const scheduleItems = vastSettings.schedule.map(item => ({
    offset: item.offset,
    xmlurl: item.url
  }));

  // 2. Función para procesar cada respuesta VAST
  function extractVastData(vastResponse) {
    const ad = vastResponse.ads[0];
    const creative = ad.creatives[0];
    return {
      id: ad.id,
      creativeId: creative.id,
      //creativeAdId: creative.adId,
      duration: creative.duration,
      mediaFileUrl: creative.mediaFiles[0].fileURL,
      mediaFileId: creative.mediaFiles[0].id
    };
  }

  const vastClient3 = new VASTClient();

  // 3. Procesar cada URL y enriquecer los objetos
  const processedItems = await Promise.all(
    scheduleItems.map(async (item) => {
      try {
        const vastResponse = await vastClient3.get(item.xmlurl);

        if (vastResponse.ads && vastResponse.ads.length > 0) {
          const vastData = extractVastData(vastResponse);
          return {
            ...item,
            ...vastData
          };
        } else {
          console.warn(`No ads found for offset ${item.offset}`);
          return item;
        }
      } catch (error) {
        console.error(`Error processing VAST for offset ${item.offset}:`, error);
        return item; // Devolver el item original si hay error
      }
    })
  );

  return processedItems;
}
