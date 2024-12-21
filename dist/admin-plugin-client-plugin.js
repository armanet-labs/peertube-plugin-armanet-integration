// lib/api-service.js
var APIService = class {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async fetchChannels() {
    try {
      const response = await fetch(`${this.baseUrl}/get-channels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching channels:", error);
      throw error;
    }
  }
  async syncChannel(channelName) {
    try {
      const response = await fetch(`${this.baseUrl}/sync-single-channel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelName })
      });
      return await response.json();
    } catch (error) {
      console.error("Error syncing channel:", error);
      throw error;
    }
  }
  async unsyncChannel(channelName, channelUuid) {
    try {
      const response = await fetch(`${this.baseUrl}/unsync-channel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelName, channelUuid })
      });
      return await response.json();
    } catch (error) {
      console.error("Error unsyncing channel:", error);
      throw error;
    }
  }
  async syncAllChannels(channelsData) {
    try {
      const response = await fetch(`${this.baseUrl}/sync-channels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(channelsData)
      });
      return await response.json();
    } catch (error) {
      console.error("Error syncing all channels:", error);
      throw error;
    }
  }
};

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

// lib/admin-ui.js
var AdminUI = class {
  constructor(peertubeHelpers) {
    this.helpers = peertubeHelpers;
    this.itemsPerPage = 3;
    this.notifierDuration = 4e3;
  }
  handleSettingsVisibility(registerSettingsScript) {
    const visibilityRules = {
      "armanet-api-key": {
        dependentSettings: [
          "armanet-channels-list-title",
          "armanet-channels-list-update-button",
          "armanet-channels-list"
        ],
        condition: (value) => value === ""
      },
      "armanet-preroll-enabled": {
        dependentSettings: ["armanet-preroll-adunit"],
        condition: (value) => value === false
      },
      "armanet-midroll-enabled": {
        dependentSettings: [
          "armanet-midroll-adunit",
          "armanet-midroll-min-minutes",
          "armanet-midroll-offset"
        ],
        condition: (value) => value === false
      },
      "armanet-postroll-enabled": {
        dependentSettings: [
          "armanet-postroll-adunit",
          "armanet-postroll-min-minutes"
        ],
        condition: (value) => value === false
      },
      "armanet-companion-video-enabled": {
        dependentSettings: ["armanet-companion-video-adunit"],
        condition: (value) => value === false
      },
      "armanet-companion-sidebar-enabled": {
        dependentSettings: ["armanet-companion-sidebar-adunit"],
        condition: (value) => value === false
      },
      "armanet-skip-time": {
        dependentSettings: [
          "armanet-message-skip-countdown",
          "armanet-message-skip"
        ],
        condition: (value) => value == 0
      }
    };
    registerSettingsScript({
      isSettingHidden: (options) => {
        if (options.setting.name === "armanet-excluded-channels-data")
          return true;
        for (const [key, rule] of Object.entries(visibilityRules)) {
          if (rule.dependentSettings.includes(options.setting.name) && rule.condition(options.formValues[key])) {
            return true;
          }
        }
        return false;
      }
    });
  }
  setupChannelsTable(channelsList, tableBody) {
    if (!tableBody)
      return null;
    tableBody.innerHTML = this.generateTableContent(channelsList);
    return tableBody;
  }
  generateTableContent(channelsList) {
    return channelsList.filter((channel) => {
      var _a;
      return channel.videoQuota === -1 || ((_a = channel.adUnit) == null ? void 0 : _a.uuid);
    }).map((channel) => {
      const hasValidAdUnit = channel.adUnit && channel.adUnit.uuid;
      const status = hasValidAdUnit ? "\u2705 Yes" : "\u274C No";
      const uuid = hasValidAdUnit || "";
      const actions = this.generateActionButton(channel, hasValidAdUnit);
      return `
          <tr>
            <td>${channel.itemNumber}</td>
            <td><a href="${channel.channelUrl}" title="Display Name: ${channel.channelDisplayName}">${channel.channelName}</a></td>
            <td><a href="/a/${channel.channelOwner}">${channel.channelOwner}</a></td>
            <td>${channel.videoQuota === -1 ? "Unlimited" : formatBytes(channel.videoQuota)}</td>
            <td>${status}</td>
            <td>${uuid}</td>
            <td>${actions}</td>
          </tr>`;
    }).join("");
  }
  generateActionButton(channel, hasValidAdUnit) {
    var _a;
    return hasValidAdUnit ? `<div class="armanet-button armanet-button-unsync" data-channel-name="${channel.channelName}" data-channel-uuid="${(_a = channel.adUnit) == null ? void 0 : _a.uuid}">
          Unsync
        </div>` : `<div class="armanet-button armanet-button-sync-single" data-channel-name="${channel.channelName}">
          Sync
        </div>`;
  }
  setupPaginatorTemplate(paginationHolder) {
    paginationHolder.innerHTML = `
      <div class="p-paginator-bottom p-paginator p-component armanet-p-paginator">
        <span class="p-paginator-current armanet-p-paginator-current">Displaying 00 - 00 of 00 channels.</span>
        <button type="button" class="p-element p-paginator-first p-paginator-element p-link">
          <div class="p-element p-icon-wrapper">${drawIcon("first", 14, 14, "p-paginator-icon")}</div>
        </button>
        <button type="button" class="p-element p-paginator-prev p-paginator-element p-link">
          <div class="p-element p-icon-wrapper">${drawIcon("prev", 14, 14, "p-paginator-icon")}</div>
        </button>
        <span class="p-paginator-pages">
          <button type="button" class="p-element p-paginator-page p-paginator-element p-link p-highlight">1</button>
        </span>
        <button type="button" class="p-element p-paginator-next p-paginator-element p-link">
          <div class="p-element p-icon-wrapper">${drawIcon("next", 14, 14, "p-paginator-icon")}</div>
        </button>
        <button type="button" class="p-element p-paginator-last p-paginator-element p-link">
          <div class="p-element p-icon-wrapper">${drawIcon("last", 14, 14, "p-paginator-icon")}</div>
        </button>
      </div>
    `;
  }
  setupChannelsDropdown() {
    this.multiSelect = document.querySelector(".armanet-multi-select");
    if (!this.multiSelect)
      return null;
    this.selectHeader = this.multiSelect.querySelector(".select-header");
    this.selectOptions = this.multiSelect.querySelector(".select-options");
    this.excludedChannelsInput = document.getElementById("armanet-excluded-channels-data");
    this.selectOptions.innerHTML = `<label><input type="checkbox" value="" />Loading...</label>`;
    this.setupDropdownEvents();
    return this.fillDropdownOptions.bind(this);
  }
  initializeDropdownState() {
    const initialValue = this.excludedChannelsInput.value;
    const selectedValues = initialValue.split(",").map((val) => val.trim());
    this.selectHeader.textContent = selectedValues.length ? selectedValues.join(", ") : "Select Channels";
    this.selectOptions.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = selectedValues.includes(checkbox.value);
    });
  }
  setupDropdownEvents() {
    this.selectHeader.addEventListener("click", () => {
      const isVisible = this.selectOptions.style.display === "block";
      this.selectOptions.style.display = isVisible ? "none" : "block";
    });
    this.selectOptions.addEventListener("change", () => {
      const selectedValues = Array.from(this.selectOptions.querySelectorAll("input:checked")).map((checkbox) => checkbox.value);
      const selectedText = selectedValues.join(", ");
      this.selectHeader.textContent = selectedText || "Select Channels";
      this.excludedChannelsInput.value = selectedText;
      this.excludedChannelsInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
    document.addEventListener("click", (event) => {
      if (!this.multiSelect.contains(event.target)) {
        this.selectOptions.style.display = "none";
      }
    });
  }
  fillDropdownOptions(channelsList) {
    if (!this.selectOptions)
      return;
    this.selectOptions.innerHTML = channelsList.map((channel) => `
      <label>
        <input type="checkbox" value="${channel.channelName}" />
        ${channel.channelName}
        <a href="/video-channels/${channel.channelName}" target="_blank" title="View Channel">
          ${drawIcon("external", 16, 24)}
        </a>
      </label>
    `).join("");
    this.initializeDropdownState();
  }
  setupPagination(channelsList, tableBody, paginationHolder) {
    const paginator = new Paginator(channelsList.length, this.itemsPerPage, tableBody, paginationHolder);
    paginator.init();
    return paginator;
  }
  renderSuccessNotification(message) {
    this.renderNotification(message, "success");
  }
  renderErrorNotification(message) {
    this.renderNotification(message, "error");
  }
  renderNotification(message, type) {
    this.helpers.notifier[type](message, "Armanet Plugin", this.notifierDuration);
  }
};
var Paginator = class {
  constructor(totalItems, itemsPerPage, tableBody, paginationHolder) {
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
    this.tableBody = tableBody;
    this.paginationHolder = paginationHolder;
  }
  init() {
    this.setupEventListeners();
    this.showPage(1);
  }
  setupEventListeners() {
    this.paginationHolder.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("p-paginator-first")) {
          this.currentPage = 1;
        } else if (button.classList.contains("p-paginator-prev")) {
          this.currentPage = Math.max(1, this.currentPage - 1);
        } else if (button.classList.contains("p-paginator-next")) {
          this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
        } else if (button.classList.contains("p-paginator-last")) {
          this.currentPage = this.totalPages;
        }
        this.showPage(this.currentPage);
      });
    });
  }
  showPage(page) {
    const rows = this.tableBody.querySelectorAll("tr");
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    rows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "" : "none";
    });
    this.updateButtonsState(page);
    this.updatePagesDisplay(page);
    this.updateCounter(page);
  }
  updateButtonsState(page) {
    const firstButton = this.paginationHolder.querySelector(".p-paginator-first");
    const prevButton = this.paginationHolder.querySelector(".p-paginator-prev");
    const nextButton = this.paginationHolder.querySelector(".p-paginator-next");
    const lastButton = this.paginationHolder.querySelector(".p-paginator-last");
    firstButton.disabled = page === 1;
    prevButton.disabled = page === 1;
    nextButton.disabled = page === this.totalPages;
    lastButton.disabled = page === this.totalPages;
  }
  updatePagesDisplay(currentPage) {
    const pagesContainer = this.paginationHolder.querySelector(".p-paginator-pages");
    pagesContainer.innerHTML = "";
    for (let i = 1; i <= this.totalPages; i++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `p-ripple p-element p-paginator-page p-paginator-element p-link${i === currentPage ? " p-highlight" : ""}`;
      button.textContent = i;
      button.addEventListener("click", () => this.showPage(i));
      pagesContainer.appendChild(button);
    }
  }
  updateCounter(page) {
    const currentCounter = this.paginationHolder.querySelector(".p-paginator-current");
    const startCount = (page - 1) * this.itemsPerPage + 1;
    const endCount = Math.min(page * this.itemsPerPage, this.totalItems);
    currentCounter.textContent = `Displaying ${startCount} - ${endCount} of ${this.totalItems} channels.`;
  }
};

