//import videojs from 'video.js';
// import {VastPlugin} from "videojsx-vast-plugin/src/vast-plugin.mjs"
// import {VASTClient, VASTParser, VASTTracker} from '@dailymotion/vast-client';
import contribAdsPlugin from "videojs-contrib-ads"
// import {VastPlugin} from "../../videojsx-vast-plugin/dist/videojsx.vast.js"
//const { default: VastPlugin } = await import('../public/scripts/videojsx.vast.js');
import videojsxVast from "../public/scripts/videojsx.vast.js";
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
  processVastSchedule,
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

      // console.log('router.navigation-end rest', path);
      // console.log('router.navigation-end inAdBreak', window.player?.ads?.inAdBreak());
      // if (typeof window.player?.ads?.inAdBreak === 'function') {
      //   if (window.player.ads.inAdBreak()) {
      //     // window.player.ads.endLinearAdMode();
      //     // window.player.ads.disableNextSnapshotRestore = true;
      //     // window.player.ads.reset();
      //     // window.player.vast().dispose()
      //     // window.player.ads().dispose()

      //     // const snapshotObject = player.ads.snapshot;
      //     // console.log('snapshotObject', snapshotObject);
      //     // if (snapshotObject) {
      //     //   const tech = player.$('.vjs-tech');
      //     //   console.log('tech', tech);
      //     //   // if (tech && 'style' in snapshotObject) {
      //     //   //   tech.setAttribute('style', snapshotObject.style || '');
      //     //   // }
      //     // }




      //     // cleanupVastElements();
      //   }
      // } else if (window.player?.ads?._inLinearAdMode !== undefined) {
      //   if (window.player.ads._inLinearAdMode) {
      //     // window.player.ads.endLinearAdMode();
      //     // cleanupVastElements();
      //   }
      // }



      if (window.player) {
        console.log('Cleaning up player before loading new video');
        // Detener anuncios activos y limpiar plugins
        // if (window.player.ads?.inAdBreak()) {
        //   window.player.ads.endLinearAdMode();
        // }

        // Limpia el estado del reproductor
        cleanupVastElements(); // Tu función existente para limpiar elementos VAST

        // Reinicia plugins como contrib-ads y vast
        // if (window.player.vast) {
        //   window.player.vast().dispose();
        // }
      }

      if (companionsStatus.hasAtLeastOneCompanionEnabled) {
        cleanupCompanions();
        //window.dispatchEvent(new Event('loadAds'));
      }
    },
  });

  registerHook({
    target: 'action:video-watch.video.loaded',
    handler: async ({ video }) => {
      if (!companionsStatus.hasAtLeastOneCompanionEnabled) return;

      const channelIsExcluded = video?.pluginData?.armanet?.is_excluded;
      if (channelIsExcluded) return;

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

      console.log('Initializing ads for new video', video.name);

      window.videojs = videojs;
      window.player = player;

      const channelIsExcluded = video?.pluginData?.armanet?.is_excluded;

      //if (channelIsExcluded) return;

      try {
        // await Promise.all([loadContribAds(player), loadArmanetPxl()]);
        await loadArmanetPxl();

        // Limpia el estado de ads si es necesario
      //   if (player.ads && typeof player.ads === 'function') {
      //     console.log('reseteando player.ads')
      //     player.ads.reset(); // Resetea el estado del plugin de ads
      //  }

      //   if (!videojs.getPlugin('ads')) {
      //     videojs.registerPlugin('ads', contribAdsPlugin);
      //     console.log('ads plugin not registred....xxxx-- registrering22222', player.activePlugins_?.ads, player.activePlugins_);
      //   } else {
      //     console.log('ads plugin alreadysiiiii registred....xxxx', player.activePlugins_?.ads);
      //   }

        if (!videojs.getPlugin('ads')) {
          videojs.registerPlugin('ads', contribAdsPlugin);
          console.log('ads plugin not registred....xxxx-- registrering22222', player.activePlugins_?.ads, player.activePlugins_);
        } else {
          console.log('ads plugin alreadysiiiii registred....xxxx', player.activePlugins_?.ads);
        }

        player.ads({
          debug: true,
          liveCuePoints: true,
          stitchedAds: true,
          allowVjsAutoplay: false,
        });



        // if (player.vast) {
        //   player.vast().dispose(); // Limpia configuración anterior
        // }


        // if (typeof player?.ads?.inAdBreak === 'function') {
        //   console.log('action:video-watch.player.loaded inAdBreak?', player?.ads?.inAdBreak());
        //   if (player.ads.inAdBreak()) {
        //     player.ads.endLinearAdMode();
        //     //window.player.ads.disableNextSnapshotRestore = true;
        //   }
        // }




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

          const vastSettings = await createVastSettings(
            pluginSettings,
            Armanet,
            channelName,
            channelAdUnit,
            userData,
            videoTags,
            video,
          );
          console.log('VAST settings:', vastSettings);


          // if (player.vast) {
          //   console.log('Disposing existing VAST plugin');
          //   player.vast().dispose();

          // }



          // await buildVastPlayer(vastSettings, player);
          // player.vast(vastSettings);



          // Llama a esta función después de inicializar el reproductor
          //setupPlayerListeners(player);


          const vastPlugin = new videojsxVast.VastPlugin(player, vastSettings);
          console.log('Vast plugin loadedxxxx', vastPlugin);

          /*if (!videojs.getPlugin('vast')) {

            //player.vast().dispose();
          } else {
            console.log('Vast plugin already loadedxxxx', player.activePlugins_?.vast, player.activePlugins_);
            //await buildVastPlayer(vastSettings, player);
          }*/
            //videojs.registerPlugin('vast', vastPlugin);
            if (!videojs.getPlugin('vast')) {
              videojs.registerPlugin('vast', function(options) {
                const player = this;
                // return new videojsxVast.VastPlugin(player, options);
                return new vastPlugin(player, options);
              });
            }

            console.log('Vast plugin loadedxxxx', videojsxVast);

          //player.vast(vastSettings);

          function setupPlayerListeners(player) {
            // Elimina listeners existentes
            player.off('contentchanged');
            player.off('readyforpreroll');
            player.off('adended');
            player.off('ended');

            // Configura listeners nuevamente
            player.on('contentchanged', () => {
              console.log('Content changed, resetting ads');
              player.ads.reset();
            });

            player.on('readyforpreroll', () => {
              console.log('Player ready for preroll');
            });

            player.on('adended', () => {
              console.log('Ad ended, resuming content');
            });

            player.on('ended', () => {
              console.log('Video ended');
            });
          }


          // player.on('readyforpreroll', (e) => {
          //   console.log('Player is ready for preroll', player.ads);
          //   // console.log('Player is ready for preroll', e, player.ads);

          //   player.one('adplaying', function(e) {
          //     console.log('readyforpreroll>>adplaying', player.ads);
          //   });

          //   player.one('adended', function(e) {
          //     console.log('readyforpreroll>>adended', player.ads);
          //   });

          //   player.one('contentchanged', function() {
          //     console.log('readyforpreroll >> contentchanged', player.ads);
          //   });
          // });


          // player.on('contentchanged', (e) => {
          //   console.log('contentchanged', player.ads);
          //   // console.log('Player is ready for preroll', e, player.ads);

          //   player.one('adplaying', function(e) {
          //     console.log('contentchanged >> adplaying', player.ads);
          //   });

          //   player.one('adended', function(e) {
          //     console.log('contentchanged >> adended', player.ads);
          //   });

          //   player.one('contentchanged', function() {
          //     console.log('contentchanged >> contentchanged', player.ads);
          //   });
          // });


          // player.on("loadstart", function() {
          //   console.log('loadstart', player.ads);
          // });

          // player.on("adloadstart", function() {
          //   //player.ads.contentSrc = player.currentSrc();
          //   console.log('adloadstartd', player.ads);
          // });

          // player.on('contentchanged', function() {
          //   console.log('contentchanged', player.ads);
          // });


          // player.on('contentended', function(e, ...rest) {
          //   console.log('contentended xxxx', player.ads);
          //   // player.currentTime(player.duration());
          // });

          // player.on('readyforpostroll', function() {
          //   console.log('readyforpostroll xxxx', player.ads);

          //   player.one('readyforpostrolladended', function(e) {
          //     console.log('readyforpostroll >>>> readyforpostrolladended', player.ads);
          //     //player.currentTime(player.duration());
          //   });

          //   player.one('ended', function(e) {
          //     console.log('readyforpostroll >>>> ended', player.ads);
          //     // player.currentTime(player.duration());
          //   });

          //   player.one('endLinearAdMode', function(e) {
          //     console.log('readyforpostroll >>>> endLinearAdMode', player.ads);
          //     // player.controlBar.progressControl.dimension('width', '100%')
          //     //player.controlBar.progressControl.seekBar.playProgressBar.width('100%');
          //     // player.currentTime(player.duration());
          //   });
          // });

          // player.on('ended', function(e) {
          //   console.log('ended postroll');
          //   console.log('player.duration()', player.duration());
          //   console.log('player.currentTime()', player.currentTime());
          //   //player.currentTime(player.duration());
          // });

          // player.on('AdsDone', function() {
          //   console.log('AdsDone postroll');
          //   //player.currentTime(player.duration());
          // });

          // player.on('adtimeout', (e) => {
          //   console.log('adtimeout', e);
          // });

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
