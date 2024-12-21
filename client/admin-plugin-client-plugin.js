import { APIService } from '../lib/api-service.js';
import { AdminUI } from '../lib/admin-ui.js';

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
    handler: async () => {
      const adminUI = new AdminUI(peertubeHelpers);

      adminUI.handleSettingsVisibility(registerSettingsScript);

      const tableBody = document.querySelector('.armanet-channels-list tbody');
      const paginationHolder = document.querySelector(
        '.armanet-channels-list-pagination',
      );
      const syncChannelsButton = document.querySelector(
        '.armanet-button-sync-channels',
      );

      if (!tableBody) return;

      const pluginBaseUrl = peertubeHelpers.getBaseRouterRoute();
      const apiService = new APIService(pluginBaseUrl);

      try {
        const channelsList = await apiService.fetchChannels();

        const fillExcludedSelect = adminUI.setupChannelsDropdown();
        fillExcludedSelect(channelsList);

        const unsyncedChannels = channelsList.filter(
          (item) => item.adUnit === null,
        ).length;

        if (unsyncedChannels == 0 && syncChannelsButton) {
          syncChannelsButton.style.display = 'none';
        }

        if (channelsList) {
          adminUI.setupChannelsTable(channelsList, tableBody);
          adminUI.setupPaginatorTemplate(paginationHolder);
          adminUI.setupPagination(channelsList, tableBody, paginationHolder);

          tableBody.addEventListener('click', async (e) => {
            const unsyncButton = e.target.closest('.armanet-button-unsync');
            const syncSingleButton = e.target.closest(
              '.armanet-button-sync-single',
            );

            if (syncSingleButton) {
              const channelName = syncSingleButton.dataset.channelName;

              try {
                syncSingleButton.style.backgroundColor = '#8c8c8c';
                syncSingleButton.style.pointerEvents = 'none';
                syncSingleButton.textContent = 'Syncing...';

                const response = await apiService.syncChannel(channelName);

                syncSingleButton.textContent = 'Synced';

                const row = e.target.parentElement.parentElement;
                const tdStatus = row.children[4];
                tdStatus.textContent = '✅ Yes';
                const tdUuid = row.children[5];
                tdUuid.textContent = response?.uuid;

                adminUI.renderSuccessNotification(
                  `Channel ${channelName} synced successfully`,
                );
              } catch (error) {
                console.error('Error syncing channel:', error);
                syncSingleButton.textContent = 'Sync';
                adminUI.renderErrorNotification(
                  `Failed to sync channel ${channelName}`,
                );
              }
            }

            if (unsyncButton) {
              const channelName = unsyncButton.dataset.channelName;
              const channelUuid = unsyncButton.dataset.channelUuid;

              try {
                unsyncButton.style.pointerEvents = 'none';
                unsyncButton.style.backgroundColor = '#8c8c8c';
                unsyncButton.textContent = 'Unsyncing...';

                const response = await apiService.unsyncChannel(
                  channelName,
                  channelUuid,
                );

                unsyncButton.textContent = 'Unsynced';

                const row = e.target.parentElement.parentElement;
                const tdStatus = row.children[4];
                tdStatus.textContent = '❌ No';
                const tdUuid = row.children[5];
                tdUuid.textContent = '';

                adminUI.renderSuccessNotification(
                  `Channel ${channelName} unsynced successfully`,
                );
              } catch (error) {
                unsyncButton.textContent = 'Unsync';
                console.error('Error unsyncing channel:', error);
                adminUI.renderErrorNotification(
                  `Failed to unsync channel ${channelName}`,
                );
              }
            }
          });

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
              await syncChannels(channelsList);

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

        const syncChannels = async (channelsData) => {
          const response = await apiService.syncAllChannels(channelsData);

          if (response) {
            adminUI.renderSuccessNotification(
              `${response.syncCount} channels successfully synchronized`,
            );

            if (response.errorData.length > 0) {
              adminUI.renderErrorNotification(
                `Failed to sync ${response.errorData.length} channels`,
              );
            }
          } else {
            adminUI.renderErrorNotification(`Could not sync channels`);
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
