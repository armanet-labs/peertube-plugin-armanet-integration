const pluginSettings = require('./lib/pluginSettings');
const adUnitStoragePrefix = 'ch_';
// const armanetAdUnitUrl = 'https://api.armanet.us/dynamic-ad-unit';
const armanetAdUnitUrl = 'https://9stdjnvnwu.sharedwithexpose.com/api/dynamic-ad-unit';
let serverDebugEnabled;
let loggerArmanet;
let apiKey;

async function register({
  registerHook,
  registerSetting,
  settingsManager,
  storageManager,
  peertubeHelpers,
  getRouter,
}) {
  pluginSettings.forEach(registerSetting);

  const router = getRouter();

  const { logger } = peertubeHelpers;
  loggerArmanet.setLogger(logger);

  serverDebugEnabled = await settingsManager.getSetting('armanet-server-debug-enabled');
  apiKey = await settingsManager.getSetting('armanet-api-key');

  loggerArmanet.setDebugEnabled(serverDebugEnabled);

  const settings = await getAllSettings(settingsManager)
  await updateSettings(loggerArmanet, settings)

  settingsManager.onSettingsChange(async (newSettings) => {
    await updateSettings(loggerArmanet, newSettings)
  });

  router.use('/get-channels', async (req, res) => {
    const channels = req.body.data;

    const channelData = [];

    for (const channel of channels) {
      const channelName = channel.name;
      const channelUrl = channel.url;
      const channelDisplayName = channel.displayName;
      const adUnit = await getStorageData(channelName);

      channelData.push({ channelName, channelUrl, channelDisplayName, adUnit });
    }

    return res.status(200).send(channelData);
  })

  router.use('/sync-channels', async (req, res) => {
    const channels = req.body;
    loggerArmanet.info("sync channels", {channels: channels, tags: ['armanet']});

    const successData = [];
    const errorData = [];
    let syncCount = 0;

    for (const channel of channels) {
      const channelName = channel.channelName;
      const channelAdUnit = channel.adUnit;

      if (channelAdUnit) continue;

      const response = await createOrUpdateArmanetChannelAdUnit(channelName);

      if (response) {
        syncCount++;
        successData.push({ channelName, uuid: response?.uuid });
        loggerArmanet.info("[sync-channels] synced channel", {channelName: channelName, response: JSON.stringify(response, null, 2), tags: ['armanet']});
      } else {
        errorData.push({ channelName });
        loggerArmanet.info("[sync-channels] failed to sync channel", {channelName: channelName, tags: ['armanet']});
      }
    }

    loggerArmanet.info("sync result", {successData, errorData, syncCount, tags: ['armanet']});

    return res.status(200).send({ successData, errorData, syncCount });
  })

  const hooks = [
    {
      target: 'filter:api.video.get.result',
      handler: handleVideoGet,
    },
    {
      target: 'action:api.video-channel.created',
      handler: handleChannelCreated,
    },
    {
      target: 'action:api.video-channel.updated',
      handler: handleChannelUpdated,
    },
    {
      target: 'action:api.video-channel.deleted',
      handler: handleChannelDeleted,
    },
  ];

  hooks.forEach(({ target, handler }) => registerHook({ target, handler }));

  async function handleVideoGet(video) {
    if (!video) return video;

    if (!apiKey?.trim()) {
      loggerArmanet.info('[handleVideoGet] no API key defined so skipping storage lookup', {tags: ['armanet']});
      return video;
    }

    if (!video.pluginData) video.pluginData = {};

    const channelName = getChannelName(video.VideoChannel);
    const result = await getStorageData(channelName);

    if (!result) return video;

    video.pluginData['armanet'] = { channel_adUnit: result };

    loggerArmanet.info('[handleVideoGet]:', {channelName: channelName, storageDataResult: result, videoPluginData: video?.pluginData?.armanet?.channel_adUnit, tags: ['armanet']});

    return video;
  }

  async function handleChannelCreated({ videoChannel }) {
    await handleChannelOperation(videoChannel, 'created');
  }

  async function handleChannelUpdated({ videoChannel }) {
    await handleChannelOperation(videoChannel, 'updated');
  }

  async function handleChannelDeleted({ videoChannel }) {
    await handleChannelOperation(videoChannel, 'deleted');
  }

  const handleChannelOperation = async (videoChannel, operation) => {
    try {
      const channelName = getChannelName(videoChannel);
      const channelData = await getStorageData(channelName);

      loggerArmanet.info('[handleChannelOperation] running operation:', {apiKey: apiKey, operation: operation, channelName: channelName, channelData: channelData?.uuid, tags: ['armanet']});

      if (operation === 'deleted') {
        if (!channelData) return;
        await deleteArmanetChannelAdUnit(channelName, channelData.uuid);
      } else {
        if (operation === 'updated' && channelData) return;
        await createOrUpdateArmanetChannelAdUnit(channelName);
      }
    } catch (error) {
      loggerArmanet.info('[handleChannelOperation] error:', {error, apiKey: apiKey, operation: operation, tags: ['armanet']});
    }
  };

  const createOrUpdateArmanetChannelAdUnit = async (channelName) => {
    const response = await fetchArmanetChannelAdUnit({ name: channelName });
    if (response) await setStorageData(channelName, { uuid: response.uuid });
    loggerArmanet.info('[createOrUpdateArmanetChannelAdUnit]', {channelName: channelName, fetchResponseUUID: response?.uuid, tags: ['armanet']});
    return response;
  };

  const deleteArmanetChannelAdUnit = async (channelName, uuid) => {
    const response = await fetchArmanetChannelAdUnit(
      { name: channelName },
      'DELETE',
      `${armanetAdUnitUrl}/${uuid}`,
    );

    if (response) loggerArmanet.info('[deleteArmanetChannelAdUnit] fetch Response', {response: JSON.stringify(response, null, 2), tags: ['armanet']});
  };

  const fetchArmanetChannelAdUnit = async (
    data,
    method = 'POST',
    url = armanetAdUnitUrl,
  ) => {
    if (!apiKey?.trim()) {
      loggerArmanet.info('[fetchArmanetChannelAdUnit] no API key defined so skipping fetch request to Armanet', {apiKey: apiKey, tags: ['armanet']});
      return null;
    }

    loggerArmanet.info('[fetchArmanetChannelAdUnit] request parameters', {data: JSON.stringify(data, null, 2), method: method, url: url, apiKey: apiKey, tags: ['armanet']});

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      mode: 'cors',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      loggerArmanet.info('[fetchArmanetChannelAdUnit] fetch error', {errorMessage: errorMessage, status: response.status, tags: ['armanet']});
      return null;
    }

    const jsonMessage = await response.json();
    loggerArmanet.info('[fetchArmanetChannelAdUnit] fetch success', {jsonMessage: jsonMessage, status: response.status, tags: ['armanet']});

    return jsonMessage;
  };

  const getChannelName = (videoChannel) =>
    videoChannel?.Actor?.preferredUsername;

  const getStorageKey = (name) => `${adUnitStoragePrefix}${name}`;

  const getStorageData = async (name) => {
    const storageData = await storageManager.getData(getStorageKey(name));
    return storageData;
  };

  const setStorageData = async (name, data) => {
    await storageManager.storeData(getStorageKey(name), data);
  };
}

