import {
  formatBytes,
  drawIcon,
} from '../lib/shared.js';

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
      handleSettingsVisibility(registerSettingsScript);

      const fillExcludedSelect = handleChannelsDropdown();

      const tableBody = document.querySelector('.armanet-channels-list tbody');
      const paginationHolder = document.querySelector('.armanet-channels-list-pagination');
      const syncChannelsButton = document.querySelector('.armanet-button-sync-channels');

      if (!tableBody) return;

      const pluginBaseUrl = peertubeHelpers.getBaseRouterRoute();
      const channelsListEndpoint = pluginBaseUrl + '/get-channels';
      const channelsSyncEndpoint = pluginBaseUrl + '/sync-channels';
      const channelUnsyncEndpoint = pluginBaseUrl + '/unsync-channel';
      const channelSyncSingleEndpoint = pluginBaseUrl + '/sync-single-channel';

      try {
        const channelsListFetch = await fetch(channelsListEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const channelsList = await channelsListFetch.json();
        console.log('xxxxchannelsList', channelsList);
        fillExcludedSelect(channelsList);

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
            const {
              itemNumber,
              channelName,
              channelUrl,
              channelDisplayName,
              adUnit,
              videoQuota,
              channelOwner,
            } = channel;

            if (videoQuota !== -1 && !adUnit?.uuid) {
              continue;
            }

            const hasValidAdUnit = adUnit && adUnit.uuid;
            const status = hasValidAdUnit ? '✅ Yes' : '❌ No';
            const uuid = hasValidAdUnit || '';

            const actions = hasValidAdUnit
              ? `<div class="armanet-button armanet-button-unsync" data-channel-name="${channelName}" data-channel-uuid="${uuid}">
                 Unsync
                </div>`
              : `<div class="armanet-button armanet-button-sync-single" data-channel-name="${channelName}">
                  Sync
                </div>`;
            newTableContent += `
              <tr>
                <td>${itemNumber}</td>
                <td><a href="${channelUrl}" title="Display Name: ${channelDisplayName}">${channelName}</a></td>
                <td><a href="/a/${channelOwner}">${channelOwner}</a></td>
                <td>${videoQuota === -1 ? 'Unlimited' : formatBytes(videoQuota)}</td>
                <td>${status}</td>
                <td>${uuid}</td>
                <td>${actions}</td>
              </tr>`;
          }

          tableBody.innerHTML = newTableContent;

          paginationHolder.innerHTML = `
            <div class="p-paginator-bottom p-paginator p-component armanet-p-paginator">

              <span class="p-paginator-current armanet-p-paginator-current">
                0 - 0 of 0 x
              </span>

              <button type="button" class="p-element p-paginator-first p-paginator-element p-link">
                <div class="p-element p-icon-wrapper">${drawIcon('first', 14, 14, 'p-paginator-icon')}</div>
              </button>

              <button type="button" class="p-element p-paginator-prev p-paginator-element p-link">
                <div class="p-element p-icon-wrapper">${drawIcon('prev', 14, 14, 'p-paginator-icon')}</div>
              </button>

              <span class="p-paginator-pages">
                <button type="button" class="p-element p-paginator-page p-paginator-element p-link p-highlight"> 1 </button>
              </span>

              <button type="button" class="p-element p-paginator-next p-paginator-element p-link">
                <div class="p-element p-icon-wrapper">${drawIcon('next', 14, 14, 'p-paginator-icon')}</div>
              </button>

              <button type="button" class="p-element p-paginator-last p-paginator-element p-link">
                <div class="p-element p-icon-wrapper">${drawIcon('last', 14, 14, 'p-paginator-icon')}</div>
              </button>
            </div>
          `;

          handlePagination(channelsList, tableBody, paginationHolder, 3);

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

                const channelSyncSingleFetch = await fetch(
                  channelSyncSingleEndpoint,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ channelName: channelName }),
                  },
                );
                const channelSyncSingleFetchResponse =
                  await channelSyncSingleFetch.json();

                syncSingleButton.textContent = 'Synced';

                const row = e.target.parentElement.parentElement;
                const tdStatus = row.children[3];
                tdStatus.textContent = '✅ Yes';
                const tdUuid = row.children[4];
                tdUuid.textContent = channelSyncSingleFetchResponse?.uuid;

                peertubeHelpers.notifier.success(
                  `Channel ${channelName} synced successfully`,
                  'Channel Sync',
                  7000,
                );
              } catch (error) {
                console.error('Error syncing channel:', error);
                syncSingleButton.textContent = 'Sync';
                peertubeHelpers.notifier.error(
                  `Failed to sync channel ${channelName}`,
                  'Channel Sync',
                  7000,
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

                const channelUnsyncFetch = await fetch(channelUnsyncEndpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    channelName: channelName,
                    channelUuid: channelUuid,
                  }),
                });
                const channelUnsyncFetchResponse =
                  await channelUnsyncFetch.json();

                unsyncButton.textContent = 'Unsynced';

                const row = e.target.parentElement.parentElement;
                const tdStatus = row.children[3];
                tdStatus.textContent = '❌ No';
                const tdUuid = row.children[4];
                tdUuid.textContent = '';

                peertubeHelpers.notifier.success(
                  `Channel ${channelName} unsynced successfully`,
                  'Channel Unsync',
                  7000,
                );
              } catch (error) {
                unsyncButton.textContent = 'Unsync';
                console.error('Error unsyncing channel:', error);
                peertubeHelpers.notifier.error(
                  `Failed to unsync channel ${channelName}`,
                  'Channel Unsync',
                  7000,
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

        const syncChannels = async (channelsSyncEndpoint, channelsData) => {
          console.log('trying to sync', channelsData);
          const syncFecth = await fetch(channelsSyncEndpoint, {
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
      if (options.setting.name === 'armanet-excluded-channels-data') {
        return true;
      }

      return false;
    },
  });
}

function handleChannelsDropdown() {
  const multiSelect = document.querySelector('.armanet-multi-select');
  const selectHeader = multiSelect.querySelector('.select-header');
  let selectOptions = multiSelect.querySelector('.select-options');
  const excludedChannelsInput = document.getElementById('armanet-excluded-channels-data');

  selectOptions.innerHTML = `<label><input type="checkbox" value="" />Loading...</label>`;

  const initializeState = () => {
    const initialValue = excludedChannelsInput.value;
    const selectedValues = initialValue.split(',').map((val) => val.trim());

    selectHeader.textContent = selectedValues.length
      ? selectedValues.join(', ')
      : 'Select Channels';

    selectOptions
      .querySelectorAll("input[type='checkbox']")
      .forEach((checkbox) => {
        checkbox.checked = selectedValues.includes(checkbox.value);
      });
  };

  selectHeader.addEventListener('click', () => {
    const isVisible = selectOptions.style.display === 'block';
    selectOptions.style.display = isVisible ? 'none' : 'block';
  });

  selectOptions.addEventListener('change', () => {
    const selectedValues = Array.from(
      selectOptions.querySelectorAll('input:checked'),
    ).map((checkbox) => checkbox.value);
    const selectedText = selectedValues.join(', ');
    selectHeader.textContent = selectedText || 'Select Channels';
    excludedChannelsInput.value = selectedText;

    const event = new Event('input', { bubbles: true });
    excludedChannelsInput.dispatchEvent(event);
  });

  document.addEventListener('click', (event) => {
    if (!multiSelect.contains(event.target)) {
      selectOptions.style.display = 'none';
    }
  });

  return (channelsList) => {
    let result = '';
    for (const channel of channelsList) {
      const { channelName, channelDisplayName } = channel;
      result += `
        <label>
          <input type="checkbox" value="${channelName}" />
          ${channelName}
          <a href="/video-channels/${channelName}" target="_blank" title="View Channel">
            ${drawIcon('external', 16, 24)}
          </a>
        </label>`;
    }
    selectOptions.innerHTML = result;

    initializeState();
  };
}

function handlePagination(channelsList, tableBody, paginationHolder, itemsPerPage = 3) {
  const totalItems = channelsList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let currentPage = 1;

  function showPage(page) {
    const rows = tableBody.querySelectorAll('tr');
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    rows.forEach((row, index) => {
      row.style.display = (index >= start && index < end) ? '' : 'none';
    });

    // Update buttons state
    const firstButton = paginationHolder.querySelector('.p-paginator-first');
    const prevButton = paginationHolder.querySelector('.p-paginator-prev');
    const nextButton = paginationHolder.querySelector('.p-paginator-next');
    const lastButton = paginationHolder.querySelector('.p-paginator-last');

    firstButton.disabled = page === 1;
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;
    lastButton.disabled = page === totalPages;

    // Update numeric pages
    const pagesContainer = paginationHolder.querySelector('.p-paginator-pages');
    pagesContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `p-ripple p-element p-paginator-page p-paginator-element p-link${i === page ? ' p-highlight' : ''}`;
      button.textContent = i;
      button.addEventListener('click', () => {
        currentPage = i;
        showPage(currentPage);
      });
      pagesContainer.appendChild(button);
    }

    // Update counter
    const currentCounter = paginationHolder.querySelector('.p-paginator-current');
    const startCount = (page - 1) * itemsPerPage + 1;
    const endCount = Math.min(page * itemsPerPage, totalItems);
    currentCounter.textContent = `${startCount} - ${endCount} of ${totalItems}`;
  }

  // Event listeners
  paginationHolder.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.classList.contains('p-paginator-first')) {
        currentPage = 1;
      } else if (button.classList.contains('p-paginator-prev')) {
        currentPage = Math.max(1, currentPage - 1);
      } else if (button.classList.contains('p-paginator-next')) {
        currentPage = Math.min(totalPages, currentPage + 1);
      } else if (button.classList.contains('p-paginator-last')) {
        currentPage = totalPages;
      }
      showPage(currentPage);
    });
  });

  // Show first page
  showPage(1);
}
