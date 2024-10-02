async function register ({
  registerSetting,
  settingsManager,
}) {
  registerSetting({
    name: 'armanet-preroll-title',
    type: 'html',
    html: '<hr /><h3>Ads before videos</h3>',
  })
  registerSetting({
    name: 'armanet-preroll-enabled',
    label: 'Enable video ads before videos',
    type: 'input-checkbox',
    default: true,
    private: false,
  })
  registerSetting({
    name: 'armanet-preroll-adunit',
    label: 'Ad Unit from Armanet',
    type: 'input',
    descriptionHTML:  'The Ad Unit is the unique identifier for the ad slot. Get yours from <a href="#">Armanet dashboard panel</a>',
    private: false,
  })

  registerSetting({
    name: 'armanet-midroll-title',
    type: 'html',
    html: '<br /><h3>Ads in middle of videos</h3>',
  })
  registerSetting({
    name: 'armanet-midroll-enabled',
    label: 'Enable video ads in middle of videos',
    type: 'input-checkbox',
    default: false,
    private: false,
  })
  registerSetting({
    name: 'armanet-midroll-adunit',
    label: 'Ad Unit from Armanet',
    type: 'input',
    descriptionHTML:  'The Ad Unit is the unique identifier for the ad slot. Get yours from <a href="#">Armanet dashboard panel</a>',
    private: false,
  })
  registerSetting({
    name: 'armanet-midroll-offset',
    label: 'Offset',
    type: 'input',
    descriptionHTML: 'Offset in seconds or percentage of the video duration<br />(eg. 10 to start the ad at second 10, or 50% to start the ad at 50% of the video)',
    private: false,
    default: '25%',
  })

  registerSetting({
    name: 'armanet-postroll-title',
    type: 'html',
    html: '<br /><h3>Ads after videos</h3>',
  })
  registerSetting({
    name: 'armanet-postroll-enabled',
    label: 'Enable video ads after videos',
    type: 'input-checkbox',
    default: false,
    private: false,
  })
  registerSetting({
    name: 'armanet-postroll-adunit',
    label: 'Ad Unit from Armanet',
    type: 'input',
    descriptionHTML:  'The Ad Unit is the unique identifier for the ad slot. Get yours from <a href="#">Armanet dashboard panel</a>',
    private: false,
  })

  registerSetting({
    name: 'armanet-other-title',
    type: 'html',
    html: `<br /><h3>Other settings</h3>`,
  })
  registerSetting({
    name: 'armanet-embeded-enabled',
    label: 'Enable video ads in embeded players',
    type: 'input-checkbox',
    default: true,
    private: false,
  })
  registerSetting({
    name: 'armanet-skip-time',
    label: 'Skip time',
    type: 'input',
    descriptionHTML: 'Set the minimum time spent (in seconds) to allow skip ads. 0 (zero) value will disable skip function',
    private: false,
    default: '8',
  })
  registerSetting({
    name: 'armanet-message-skip-countdown',
    label: 'Skip countdown message',
    type: 'input',
    descriptionHTML: 'Message displayed for the countdown to enable skip of the ad.<br /><em class="fst-italic px-1 text-bg-secondary">{seconds}</em> will be replaced with the number of seconds left to skip the ad',
    private: false,
    default: 'Skip in {seconds}...',
  })
  registerSetting({
    name: 'armanet-message-skip',
    label: 'Skip message',
    type: 'input',
    descriptionHTML: 'Message displayed on the clickeable button to skip the ad',
    private: false,
    default: 'Skip',
  })
  registerSetting({
    name: 'armanet-message-remainingTime',
    label: 'Remaining time message',
    type: 'input',
    descriptionHTML: 'Message displayed for the countdown to the end of the ad. <br /><em class="fst-italic px-1 text-bg-secondary">{seconds}</em> will be replaced with the number of seconds left to the end of the ad.<br />If empty, the message will not be displayed.',
    private: false,
    default: 'This ad will end in {seconds}',
  })
}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}
