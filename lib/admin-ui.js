import { drawIcon, formatBytes } from './shared.js';

export class AdminUI {
  constructor(peertubeHelpers) {
    this.helpers = peertubeHelpers;
    this.itemsPerPage = 3;
    this.notifierDuration = 4000;
  }

  handleSettingsVisibility(registerSettingsScript) {
    const visibilityRules = {
      'armanet-api-key': {
        dependentSettings: [
          'armanet-channels-list-title',
          'armanet-channels-list-update-button',
          'armanet-channels-list',
        ],
        condition: (value) => value === '',
      },
      'armanet-preroll-enabled': {
        dependentSettings: ['armanet-preroll-adunit'],
        condition: (value) => value === false,
      },
      'armanet-midroll-enabled': {
        dependentSettings: [
          'armanet-midroll-adunit',
          'armanet-midroll-min-minutes',
          'armanet-midroll-offset',
        ],
        condition: (value) => value === false,
      },
      'armanet-postroll-enabled': {
        dependentSettings: [
          'armanet-postroll-adunit',
          'armanet-postroll-min-minutes',
        ],
        condition: (value) => value === false,
      },
      'armanet-companion-video-enabled': {
        dependentSettings: ['armanet-companion-video-adunit'],
        condition: (value) => value === false,
      },
      'armanet-companion-sidebar-enabled': {
        dependentSettings: ['armanet-companion-sidebar-adunit'],
        condition: (value) => value === false,
      },
      'armanet-skip-time': {
        dependentSettings: [
          'armanet-message-skip-countdown',
          'armanet-message-skip',
        ],
        condition: (value) => value == 0,
      },
    };

    registerSettingsScript({
      isSettingHidden: (options) => {
        if (options.setting.name === 'armanet-excluded-channels-data')
          return true;

        for (const [key, rule] of Object.entries(visibilityRules)) {
          if (
            rule.dependentSettings.includes(options.setting.name) &&
            rule.condition(options.formValues[key])
          ) {
            return true;
          }
        }

        return false;
      },
    });
  }

  setupChannelsTable(channelsList, tableBody) {
    if (!tableBody) return null;
    tableBody.innerHTML = this.generateTableContent(channelsList);
    return tableBody;
  }

  generateTableContent(channelsList) {
    return channelsList
      .filter((channel) => channel.videoQuota === -1 || channel.adUnit?.uuid)
      .map((channel) => {
        const hasValidAdUnit = channel.adUnit && channel.adUnit.uuid;
        const status = hasValidAdUnit ? '✅ Yes' : '❌ No';
        const uuid = hasValidAdUnit || '';
        const actions = this.generateActionButton(channel, hasValidAdUnit);

        return `
          <tr>
            <td>${channel.itemNumber}</td>
            <td><a href="${channel.channelUrl}" title="Display Name: ${channel.channelDisplayName}">${channel.channelName}</a></td>
            <td><a href="/a/${channel.channelOwner}">${channel.channelOwner}</a></td>
            <td>${channel.videoQuota === -1 ? 'Unlimited' : formatBytes(channel.videoQuota)}</td>
            <td>${status}</td>
            <td>${uuid}</td>
            <td>${actions}</td>
          </tr>`;
      })
      .join('');
  }

  generateActionButton(channel, hasValidAdUnit) {
    return hasValidAdUnit
      ? `<div class="armanet-button armanet-button-unsync" data-channel-name="${channel.channelName}" data-channel-uuid="${channel.adUnit?.uuid}">
          Unsync
        </div>`
      : `<div class="armanet-button armanet-button-sync-single" data-channel-name="${channel.channelName}">
          Sync
        </div>`;
  }

  setupPaginatorTemplate(paginationHolder) {
    paginationHolder.innerHTML = `
      <div class="p-paginator-bottom p-paginator p-component armanet-p-paginator">
        <span class="p-paginator-current armanet-p-paginator-current">Displaying 00 - 00 of 00 channels.</span>
        <button type="button" class="p-element p-paginator-first p-paginator-element p-link">
          <div class="p-element p-icon-wrapper">${drawIcon('first', 14, 14, 'p-paginator-icon')}</div>
        </button>
        <button type="button" class="p-element p-paginator-prev p-paginator-element p-link">
          <div class="p-element p-icon-wrapper">${drawIcon('prev', 14, 14, 'p-paginator-icon')}</div>
        </button>
        <span class="p-paginator-pages">
          <button type="button" class="p-element p-paginator-page p-paginator-element p-link p-highlight">1</button>
        </span>
        <button type="button" class="p-element p-paginator-next p-paginator-element p-link">
          <div class="p-element p-icon-wrapper">${drawIcon('next', 14, 14, 'p-paginator-icon')}</div>
        </button>
        <button type="button" class="p-element p-paginator-last p-paginator-element p-link">
          <div class="p-element p-icon-wrapper">${drawIcon('last', 14, 14, 'p-paginator-icon')}</div>
        </button>
      </div>
    `;
  }

