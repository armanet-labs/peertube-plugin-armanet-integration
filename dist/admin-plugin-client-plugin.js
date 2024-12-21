// lib/shared.js
var formatBytes = (bytes, decimals = 2) => {
  if (bytes === -1)
    return "Unlimited";
  if (bytes === 0)
    return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
var drawIcon = (iconType, size = 14, viewBox = 14, className = "") => {
  const ICONS = {
    first: {
      path: `<path fill="currentColor" fill-rule="evenodd" d="M5.716 11.164q.139.058.29.057c.196.01.388-.06.534-.192a.757.757 0 0 0 0-1.069L3.514 6.934 6.54 3.91a.756.756 0 0 0-1.069-1.01l-3.5 3.5a.756.756 0 0 0 0 1.07l3.5 3.53q.106.107.245.165m5.333-.195c.129.147.31.237.504.252a.756.756 0 0 0 .504-1.26L9.032 6.933l3.025-3.025a.757.757 0 0 0-1.008-1.01l-3.53 3.47a.756.756 0 0 0 0 1.07z" clip-rule="evenodd"/>`
    },
    prev: {
      path: `<path fill="currentColor" d="M8.75 11.185a.74.74 0 0 1-.53-.22l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.47a.75.75 0 0 1 1.06 1l-3 3 3 3a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.19"/>`
    },
    next: {
      path: `<path fill="currentColor" d="M5.25 11.173a.74.74 0 0 1-.53-.25.75.75 0 0 1 0-1.06l3-3-3-3a.75.75 0 0 1 1.06-.94l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.44a.74.74 0 0 1-.53.25"/>`
    },
    last: {
      path: `<path fill="currentColor" fill-rule="evenodd" d="M7.688 11.145c.091.038.19.057.288.057a.74.74 0 0 0 .533-.252l3.52-3.46a.754.754 0 0 0 0-1.065l-3.52-3.52a.754.754 0 0 0-1.066.975l3.018 3.017-3.018 3.018a.754.754 0 0 0 .245 1.23m-5.746-.194a.74.74 0 0 0 .503.25.74.74 0 0 0 .503-.25l3.52-3.46a.754.754 0 0 0 0-1.066l-3.52-3.52A.754.754 0 0 0 1.942 3.91L4.96 6.928 1.942 9.945a.754.754 0 0 0 0 1.005" clip-rule="evenodd"/>`
    },
    external: {
      path: `
        <path fill="currentColor" d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1"/>
        <path fill="currentColor" d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2"/>
      `
    }
  };
  if (!ICONS[iconType]) {
    return "";
  }
  return `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      viewBox="0 0 ${viewBox} ${viewBox}"
      fill="none"
      aria-hidden="true"
      class="p-icon ${className}"
    >
      ${ICONS[iconType].path}
    </svg>
  `;
};

// client/admin-plugin-client-plugin.js
function register({ registerHook, peertubeHelpers, registerSettingsScript }) {
  handleChannelsList(registerHook, peertubeHelpers, registerSettingsScript);
}
async function handleChannelsList(registerHook, peertubeHelpers, registerSettingsScript) {
  registerHook({
    target: "action:admin-plugin-settings.init",
    handler: async () => {
      handleSettingsVisibility(registerSettingsScript);
      const fillExcludedSelect = handleChannelsDropdown();
      const tableBody = document.querySelector(".armanet-channels-list tbody");
      const paginationHolder = document.querySelector(".armanet-channels-list-pagination");
      const syncChannelsButton = document.querySelector(".armanet-button-sync-channels");
      if (!tableBody)
        return;
      const pluginBaseUrl = peertubeHelpers.getBaseRouterRoute();
      const channelsListEndpoint = pluginBaseUrl + "/get-channels";
      const channelsSyncEndpoint = pluginBaseUrl + "/sync-channels";
      const channelUnsyncEndpoint = pluginBaseUrl + "/unsync-channel";
      const channelSyncSingleEndpoint = pluginBaseUrl + "/sync-single-channel";
      try {
        const channelsListFetch = await fetch(channelsListEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        const channelsList = await channelsListFetch.json();
        console.log("xxxxchannelsList", channelsList);
        fillExcludedSelect(channelsList);
        const unsyncedChannels = channelsList.filter((item) => item.adUnit === null).length;
        if (unsyncedChannels == 0 && syncChannelsButton) {
          syncChannelsButton.style.display = "none";
        }
        if (channelsList) {
          tableBody.innerHTML = "";
          let newTableContent = "";
          for (const channel of channelsList) {
            const {
              itemNumber,
              channelName,
              channelUrl,
              channelDisplayName,
              adUnit,
              videoQuota,
              channelOwner
            } = channel;
            if (videoQuota !== -1 && !(adUnit == null ? void 0 : adUnit.uuid)) {
              continue;
            }
            const hasValidAdUnit = adUnit && adUnit.uuid;
            const status = hasValidAdUnit ? "\u2705 Yes" : "\u274C No";
            const uuid = hasValidAdUnit || "";
            const actions = hasValidAdUnit ? `<div class="armanet-button armanet-button-unsync" data-channel-name="${channelName}" data-channel-uuid="${uuid}">
                 Unsync
                </div>` : `<div class="armanet-button armanet-button-sync-single" data-channel-name="${channelName}">
                  Sync
                </div>`;
            newTableContent += `
              <tr>
                <td>${itemNumber}</td>
                <td><a href="${channelUrl}" title="Display Name: ${channelDisplayName}">${channelName}</a></td>
                <td><a href="/a/${channelOwner}">${channelOwner}</a></td>
                <td>${videoQuota === -1 ? "Unlimited" : formatBytes(videoQuota)}</td>
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
                <div class="p-element p-icon-wrapper">${drawIcon("first", 14, 14, "p-paginator-icon")}</div>
              </button>

              <button type="button" class="p-element p-paginator-prev p-paginator-element p-link">
                <div class="p-element p-icon-wrapper">${drawIcon("prev", 14, 14, "p-paginator-icon")}</div>
              </button>

              <span class="p-paginator-pages">
                <button type="button" class="p-element p-paginator-page p-paginator-element p-link p-highlight"> 1 </button>
              </span>

              <button type="button" class="p-element p-paginator-next p-paginator-element p-link">
                <div class="p-element p-icon-wrapper">${drawIcon("next", 14, 14, "p-paginator-icon")}</div>
              </button>

              <button type="button" class="p-element p-paginator-last p-paginator-element p-link">
                <div class="p-element p-icon-wrapper">${drawIcon("last", 14, 14, "p-paginator-icon")}</div>
              </button>
            </div>
          `;
          handlePagination(channelsList, tableBody, paginationHolder, 3);
          tableBody.addEventListener("click", async (e) => {
            const unsyncButton = e.target.closest(".armanet-button-unsync");
            const syncSingleButton = e.target.closest(".armanet-button-sync-single");
            if (syncSingleButton) {
              const channelName = syncSingleButton.dataset.channelName;
              try {
                syncSingleButton.style.backgroundColor = "#8c8c8c";
                syncSingleButton.style.pointerEvents = "none";
                syncSingleButton.textContent = "Syncing...";
                const channelSyncSingleFetch = await fetch(channelSyncSingleEndpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ channelName })
                });
                const channelSyncSingleFetchResponse = await channelSyncSingleFetch.json();
                syncSingleButton.textContent = "Synced";
                const row = e.target.parentElement.parentElement;
                const tdStatus = row.children[3];
                tdStatus.textContent = "\u2705 Yes";
                const tdUuid = row.children[4];
                tdUuid.textContent = channelSyncSingleFetchResponse == null ? void 0 : channelSyncSingleFetchResponse.uuid;
                peertubeHelpers.notifier.success(`Channel ${channelName} synced successfully`, "Channel Sync", 7e3);
              } catch (error) {
                console.error("Error syncing channel:", error);
                syncSingleButton.textContent = "Sync";
                peertubeHelpers.notifier.error(`Failed to sync channel ${channelName}`, "Channel Sync", 7e3);
              }
            }
            if (unsyncButton) {
              const channelName = unsyncButton.dataset.channelName;
              const channelUuid = unsyncButton.dataset.channelUuid;
              try {
                unsyncButton.style.pointerEvents = "none";
                unsyncButton.style.backgroundColor = "#8c8c8c";
                unsyncButton.textContent = "Unsyncing...";
                const channelUnsyncFetch = await fetch(channelUnsyncEndpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    channelName,
                    channelUuid
                  })
                });
                const channelUnsyncFetchResponse = await channelUnsyncFetch.json();
                unsyncButton.textContent = "Unsynced";
                const row = e.target.parentElement.parentElement;
                const tdStatus = row.children[3];
                tdStatus.textContent = "\u274C No";
                const tdUuid = row.children[4];
                tdUuid.textContent = "";
                peertubeHelpers.notifier.success(`Channel ${channelName} unsynced successfully`, "Channel Unsync", 7e3);
              } catch (error) {
                unsyncButton.textContent = "Unsync";
                console.error("Error unsyncing channel:", error);
                peertubeHelpers.notifier.error(`Failed to unsync channel ${channelName}`, "Channel Unsync", 7e3);
              }
            }
          });
          if (syncChannelsButton && unsyncedChannels > 0) {
            const submitButton = document.querySelector('input[type="submit"]');
            const handleSyncClick = async () => {
              syncChannelsButton.removeEventListener("click", handleSyncClick);
              syncChannelsButton.innerHTML = "Synchronizing channels, please wait a moment...";
              syncChannelsButton.style.backgroundColor = "#8c8c8c";
              if (submitButton) {
                submitButton.disabled = true;
              }
              await syncChannels(channelsSyncEndpoint, channelsList);
              syncChannelsButton.innerHTML = "Sync channels with Armanet Ad Units";
              syncChannelsButton.style.backgroundColor = "#8c8c8c";
              if (submitButton) {
                submitButton.disabled = false;
              }
              syncChannelsButton.addEventListener("click", handleSyncClick);
            };
            syncChannelsButton.addEventListener("click", handleSyncClick);
          }
        } else {
          console.error("No channel data found in storageManager.");
        }
        const syncChannels = async (channelsSyncEndpoint2, channelsData) => {
          console.log("trying to sync", channelsData);
          const syncFecth = await fetch(channelsSyncEndpoint2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(channelsData)
          });
          const syncResponse = await syncFecth.json();
          if (syncResponse) {
            peertubeHelpers.notifier.success(`${syncResponse.syncCount} channels successfully synchronized`, "Channels Sync", 7e3);
            if (syncResponse.errorData.length > 0) {
              peertubeHelpers.notifier.error(`Failed to sync ${syncResponse.errorData.length} channels`, "Channels Sync", 7e3);
            }
          } else {
            peertubeHelpers.notifier.error("could not sync channels", "Channels Sync", 7e3);
            console.error("could not sync channels");
          }
        };
      } catch (err) {
        console.error("error attempting to fetch channels", err);
      }
    }
  });
}
function handleSettingsVisibility(registerSettingsScript) {
  registerSettingsScript({
    isSettingHidden: (options) => {
      if (options.setting.name === "armanet-channels-list-title" && options.formValues["armanet-api-key"] === "") {
        return true;
      }
      if (options.setting.name === "armanet-channels-list-update-button" && options.formValues["armanet-api-key"] === "") {
        return true;
      }
      if (options.setting.name === "armanet-channels-list" && options.formValues["armanet-api-key"] === "") {
        return true;
      }
      if (options.setting.name === "armanet-preroll-adunit" && options.formValues["armanet-preroll-enabled"] === false) {
        return true;
      }
      if (options.setting.name === "armanet-midroll-adunit" && options.formValues["armanet-midroll-enabled"] === false) {
        return true;
      }
      if (options.setting.name === "armanet-midroll-min-minutes" && options.formValues["armanet-midroll-enabled"] === false) {
        return true;
      }
      if (options.setting.name === "armanet-midroll-offset" && options.formValues["armanet-midroll-enabled"] === false) {
        return true;
      }
      if (options.setting.name === "armanet-postroll-adunit" && options.formValues["armanet-postroll-enabled"] === false) {
        return true;
      }
      if (options.setting.name === "armanet-postroll-min-minutes" && options.formValues["armanet-postroll-enabled"] === false) {
        return true;
      }
      if (options.setting.name === "armanet-companion-video-adunit" && options.formValues["armanet-companion-video-enabled"] === false) {
        return true;
      }
      if (options.setting.name === "armanet-companion-sidebar-adunit" && options.formValues["armanet-companion-sidebar-enabled"] === false) {
        return true;
      }
      if (options.setting.name === "armanet-message-skip-countdown" && options.formValues["armanet-skip-time"] == 0) {
        return true;
      }
      if (options.setting.name === "armanet-message-skip" && options.formValues["armanet-skip-time"] == 0) {
        return true;
      }
      if (options.setting.name === "armanet-excluded-channels-data") {
        return true;
      }
      return false;
    }
  });
}
function handleChannelsDropdown() {
  const multiSelect = document.querySelector(".armanet-multi-select");
  const selectHeader = multiSelect.querySelector(".select-header");
  let selectOptions = multiSelect.querySelector(".select-options");
  const excludedChannelsInput = document.getElementById("armanet-excluded-channels-data");
  selectOptions.innerHTML = `<label><input type="checkbox" value="" />Loading...</label>`;
  const initializeState = () => {
    const initialValue = excludedChannelsInput.value;
    const selectedValues = initialValue.split(",").map((val) => val.trim());
    selectHeader.textContent = selectedValues.length ? selectedValues.join(", ") : "Select Channels";
    selectOptions.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = selectedValues.includes(checkbox.value);
    });
  };
  selectHeader.addEventListener("click", () => {
    const isVisible = selectOptions.style.display === "block";
    selectOptions.style.display = isVisible ? "none" : "block";
  });
  selectOptions.addEventListener("change", () => {
    const selectedValues = Array.from(selectOptions.querySelectorAll("input:checked")).map((checkbox) => checkbox.value);
    const selectedText = selectedValues.join(", ");
    selectHeader.textContent = selectedText || "Select Channels";
    excludedChannelsInput.value = selectedText;
    const event = new Event("input", { bubbles: true });
    excludedChannelsInput.dispatchEvent(event);
  });
  document.addEventListener("click", (event) => {
    if (!multiSelect.contains(event.target)) {
      selectOptions.style.display = "none";
    }
  });
  return (channelsList) => {
    let result = "";
    for (const channel of channelsList) {
      const { channelName, channelDisplayName } = channel;
      result += `
        <label>
          <input type="checkbox" value="${channelName}" />
          ${channelName}
          <a href="/video-channels/${channelName}" target="_blank" title="View Channel">
            ${drawIcon("external", 16, 24)}
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
    const rows = tableBody.querySelectorAll("tr");
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    rows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "" : "none";
    });
    const firstButton = paginationHolder.querySelector(".p-paginator-first");
    const prevButton = paginationHolder.querySelector(".p-paginator-prev");
    const nextButton = paginationHolder.querySelector(".p-paginator-next");
    const lastButton = paginationHolder.querySelector(".p-paginator-last");
    firstButton.disabled = page === 1;
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;
    lastButton.disabled = page === totalPages;
    const pagesContainer = paginationHolder.querySelector(".p-paginator-pages");
    pagesContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `p-ripple p-element p-paginator-page p-paginator-element p-link${i === page ? " p-highlight" : ""}`;
      button.textContent = i;
      button.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
      });
      pagesContainer.appendChild(button);
    }
    const currentCounter = paginationHolder.querySelector(".p-paginator-current");
    const startCount = (page - 1) * itemsPerPage + 1;
    const endCount = Math.min(page * itemsPerPage, totalItems);
    currentCounter.textContent = `${startCount} - ${endCount} of ${totalItems}`;
  }
  paginationHolder.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.classList.contains("p-paginator-first")) {
        currentPage = 1;
      } else if (button.classList.contains("p-paginator-prev")) {
        currentPage = Math.max(1, currentPage - 1);
      } else if (button.classList.contains("p-paginator-next")) {
        currentPage = Math.min(totalPages, currentPage + 1);
      } else if (button.classList.contains("p-paginator-last")) {
        currentPage = totalPages;
      }
      showPage(currentPage);
    });
  });
  showPage(1);
}
export {
  register
};
