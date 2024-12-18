var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// client/admin-plugin-client-plugin.js
function register({ registerHook, peertubeHelpers, registerSettingsScript }) {
  handleChannelsList(registerHook, peertubeHelpers, registerSettingsScript);
}
async function handleChannelsList(registerHook, peertubeHelpers, registerSettingsScript) {
  registerHook({
    target: "action:admin-plugin-settings.init",
    handler: async (_a) => {
      var rest = __objRest(_a, []);
      handleSettingsVisibility(registerSettingsScript);
      const multiSelect = document.querySelector(".armanet-multi-select");
      const selectHeader = multiSelect.querySelector(".select-header");
      let selectOptions = multiSelect.querySelector(".select-options");
      const excludedChannelsInput = document.getElementById("armanet-excluded-channels-data");
      selectOptions.innerHTML = `<label><input type="checkbox" value="" />Loading...</label>`;
      const fillExcludedSelect = (channelsList) => {
        let result = "";
        for (const channel of channelsList) {
          const { channelName, channelDisplayName } = channel;
          result += `
            <label>
              <input type="checkbox" value="${channelName}" />
              ${channelName}
              <a href="/video-channels/${channelName}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" stroke-width="2">
                  <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
                  <path d="M11 13l9 -9"></path>
                  <path d="M15 4h5v5"></path>
                </svg>
              </a>
            </label>`;
        }
        selectOptions.innerHTML = result;
        initializeState();
      };
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
      const updateSelected = () => {
        const selectedValues = Array.from(selectOptions.querySelectorAll("input:checked")).map((checkbox) => checkbox.value);
        const selectedText = selectedValues.join(", ");
        selectHeader.textContent = selectedText || "Select Channels";
        excludedChannelsInput.value = selectedText;
        const event = new Event("input", { bubbles: true });
        excludedChannelsInput.dispatchEvent(event);
      };
      selectOptions.addEventListener("change", updateSelected);
      document.addEventListener("click", (event) => {
        if (!multiSelect.contains(event.target)) {
          selectOptions.style.display = "none";
        }
      });
      const tableBody = document.querySelector(".armanet-channels-list tbody");
      const syncChannelsButton = document.querySelector(".armanet-button-sync-channels");
      if (!tableBody)
        return;
      const channelsListEndpoint = peertubeHelpers.getBaseRouterRoute() + "/get-channels";
      const channelsSyncEndpoint = peertubeHelpers.getBaseRouterRoute() + "/sync-channels";
      const channelUnsyncEndpoint = peertubeHelpers.getBaseRouterRoute() + "/unsync-channel";
      const channelSyncSingleEndpoint = peertubeHelpers.getBaseRouterRoute() + "/sync-single-channel";
      try {
        let formatBytes = function(bytes, decimals = 2) {
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
        const chs = await fetch("/api/v1/video-channels?count=100", {
          method: "GET"
        });
        const data = await chs.json();
        const channelsListFetch = await fetch(channelsListEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const channelsList = await channelsListFetch.json();
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
              channelName,
              channelUrl,
              channelDisplayName,
              adUnit,
              actorName,
              channelOwner,
              videoQuota
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
                <td><a href="${channelUrl}">${channelName}</a> <i>(${channelDisplayName})</i></td>
                <td><a href="/a/${channelOwner}">${channelOwner}</a></td>
                <td>${videoQuota === -1 ? "Unlimited" : formatBytes(videoQuota)}</td>
                <td>${status}</td>
                <td>${uuid}</td>
                <td>${actions}</td>
              </tr>`;
          }
          tableBody.innerHTML = newTableContent;
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
export {
  register
};
