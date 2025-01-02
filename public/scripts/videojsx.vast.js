(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("video.js"), require("@dailymotion/vast-client"));
	else if(typeof define === 'function' && define.amd)
		define(["video.js", "@dailymotion/vast-client"], factory);
	else if(typeof exports === 'object')
		exports["videojsxVast"] = factory(require("video.js"), require("@dailymotion/vast-client"));
	else
		root["videojsxVast"] = factory(root["videojs"], root["vastClient"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__660__, __WEBPACK_EXTERNAL_MODULE__581__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var topLevel = typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g :
    typeof window !== 'undefined' ? window : {}
var minDoc = __webpack_require__(542);

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;


/***/ }),

/***/ 840:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof __webpack_require__.g !== "undefined") {
    win = __webpack_require__.g;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;


/***/ }),

/***/ 940:
/***/ ((module) => {

"use strict";


var METHODS = [
    'handshakeVersion',
    'initAd',
    'startAd',
    'stopAd',
    'skipAd', // VPAID 2.0 new method
    'resizeAd',
    'pauseAd',
    'resumeAd',
    'expandAd',
    'collapseAd',
    'subscribe',
    'unsubscribe'
];

var EVENTS = [
    'AdLoaded',
    'AdStarted',
    'AdStopped',
    'AdSkipped',
    'AdSkippableStateChange', // VPAID 2.0 new event
    'AdSizeChange', // VPAID 2.0 new event
    'AdLinearChange',
    'AdDurationChange', // VPAID 2.0 new event
    'AdExpandedChange',
    'AdRemainingTimeChange', // [Deprecated in 2.0] but will be still fired for backwards compatibility
    'AdVolumeChange',
    'AdImpression',
    'AdVideoStart',
    'AdVideoFirstQuartile',
    'AdVideoMidpoint',
    'AdVideoThirdQuartile',
    'AdVideoComplete',
    'AdClickThru',
    'AdInteraction', // VPAID 2.0 new event
    'AdUserAcceptInvitation',
    'AdUserMinimize',
    'AdUserClose',
    'AdPaused',
    'AdPlaying',
    'AdLog',
    'AdError'
];

var GETTERS = [
    'getAdLinear',
    'getAdWidth', // VPAID 2.0 new getter
    'getAdHeight', // VPAID 2.0 new getter
    'getAdExpanded',
    'getAdSkippableState', // VPAID 2.0 new getter
    'getAdRemainingTime',
    'getAdDuration', // VPAID 2.0 new getter
    'getAdVolume',
    'getAdCompanions', // VPAID 2.0 new getter
    'getAdIcons' // VPAID 2.0 new getter
];

var SETTERS = [
    'setAdVolume'
];


/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */


/**
 * IVPAIDAdUnit
 *
 * @class
 *
 * @param {object} creative
 * @param {HTMLElement} el
 * @param {HTMLVideoElement} video
 */
function IVPAIDAdUnit(creative, el, video) {}


/**
 * handshakeVersion
 *
 * @param {string} VPAIDVersion
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.handshakeVersion = function (VPAIDVersion, callback) {};

/**
 * initAd
 *
 * @param {number} width
 * @param {number} height
 * @param {string} viewMode can be 'normal', 'thumbnail' or 'fullscreen'
 * @param {number} desiredBitrate indicates the desired bitrate in kbps
 * @param {object} [creativeData] used for additional initialization data
 * @param {object} [environmentVars] used for passing implementation-specific of js version
 * @param {NodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.initAd = function(width, height, viewMode, desiredBitrate, creativeData, environmentVars, callback) {};

/**
 * startAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.startAd = function(callback) {};

/**
 * stopAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.stopAd = function(callback) {};

/**
 * skipAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.skipAd = function(callback) {};

/**
 * resizeAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.resizeAd = function(width, height, viewMode, callback) {};

/**
 * pauseAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.pauseAd = function(callback) {};

/**
 * resumeAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.resumeAd = function(callback) {};

/**
 * expandAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.expandAd = function(callback) {};

/**
 * collapseAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.collapseAd = function(callback) {};

/**
 * subscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 * @param {object} context
 */
IVPAIDAdUnit.prototype.subscribe = function(event, handler, context) {};

/**
 * startAd
 *
 * @param {string} event
 * @param {function} handler
 */
IVPAIDAdUnit.prototype.unsubscribe = function(event, handler) {};



/**
 * getAdLinear
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdLinear = function(callback) {};

/**
 * getAdWidth
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdWidth = function(callback) {};

/**
 * getAdHeight
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdHeight = function(callback) {};

/**
 * getAdExpanded
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdExpanded = function(callback) {};

/**
 * getAdSkippableState
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdSkippableState = function(callback) {};

/**
 * getAdRemainingTime
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdRemainingTime = function(callback) {};

/**
 * getAdDuration
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdDuration = function(callback) {};

/**
 * getAdVolume
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdVolume = function(callback) {};

/**
 * getAdCompanions
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdCompanions = function(callback) {};

/**
 * getAdIcons
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdIcons = function(callback) {};

/**
 * setAdVolume
 *
 * @param {number} volume
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.setAdVolume = function(volume, callback) {};

addStaticToInterface(IVPAIDAdUnit, 'METHODS', METHODS);
addStaticToInterface(IVPAIDAdUnit, 'GETTERS', GETTERS);
addStaticToInterface(IVPAIDAdUnit, 'SETTERS', SETTERS);
addStaticToInterface(IVPAIDAdUnit, 'EVENTS',  EVENTS);


var VPAID1_METHODS = METHODS.filter(function(method) {
    return ['skipAd'].indexOf(method) === -1;
});

addStaticToInterface(IVPAIDAdUnit, 'checkVPAIDInterface', function checkVPAIDInterface (creative) {
    var result = VPAID1_METHODS.every(function(key) {
        return typeof creative[key] === 'function';
    });
    return result;
});

module.exports = IVPAIDAdUnit;

function addStaticToInterface(Interface, name, value) {
    Object.defineProperty(Interface, name, {
        writable: false,
        configurable: false,
        value: value
    });
}



/***/ }),

/***/ 251:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var IVPAIDAdUnit = __webpack_require__(940);
var Subscriber = __webpack_require__(932);
var checkVPAIDInterface = IVPAIDAdUnit.checkVPAIDInterface;
var utils = __webpack_require__(981);
var METHODS = IVPAIDAdUnit.METHODS;
var ERROR = 'AdError';
var AD_CLICK = 'AdClickThru';
var FILTERED_EVENTS = IVPAIDAdUnit.EVENTS.filter(function (event) {
    return event != AD_CLICK;
});

/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */


/**
 * VPAIDAdUnit
 * @class
 *
 * @param VPAIDCreative
 * @param {HTMLElement} [el] this will be used in initAd environmentVars.slot if defined
 * @param {HTMLVideoElement} [video] this will be used in initAd environmentVars.videoSlot if defined
 */
function VPAIDAdUnit(VPAIDCreative, el, video, iframe) {
    this._isValid = checkVPAIDInterface(VPAIDCreative);
    if (this._isValid) {
        this._creative = VPAIDCreative;
        this._el = el;
        this._videoEl = video;
        this._iframe = iframe;
        this._subscribers = new Subscriber();
        utils.setFullSizeStyle(el);
        $addEventsSubscribers.call(this);
    }
}

VPAIDAdUnit.prototype = Object.create(IVPAIDAdUnit.prototype);

/**
 * isValidVPAIDAd will return if the VPAIDCreative passed in constructor is valid or not
 *
 * @return {boolean}
 */
VPAIDAdUnit.prototype.isValidVPAIDAd = function isValidVPAIDAd() {
    return this._isValid;
};

IVPAIDAdUnit.METHODS.forEach(function(method) {
    //NOTE: this methods arguments order are implemented differently from the spec
    var ignores = [
        'subscribe',
        'unsubscribe',
        'initAd'
    ];

    if (ignores.indexOf(method) !== -1) return;

    VPAIDAdUnit.prototype[method] = function () {
        var ariaty = IVPAIDAdUnit.prototype[method].length;
        // TODO avoid leaking arguments
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
        var args = Array.prototype.slice.call(arguments);
        var callback = (ariaty === args.length) ? args.pop() : undefined;

        setTimeout(function () {
            var result, error = null;
            try {
                result = this._creative[method].apply(this._creative, args);
            } catch(e) {
                error = e;
            }

            callOrTriggerEvent(callback, this._subscribers, error, result);
        }.bind(this), 0);
    };
});


