import {
  settings,
  loadArmanetPxl,
  setupResourceHints,
  cleanupCompanions,
  cleanupVastElements,
  loadContribAds,
  getRollsStatus,
  getCompanionsStatus,
  handleCompanions,
  createVastSettings,
  buildVastPlayer,
  createClientDebug,
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
  const clientDebug = createClientDebug(pluginSettings.clientDebugEnabled);
  const rollsStatus = getRollsStatus(pluginSettings);
  const companionsStatus = getCompanionsStatus(pluginSettings);
  const authUser = await peertubeHelpers.getUser();
  const userData = {
    username: authUser?.username ?? '',
    email: authUser?.email ?? '',
  };
  let resourceHintsConfigured = false;

  registerHook({
    target: 'action:router.navigation-end',
    handler: async ({ path }) => {
      if (!path.startsWith('/w/')) return;

      if (typeof window.player?.ads?.inAdBreak === 'function') {
        if (window.player.ads.inAdBreak()) {
          window.player.ads.endLinearAdMode();
          cleanupVastElements();
        }
      } else if (window.player?.ads?._inLinearAdMode !== undefined) {
        if (window.player.ads._inLinearAdMode) {
          window.player.ads.endLinearAdMode();
          cleanupVastElements();
        }
      }

      if (companionsStatus.hasAtLeastOneCompanionEnabled) {
        cleanupCompanions();
        window.dispatchEvent(new Event('loadAds'));
      }
    },
  });

  registerHook({
    target: 'action:video-watch.video.loaded',
    handler: async () => {
      if (!companionsStatus.hasAtLeastOneCompanionEnabled) return;

      try {
        if (!resourceHintsConfigured) {
          setupResourceHints();
          resourceHintsConfigured = true;
        }
        await loadArmanetPxl();
        await handleCompanions(pluginSettings, clientDebug);
      } catch (error) {
        clientDebug('Companions', 'Error handling companions:', error);
      }
    },
  });

  registerHook({
    target: 'action:video-watch.player.loaded',
    handler: async ({ videojs, player, video }) => {
      if (!rollsStatus.hasAtLeastOneRollEnabled) return;

      window.videojs = videojs;
      window.player = player;

      try {
        await Promise.all([loadContribAds(player), loadArmanetPxl()]);

        if (typeof Armanet !== 'undefined' && Armanet?.getVastTag) {
          const channelName = video?.channel?.name ?? 'unknown';
          const channelAdUnit =
            video?.pluginData?.armanet?.channel_adUnit?.uuid ?? null;
          const videoTags = video?.tags ?? [];

          clientDebug('PLAYER', 'Player loaded', {
            video,
            videoTags,
            channel: { channelName, channelAdUnit },
            user: userData,
          });

          const vastSettings = createVastSettings(
            pluginSettings,
            Armanet,
            channelName,
            channelAdUnit,
            userData,
            videoTags,
            video,
          );
          await buildVastPlayer(vastSettings, player);
        } else {
          clientDebug(
            'PLAYER',
            'Armanet or Armanet.getVastTag is not available',
          );
        }
      } catch (error) {
        clientDebug('PLAYER', 'Error in Armanet integration:', error);
      }
    },
  });
}

export { register };
