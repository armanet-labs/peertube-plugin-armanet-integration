const pluginSettings = require('./lib/pluginSettings');
const adUnitStoragePrefix = 'ch_';
const armanetAdUnitUrl = 'https://api.armanet.us/dynamic-ad-unit';
let serverDebugEnabled;
let loggerArmanet;
const loggerTag = 'armanet';
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

  serverDebugEnabled = await settingsManager.getSetting(
    'armanet-server-debug-enabled',
  );
  apiKey = await settingsManager.getSetting('armanet-api-key');

  loggerArmanet.setDebugEnabled(serverDebugEnabled);

  let settings = await getAllSettings(settingsManager);
  await updateSettings(loggerArmanet, settings);

  settingsManager.onSettingsChange(async (newSettings) => {
    await updateSettings(loggerArmanet, newSettings);
    settings = await updateSettingsContent(newSettings);
  });

  router.use('/get-channels', async (req, res) => {
    const channels = req.body.data;

    const models = await peertubeHelpers.database.query(`
      SELECT
        "videoChannel"."name" as "channelName",
        "user"."videoQuota" as "videoQuota",
        "user"."videoQuotaDaily" as "videoQuotaDaily",
        "user"."username" as "channelOwner",
        "actor"."preferredUsername" as "actorName"
      FROM "videoChannel"
      JOIN "account" ON "videoChannel"."accountId" = "account"."id"
      JOIN "actor" ON "videoChannel"."actorId" = "actor"."id"
      JOIN "user" ON "account"."userId" = "user"."id"
    `);

    const quotaData = models[0];
    const channelData = [];

    for (const channel of channels) {
      const channelName = channel.name;
      const channelUrl = channel.url;
      const channelDisplayName = channel.displayName;
      const storedAdUnit = await getStorageData(channelName);

      const adUnit = storedAdUnit && storedAdUnit.uuid ? storedAdUnit : null;

      const channelInfo = quotaData.find((m) => m.actorName === channelName);
      const videoQuota = channelInfo ? Number(channelInfo.videoQuota) : null;

      // Return only channels with unlimited video quota or with an ad unit
      if (videoQuota !== -1 && adUnit === null) {
        continue;
      }

      channelData.push({
        channelName,
        channelUrl,
        channelDisplayName,
        adUnit,

        videoQuota: channelInfo ? Number(channelInfo.videoQuota) : null,
        videoQuotaDaily: channelInfo
          ? Number(channelInfo.videoQuotaDaily)
          : null,
        channelOwner: channelInfo ? channelInfo.channelOwner : 'N/A',
        actorName: channelInfo ? channelInfo.actorName : 'N/A',
      });
    }

    return res.status(200).send(channelData);
  });

  router.use('/sync-channels', async (req, res) => {
    const channels = req.body;
    loggerArmanet.info('sync channels', {
      channels: channels,
      tags: [loggerTag],
    });

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
        loggerArmanet.info('[sync-channels] synced channel', {
          channelName: channelName,
          response: JSON.stringify(response, null, 2),
          tags: [loggerTag],
        });
      } else {
        errorData.push({ channelName });
        loggerArmanet.info('[sync-channels] failed to sync channel', {
          channelName: channelName,
          tags: [loggerTag],
        });
      }
    }

    loggerArmanet.info('sync result', {
      successData,
      errorData,
      syncCount,
      tags: [loggerTag],
    });

    return res.status(200).send({ successData, errorData, syncCount });
  });

  router.use('/unsync-channel', async (req, res) => {
    const channel = req.body;
    loggerArmanet.info('unsync channel', {
      channel: channel,
      tags: [loggerTag],
    });

    const channelName = channel.channelName;
    const channelUuid = channel.channelUuid;

    if (!channelUuid) return;

    const response = await deleteArmanetChannelAdUnit(channelName, channelUuid);

    loggerArmanet.info('[unsync-channel] done', {
      channelName: channelName,
      tags: [loggerTag],
    });

    return res.status(200).send({ channelName });
  });

  router.use('/sync-single-channel', async (req, res) => {
    const channel = req.body;
    loggerArmanet.info('sync single channel', {
      channel: channel,
      tags: [loggerTag],
    });

    const channelName = channel.channelName;

    const response = await createOrUpdateArmanetChannelAdUnit(channelName);

    if (response) {
      loggerArmanet.info('[sync-single-channel] synced channel', {
        channelName: channelName,
        response: JSON.stringify(response, null, 2),
        tags: [loggerTag],
      });
      return res
        .status(200)
        .send({ channelName: channelName, uuid: response?.uuid });
    } else {
      loggerArmanet.info('[sync-single-channel] failed to sync channel', {
        channelName: channelName,
        tags: [loggerTag],
      });
    }

    return res.status(200).send({ channelName });
  });

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
    {
      target: 'action:api.user.created',
      handler: handleUserCreatedByAdmin,
    },
  ];

  hooks.forEach(({ target, handler }) => registerHook({ target, handler }));

  async function handleVideoGet(video) {
    if (!video) return video;

    if (!apiKey?.trim()) {
      loggerArmanet.info(
        '[handleVideoGet] no API key defined so skipping storage lookup',
        { tags: ['armanet'] },
      );
      return video;
    }

    const excludedChannels = settings['armanet-excluded-channels-data'] || '';
    const excludedChannelsArray = excludedChannels
      .split(',')
      .map((channel) => channel.trim());

    if (!video.pluginData) video.pluginData = {};

    const channelName = getChannelName(video.VideoChannel);
    const result = await getStorageData(channelName);

    if (!result) return video;

    video.pluginData['armanet'] = {
      channel_adUnit: result,
      is_excluded: excludedChannelsArray.includes(channelName),
    };

    loggerArmanet.info('[handleVideoGet]:', {
      channelName: channelName,
      storageDataResult: result,
      videoPluginData: video?.pluginData?.armanet?.channel_adUnit,
      excludedChannels: excludedChannelsArray,
      tags: [loggerTag],
    });

    return video;
  }

  async function handleChannelCreated({ videoChannel, req, res }) {
    await handleChannelOperation(videoChannel, res, 'created');
  }

  async function handleUserCreatedByAdmin({ user, req, res }) {
    const channelName = req?.body?.channelName;
    const userVideoQuota = req?.body?.videoQuota;

    if (channelName && userVideoQuota) {
      await handleUserOperation(channelName, userVideoQuota, 'created');
    }
  }

  async function handleChannelUpdated({ videoChannel }) {
    await handleChannelOperation(videoChannel, res, 'updated');
  }

  async function handleChannelDeleted({ videoChannel }) {
    await handleChannelOperation(videoChannel, res, 'deleted');
  }

  const handleUserOperation = async (
    channelName,
    userVideoQuota,
    operation,
  ) => {
    try {
      const channelData = await getStorageData(channelName);

      loggerArmanet.info('[handleUserOperation] running operation:', {
        apiKey: apiKey,
        operation: operation,
        channelName: channelName,
        channelData: channelData?.uuid,
        userVideoQuota: userVideoQuota,
        tags: [loggerTag],
      });

      if (operation === 'created') {
        if (userVideoQuota !== -1) return;
        await createOrUpdateArmanetChannelAdUnit(channelName);
      } else {
        if (operation === 'updated' && channelData) return;
        await createOrUpdateArmanetChannelAdUnit(channelName);
      }
    } catch (error) {
      loggerArmanet.info('[handleUserOperation] error:', {
        error,
        apiKey: apiKey,
        operation: operation,
        tags: [loggerTag],
      });
    }
  };

  const handleChannelOperation = async (videoChannel, res, operation) => {
    try {
      const channelName = getChannelName(videoChannel);
      const channelData = await getStorageData(channelName);
      const userVideoQuota = getUserVideoQuota(res);

      loggerArmanet.info('[handleChannelOperation] running operation:', {
        apiKey: apiKey,
        operation: operation,
        channelName: channelName,
        channelData: channelData?.uuid,
        userVideoQuota: userVideoQuota,
        tags: [loggerTag],
      });

      if (operation === 'deleted') {
        if (!channelData) return;
        await deleteArmanetChannelAdUnit(channelName, channelData.uuid);
      } else {
        if (operation === 'updated' && channelData) return;
        if (userVideoQuota !== -1) return;
        await createOrUpdateArmanetChannelAdUnit(channelName);
      }
    } catch (error) {
      loggerArmanet.info('[handleChannelOperation] error:', {
        error,
        apiKey: apiKey,
        operation: operation,
        tags: [loggerTag],
      });
    }
  };

  const createOrUpdateArmanetChannelAdUnit = async (channelName) => {
    const response = await fetchArmanetChannelAdUnit({ name: channelName });
    if (response) await setStorageData(channelName, { uuid: response.uuid });
    loggerArmanet.info('[createOrUpdateArmanetChannelAdUnit]', {
      channelName: channelName,
      fetchResponseUUID: response?.uuid,
      tags: [loggerTag],
    });
    return response;
  };

  const deleteArmanetChannelAdUnit = async (channelName, uuid) => {
    const response = await fetchArmanetChannelAdUnit(
      { name: channelName },
      'DELETE',
      `${armanetAdUnitUrl}/${uuid}`,
    );

    if (response) {
      await setStorageData(channelName, {});

      loggerArmanet.info('[deleteArmanetChannelAdUnit] fetch Response', {
        response: JSON.stringify(response, null, 2),
        tags: [loggerTag],
      });
    }
  };

  const fetchArmanetChannelAdUnit = async (
    data,
    method = 'POST',
    url = armanetAdUnitUrl,
  ) => {
    if (!apiKey?.trim()) {
      loggerArmanet.info(
        '[fetchArmanetChannelAdUnit] no API key defined so skipping fetch request to Armanet',
        { apiKey: apiKey, tags: ['armanet'] },
      );
      return null;
    }

    loggerArmanet.info('[fetchArmanetChannelAdUnit] request parameters', {
      data: JSON.stringify(data, null, 2),
      method: method,
      url: url,
      apiKey: apiKey,
      tags: [loggerTag],
    });

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
      loggerArmanet.info('[fetchArmanetChannelAdUnit] fetch error', {
        errorMessage: errorMessage,
        status: response.status,
        tags: [loggerTag],
      });
      return null;
    }

    const jsonMessage = await response.json();
    loggerArmanet.info('[fetchArmanetChannelAdUnit] fetch success', {
      jsonMessage: jsonMessage,
      status: response.status,
      tags: [loggerTag],
    });

    return jsonMessage;
  };

  const getChannelName = (videoChannel) =>
    videoChannel?.Actor?.preferredUsername;

  const getUserVideoQuota = (res) =>
    res?.locals?.oauth?.token?.User?.videoQuota;

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
  },
};