/**
 * initAd concreate implementation
 *
 * @param {number} width
 * @param {number} height
 * @param {string} viewMode can be 'normal', 'thumbnail' or 'fullscreen'
 * @param {number} desiredBitrate indicates the desired bitrate in kbps
 * @param {object} [creativeData] used for additional initialization data
 * @param {object} [environmentVars] used for passing implementation-specific of js version, if el & video was used in constructor slot & videoSlot will be added to the object
 * @param {NodeStyleCallback} callback
 */
VPAIDAdUnit.prototype.initAd = function initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars, callback) {
    creativeData = creativeData || {};
    environmentVars = utils.extend({
        slot: this._el,
        videoSlot: this._videoEl
    }, environmentVars || {});

    setTimeout(function () {
        var error;
        try {
            this._creative.initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars);
        } catch (e) {
            error = e;
        }

        callOrTriggerEvent(callback, this._subscribers, error);
    }.bind(this), 0);
};

/**
 * subscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 * @param {object} context
 */
VPAIDAdUnit.prototype.subscribe = function subscribe(event, handler, context) {
    this._subscribers.subscribe(handler, event, context);
};


/**
 * unsubscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 */
VPAIDAdUnit.prototype.unsubscribe = function unsubscribe(event, handler) {
    this._subscribers.unsubscribe(handler, event);
};

//alias
VPAIDAdUnit.prototype.on = VPAIDAdUnit.prototype.subscribe;
VPAIDAdUnit.prototype.off = VPAIDAdUnit.prototype.unsubscribe;

IVPAIDAdUnit.GETTERS.forEach(function(getter) {
    VPAIDAdUnit.prototype[getter] = function (callback) {
        setTimeout(function () {

            var result, error = null;
            try {
                result = this._creative[getter]();
            } catch(e) {
                error = e;
            }

            callOrTriggerEvent(callback, this._subscribers, error, result);
        }.bind(this), 0);
    };
});

/**
 * setAdVolume
 *
 * @param volume
 * @param {nodeStyleCallback} callback
 */
VPAIDAdUnit.prototype.setAdVolume = function setAdVolume(volume, callback) {
    setTimeout(function () {

        var result, error = null;
        try {
            this._creative.setAdVolume(volume);
            result = this._creative.getAdVolume();
        } catch(e) {
            error = e;
        }

        if (!error) {
            error = utils.validate(result === volume, 'failed to apply volume: ' + volume);
        }
        callOrTriggerEvent(callback, this._subscribers, error, result);
    }.bind(this), 0);
};

VPAIDAdUnit.prototype._destroy = function destroy() {
    this.stopAd();
    this._subscribers.unsubscribeAll();
};

function $addEventsSubscribers() {
    // some ads implement
    // so they only handle one subscriber
    // to handle this we create our one
    FILTERED_EVENTS.forEach(function (event) {
        this._creative.subscribe($trigger.bind(this, event), event);
    }.bind(this));

    // map the click event to be an object instead of depending of the order of the arguments
    // and to be consistent with the flash
    this._creative.subscribe($clickThruHook.bind(this), AD_CLICK);

    // because we are adding the element inside the iframe
    // the user is not able to click in the video
    if (this._videoEl) {
        var documentElement = this._iframe.contentDocument.documentElement;
        var videoEl = this._videoEl;
        documentElement.addEventListener('click', function(e) {
            if (e.target === documentElement) {
                videoEl.click();
            }
        });
    }
}

function $clickThruHook(url, id, playerHandles) {
    this._subscribers.triggerSync(AD_CLICK, {url: url, id: id, playerHandles: playerHandles});
}

function $trigger(event) {
    // TODO avoid leaking arguments
    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    this._subscribers.trigger.apply(this._subscribers, Array.prototype.slice.call(arguments));
}

function callOrTriggerEvent(callback, subscribers, error, result) {
    if (callback) {
        callback(error, result);
    } else if (error) {
        subscribers.trigger(ERROR, error);
    }
}

module.exports = VPAIDAdUnit;



/***/ }),

/***/ 289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(981);
var unique = utils.unique('vpaidIframe');
var VPAIDAdUnit = __webpack_require__(251);

var defaultTemplate = '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head><meta charset="UTF-8"></head>' +
    '<body style="margin:0;padding:0"><div class="ad-element"></div>' +
    '<script type="text/javascript" src="{{iframeURL_JS}}"></script>' +
    '<script type="text/javascript">' +
    'window.parent.postMessage(\'{"event": "ready", "id": "{{iframeID}}"}\', \'{{origin}}\');' +
    '</script>' +
    '</body>' +
    '</html>';

var AD_STOPPED = 'AdStopped';

/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */

/**
 * VPAIDHTML5Client
 * @class
 *
 * @param {HTMLElement} el that will contain the iframe to load adUnit and a el to add to adUnit slot
 * @param {HTMLVideoElement} video default video element to be used by adUnit
 * @param {object} [templateConfig] template: html template to be used instead of the default, extraOptions: to be used when rendering the template
 * @param {object} [vpaidOptions] timeout: when loading adUnit
 */
function VPAIDHTML5Client(el, video, templateConfig, vpaidOptions) {
    templateConfig = templateConfig || {};

    this._id = unique();
    this._destroyed = false;

    this._frameContainer = utils.createElementInEl(el, 'div');
    this._videoEl = video;
    this._vpaidOptions = vpaidOptions || {timeout: 10000};

    this._templateConfig = {
        template: templateConfig.template || defaultTemplate,
        extraOptions: templateConfig.extraOptions || {}
    };
}

/**
 * destroy
 *
 */
VPAIDHTML5Client.prototype.destroy = function destroy() {
    if (this._destroyed) {
        return;
    }
    this._destroyed = true;
    $unloadPreviousAdUnit.call(this);
};

/**
 * isDestroyed
 *
 * @return {boolean}
 */
VPAIDHTML5Client.prototype.isDestroyed = function isDestroyed() {
    return this._destroyed;
};

/**
 * loadAdUnit
 *
 * @param {string} adURL url of the js of the adUnit
 * @param {nodeStyleCallback} callback
 */
VPAIDHTML5Client.prototype.loadAdUnit = function loadAdUnit(adURL, callback) {
    if(this._onLoad){ return }

    $throwIfDestroyed.call(this);
    $unloadPreviousAdUnit.call(this);
    var that = this;

    var frame = utils.createIframeWithContent(
        this._frameContainer,
        this._templateConfig.template,
        utils.extend({
            iframeURL_JS: adURL,
            iframeID: this.getID(),
            origin: getOrigin()
        }, this._templateConfig.extraOptions)
    );

    this._frame = frame;

    this._onLoad = utils.callbackTimeout(
        this._vpaidOptions.timeout,
        onLoad.bind(this),
        onTimeout.bind(this)
    );

    window.addEventListener('message', this._onLoad);

    function onLoad (e) {
        /*jshint validthis: false */
        //don't clear timeout
        if (e.origin !== getOrigin()) return;
        var result;

        try {
            result = JSON.parse(e.data);
        }
        catch (exception) {
            throw exception;
        }

        //don't clear timeout
        if (result.id !== that.getID()) return;

        var adUnit, error, createAd;
        if (!that._frame.contentWindow) {

            error = 'the iframe is not anymore in the DOM tree';

        } else {
            createAd = that._frame.contentWindow.getVPAIDAd;
            error = utils.validate(typeof createAd === 'function', 'the ad didn\'t return a function to create an ad');
        }

        if (!error) {
            var adEl = that._frame.contentWindow.document.querySelector('.ad-element');
            adUnit = new VPAIDAdUnit(createAd(), adEl, that._videoEl, that._frame);
            adUnit.subscribe(AD_STOPPED, $adDestroyed.bind(that));
            error = utils.validate(adUnit.isValidVPAIDAd(), 'the add is not fully complaint with VPAID specification');
        }

        that._adUnit = adUnit;
        $destroyLoadListener.call(that);
        callback(error, error ? null : adUnit);

        //clear timeout
        return true;
    }

    function onTimeout() {
        callback('timeout', null);
    }
};

/**
 * unloadAdUnit
 *
 */
VPAIDHTML5Client.prototype.unloadAdUnit = function unloadAdUnit() {
    $unloadPreviousAdUnit.call(this);
};

/**
 * getID will return the unique id
 *
 * @return {string}
 */
VPAIDHTML5Client.prototype.getID = function () {
    return this._id;
};


/**
 * $removeEl
 *
 * @param {string} key
 */
function $removeEl(key) {
    var el = this[key];
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
        delete this[key];
    }
}

function $adDestroyed() {
    $removeAdElements.call(this);
    delete this._adUnit;
}

