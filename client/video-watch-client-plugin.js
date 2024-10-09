import {
  settings,
  loadArmanetPxl,
  loadContribAds,
  getRollsStatus,
  createVastSettings,
  buildVastPlayer,
} from '../lib/shared.js';

function register({ registerHook, peertubeHelpers }) {
  initArmanetIntegration(registerHook, peertubeHelpers).catch((err) =>
    console.error('[ARMANET INTEGRATION PLUGIN] Cannot initialize plugin', err),
  );
}

async function initArmanetIntegration(registerHook, peertubeHelpers) {
  const s = await peertubeHelpers.getSettings();
  if (!s) {
    console.error('Could not find settings.');
    return;
  }

  const pluginSettings = settings(s);
  const rollsStatus = getRollsStatus(pluginSettings);
  const authUser = await peertubeHelpers.getUser();
  const userData = {
    username: authUser?.username ?? '',
    email: authUser?.email ?? '',
  };

  registerHook({
    target: 'filter:internal.video-watch.player.load-options.result',
    handler: (result) => {
      if (rollsStatus.hasAtLeastOneRollEnabled) {
        result.autoplay = false;
      }

      return result;
    },
  });

  registerHook({
    target: 'action:video-watch.player.loaded',
    handler: async ({ videojs, player, video }) => {
      if (!rollsStatus.hasAtLeastOneRollEnabled) return;

      window.videojs = videojs;
      window.player = player;

      await loadContribAds(player);

      try {
        await loadArmanetPxl();

        if (
          typeof Armanet !== 'undefined' &&
          Armanet &&
          typeof Armanet.getVastTag === 'function'
        ) {
          const channelName = video?.channel?.name ?? 'unknown';
          const channelAdUnit =
            video?.pluginData?.armanet?.channel_adUnit?.uuid ?? null;
          const videoTags = video?.tags ?? [];

          const vastSettings = createVastSettings(
            pluginSettings,
            Armanet,
            channelName,
            channelAdUnit,
            userData,
            videoTags,
          );
          await buildVastPlayer(vastSettings, player);
        } else {
          console.error(
            '[ARMANET INTEGRATION PLUGIN] Armanet or Armanet.getVastTag is not available',
          );
        }
      } catch (error) {
        console.error(
          '[ARMANET INTEGRATION PLUGIN] Error in Armanet integration:',
          error,
        );
      }
    },
  });
}

export { register };