function getAllSettings(settingsManager) {
  return settingsManager.getSettings([
    'armanet-preroll-enabled',
    'armanet-preroll-adunit',
    'armanet-midroll-enabled',
    'armanet-midroll-adunit',
    'armanet-midroll-min-minutes',
    'armanet-midroll-offset',
    'armanet-postroll-enabled',
    'armanet-postroll-adunit',
    'armanet-postroll-min-minutes',
    'armanet-companion-video-enabled',
    'armanet-companion-video-adunit',
    'armanet-companion-sidebar-enabled',
    'armanet-companion-sidebar-adunit',
    'armanet-embeded-enabled',
    'armanet-player-controls-enabled',
    'armanet-api-key',
    'armanet-skip-time',
    'armanet-message-skip-countdown',
    'armanet-message-skip',
    'armanet-message-remainingTime',
    'armanet-excluded-channels',
    'armanet-excluded-channels-data',
    'armanet-server-debug-enabled',
    'armanet-client-debug-enabled',
  ]);
}

async function updateSettings(loggerArmanet, newSettings) {
  let newApiKey = newSettings['armanet-api-key'];
  let newServerDebugEnabled = newSettings['armanet-server-debug-enabled'];

  if (newServerDebugEnabled !== serverDebugEnabled) {
    serverDebugEnabled = newServerDebugEnabled;
    loggerArmanet.setDebugEnabled(newServerDebugEnabled);
    loggerArmanet.info(
      `[updateSettings] Server debug setting updated to: ${newServerDebugEnabled}`,
      { tags: ['armanet'] },
    );
  }

  if (!newApiKey) {
    loggerArmanet.info('[updateSettings] API key not provided', {
      apiKey: apiKey,
      newApiKey: newApiKey,
      tags: [loggerTag],
    });
    apiKey = undefined;
  }

  if (newApiKey !== apiKey) {
    loggerArmanet.info('[updateSettings] API key updated', {
      apiKey: apiKey,
      newApiKey: newApiKey,
      tags: [loggerTag],
    });
    apiKey = newApiKey;
  }
}

