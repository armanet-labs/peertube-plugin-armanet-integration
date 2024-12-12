function register({ registerHook, peertubeHelpers, registerSettingsScript }) {
  handleChannelsList(registerHook, peertubeHelpers, registerSettingsScript);
}

async function handleChannelsList(
  registerHook,
  peertubeHelpers,
  registerSettingsScript,
) {
  registerHook({
    target: 'action:admin-plugin-settings.init',
    handler: async ({ ...rest }) => {
      handleSettingsVisibility(registerSettingsScript);

      const tableBody = document.querySelector('.armanet-channels-list tbody');
      const syncChannelsButton = document.querySelector(
        '.armanet-button-sync-channels',
      );

      if (!tableBody) return;

      const channelsListEndpoint =
        peertubeHelpers.getBaseRouterRoute() + '/get-channels';
      const channelsSyncEndpoint =
        peertubeHelpers.getBaseRouterRoute() + '/sync-channels';
      try {
        const chs = await fetch('/api/v1/video-channels?count=100', {
          method: 'GET',
        });
        const data = await chs.json();

        const channelsListFetch = await fetch(channelsListEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const channelsList = await channelsListFetch.json();

        const unsyncedChannels = channelsList.filter(
          (item) => item.adUnit === null,
        ).length;

        if (unsyncedChannels == 0 && syncChannelsButton) {
          syncChannelsButton.style.display = 'none';
        }

        if (channelsList) {
          tableBody.innerHTML = '';
          let newTableContent = '';

          for (const channel of channelsList) {
            const { channelName, channelUrl, channelDisplayName, adUnit } =
              channel;
            const status = adUnit !== null ? '✅ Yes' : '❌ No';
            const uuid = adUnit?.uuid || '';
            newTableContent += `
              <tr>
                <td><a href="${channelUrl}">${channelName}</a> <i>(${channelDisplayName})</i></td>
                <td>${status}</td>
                <td>${uuid}</td>
              </tr>`;
          }

          tableBody.innerHTML = newTableContent;

          if (syncChannelsButton && unsyncedChannels > 0) {
            const submitButton = document.querySelector('input[type="submit"]');

            const handleSyncClick = async () => {
              syncChannelsButton.removeEventListener('click', handleSyncClick);

              syncChannelsButton.innerHTML =
                'Synchronizing channels, please wait a moment...';
              syncChannelsButton.style.backgroundColor = '#8c8c8c';
              if (submitButton) {
                submitButton.disabled = true;
              }
              await syncChannels(channelsSyncEndpoint, channelsList);

              syncChannelsButton.innerHTML =
                'Sync channels with Armanet Ad Units';
              syncChannelsButton.style.backgroundColor = '#8c8c8c';
              if (submitButton) {
                submitButton.disabled = false;
              }
              syncChannelsButton.addEventListener('click', handleSyncClick);
            };

            syncChannelsButton.addEventListener('click', handleSyncClick);
          }
        } else {
          console.error('No channel data found in storageManager.');
        }

        const syncChannels = async (channelsListEndpoint, channelsData) => {
          const syncFecth = await fetch(channelsListEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(channelsData),
          });

          const syncResponse = await syncFecth.json();

          if (syncResponse) {
            peertubeHelpers.notifier.success(
              `${syncResponse.syncCount} channels successfully synchronized`,
              'Channels Sync',
              7000,
            );

            if (syncResponse.errorData.length > 0) {
              peertubeHelpers.notifier.error(
                `Failed to sync ${syncResponse.errorData.length} channels`,
                'Channels Sync',
                7000,
              );
            }
          } else {
            peertubeHelpers.notifier.error(
              'could not sync channels',
              'Channels Sync',
              7000,
            );
            console.error('could not sync channels');
          }
        };
      } catch (err) {
        console.error('error attempting to fetch channels', err);
      }
    },
  });
}

export { register };

function handleSettingsVisibility(registerSettingsScript) {
  registerSettingsScript({
    isSettingHidden: (options) => {
      if (
        options.setting.name === 'armanet-channels-list-title' &&
        options.formValues['armanet-api-key'] === ''
      ) {
        return true;
      }
      if (
        options.setting.name === 'armanet-channels-list-update-button' &&
        options.formValues['armanet-api-key'] === ''
      ) {
        return true;
      }
      if (
        options.setting.name === 'armanet-channels-list' &&
        options.formValues['armanet-api-key'] === ''
      ) {
        return true;
      }

      if (
        options.setting.name === 'armanet-preroll-adunit' &&
        options.formValues['armanet-preroll-enabled'] === false
      ) {
        return true;
      }

      if (
        options.setting.name === 'armanet-midroll-adunit' &&
        options.formValues['armanet-midroll-enabled'] === false
      ) {
        return true;
      }
      if (
        options.setting.name === 'armanet-midroll-min-minutes' &&
        options.formValues['armanet-midroll-enabled'] === false
      ) {
        return true;
      }
      if (
        options.setting.name === 'armanet-midroll-offset' &&
        options.formValues['armanet-midroll-enabled'] === false
      ) {
        return true;
      }

      if (
        options.setting.name === 'armanet-postroll-adunit' &&
        options.formValues['armanet-postroll-enabled'] === false
      ) {
        return true;
      }
      if (
        options.setting.name === 'armanet-postroll-min-minutes' &&
        options.formValues['armanet-postroll-enabled'] === false
      ) {
        return true;
      }

      if (
        options.setting.name === 'armanet-companion-video-adunit' &&
        options.formValues['armanet-companion-video-enabled'] === false
      ) {
        return true;
      }
      if (
        options.setting.name === 'armanet-companion-sidebar-adunit' &&
        options.formValues['armanet-companion-sidebar-enabled'] === false
      ) {
        return true;
      }

      if (
        options.setting.name === 'armanet-message-skip-countdown' &&
        options.formValues['armanet-skip-time'] == 0
      ) {
        return true;
      }
      if (
        options.setting.name === 'armanet-message-skip' &&
        options.formValues['armanet-skip-time'] == 0
      ) {
        return true;
      }

      return false;
    },
  });
}