// client/admin-plugin-client-plugin.js
function register({ registerHook, peertubeHelpers, registerSettingsScript }) {
  handleChannelsList(registerHook, peertubeHelpers, registerSettingsScript);
}
async function handleChannelsList(registerHook, peertubeHelpers, registerSettingsScript) {
  registerHook({
    target: "action:admin-plugin-settings.init",
    handler: async () => {
      const adminUI = new AdminUI(peertubeHelpers);
      adminUI.handleSettingsVisibility(registerSettingsScript);
      const tableBody = document.querySelector(".armanet-channels-list tbody");
      const paginationHolder = document.querySelector(".armanet-channels-list-pagination");
      const syncChannelsButton = document.querySelector(".armanet-button-sync-channels");
      if (!tableBody)
        return;
      const pluginBaseUrl = peertubeHelpers.getBaseRouterRoute();
      const apiService = new APIService(pluginBaseUrl);
      try {
        const channelsList = await apiService.fetchChannels();
        const fillExcludedSelect = adminUI.setupChannelsDropdown();
        fillExcludedSelect(channelsList);
        const unsyncedChannels = channelsList.filter((item) => item.adUnit === null).length;
        if (unsyncedChannels == 0 && syncChannelsButton) {
          syncChannelsButton.style.display = "none";
        }
        if (channelsList) {
          adminUI.setupChannelsTable(channelsList, tableBody);
          adminUI.setupPaginatorTemplate(paginationHolder);
          adminUI.setupPagination(channelsList, tableBody, paginationHolder);
          tableBody.addEventListener("click", async (e) => {
            const unsyncButton = e.target.closest(".armanet-button-unsync");
            const syncSingleButton = e.target.closest(".armanet-button-sync-single");
            if (syncSingleButton) {
              const channelName = syncSingleButton.dataset.channelName;
              try {
                syncSingleButton.style.backgroundColor = "#8c8c8c";
                syncSingleButton.style.pointerEvents = "none";
                syncSingleButton.textContent = "Syncing...";
                const response = await apiService.syncChannel(channelName);
                syncSingleButton.textContent = "Synced";
                const row = e.target.parentElement.parentElement;
                const tdStatus = row.children[4];
                tdStatus.textContent = "\u2705 Yes";
                const tdUuid = row.children[5];
                tdUuid.textContent = response == null ? void 0 : response.uuid;
                adminUI.renderSuccessNotification(`Channel ${channelName} synced successfully`);
              } catch (error) {
                console.error("Error syncing channel:", error);
                syncSingleButton.textContent = "Sync";
                adminUI.renderErrorNotification(`Failed to sync channel ${channelName}`);
              }
            }
            if (unsyncButton) {
              const channelName = unsyncButton.dataset.channelName;
              const channelUuid = unsyncButton.dataset.channelUuid;
              try {
                unsyncButton.style.pointerEvents = "none";
                unsyncButton.style.backgroundColor = "#8c8c8c";
                unsyncButton.textContent = "Unsyncing...";
                const response = await apiService.unsyncChannel(channelName, channelUuid);
                unsyncButton.textContent = "Unsynced";
                const row = e.target.parentElement.parentElement;
                const tdStatus = row.children[4];
                tdStatus.textContent = "\u274C No";
                const tdUuid = row.children[5];
                tdUuid.textContent = "";
                adminUI.renderSuccessNotification(`Channel ${channelName} unsynced successfully`);
              } catch (error) {
                unsyncButton.textContent = "Unsync";
                console.error("Error unsyncing channel:", error);
                adminUI.renderErrorNotification(`Failed to unsync channel ${channelName}`);
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
              await syncChannels(channelsList);
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
        const syncChannels = async (channelsData) => {
          const response = await apiService.syncAllChannels(channelsData);
          if (response) {
            adminUI.renderSuccessNotification(`${response.syncCount} channels successfully synchronized`);
            if (response.errorData.length > 0) {
              adminUI.renderErrorNotification(`Failed to sync ${response.errorData.length} channels`);
            }
          } else {
            adminUI.renderErrorNotification(`Could not sync channels`);
            console.error("could not sync channels");
          }
        };
      } catch (err) {
        console.error("error attempting to fetch channels", err);
      }
    }
  });
}
export {
  register
};