async function updateSettingsContent(newSettings) {
  let updates;
  updates['armanet-preroll-enabled'] = newSettings['armanet-preroll-enabled'];
  updates['armanet-preroll-adunit'] = newSettings['armanet-preroll-adunit'];
  updates['armanet-midroll-enabled'] = newSettings['armanet-midroll-enabled'];
  updates['armanet-midroll-adunit'] = newSettings['armanet-midroll-adunit'];
  updates['armanet-midroll-min-minutes'] =
    newSettings['armanet-midroll-min-minutes'];
  updates['armanet-midroll-offset'] = newSettings['armanet-midroll-offset'];
  updates['armanet-postroll-enabled'] = newSettings['armanet-postroll-enabled'];
  updates['armanet-postroll-adunit'] = newSettings['armanet-postroll-adunit'];
  updates['armanet-postroll-min-minutes'] =
    newSettings['armanet-postroll-min-minutes'];
  updates['armanet-companion-video-enabled'] =
    newSettings['armanet-companion-video-enabled'];
  updates['armanet-companion-video-adunit'] =
    newSettings['armanet-companion-video-adunit'];
  updates['armanet-companion-sidebar-enabled'] =
    newSettings['armanet-companion-sidebar-enabled'];
  updates['armanet-companion-sidebar-adunit'] =
    newSettings['armanet-companion-sidebar-adunit'];
  updates['armanet-embeded-enabled'] = newSettings['armanet-embeded-enabled'];
  updates['armanet-player-controls-enabled'] =
    newSettings['armanet-player-controls-enabled'];
  updates['armanet-api-key'] = newSettings['armanet-api-key'];
  updates['armanet-skip-time'] = newSettings['armanet-skip-time'];
  updates['armanet-message-skip-countdown'] =
    newSettings['armanet-message-skip-countdown'];
  updates['armanet-message-skip'] = newSettings['armanet-message-skip'];
  updates['armanet-message-remainingTime'] =
    newSettings['armanet-message-remainingTime'];
  updates['armanet-excluded-channels'] =
    newSettings['armanet-excluded-channels'];
  updates['armanet-excluded-channels-data'] =
    newSettings['armanet-excluded-channels-data'];
  updates['armanet-server-debug-enabled'] =
    newSettings['armanet-server-debug-enabled'];
  updates['armanet-client-debug-enabled'] =
    newSettings['armanet-client-debug-enabled'];

  return updates;
}