function $unloadPreviousAdUnit() {
    $removeAdElements.call(this);
    $destroyAdUnit.call(this);
}

function $removeAdElements() {
    $removeEl.call(this, '_frame');
    $destroyLoadListener.call(this);
}

/**
 * $destroyLoadListener
 *
 */
function $destroyLoadListener() {
    if (this._onLoad) {
        window.removeEventListener('message', this._onLoad);
        delete this._onLoad;
    }
}


function $destroyAdUnit() {
    if (this._adUnit) {
        this._adUnit.stopAd();
        delete this._adUnit;
    }
}

/**
 * $throwIfDestroyed
 *
 */
function $throwIfDestroyed() {
    if (this._destroyed) {
        throw new Error ('VPAIDHTML5Client already destroyed!');
    }
}

function getOrigin() {
    if( window.location.origin ) {
        return window.location.origin;
    }
    else {
        return window.location.protocol + "//" +
            window.location.hostname +
            (window.location.port ? ':' + window.location.port: '');
    }
}

module.exports = VPAIDHTML5Client;
window.VPAIDHTML5Client = VPAIDHTML5Client;


/***/ }),

/***/ 932:
/***/ ((module) => {

"use strict";


function Subscriber() {
    this._subscribers = {};
}

Subscriber.prototype.subscribe = function subscribe(handler, eventName, context) {
    if (!this.isHandlerAttached(handler, eventName)) {
        this.get(eventName).push({handler: handler, context: context, eventName: eventName});
    }
};

Subscriber.prototype.unsubscribe = function unsubscribe(handler, eventName) {
    this._subscribers[eventName] = this.get(eventName).filter(function (subscriber) {
        return handler !== subscriber.handler;
    });
};

Subscriber.prototype.unsubscribeAll = function unsubscribeAll() {
    this._subscribers = {};
};

Subscriber.prototype.trigger = function(eventName, data) {
    var that = this;
    var subscribers = this.get(eventName)
        .concat(this.get('*'));

    subscribers.forEach(function (subscriber) {
        setTimeout(function () {
            if (that.isHandlerAttached(subscriber.handler, subscriber.eventName)) {
                subscriber.handler.call(subscriber.context, data);
            }
        }, 0);
    });
};

Subscriber.prototype.triggerSync = function(eventName, data) {
    var subscribers = this.get(eventName)
        .concat(this.get('*'));

    subscribers.forEach(function (subscriber) {
        subscriber.handler.call(subscriber.context, data);
    });
};

Subscriber.prototype.get = function get(eventName) {
    if (!this._subscribers[eventName]) {
        this._subscribers[eventName] = [];
    }
    return this._subscribers[eventName];
};

Subscriber.prototype.isHandlerAttached = function isHandlerAttached(handler, eventName) {
    return this.get(eventName).some(function(subscriber) {
        return handler === subscriber.handler;
    })
};

module.exports = Subscriber;



/***/ }),

/***/ 981:
/***/ ((module) => {

"use strict";


/**
 * noop a empty function
 */
function noop() {}

/**
 * validate if is not validate will return an Error with the message
 *
 * @param {boolean} isValid
 * @param {string} message
 */
function validate(isValid, message) {
    return isValid ? null : new Error(message);
}

/**
 * callbackTimeout if the onSuccess is not called and returns true in the timelimit then onTimeout will be called
 *
 * @param {number} timer
 * @param {function} onSuccess
 * @param {function} onTimeout
 */
function callbackTimeout(timer, onSuccess, onTimeout) {
    var callback, timeout;

    timeout = setTimeout(function () {
        onSuccess = noop;
        onTimeout();
    }, timer);

    callback = function () {
        // TODO avoid leaking arguments
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
        var args = Array.prototype.slice.call(arguments);
        if (onSuccess.apply(this, args)) {
            clearTimeout(timeout);
        }
    };

    return callback;
}


/**
 * createElementInEl
 *
 * @param {HTMLElement} parent
 * @param {string} tagName
 * @param {string} id
 */
function createElementInEl(parent, tagName, id) {
    var nEl = document.createElement(tagName);
    if (id) nEl.id = id;
    parent.appendChild(nEl);
    return nEl;
}

/**
 * createIframeWithContent
 *
 * @param {HTMLElement} parent
 * @param {string} template simple template using {{var}}
 * @param {object} data
 */
function createIframeWithContent(parent, template, data) {
    var iframe = createIframe(parent, null, data.zIndex);
    if (!setIframeContent(iframe, simpleTemplate(template, data))) return;
    return iframe;
}

/**
 * createIframe
 *
 * @param {HTMLElement} parent
 * @param {string} url
 */
function createIframe(parent, url, zIndex) {
    var nEl = document.createElement('iframe');
    nEl.src = url || 'about:blank';
    nEl.marginWidth = '0';
    nEl.marginHeight = '0';
    nEl.frameBorder = '0';
    nEl.width = '100%';
    nEl.height = '100%';
    setFullSizeStyle(nEl);

    if(zIndex){
        nEl.style.zIndex = zIndex;
    }

    nEl.setAttribute('SCROLLING','NO');
    parent.innerHTML = '';
    parent.appendChild(nEl);
    return nEl;
}

function setFullSizeStyle(element) {
    if(element) {
        element.style.position = 'absolute';
        element.style.left = '0';
        element.style.top = '0';
        element.style.margin = '0px';
        element.style.padding = '0px';
        element.style.border = 'none';
        element.style.width = '100%';
        element.style.height = '100%';
    }
}

/**
 * simpleTemplate
 *
 * @param {string} template
 * @param {object} data
 */
function simpleTemplate(template, data) {
    Object.keys(data).forEach(function (key) {
        var value = (typeof value === 'object') ? JSON.stringify(data[key]) : data[key];
        template = template.replace(new RegExp('{{' + key + '}}', 'g'), value);
    });
    return template;
}

/**
 * setIframeContent
 *
 * @param {HTMLIframeElement} iframeEl
 * @param content
 */
function setIframeContent(iframeEl, content) {
    var iframeDoc = iframeEl.contentWindow && iframeEl.contentWindow.document;
    if (!iframeDoc) return false;

    iframeDoc.write(content);

    return true;
}


/**
 * extend object with keys from another object
 *
 * @param {object} toExtend
 * @param {object} fromSource
 */
function extend(toExtend, fromSource) {
    Object.keys(fromSource).forEach(function(key) {
        toExtend[key] = fromSource[key];
    });
    return toExtend;
}


/**
 * unique will create a unique string everytime is called, sequentially and prefixed
 *
 * @param {string} prefix
 */
function unique(prefix) {
    var count = -1;
    return function () {
        return prefix + '_' + (++count);
    };
}

module.exports = {
    noop: noop,
    validate: validate,
    callbackTimeout: callbackTimeout,
    createElementInEl: createElementInEl,
    createIframeWithContent: createIframeWithContent,
    createIframe: createIframe,
    setFullSizeStyle: setFullSizeStyle,
    simpleTemplate: simpleTemplate,
    setIframeContent: setIframeContent,
    extend: extend,
    unique: unique
};



/***/ }),

/***/ 660:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__660__;

/***/ }),

/***/ 581:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__581__;

/***/ }),

/***/ 542:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// EXTERNAL MODULE: external {"root":"videojs","commonjs":"video.js","commonjs2":"video.js","amd":"video.js"}
var external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_ = __webpack_require__(660);
var external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_default = /*#__PURE__*/__webpack_require__.n(external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_);
// EXTERNAL MODULE: external {"root":["vastClient"],"commonjs":"@dailymotion/vast-client","commonjs2":"@dailymotion/vast-client","amd":"@dailymotion/vast-client"}
var vast_client_ = __webpack_require__(581);
// EXTERNAL MODULE: ./node_modules/global/document.js
var global_document = __webpack_require__(697);
// EXTERNAL MODULE: ./node_modules/global/window.js
var global_window = __webpack_require__(840);
;// ./src/ui.mjs


