const pluginSettings = require('./lib/pluginSettings');
const adUnitStoragePrefix = 'ch_';
const armanetAdUnitUrl = 'https://portal.armanet.us/api/dynamic-ad-unit';

async function register ({
  registerHook,
  registerSetting,
  settingsManager,
  storageManager,
  peertubeHelpers,
}) {
  pluginSettings.forEach((setting) => {
    registerSetting(setting);
  });

  const apiKey = await settingsManager.getSetting('armanet-api-key');

  if (!apiKey || apiKey.trim() === '') {
    return;
  }

  registerHook({
    target: 'filter:api.video.get.result',
    handler: async (video) => {
      if (!video) return video
      if (!video.pluginData) video.pluginData = {}

      const channelName = video.VideoChannel.Actor.preferredUsername;
      const result = await storageManager.getData(`${adUnitStoragePrefix}${channelName}`)
      video.pluginData['armanet'] = {}
      video.pluginData['armanet']['channel_adUnit'] = result

      return video
    }
  })

  registerHook({
    target: 'action:api.video-channel.created',
    handler: async ({ videoChannel }) => {
      try {
        const channelName = videoChannel?.Actor?.preferredUsername;
        const data = { name: channelName };

        const response = await fetch(armanetAdUnitUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          mode: 'cors',
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          await storageManager.storeData(`${adUnitStoragePrefix}${channelName}`, { uuid: jsonResponse.uuid });
        } else {
          console.error('[ARMANET INTEGRATION PLUGIN] Failed to send channel data. Status:', response.status);
        }
      } catch (error) {
        console.error('[ARMANET INTEGRATION PLUGIN] Error while sending channel data:', error);
      }
    },
  });

  registerHook({
    target: 'action:api.video-channel.updated',
    handler: async ({ videoChannel }) => {
      try {
        const channelName = videoChannel?.Actor?.preferredUsername;
        const data = { name: channelName };

        const channelData = await storageManager.getData(`${adUnitStoragePrefix}${channelName}`)

        if (channelData) {
          return
        }

        const response = await fetch(armanetAdUnitUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          mode: 'cors',
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          await storageManager.storeData(`${adUnitStoragePrefix}${channelName}`, { uuid: jsonResponse.uuid });
        } else {
          console.error('[ARMANET INTEGRATION PLUGIN] Failed to send channel data. Status:', response.status);
        }
      } catch (error) {
        console.error('[ARMANET INTEGRATION PLUGIN] Error while sending channel data:', error);
      }
    },
  });

  registerHook({
    target: 'action:api.video-channel.deleted',
    handler: async ({ videoChannel }) => {
      try {
        const channelName = videoChannel?.Actor?.preferredUsername;
        const data = { name: channelName };

        const channelData = await storageManager.getData(`${adUnitStoragePrefix}${channelName}`)

        if (!channelData) {
          return
        }

        const response = await fetch(armanetAdUnitUrl+'/'+channelData.uuid, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          mode: 'cors',
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.error('[ARMANET INTEGRATION PLUGIN] Ad unit deleted:', response.status);
        } else {
          console.error('[ARMANET INTEGRATION PLUGIN] Failed to send channel data. Status:', response.status);
        }
      } catch (error) {
        console.error('[ARMANET INTEGRATION PLUGIN] Error while sending channel data:', error);
      }
    },
  });
}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}
