const pluginSettings = require('./lib/pluginSettings');
const adUnitStoragePrefix = 'ch_';
const armanetAdUnitUrl = 'https://api.armanet.us/dynamic-ad-unit';

async function register({
  registerHook,
  registerSetting,
  settingsManager,
  storageManager,
  peertubeHelpers,
}) {
  pluginSettings.forEach(registerSetting);

  const { logger } = peertubeHelpers

  const apiKey = await settingsManager.getSetting('armanet-api-key');

  if (!apiKey?.trim()) return;

  logger.info('[ARMANET INTEGRATION PLUGIN] [main.js] apiKey: %s', apiKey);

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
    if (!video.pluginData) video.pluginData = {};

    const channelName = getChannelName(video.VideoChannel);
    const result = await getStorageData(channelName);

    if (!result) return video;

    logger.info('[ARMANET INTEGRATION PLUGIN] [main] [handleVideoGet] channelName: %s', channelName);
    logger.info('[ARMANET INTEGRATION PLUGIN] [main] [handleVideoGet] channel_adUnit:', result);

    video.pluginData['armanet'] = { channel_adUnit: result };

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

      if (operation === 'deleted') {
        if (!channelData) return;
        await deleteArmanetChannelAdUnit(channelName, channelData.uuid);
      } else {
        if (operation === 'updated' && channelData) return;
        await createOrUpdateArmanetChannelAdUnit(channelName);
      }
    } catch (error) {
      console.error(
        `[ARMANET INTEGRATION PLUGIN] Error while handling channel ${operation}:`,
        error,
      );
    }
  };

  const createOrUpdateArmanetChannelAdUnit = async (channelName) => {
    const response = await fetchArmanetChannelAdUnit({ name: channelName });
    if (response) await setStorageData(channelName, { uuid: response.uuid });
    logger.info('[ARMANET INTEGRATION PLUGIN] [main] [createOrUpdateArmanetChannelAdUnit] channelName: %s', channelName);
    logger.info('[ARMANET INTEGRATION PLUGIN] [main] [createOrUpdateArmanetChannelAdUnit] response UUID: %s', response.uuid);
  };

  const deleteArmanetChannelAdUnit = async (channelName, uuid) => {
    const response = await fetchArmanetChannelAdUnit(
      { name: channelName },
      'DELETE',
      `${armanetAdUnitUrl}/${uuid}`,
    );
    if (response) console.log('[ARMANET INTEGRATION PLUGIN] Ad unit deleted');
  };

  const fetchArmanetChannelAdUnit = async (
    data,
    method = 'POST',
    url = armanetAdUnitUrl,
  ) => {
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
      console.error(
        '[ARMANET INTEGRATION PLUGIN] Failed to fetch channel data. Status:',
        response.status,
      );
      return null;
    }

    return response.json();
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
