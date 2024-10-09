import {
  settings,
  loadArmanetPxl,
  loadContribAds,
  getRollsStatus,
  createVastSettings,
  buildVastPlayer,
} from '../lib/shared.js';

let pluginSettings = null;
let rollsStatus = null;
let initializationPromise = null;
let userData = null;

function register({ registerHook, peertubeHelpers }) {
  initializationPromise = initArmanetIntegrationEmbed(peertubeHelpers);

  registerHook({
    target: 'action:embed.player.loaded',
    handler: async ({ videojs, player, video }) => {
      window.videojs = videojs;
      window.player = player;

      loadContribAds(player);

      await initializationPromise;

      if (!pluginSettings.embededEnabled) {
        player.trigger('nopreroll');
        player.trigger('nopostroll');
        return;
      }

      if (rollsStatus.hasAtLeastOneRollEnabled) {
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
            console.warn(
              '[ARMANET INTEGRATION PLUGIN] Armanet or Armanet.getVastTag is not available',
            );
          }
        } catch (error) {
          console.error(
            '[ARMANET INTEGRATION PLUGIN] Error in Armanet integration:',
            error,
          );
        }
      }
    },
  });
}

async function initArmanetIntegrationEmbed(peertubeHelpers) {
  if (pluginSettings && rollsStatus) return;

  try {
    const s = await peertubeHelpers.getSettings();

    if (!s) {
      console.error('Could not find settings.');
      return;
    }

    pluginSettings = settings(s);

    rollsStatus = getRollsStatus(pluginSettings);
  } catch (error) {
    console.error(
      '[ARMANET INTEGRATION PLUGIN] Error initializing settings:',
      error,
    );
  }
}

export { register };