async function unregister() {
  return;
}

module.exports = {
  register,
  unregister,
};

loggerArmanet = {
  info: (message, options = {}) => {
    if (serverDebugEnabled) {
      logger.info('[ARMANET INTEGRATION PLUGIN] ' + message, options);
    }
  },
  warn: (message, options = {}) => {
    if (serverDebugEnabled) {
      logger.warn('[ARMANET INTEGRATION PLUGIN] ' + message, options);
    }
  },
  error: (message, options = {}) => {
    if (serverDebugEnabled) {
      logger.error('[ARMANET INTEGRATION PLUGIN] ' + message, options);
    }
  },
  debug: (message, options = {}) => {
    if (serverDebugEnabled) {
      logger.debug('[ARMANET INTEGRATION PLUGIN] ' + message, options);
    }
  },
  setLogger: (peertubeLogger) => {
    logger = peertubeLogger;
  },
  setDebugEnabled: (debugEnabled) => {
    serverDebugEnabled = debugEnabled;
  }
};

function getAllSettings (settingsManager) {
  return settingsManager.getSettings([
    'armanet-preroll-enabled',
    'armanet-preroll-adunit',
    'armanet-midroll-enabled',
    'armanet-midroll-adunit',
    'armanet-midroll-offset',
    'armanet-postroll-enabled',
    'armanet-postroll-adunit',
    'armanet-embeded-enabled',
    'armanet-player-controls-enabled',
    'armanet-api-key',
    'armanet-skip-time',
    'armanet-message-skip-countdown',
    'armanet-message-skip',
    'armanet-message-remainingTime',
    'armanet-server-debug-enabled',
    'armanet-client-debug-enabled',
  ])
}

async function updateSettings (loggerArmanet, newSettings) {
  let newApiKey = newSettings['armanet-api-key']
  let newServerDebugEnabled = newSettings['armanet-server-debug-enabled']

  if (newServerDebugEnabled !== serverDebugEnabled) {
    serverDebugEnabled = newServerDebugEnabled;
    loggerArmanet.setDebugEnabled(newServerDebugEnabled);
    loggerArmanet.info(`[updateSettings] Server debug setting updated to: ${newServerDebugEnabled}`, { tags: ['armanet'] });
  }

  if (!newApiKey) {
    loggerArmanet.info('[updateSettings] API key not provided', {apiKey: apiKey, newApiKey: newApiKey, tags: ['armanet']});
    apiKey = undefined;
  }

  if (newApiKey !== apiKey) {
    loggerArmanet.info('[updateSettings] API key updated', {apiKey: apiKey, newApiKey: newApiKey, tags: ['armanet']});
    apiKey = newApiKey;
  }
}