  setupChannelsDropdown() {
    this.multiSelect = document.querySelector('.armanet-multi-select');
    if (!this.multiSelect) return null;

    this.selectHeader = this.multiSelect.querySelector('.select-header');
    this.selectOptions = this.multiSelect.querySelector('.select-options');
    this.excludedChannelsInput = document.getElementById(
      'armanet-excluded-channels-data',
    );

    this.selectOptions.innerHTML = `<label><input type="checkbox" value="" />Loading...</label>`;

    this.setupDropdownEvents();

    return this.fillDropdownOptions.bind(this);
  }

  initializeDropdownState() {
    const initialValue = this.excludedChannelsInput.value;
    const selectedValues = initialValue.split(',').map((val) => val.trim());

    this.selectHeader.textContent = selectedValues.length
      ? selectedValues.join(', ')
      : 'Select Channels';

    this.selectOptions
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = selectedValues.includes(checkbox.value);
      });
  }

  setupDropdownEvents() {
    this.selectHeader.addEventListener('click', () => {
      const isVisible = this.selectOptions.style.display === 'block';
      this.selectOptions.style.display = isVisible ? 'none' : 'block';
    });

    this.selectOptions.addEventListener('change', () => {
      const selectedValues = Array.from(
        this.selectOptions.querySelectorAll('input:checked'),
      ).map((checkbox) => checkbox.value);
      const selectedText = selectedValues.join(', ');

      this.selectHeader.textContent = selectedText || 'Select Channels';
      this.excludedChannelsInput.value = selectedText;
      this.excludedChannelsInput.dispatchEvent(
        new Event('input', { bubbles: true }),
      );
    });

    document.addEventListener('click', (event) => {
      if (!this.multiSelect.contains(event.target)) {
        this.selectOptions.style.display = 'none';
      }
    });
  }

  fillDropdownOptions(channelsList) {
    if (!this.selectOptions) return;

    this.selectOptions.innerHTML = channelsList
      .map(
        (channel) => `
      <label>
        <input type="checkbox" value="${channel.channelName}" />
        ${channel.channelName}
        <a href="/video-channels/${channel.channelName}" target="_blank" title="View Channel">
          ${drawIcon('external', 16, 24)}
        </a>
      </label>
    `,
      )
      .join('');

    this.initializeDropdownState();
  }

  setupPagination(channelsList, tableBody, paginationHolder) {
    const paginator = new Paginator(
      channelsList.length,
      this.itemsPerPage,
      tableBody,
      paginationHolder,
    );
    paginator.init();
    return paginator;
  }

  renderSuccessNotification(message) {
    this.renderNotification(message, 'success');
  }

  renderErrorNotification(message) {
    this.renderNotification(message, 'error');
  }

  renderNotification(message, type) {
    this.helpers.notifier[type](
      message,
      'Armanet Plugin',
      this.notifierDuration,
    );
  }
}

class Paginator {
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
    this.paginationHolder.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        if (button.classList.contains('p-paginator-first')) {
          this.currentPage = 1;
        } else if (button.classList.contains('p-paginator-prev')) {
          this.currentPage = Math.max(1, this.currentPage - 1);
        } else if (button.classList.contains('p-paginator-next')) {
          this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
        } else if (button.classList.contains('p-paginator-last')) {
          this.currentPage = this.totalPages;
        }
        this.showPage(this.currentPage);
      });
    });
  }

  showPage(page) {
    const rows = this.tableBody.querySelectorAll('tr');
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    rows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? '' : 'none';
    });

    this.updateButtonsState(page);
    this.updatePagesDisplay(page);
    this.updateCounter(page);
  }

  updateButtonsState(page) {
    const firstButton =
      this.paginationHolder.querySelector('.p-paginator-first');
    const prevButton = this.paginationHolder.querySelector('.p-paginator-prev');
    const nextButton = this.paginationHolder.querySelector('.p-paginator-next');
    const lastButton = this.paginationHolder.querySelector('.p-paginator-last');

    firstButton.disabled = page === 1;
    prevButton.disabled = page === 1;
    nextButton.disabled = page === this.totalPages;
    lastButton.disabled = page === this.totalPages;
  }

  updatePagesDisplay(currentPage) {
    const pagesContainer =
      this.paginationHolder.querySelector('.p-paginator-pages');
    pagesContainer.innerHTML = '';

    for (let i = 1; i <= this.totalPages; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `p-ripple p-element p-paginator-page p-paginator-element p-link${i === currentPage ? ' p-highlight' : ''}`;
      button.textContent = i;
      button.addEventListener('click', () => this.showPage(i));
      pagesContainer.appendChild(button);
    }
  }

  updateCounter(page) {
    const currentCounter = this.paginationHolder.querySelector(
      '.p-paginator-current',
    );
    const startCount = (page - 1) * this.itemsPerPage + 1;
    const endCount = Math.min(page * this.itemsPerPage, this.totalItems);
    currentCounter.textContent = `Displaying ${startCount} - ${endCount} of ${this.totalItems} channels.`;
  }
}