class UI extends external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_.EventTarget {
  constructor(player, options) {
    super();
    this.player = player;
    this.options = options;
    // duration in seconds. useful for streaming ads where `player.duration()` will always give 0.
    this.duration = 0;
    this.skipDelay = 0;

    /** @type {Object} */
    this.originalState = {
      controlsEnabled: player.controls(),
      seekEnabled: player.controlBar.progressControl.enabled()
    };
  }
  setUp() {
    const player = this.player;
    const options = this.options;
    const setupProgressControl = () => {
      player.controls(options.controlsEnabled);
      if (options.seekEnabled) {
        player.controlBar.progressControl.enable();
      } else {
        player.controlBar.progressControl.disable();
      }
    };
    const setupBlocker = () => {
      const blocker = this.blocker = global_window.document.createElement('div');
      blocker.className = 'vast-blocker';
      blocker.onclick = () => {
        if (player.paused()) {
          player.play();
          return false;
        }
        this.trigger('click');
      };
      player.el().insertBefore(blocker, player.controlBar.el());
    };
    const setupSkipButton = () => {
      const skipButtonElement = this.skipButtonElement = global_window.document.createElement('div');
      skipButtonElement.className = 'vast-skip-button';
      skipButtonElement.style.display = 'none';
      player.el().appendChild(skipButtonElement);
      player.one('adplay', this.#onAdPlay);
      skipButtonElement.onclick = e => {
        if ((' ' + skipButtonElement.className + ' ').indexOf(' enabled ') >= 0) {
          this.trigger('skip');
        }
        if (global_window.Event.prototype.stopPropagation !== undefined) {
          e.stopPropagation();
        } else {
          return false;
        }
      };
    };
    const setupRemainingTime = () => {
      if (!options.displayRemainingTime) return;
      const remainingTimeElement = this.remainingTimeElement = global_window.document.createElement('div');
      remainingTimeElement.className = 'vast-remaining-time';
      remainingTimeElement.style.display = 'none';
      player.el().appendChild(remainingTimeElement);
    };
    const setupRemainingTimeIcon = type => {
      if (!options.displayRemainingTimeIcons) return;
      const config = {
        play: {
          className: 'vjs-icon-play vast-remaining-time-icon-play',
          action: player => player.paused() ? player.play() : player.pause(),
          toggleClasses: ['vjs-icon-pause', 'vjs-icon-play'],
          events: ['adplay', 'adpause'],
          initialState: player => player.paused() ? 'vjs-icon-play' : 'vjs-icon-pause'
        },
        mute: {
          className: 'vast-remaining-time-icon-mute',
          action: player => player.muted(!player.muted()),
          toggleClasses: ['vjs-icon-volume-high', 'vjs-icon-volume-mute'],
          events: ['advolumechange'],
          initialState: player => player.paused() ? 'vjs-icon-play' : 'vjs-icon-pause',
          updateState: (button, player) => {
            button.removeClass('vjs-icon-play');
            button.removeClass('vjs-icon-pause');
            button.addClass(player.paused() ? 'vjs-icon-play' : 'vjs-icon-pause');
          }
        }
      };
      const {
        className,
        action,
        toggleClasses,
        events,
        initialState,
        updateState
      } = config[type];
      const button = player.addChild('button', {
        className: `vjs-hidden vjs-visible-text vjs-button vast-remaining-time-icon ${className}`,
        clickHandler: function () {
          action(this.player);
        }.bind(this)
      });
      button.removeClass('vjs-control');
      button.addClass(initialState(player));
      const toggleIcon = () => {
        if (updateState) {
          updateState(button, player);
        } else {
          toggleClasses.forEach(cls => button.toggleClass(cls));
        }
      };
      this[`remainingTime${type.charAt(0).toUpperCase() + type.slice(1)}Element`] = button.el();
      events.forEach(event => player.on(event, toggleIcon));
    };
    setupProgressControl();
    setupBlocker();
    setupSkipButton();
    setupRemainingTime();
    setupRemainingTimeIcon('play');
    setupRemainingTimeIcon('mute');
  }
  tearDown() {
    const player = this.player;
    const originalState = this.originalState;
    this.duration = 0;
    this.skipDelay = 0;
    player.controls(originalState.controlsEnabled);
    if (originalState.seekEnabled) {
      player.controlBar.progressControl.enable();
    } else {
      player.controlBar.progressControl.disable();
    }
    this.blocker.parentElement.removeChild(this.blocker);
    this.skipButtonElement.parentElement.removeChild(this.skipButtonElement);
    if (this.options.displayRemainingTime) {
      this.remainingTimeElement.parentElement.removeChild(this.remainingTimeElement);
    }
    if (this.options.displayRemainingTimeIcons) {
      this.remainingTimePlayElement.parentElement.removeChild(this.remainingTimePlayElement);
      this.remainingTimeMuteElement.parentElement.removeChild(this.remainingTimeMuteElement);
    }
    player.off('adtimeupdate', this.#onTimeUpdate);
    player.off('adplay', this.#onAdPlay);
  }
  #onAdPlay = () => {
    const skipDelay = this.skipDelay;
    const player = this.player;
    if (skipDelay > 0 && (player.duration() || this.duration) >= skipDelay) {
      this.skipButtonElement.style.display = 'block';
      if (this.options.displayRemainingTime) {
        this.remainingTimeElement.style.display = 'block';
      }
      if (this.options.displayRemainingTimeIcons) {
        this.remainingTimePlayElement.classList.remove('vjs-hidden');
        this.remainingTimeMuteElement.classList.remove('vjs-hidden');
      }
      player.on('adtimeupdate', this.#onTimeUpdate);
    }
    player.loadingSpinner.el().style.display = 'none';
  };
  #onTimeUpdate = () => {
    this.player.loadingSpinner.el().style.display = 'none';
    const timeLeft = Math.ceil(this.skipDelay - this.player.currentTime());
    if (this.options.displayRemainingTime) {
      const remainingTimeLeft = Math.ceil(this.player.remainingTime());
      this.remainingTimeElement.innerHTML = this.options.messages.remainingTime.replace('{seconds}', remainingTimeLeft);
    }
    if (timeLeft > 0) {
      disableSkip(this.skipButtonElement);
      this.skipButtonElement.innerHTML = this.options.messages.skipCountdown.replace('{seconds}', timeLeft);
    } else {
      enableSkip(this.skipButtonElement);
      this.skipButtonElement.innerHTML = this.options.messages.skip;
    }
  };
}

/**
 *
 * @param {HTMLElement} skipButtonElement
 */
function isSkipEnabled(skipButtonElement) {
  return (' ' + skipButtonElement.className + ' ').indexOf(' enabled ') > -1;
}

/**
 *
 * @param {HTMLElement} skipButtonElement
 */
function disableSkip(skipButtonElement) {
  if (isSkipEnabled(skipButtonElement)) {
    skipButtonElement.className = skipButtonElement.className.replace(' enabled ', '');
  }
}

/**
 *
 * @param {HTMLElement} skipButtonElement
 */
function enableSkip(skipButtonElement) {
  if (!isSkipEnabled(skipButtonElement)) {
    skipButtonElement.className += ' enabled ';
  }
}
;// ./src/utils.mjs
/**
 *
 * @param {function} fn
 * @param {object|null} context
 * @return {function(): *}
 */
function once(fn, context = null) {
  let result;
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}
function linearFn(creative) {
  return creative.type === 'linear' && creative.mediaFiles.length;
}
function companionFn(creative) {
  return creative.type === 'companion';
}
function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function convertOffsetToSeconds(offsetCode, duration = null) {
  let result = null;
  if (typeof offsetCode === 'string') {
    if (offsetCode.includes('%')) {
      if (duration != null) {
        const percent = offsetCode.replace('%', '');
        result = percent / 100 * duration;
      }
    } else if (offsetCode.includes(':')) {
      const [hours, minutes, seconds] = offsetCode.split(':').slice(-3);
      result = parseInt(hours || 0, 10) * 3600 + parseInt(minutes || 0, 10) * 60 + parseInt(seconds || 0, 10);
    } else {
      result = parseInt(offsetCode);
    }
  }
  if (result == null) {
    result = Number(offsetCode);
  }
  return isNaN(result) ? null : result;
}
;// ./src/tracked-ad.mjs
class TrackedAd {
  #linearAdTracker;
  #companionTracker;
  #skipAfterDuration;
  /**
   *
   * @param {VASTTracker} linearAdTracker
   * @param {VASTTracker} companionTracker
   */
  constructor(linearAdTracker, companionTracker) {
    this.#linearAdTracker = linearAdTracker;
    this.#companionTracker = companionTracker;
    this.#skipAfterDuration = false;
  }
  get linearCreative() {
    return this.#linearAdTracker.creative;
  }
  get linearAdTracker() {
    return this.#linearAdTracker;
  }
  get companionTracker() {
    return this.#companionTracker;
  }

  /**
   *
   * @return {boolean}
   */
  get skipAfterDuration() {
    return this.#skipAfterDuration;
  }

  /**
   * @param {boolean} value
   */
  set skipAfterDuration(value) {
    this.#skipAfterDuration = value;
  }

  /**
   *
   * @return {boolean}
   */
  hasVideoMedia() {
    return this.linearCreative.mediaFiles.some(mediaFile => mediaFile && mediaFile.apiFramework == null);
  }
}
;// ./src/ad-loader.mjs




class AdLoader {
  #vastClient;
  #vastParser;
  #options;
  #adSelector;

  /**
   *
   * @param {VASTClient} vastClient
   * @param {VASTParser} vastParser
   * @param {AdSelector} adSelector
   * @param {object} options
   */
  constructor(vastClient, vastParser, adSelector, options) {
    this.#vastClient = vastClient;
    this.#vastParser = vastParser;
    this.#adSelector = adSelector;
    this.#options = options;
  }
  loadAds(params = {}) {
    return new Promise((accept, reject) => {
      const {
        url: urlConfig,
        xml
      } = params;
      const urls = (Array.isArray(urlConfig) ? urlConfig : [urlConfig]).filter(url => url != null);
      let promise;
      if (urls.length) {
        promise = Promise.resolve([]);
        urls.forEach(url => {
          promise = promise.then(ads => {
            if (ads == null || ads.length === 0) {
              return this.loadAdsWithUrl(url);
            } else {
              return ads;
            }
          }).catch(ignore => {
            return [];
          });
        });
      } else if (xml != null) {
        promise = this.loadAdsWithXml(xml);
      } else {
        throw new Error('xml or url must be set');
      }
      promise.then(accept).catch(reject);
    });
  }

  /**
   *
   * @param {XMLDocument|string} xml
   * @return Promise<Array[TrackedAd]>
   */
  loadAdsWithXml(xml) {
    return new Promise((accept, reject) => {
      let xmlDocument;
      if (xml.constructor === global_window.XMLDocument) {
        xmlDocument = xml;
      } else if (xml.constructor === String) {
        xmlDocument = new global_window.DOMParser().parseFromString(xml, 'application/xml');
      } else {
        throw new Error('xml config option must be a String or XMLDocument');
      }
      this.#vastParser.parseVAST(xmlDocument).then(this.#adSelector.selectAds).then(this.#createTrackedAds).then(accept).catch(reject);
    });
  }
  loadAdsWithUrl(url) {
    return new Promise((accept, reject) => {
      this.#vastClient.get(url, {
        withCredentials: this.#options.withCredentials,
        wrapperLimit: this.#options.wrapperLimit
      }).then(this.#adSelector.selectAds).then(this.#createTrackedAds).then(accept).catch(reject);
    });
  }

  /*** private methods ***/

  #createTrackedAds = ads => {
    const createTrackedAd = ad => {
      const linearAdTracker = new vast_client_.VASTTracker(this.#vastClient, ad, ad.creatives.find(linearFn), ad.creatives.find(companionFn));
      linearAdTracker.on('clickthrough', onClickThrough);
      let companionAdTracker = null;
      const companionCreative = ad.creatives.find(companionFn);
      if (companionCreative) {
        // Just pick the first suitable companion ad for now
        const options = this.#options;
        const variation = companionCreative.variations.filter(v => v.staticResource).filter(v => v.type.indexOf('image') === 0).find(v => parseInt(v.width, 10) <= options.companion.maxWidth && parseInt(v.height, 10) <= options.companion.maxHeight);
        if (variation) {
          companionAdTracker = new vast_client_.VASTTracker(this.#vastClient, ad, companionCreative, variation);
          companionAdTracker.on('clickthrough', onClickThrough);
        }
      }
      return new TrackedAd(linearAdTracker, companionAdTracker);
    };
    return ads.map(createTrackedAd);
  };
}
function onClickThrough(url) {
  global_window.open(url, '_blank');
}
;// ./src/ad-selector.mjs

class AdSelector {
  /**
   *
   * @param {object} vastResponse
   * @return {object[]}
   */
  selectAds(vastResponse) {
    if (!vastResponse.ads || vastResponse.ads.length === 0) {
      throw new Error('no ads found in VAST');
    }
    const adsWithLinear = vastResponse.ads.filter(ad => ad.creatives.some(linearFn));
    if (!adsWithLinear.length) {
      throw new Error('no linear ads found in VAST');
    }
    const adPod = adsWithLinear.filter(ad => ad.sequence);
    if (adPod.length) {
      return adPod.sort((ad1, ad2) => ad1.sequence - ad2.sequence);
    } else {
      const standaloneAds = adsWithLinear.filter(ad => !adPod.includes(ad));
      return standaloneAds.slice(0, 1);
    }
  }
}
// EXTERNAL MODULE: ./node_modules/vpaid-html5-client/js/VPAIDHTML5Client.js
var VPAIDHTML5Client = __webpack_require__(289);
;// ./src/event.mjs
/**
 *
 * @param {VASTTracker} vastTracker
 * @return {object|undefined}
 */
function createVASTContext(vastTracker) {
  if (vastTracker) {
    const ad = vastTracker.ad;
    const creative = vastTracker.creative;
    return {
      mediaFiles: creative.mediaFiles.map(mediaFile => Object.assign({}, mediaFile)),
      adSequenceId: ad.sequence,
      adId: ad.id,
      creativeAdId: creative.id
    };
  }
}
;// ./src/vpaid-handler.mjs





const VALID_TYPES = ['application/x-javascript', 'text/javascript', 'application/javascript'];
class VPAIDHandler {
  #forceStopDone;
  #cancelled;
  #started;
  #player;
  #options;
  #eventTarget;
  constructor(player, options) {
    this.#player = player;
    this.#options = options;
    this.#eventTarget = new videojs.EventTarget();
  }
  handle(tracker) {
    this.#cancelled = false;
    this.#started = false;
    this.#forceStopDone = false;
    return new Promise((resolve, reject) => {
      const options = this.#options;
      const player = this.#player;
      /**
       *
       * @type {HTMLElement|null}
       */
      let container = null;
      let containerAttributes = {};
      let containerIsFixed = false;

      /**
       * "timeout" | Error
       * @param {string|Error} err
       * @param adUnit
       */
      const adUnitLoad = (err, adUnit) => {
        let videoElement;
        if (err) {
          reject(err);
          return;
        }
        const onAdComplete = () => {
          cleanUp();
          resolve();
          player.trigger('vpaid.AdStopped');
          player.trigger({
            type: 'vast.adEnd',
            vast: createVASTContext(tracker)
          });
        };
        adUnit.subscribe('AdStopped', onAdComplete);
        const forceStopAd = err => {
          if (adUnit && !this.#forceStopDone) {
            adUnit.unsubscribe('AdStopped', onAdComplete);
            const onAdCancel = () => {
              this.#forceStopDone = true;
              cleanUp();
              reject(err);
              player.trigger('vpaid.AdStopped');
            };
            subscribeWithTimeout(adUnit, 'AdStopped', onAdCancel, onAdCancel);
            adUnit.stopAd();
          } else {
            this.#forceStopDone = true;
            reject(err);
          }
        };
        this.#eventTarget.on('forceStopAd', forceStopAd);
        if (this.#cancelled) {
          forceStopAd('Received cancel signal from player');
          return;
        }
        function cleanUp() {
          player.controlBar.show();
          player.off('playerresize', resizeAd);
          if (options.vpaid.videoInstance === 'new' && videoElement.parentElement) {
            videoElement.parentElement.removeChild(videoElement);
          }
          vpaidClient.destroy();

          // Some VPAID creatives don't clean up after themselves
          if (container) {
            if (containerIsFixed) {
              container.innerHTML = '';
              const before = containerAttributes;
              const after = getAttributes(container);
              for (const [key, value] of Object.entries(after)) {
                if (before.hasOwnProperty(key)) {
                  if (before[key] !== value) {
                    // restore changed
                    container.setAttribute(key, before[key]);
                  }
                } else {
                  // removed added
                  container.removeAttribute(key);
                }
              }
              for (const [key, value] of Object.entries(before)) {
                if (!after.hasOwnProperty(key)) {
                  // restore removed
                  container.setAttribute(key, value);
                }
              }
            } else if (container.parentElement) {
              container.parentElement.removeChild(container);
            }
            container = null;
          }
        }
        const onHandShake = (error, version) => {
          if (error) {
            log.console(error);
            forceStopAd('Error on VPAID handshake');
            return;
          }
          const creativeData = {
            AdParameters: creative.adParameters || '',
            Duration: creative.duration || 30,
            SkipTime: options.skip,
            ClickURL: creative.videoClickThroughURLTemplate?.url || 'about:blank',
            All: creative,
            Options: options
          };
          const videoInstance = options.vpaid.videoInstance;
          if (videoInstance === 'same') {
            videoElement = player.tech({
              kindaKnowWhatImDoing: true
            }).el();
          } else if (videoInstance === 'new') {
            videoElement = global_window.document.createElement('video');
            videoElement.style.cssText = 'position:absolute; top:0; left:0; z-index:2 !important;';
            container.appendChild(videoElement);
          } else {
            if (videoInstance !== 'none') {
              console.log(`${videoInstance} is an invalid videoInstance value. Defaulting to \'none\'.`);
            }
            videoElement = null;
          }
          const environmentVars = {
            slot: container,
            videoSlot: videoElement
            // videoSlotCanAutoPlay: true
          };
          subscribeWithTimeout(adUnit, 'AdLoaded', onAdLoaded, forceStopAd);
          const viewMode = player.isFullscreen() ? 'fullscreen' : 'normal';
          adUnit.subscribe('AdError', message => {
            // General VPAID Error = 901 (in VAST 3 spec)
            tracker.error({
              ERRORCODE: 901
            });
            this.#forceStopDone = true;
            cleanUp();
            reject(`Fatal VPAID Error: ${typeof message === 'object' ? JSON.stringify(message) : message}`);
            player.trigger({
              type: 'vpaid.AdError',
              error: message
            });
          });
          adUnit.initAd(player.currentWidth(), player.currentHeight(), viewMode, -1, creativeData, environmentVars);
        };
        const onAdLoaded = () => {
          if (this.#cancelled) {
            forceStopAd('Received cancel signal');
            return;
          }
          adUnit.subscribe('AdSkipped', () => {
            tracker.skip();
            player.trigger('vpaid.AdSkipped');
            player.trigger({
              type: 'vast.adSkip',
              vast: createVASTContext(tracker)
            });
          });
          adUnit.subscribe('AdVolumeChange', () => {
            const lastVolume = player.volume();
            adUnit.getAdVolume((error, currentVolume) => {
              if (error) return;
              if (currentVolume === 0 && lastVolume > 0) {
                tracker.setMuted(true);
              } else if (currentVolume > 0 && lastVolume === 0) {
                tracker.setMuted(false);
              }
              player.volume(currentVolume);
              player.trigger('vpaid.AdVolumeChange');
            });
          });
          adUnit.subscribe('AdImpression', () => {
            // will also trigger createView
            tracker.trackImpression();
            player.trigger('vpaid.AdImpression');
          });
          adUnit.subscribe('AdClickThru',
          /**
           *
           * @param {string} url
           * @param {string} id
           * @param {boolean} playerHandles
           */
          ({
            url,
            id,
            playerHandles
          }) => {
            if (!playerHandles) {
              tracker.once('clickthrough', resolvedUrl => {
                global_window.open(resolvedUrl, '_blank');
              });
            }
            // The url here is a fallback - the tracker will use VAST click url if it exists.
            tracker.click(url);
            player.trigger('vpaid.AdClickThru');
          });
          adUnit.subscribe('AdVideoFirstQuartile', () => {
            tracker.track('firstQuartile');
            player.trigger('vpaid.AdVideoFirstQuartile');
          });
          adUnit.subscribe('AdVideoMidpoint', () => {
            tracker.track('midpoint');
            player.trigger('vpaid.AdVideoMidpoint');
          });
          adUnit.subscribe('AdVideoThirdQuartile', () => {
            tracker.track('thirdQuartile');
            player.trigger('vpaid.AdVideoThirdQuartile');
          });
          adUnit.subscribe('AdVideoComplete', () => {
            tracker.track('complete');
            player.trigger('vpaid.AdVideoComplete');
          });
          adUnit.subscribe('AdUserAcceptInvitation', () => {
            tracker.acceptInvitation();
            player.trigger('vpaid.AdUserAcceptInvitation');
          });
          adUnit.subscribe('AdUserMinimize', () => {
            tracker.minimize();
            player.trigger('vpaid.AdUserMinimize');
          });
          adUnit.subscribe('AdUserClose', () => {
            tracker.close();
            player.trigger('vpaid.AdUserClose');
          });
          adUnit.subscribe('AdPaused', () => {
            tracker.setPaused(true);
            player.trigger('vpaid.AdPaused');
          });
          adUnit.subscribe('AdPlaying', () => {
            tracker.setPaused(false);
            player.trigger('vpaid.AdPlaying');
          });
          adUnit.getAdLinear(withTimeout((err, isLinear) => {
            if (this.#cancelled) {
              forceStopAd('Received cancel signal');
              return;
            }
            if (err) {
              forceStopAd(err);
            } else if (!isLinear) {
              // TODO: support overlay banner
              forceStopAd('Non-linear not supported');
            } else {
              startLinearAd();
            }
          }, () => {
            forceStopAd('Unable to get mode of operation: linear or non-linear');
          }));
          const startLinearAd = () => {
            player.controlBar.hide();

            // A VPAID adunit may (incorrectly?) call AdStarted again for the first quartile event
            const onAdStartedOnce = once(onAdStarted);
            subscribeWithTimeout(adUnit, 'AdStarted', onAdStartedOnce, forceStopAd);
            adUnit.startAd();
          };
        };
        const onAdStarted = () => {
          if (!this.#cancelled) {
            this.#started = true;
            tracker.track('start');
            player.on('playerresize', resizeAd);
            player.trigger('ads-ad-started'); // notify videojs-contrib-ads
            player.trigger({
              type: 'vast.adStart',
              vast: createVASTContext(tracker)
            });
          } else {
            forceStopAd('Received cancel signal');
          }
        };
        const resizeAd = () => {
          adUnit.resizeAd(player.currentWidth(), player.currentHeight(), player.isFullscreen() ? 'fullscreen' : 'normal');
        };

        // not async so no timeout is required
        adUnit.handshakeVersion('2.0', onHandShake);
      };
      const creative = tracker.creative;
      const vpaidMediaFile = creative.mediaFiles.find(mediaFile => mediaFile.apiFramework === 'VPAID' && validMime(mediaFile));
      if (!vpaidMediaFile) {
        throw new Error('Invalid VPAID media file: only JavaScript is supported');
      }
      const techScreen = player.el().querySelector('.vjs-tech');
      container = findHtmlContainer(options);
      if (!container) {
        // ideally we want to create a fresh container element (no state attributes (i.e. 'data-ad-processed') or
        // event listeners attached by previous ad)
        container = createHtmlContainer(options);
        containerIsFixed = false;
      } else {
        containerIsFixed = true;
      }
      containerAttributes = getAttributes(container);
      player.el().insertBefore(container, player.controlBar.el());
      const vpaidClient = new VPAIDHTML5Client(container, techScreen, {});
      vpaidClient.loadAdUnit(vpaidMediaFile.fileURL, adUnitLoad);
    });
  }

  // TODO: review. may not need.
  cancel() {
    this.#cancelled = true;
    if (this.#started) {
      this.#eventTarget.trigger('forceStopAd');
    }
  }
}
function validMime(mediaFile) {
  return VALID_TYPES.indexOf(mediaFile.mimeType.trim()) > -1;
}
function createHtmlContainer(options) {
  const containerId = options.vpaid.containerId;
  const containerClass = options.vpaid.containerClass;
  const vpaidContainerElement = global_document.createElement('div');
  if (containerId) {
    vpaidContainerElement.setAttribute('id', containerId);
  }
  if (containerClass) {
    vpaidContainerElement.classList.add(containerClass);
  }
  return vpaidContainerElement;
}
function findHtmlContainer(options) {
  const containerId = options.vpaid.containerId;
  const containerClass = options.vpaid.containerClass;
  let vpaidContainerElement = global_document.getElementById(containerId);
  if (!vpaidContainerElement) {
    vpaidContainerElement = global_document.getElementsByClassName(containerClass)[0];
  }
  return vpaidContainerElement;
}

/**
 *
 * @param {HTMLElement} element
 * @return {{}}
 */
function getAttributes(element) {
  const obj = {};
  for (const attr of element.attributes) {
    obj[attr.name] = attr.value;
  }
  return obj;
}

/**
 *
 * @param {function} handler
 * @param {function()|null} timeoutFn
 * @return {function(): void}
 */

function withTimeout(handler, timeoutFn = null) {
  // TODO: configurable timeout
  const id = setTimeout(() => {
    handler = () => {};
    if (timeoutFn) {
      timeoutFn();
    }
  }, 10000);
  return function () {
    clearTimeout(id);
    handler.apply(null, arguments);
  };
}

/**
 * @param {object} adUnit
 * @param {string} evtName
 * @param {function} handler
 * @param {function(Error)} timeoutFn
 */
function subscribeWithTimeout(adUnit, evtName, handler, timeoutFn) {
  const fn = withTimeout(handler, () => {
    if (timeoutFn) {
      timeoutFn(new Error(`Timeout while waiting for ${evtName} event.`));
    }
  });
  adUnit.subscribe(evtName, fn);
}
;// ./src/vast-plugin.mjs









const Plugin = external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_.getPlugin('plugin');
const DEFAULT_OPTIONS = Object.freeze({
  seekEnabled: false,
  controlsEnabled: false,
  wrapperLimit: 10,
  withCredentials: true,
  skip: 0,
  displayRemainingTime: false,
  displayRemainingTimeIcons: false,
  messages: {
    skip: 'Skip',
    skipCountdown: 'Skip in {seconds}...',
    remainingTime: 'This ad will end in {seconds}'
  },
  vpaid: {
    containerId: undefined,
    containerClass: 'vjs-vpaid-container',
    videoInstance: 'none'
  },
  companion: {
    elementId: null,
    maxWidth: 0,
    maxHeight: 0
  },
  honorSkipOffset: false
});

/**
 * VastPlugin
 */
class VastPlugin extends Plugin {
  /**
   * Constructor
   *
   * @param {Object} player The videojs object
   * @param {Object} options Plugin config
   */
  constructor(player, options) {
    super(player);
    // Could be initialized already by user
    if (typeof player.ads === 'function') {
      player.ads({
        debug: false,
        liveCuePoints: false
      });
    }
    player.on('play', function () {
      console.log('play event triggered');
    });
    console.log(`videojsx-vast-plugin running`);
    const mergeOptionsFunction = parseInt(external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_.VERSION, 10) >= 8 ? external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_.obj.merge : external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_.mergeOptions;
    options = mergeOptionsFunction(DEFAULT_OPTIONS, options || {});

    /** @type {VASTClient} */
    const vastClient = new vast_client_.VASTClient();
    /** @type {TrackedAd[]} */
    const ads = [];
    /** @type {TrackedAd|null} */
    let currentAd = null;
    /** @type {Number} */
    let adCount = 0;
    /** @type {Number} */
    let adTotal = 0;
    /** @type {VPAIDHandler} */
    const vpaidHandler = new VPAIDHandler(player, options);
    /** @type {boolean} */
    let timedOut = false;
    /** @type {string|null} */
    let currentAdSrc = null;
    let schedule = options.schedule;
    if (schedule == null || schedule.length === 0) {
      schedule = [{
        offset: 0,
        url: options.url || null,
        xml: options.xml || null
      }];
    } else {
      schedule = cloneJson(schedule);
      schedule.forEach(item => delete item.offsetInSeconds);
    }
    const preRollScheduleItem = findFirstPreroll(schedule);
    const postRollScheduleItem = findFirstPostroll(schedule);
    const midRollScheduleItems = findAllMidrolls(schedule).sort((a, b) => a.offset - b.offset);
    const autoplay = player.autoplay();
    player.on('adtimeout', () => {
      // failed to show an ad on time when in the "play" state
      timedOut = true;
    });
    const ui = new UI(player, options);
    function reset() {
      ads.length = 0;
      if (player.ads.isInAdMode()) {
        // playNextAd knows how to cleanup when no more ads
        playNextAd();
      }
    }
    function skip() {
      if (currentAd?.hasVideoMedia()) {
        currentAd.linearAdTracker.skip();
        player.trigger({
          type: 'vast.skipAd',
          vast: createVASTContext(currentAd.linearAdTracker)
        });
        playNextAd();
      }
    }
    ui.on('skip', skip);
    ui.on('click', () => {
      currentAd.linearAdTracker.click();
    });
    const onTimeUpdate = (() => {
      let lock = false;
      return () => {
        if (lock) return;
        let offsetInSeconds = null;
        while (midRollScheduleItems.length > 0) {
          offsetInSeconds = midRollScheduleItems[0].offsetInSeconds;
          if (offsetInSeconds != null) {
            break;
          }
          const {
            offset
          } = midRollScheduleItems[0];
          offsetInSeconds = convertOffsetToSeconds(offset, player.duration());
          if (offsetInSeconds == null) {
            midRollScheduleItems.shift();
          } else {
            midRollScheduleItems[0].offsetInSeconds = offsetInSeconds;
          }
        }
        if (offsetInSeconds != null) {
          if (this.player.currentTime() > offsetInSeconds) {
            lock = true;
            const scheduleItem = midRollScheduleItems.shift();
            adLoader.loadAds(scheduleItem).then(trackedAds => {
              if (trackedAds.length > 0) {
                ads.push(...trackedAds);
                currentAd = null;
                startAdBreak();
              }
            }).catch(err => {
              // eslint-disable-next-line no-console
              console.log(`An error occurred when loading ads for the midroll ad break: : ${err?.message}`);
            }).finally(() => {
              lock = false;
            });
          }
        }
      };
    })();
    if (midRollScheduleItems.length > 0) {
      player.on('timeupdate', onTimeUpdate);
    }
    player.on('readyforpostroll', () => {
      timedOut = false;
      if (!postRollScheduleItem) {
        player.trigger('nopostroll');
        return;
      }
      adLoader.loadAds(postRollScheduleItem).then(trackedAds => {
        if (timedOut) {
          trackedAds.forEach(ad => {
            ad.linearAdTracker.error({
              ERRORCODE: 301 // VAST redirect timeout reached
            });
          });
        } else if (trackedAds.length > 0) {
          ads.push(...trackedAds);
          currentAd = null;
          startAdBreak();
        } else {
          player.trigger('nopostroll');
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(`An error occurred when loading ads for the postroll ad break: : ${err.message}`);
        player.trigger('nopostroll');
      });
    });
    player.on('readyforpreroll', () => {
      startAdBreak();
    });
    player.on('contentchanged', () => {
      // content will most likely have a different length so we need to recalculate offsets again later
      midRollScheduleItems.forEach(item => delete item.offsetInSeconds);
      startAds();
    });
    player.on('adloadstart', () => {
      const src = player.currentSrc();
      // something outside this plugin changed the video source during ad play
      if (src !== currentAdSrc) {
        // we are going to a different content source so we don't want a full restore
        player.ads.disableNextSnapshotRestore = true;

        // do partial restore instead (will style be enough?)
        const snapshotObject = player.ads.snapshot;
        if (snapshotObject) {
          const tech = player.$('.vjs-tech');
          if (tech && 'style' in snapshotObject) {
            tech.setAttribute('style', snapshotObject.style || '');
          }
        }

        // contrib-ads don't support changing source during ad play.
        // so we set we contentSrc ourselves (this is how contrib-ads tracks current content source).
        const oldSource = player.ads.contentSrc;
        player.ads.contentSrc = src;

        // this includes calling endLinearMode
        reset();

        // transition from ad state with content resuming to content state (so that
        // startLinearMode will work)
        player.trigger('contentresumed');

        // contentchanged = trigger new ad workflow in contrib-ads
        player.trigger('contentchanged');

        // we'll support deprecated event until it's removed from contrib-ads
        player.trigger({
          type: 'contentupdate',
          oldValue: oldSource,
          newValue: src
        });
      }
    });
    const adLoader = new AdLoader(vastClient, new vast_client_.VASTParser(), new AdSelector(), options);
    function startAds() {
      const signalAdsReady = once(() => {
        // Can only signal 'adsready' in Preroll and BeforePreroll states (in videojs-contrib-ads).
        // So we need to signal even when we have no pre-rolls - because we may get mid or post rolls later.
        player.trigger('adsready');
      });

      // TODO: calculate reasonable timeout based on contrib-ads settings
      setTimeout(signalAdsReady, 3000);
      adLoader.loadAds(preRollScheduleItem).then(trackedAds => {
        if (timedOut) {
          trackedAds.forEach(ad => {
            ad.linearAdTracker.error({
              ERRORCODE: 301 // VAST redirect timeout reached
            });
          });
        } else if (trackedAds.length > 0) {
          ads.push(...trackedAds);
          currentAd = null;
          // do not start ad break here
        } else {
          player.trigger('nopreroll');
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(`An error occurred when loading ads for the preroll ad break: ${err.message}`);
        player.trigger('nopreroll');
      }).finally(() => {
        signalAdsReady();
        if (autoplay) {
          player.play();
        }
      });
    }
    startAds();

    /**
     * Create Source Objects
     *
     * @param {Array<MediaFile>} mediaFiles  Array of media files
     * @return {Array} Array of source objects
     */
    const createSourceObjects = mediaFiles => {
      return mediaFiles.filter(mediaFile => mediaFile.apiFramework == null).map(mediaFile => ({
        type: mediaFile.mimeType,
        src: mediaFile.fileURL
      }));
    };
    const playNextAd = () => {
      const nextAd = ads.shift();

      // do not change ui for vpaid
      if (nextAd?.hasVideoMedia()) {
        if (!currentAd?.hasVideoMedia()) {
          ui.setUp();
        }
      } else {
        if (currentAd?.hasVideoMedia()) {
          ui.tearDown();
        }
      }
      if (nextAd) {
        currentAd = nextAd;
        adCount++;
        console.log(`Playing ad ${adCount}/${adTotal}`);
        if (currentAd.hasVideoMedia()) {
          const allMediaFiles = currentAd.linearCreative.mediaFiles;
          const streamingMediaFiles = allMediaFiles.filter(mediaFile => mediaFile.deliveryType === 'streaming');
          const nonStreamingMediaFiles = allMediaFiles.filter(mediaFile => mediaFile.deliveryType !== 'streaming');
          if (nonStreamingMediaFiles.length > 0) {
            player.src(createSourceObjects(nonStreamingMediaFiles));
            currentAdSrc = player.src();
          } else if (streamingMediaFiles.length > 0) {
            let assetDuration = currentAd.linearAdTracker.assetDuration;
            if (assetDuration == null || assetDuration < 1) {
              console.log('Streaming ads must have a duration');
              playNextAd();
              return;
            }
            player.src(createSourceObjects(streamingMediaFiles));
            currentAdSrc = player.src();
            currentAd.skipAfterDuration = true;
          }
          ui.duration = currentAd.linearAdTracker.assetDuration || 0;
          const skipDelay = currentAd.linearAdTracker.skipDelay;
          ui.skipDelay = skipDelay != null && options.honorSkipOffset ? skipDelay : options.skip;
        } else {
          vpaidHandler.handle(currentAd.linearAdTracker).then(() => {
            playNextAd();
          }).catch(err => {
            console.log(err);
            playNextAd();
          });
        }
        showCompanionAd();
      } else {
        endAdBreak();
      }
    };
    const {
      setUpEvents,
      tearDownEvents
    } = (() => {
      const adPlayFn = () => {
        if (currentAd.skipAfterDuration) {
          const ad = currentAd;
          setTimeout(() => {
            if (currentAd === ad) {
              skip();
            }
          }, ad.linearAdTracker.assetDuration * 1000);
        }
        if (!currentAd.linearAdTracker.impressed && currentAd.hasVideoMedia()) {
          currentAd.linearAdTracker.trackImpression();
          player.trigger({
            type: 'vast.adStart',
            vast: createVASTContext(currentAd.linearAdTracker)
          });
        }
      };
      const timeupdateFn = () => {
        if (currentAd) {
          if (isNaN(currentAd.linearAdTracker.assetDuration)) {
            currentAd.linearAdTracker.assetDuration = player.duration();
          }
          currentAd.linearAdTracker.setProgress(player.currentTime());
        }
      };
      const pauseFn = () => {
        if (player.remainingTime() > 0) {
          currentAd.linearAdTracker.setPaused(true);
          player.one('adplay', () => {
            currentAd.linearAdTracker.setPaused(false);
          });
        }
      };

      // args: err
      const adErrorFn = () => {
        const MEDIAFILE_PLAYBACK_ERROR = 405;
        currentAd.linearAdTracker.error({
          ERRORCODE: MEDIAFILE_PLAYBACK_ERROR
        });
        // Do not want to show VAST related errors to the user
        player.error(null);
        playNextAd();
      };
      const fullScreenFn = () => {
        // for 'fullscreen' & 'exitfullscreen'
        currentAd.linearAdTracker.setFullscreen(player.isFullscreen());
      };
      const muteFn = (() => {
        let previousMuted = player.muted();
        let previousVolume = player.volume();
        return () => {
          const volumeNow = player.volume();
          const mutedNow = player.muted();
          if (previousMuted !== mutedNow) {
            currentAd.linearAdTracker.setMuted(mutedNow);
            previousMuted = mutedNow;
          } else if (previousVolume !== volumeNow) {
            if (previousVolume > 0 && volumeNow === 0) {
              currentAd.linearAdTracker.setMuted(true);
            } else if (previousVolume === 0 && volumeNow > 0) {
              currentAd.linearAdTracker.setMuted(false);
            }
            previousVolume = volumeNow;
          }
        };
      })();
      const adEndedFn = () => {
        // Ad ended, not skipped
        if (currentAd.hasVideoMedia()) {
          currentAd.linearAdTracker.complete();
          player.trigger({
            type: 'vast.adEnd',
            vast: createVASTContext(currentAd.linearAdTracker)
          });
          playNextAd();
        }
      };
      return {
        setUpEvents: () => {
          player.on('adended', adEndedFn);
          player.on('adplay', adPlayFn);
          player.on('adtimeupdate', timeupdateFn);
          player.on('adpause', pauseFn);
          player.on('aderror', adErrorFn);
          player.on('advolumechange', muteFn);
          player.on('fullscreenchange', fullScreenFn);
        },
        tearDownEvents: () => {
          player.off('adended', adEndedFn);
          player.off('adplay', adPlayFn);
          player.off('adtimeupdate', timeupdateFn);
          player.off('adpause', pauseFn);
          player.off('aderror', adErrorFn);
          player.off('advolumechange', muteFn);
          player.off('fullscreenchange', fullScreenFn);
        }
      };
    })();
    const showCompanionAd = () => {
      const companionTracker = currentAd.companionTracker;
      const dest = global_document.getElementById(options.companion.elementId);
      if (companionTracker && companionTracker.variation && dest) {
        const variation = companionTracker.variation;
        const onClick = () => {
          companionTracker.click();
        };
        const hyperLink = global_document.createElement('a');
        hyperLink.src = '#';
        hyperLink.addEventListener('click', onClick);
        const image = global_document.createElement('img');
        image.src = variation.staticResource;
        hyperLink.appendChild(image);
        dest.innerHTML = '';
        dest.appendChild(hyperLink);
      } else if (dest) {
        // TODO: option to remove last companion ad when content plays?
        dest.innerHTML = '';
      }
    };
    const startAdBreak = () => {
      adTotal = ads.length;
      console.log(`Playing ${adTotal} ads`);
      player.ads.startLinearAdMode();
      setUpEvents();
      playNextAd();
    };
    function isPreroll(scheduleItem) {
      return scheduleItem.offset === 0 || scheduleItem.offset == null || scheduleItem.offset === 'pre';
    }
    function isPostroll(scheduleItem) {
      return scheduleItem.offset === 'post';
    }
    function findFirstPreroll(schedule) {
      return schedule.find(isPreroll);
    }
    function findFirstPostroll(schedule) {
      return schedule.find(isPostroll);
    }
    function findAllMidrolls(schedule) {
      return schedule.filter(item => !isPreroll(item) && !isPostroll(item));
    }
    const endAdBreak = () => {
      currentAdSrc = null;
      currentAd = null;
      adCount = 0;
      player.ads.endLinearAdMode();
      tearDownEvents();
      console.log('Playing content');
    };
  }
}
//external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_.registerPlugin('vast', VastPlugin);
;// ./src/index.js









//external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_default().registerPlugin('vast', VastPlugin);
const videojsxVast = {
  VastPlugin: VastPlugin,
  VASTClient: vast_client_.VASTClient,
  VASTParser: vast_client_.VASTParser,
  VASTTracker: vast_client_.VASTTracker,
  AdLoader: AdLoader,
  AdSelector: AdSelector,
  TrackedAd: TrackedAd,
  VPAIDHandler: VPAIDHandler,
  utils: {
    createVASTContext: createVASTContext,
    once: once,
    linearFn: linearFn,
    companionFn: companionFn,
    cloneJson: cloneJson,
    convertOffsetToSeconds: convertOffsetToSeconds
  },
  createClient: () => new vast_client_.VASTClient(),
  createParser: () => new vast_client_.VASTParser(),
  createAdLoader: (options = {}) => {
    const client = new vast_client_.VASTClient();
    const parser = new vast_client_.VASTParser();
    const selector = new AdSelector();
    return new AdLoader(client, parser, selector, options);
  }
};
//(external_root_videojs_commonjs_video_js_commonjs2_video_js_amd_video_js_default()).vast = videojsxVast;
/* harmony default export */ const src = (videojsxVast);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});