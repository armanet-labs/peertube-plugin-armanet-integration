import {
  settings,
  loadCssStyles,
  loadArmanetPxl,
  getPluginStaticPath,
  loadContribAds,
  getRollsStatus,
  createVastSettings,
  buildVastPlayer
} from '../lib/shared.js';

let pluginSettings = null;
let rollsStatus = null;
let initializationPromise = null;

function register ({ registerHook, peertubeHelpers }) {
  initializationPromise = initArmanetIntegrationEmbed(peertubeHelpers);

  registerHook({
    target: "action:embed.player.loaded",
    handler: async ({ videojs, player, video }) => {

      window.videojs = videojs;
      window.player = player;

      loadContribAds(player);

      await initializationPromise;

      if(!pluginSettings.embededEnabled) {
        player.trigger('nopreroll');
        player.trigger('nopostroll');
        return;
      }

      if (rollsStatus.hasAtLeastOneRollEnabled) {
        const baseStaticUrl = getPluginStaticPath();
        loadCssStyles(baseStaticUrl);

        try {
          await loadArmanetPxl();
          if (typeof Armanet !== 'undefined' && Armanet && typeof Armanet.getVastTag === 'function') {
            const channelName = video?.byVideoChannel ?? 'unknown';
            const vastSettings = createVastSettings(pluginSettings, Armanet, channelName);
            buildVastPlayer(vastSettings, player);
          }
        } catch (error) {
          console.error('[ARMANET INTEGRATION PLUGIN EMBED] loadArmanetPxl() error', error);
        }
      }
    }
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
    console.error('[ARMANET INTEGRATION PLUGIN] Error initializing settings:', error);
  }
}

export { register };
