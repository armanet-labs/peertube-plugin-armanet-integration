const pluginSettings = [
  // PREROLL SETTINGS
  {
    name: 'armanet-settings-banner',
    type: 'html',
    html: `
      <hr />
      <div class="content-col">
        <div class="callout callout-orange">
          <span>This plugin allows publishers to display ads inside the video player.</span>
          <br />
          <span>To work, it requires you to have an active <a target="_blank" rel="noopener noreferrer" href="https://armanet.co" class="link-orange">Armanet</a> account.</span>
        </div>
      </div>
    `,
  },
  {
    name: 'armanet-preroll-title',
    type: 'html',
    html: '<h3>Ads before videos</h3>',
  },
  {
    name: 'armanet-preroll-enabled',
    label: 'Enable video ads before videos',
    type: 'input-checkbox',
    default: true,
    private: false,
  },
  {
    name: 'armanet-preroll-adunit',
    label: 'Ad Unit from Armanet',
    type: 'input',
    descriptionHTML:
      'The Ad Unit is the unique identifier for the ad slot. Reach out to your account manager for more information.',
    private: false,
  },

  // MIDROLL SETTINGS
  {
    name: 'armanet-midroll-title',
    type: 'html',
    html: '<br /><h3>Ads in middle of videos</h3>',
  },
  {
    name: 'armanet-midroll-enabled',
    label: 'Enable video ads in middle of videos',
    type: 'input-checkbox',
    default: false,
    private: false,
  },
  {
    name: 'armanet-midroll-adunit',
    label: 'Ad Unit from Armanet',
    type: 'input',
    descriptionHTML:
      'The Ad Unit is the unique identifier for the ad slot. Reach out to your account manager for more information.',
    private: false,
  },
  {
    name: 'armanet-midroll-min-minutes',
    label: 'Minimum video duration to show ads',
    type: 'input',
    descriptionHTML:
      'Set the minimum minutes of the video to show ads. 0 (zero) value will disable duration check.',
    private: false,
    default: '0',
  },
  {
    name: 'armanet-midroll-offset',
    label: 'Offset',
    type: 'input',
    descriptionHTML: `
      Offset in seconds or percentage of the video duration.
      <br />
      (eg. <strong>10</strong> to start the ad at second 10, or <strong>50%</strong> to start the ad at 50% of the video).
    `,
    private: false,
    default: '25%',
  },

  // POSTROLL SETTINGS
  {
    name: 'armanet-postroll-title',
    type: 'html',
    html: '<br /><h3>Ads after videos</h3>',
  },
  {
    name: 'armanet-postroll-enabled',
    label: 'Enable video ads after videos',
    type: 'input-checkbox',
    default: false,
    private: false,
  },
  {
    name: 'armanet-postroll-adunit',
    label: 'Ad Unit from Armanet',
    type: 'input',
    descriptionHTML:
      'The Ad Unit is the unique identifier for the ad slot. Reach out to your account manager for more information.',
    private: false,
  },
  {
    name: 'armanet-postroll-min-minutes',
    label: 'Minimum video duration to show ads',
    type: 'input',
    descriptionHTML:
      'Set the minimum minutes of the video to show ads. 0 (zero) value will disable duration check.',
    private: false,
    default: '0',
  },

  // COMPANION ADS
  {
    name: 'armanet-companion-title',
    type: 'html',
    html: `<hr /><br /><h3>Companion ads</h3>`,
  },
  {
    name: 'armanet-companion-video-enabled',
    label: 'Enable companion ads in video page (below title)',
    type: 'input-checkbox',
    default: false,
    private: false,
  },
  {
    name: 'armanet-companion-video-adunit',
    label: 'Ad Unit from Armanet',
    type: 'input',
    descriptionHTML:
      'The Ad Unit is the unique identifier for the ad slot. Reach out to your account manager for more information.',
    private: false,
  },
  {
    name: 'armanet-companion-sidebar-enabled',
    label: 'Enable companion ads in sidebar',
    type: 'input-checkbox',
    default: false,
    private: false,
  },
  {
    name: 'armanet-companion-sidebar-adunit',
    label: 'Ad Unit from Armanet',
    type: 'input',
    descriptionHTML:
      'The Ad Unit is the unique identifier for the ad slot. Reach out to your account manager for more information.',
    private: false,
  },

  // OTHER SETTINGS
  {
    name: 'armanet-other-title',
    type: 'html',
    html: `<hr /><br /><h3>Other settings</h3>`,
  },
  {
    name: 'armanet-embeded-enabled',
    label: 'Enable video ads in embedded players',
    type: 'input-checkbox',
    default: true,
    private: false,
  },
  {
    name: 'armanet-player-controls-enabled',
    label: 'Display player controls (play, pause, volume) when ads are playing',
    type: 'input-checkbox',
    default: false,
    private: false,
  },
  {
    name: 'armanet-api-key',
    label: 'API Key from Armanet',
    type: 'input',
    descriptionHTML:
      'Insert your <strong>API KEY</strong> from Armanet. Reach out to your account manager for more information.',
    private: true,
  },
  {
    name: 'armanet-skip-time',
    label: 'Skip time',
    type: 'input',
    descriptionHTML:
      'Set the minimum time spent (in seconds) to allow skip ads. 0 (zero) value will disable skip function.',
    private: false,
    default: '8',
  },
  {
    name: 'armanet-message-skip-countdown',
    label: 'Skip countdown message',
    type: 'input',
    descriptionHTML: `
      Message displayed for the countdown to enable skip of the ad (at top right).
      <br />
      <em class="fst-italic px-1 text-bg-secondary">{seconds}</em> will be replaced with the number of seconds left to skip the ad.
    `,
    private: false,
    default: 'Skip in {seconds}...',
  },
  {
    name: 'armanet-message-skip',
    label: 'Skip message',
    type: 'input',
    descriptionHTML:
      'Message displayed on the clickable button to skip the ad (at top right).',
    private: false,
    default: 'Skip',
  },
  {
    name: 'armanet-message-remainingTime',
    label: 'Remaining time message',
    type: 'input',
    descriptionHTML: `
      Message displayed for the countdown to the end of the ad (at bottom left).
      <br />
      <em class="fst-italic px-1 text-bg-secondary">{seconds}</em> will be replaced with the number of seconds left to the end of the ad.<br />If empty, the message will not be displayed.
    `,
    private: false,
    default: 'This ad will end in {seconds}',
  },
  {
    name: 'armanet-server-debug-enabled',
    label: 'Enable server debug logs.',
    type: 'input-checkbox',
    default: false,
    private: false,
  },
  {
    name: 'armanet-client-debug-enabled',
    label:
      'Enable client debug logs (may print sensitive data in client console).',
    type: 'input-checkbox',
    default: false,
    private: false,
  },

  // CHANNELS LIST
  {
    name: 'armanet-channels-list-title',
    type: 'html',
    html: '<hr /><h3>Channels sync status</h3>',
  },
  {
    name: 'armanet-channels-list-update-button',
    type: 'html',
    html: '<div class="armanet-button armanet-button-sync-channels">Sync channels with Armanet Ad Units</div>',
  },
  {
    name: 'armanet-channels-list',
    type: 'html',
    html: `
      <table class="armanet-channels-list armanet-table table-bordered">
        <thead>
          <tr>
            <th>Channel Name</th>
            <th>Synced with Ad Unit</th>
            <th>Channel UUID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3">Loading...</td>
          </tr>
        </tbody>
      </table>
    `,
  },
];

module.exports = pluginSettings;
