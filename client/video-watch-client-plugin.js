import {
  settings,
  loadCssStyles,
  loadArmanetPxl,
  loadContribAds,
  getRollsStatus,
  createVastSettings,
  buildVastPlayer
} from '../lib/shared.js';

function register ({ registerHook, peertubeHelpers }) {
  const baseStaticUrl = peertubeHelpers.getBaseStaticRoute();

  initArmanetIntegration(registerHook, peertubeHelpers, baseStaticUrl)
    .catch(err => console.error('[ARMANET INTEGRATION PLUGIN] Cannot initialize plugin', err))
}

export { register }

async function initArmanetIntegration (registerHook, peertubeHelpers, baseStaticUrl) {
  return peertubeHelpers.getSettings()
    .then(async (s) => {

      if (!s) {
        console.error('Could not find settings.')
        return
      }

      const pluginSettings = settings(s);

      const rollsStatus = getRollsStatus(pluginSettings);

      const getAuthUser = peertubeHelpers.getUser();

      const userData = {
        username: getAuthUser ? getAuthUser.username : '',
        email: getAuthUser ? getAuthUser.email : ''
      }

      registerHook({
        target: 'filter:internal.video-watch.player.load-options.result',
        handler: (result) => {
          if (rollsStatus.hasAtLeastOneRollEnabled) {
            result.autoplay = false;
          }
          return result;
        }
      })

      registerHook({
        target: 'action:video-watch.player.loaded',
        handler: async ({ videojs, player, video }) => {
          if (rollsStatus.hasAtLeastOneRollEnabled) {
            window.videojs = videojs;
            window.player = player;

            player.on('vast.adStart', (e) => {
              const adId = e.vast.adId;
              const creativeAdId = e.vast.creativeAdId;
              const fileUrl = e.vast.mediaFiles[0].fileURL;
              // console.log('[EVENT] vast.adStart', {adId, creativeAdId, fileUrl});
            });

            loadCssStyles(baseStaticUrl);
            await loadContribAds(player);

            await loadArmanetPxl().then(() => {
              if (typeof Armanet !== 'undefined' && Armanet && typeof Armanet.getVastTag === 'function') {
                const channelName = video?.byVideoChannel ?? 'unknown';
                const vastSettings = createVastSettings(pluginSettings, Armanet, channelName, userData);
                buildVastPlayer(vastSettings, player);
              }
            }).catch(error => {
              console.error('[ARMANET INTEGRATION PLUGIN] loadArmanetPxl() error', error);
            });
          }
        }
      });
    })
}
