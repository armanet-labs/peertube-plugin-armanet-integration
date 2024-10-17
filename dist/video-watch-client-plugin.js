var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// external-global-plugin:video.js
var require_video = __commonJS({
  "external-global-plugin:video.js"(exports, module) {
    module.exports = window.videojs;
  }
});

// node_modules/global/window.js
var require_window = __commonJS({
  "node_modules/global/window.js"(exports, module) {
    var win;
    if (typeof window !== "undefined") {
      win = window;
    } else if (typeof global !== "undefined") {
      win = global;
    } else if (typeof self !== "undefined") {
      win = self;
    } else {
      win = {};
    }
    module.exports = win;
  }
});

// (disabled):node_modules/min-document/index.js
var require_min_document = __commonJS({
  "(disabled):node_modules/min-document/index.js"() {
  }
});

// node_modules/global/document.js
var require_document = __commonJS({
  "node_modules/global/document.js"(exports, module) {
    var topLevel = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
    var minDoc = require_min_document();
    var doccy;
    if (typeof document !== "undefined") {
      doccy = document;
    } else {
      doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
      if (!doccy) {
        doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
      }
    }
    module.exports = doccy;
  }
});

// public/scripts/videojs.ads.min.js
var require_videojs_ads_min = __commonJS({
  "public/scripts/videojs.ads.min.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_video(), require_window(), require_document()) : typeof define === "function" && define.amd ? define(["video.js", "global/window", "global/document"], factory) : (global2 = global2 || self, global2.videojsContribAds = factory(global2.videojs, global2.window, global2.document));
    })(exports, function(videojs2, window2, document2) {
      "use strict";
      videojs2 = videojs2 && videojs2.hasOwnProperty("default") ? videojs2["default"] : videojs2;
      window2 = window2 && window2.hasOwnProperty("default") ? window2["default"] : window2;
      document2 = document2 && document2.hasOwnProperty("default") ? document2["default"] : document2;
      var version = "6.9.0";
      function getAds(player) {
        return {
          disableNextSnapshotRestore: false,
          _contentEnding: false,
          _contentHasEnded: false,
          _hasThereBeenALoadStartDuringPlayerLife: false,
          _hasThereBeenALoadedData: false,
          _hasThereBeenALoadedMetaData: false,
          _inLinearAdMode: false,
          _shouldBlockPlay: false,
          _playBlocked: false,
          _playRequested: false,
          adType: null,
          VERSION: version,
          reset: function reset() {
            player.ads.disableNextSnapshotRestore = false;
            player.ads._contentEnding = false;
            player.ads._contentHasEnded = false;
            player.ads.snapshot = null;
            player.ads.adType = null;
            player.ads._hasThereBeenALoadedData = false;
            player.ads._hasThereBeenALoadedMetaData = false;
            player.ads._cancelledPlay = false;
            player.ads._shouldBlockPlay = false;
            player.ads._playBlocked = false;
            player.ads.nopreroll_ = false;
            player.ads.nopostroll_ = false;
            player.ads._playRequested = false;
          },
          startLinearAdMode: function startLinearAdMode() {
            player.ads._state.startLinearAdMode();
          },
          endLinearAdMode: function endLinearAdMode() {
            player.ads._state.endLinearAdMode();
          },
          skipLinearAdMode: function skipLinearAdMode() {
            player.ads._state.skipLinearAdMode();
          },
          stitchedAds: function stitchedAds(arg) {
            if (arg !== void 0) {
              videojs2.log.warn("Using player.ads.stitchedAds() as a setter is deprecated, it should be set as an option upon initialization of contrib-ads.");
              this.settings.stitchedAds = !!arg;
            }
            return this.settings.stitchedAds;
          },
          videoElementRecycled: function videoElementRecycled() {
            if (player.ads.shouldPlayContentBehindAd(player)) {
              return false;
            }
            if (!this.snapshot) {
              throw new Error("You cannot use videoElementRecycled while there is no snapshot.");
            }
            var srcChanged = player.tech_.src() !== this.snapshot.src;
            var currentSrcChanged = player.currentSrc() !== this.snapshot.currentSrc;
            return srcChanged || currentSrcChanged;
          },
          isLive: function isLive(somePlayer) {
            if (somePlayer === void 0) {
              somePlayer = player;
            }
            if (typeof somePlayer.ads.settings.contentIsLive === "boolean") {
              return somePlayer.ads.settings.contentIsLive;
            } else if (somePlayer.duration() === Infinity) {
              return true;
            } else if (videojs2.browser.IOS_VERSION === "8" && somePlayer.duration() === 0) {
              return true;
            }
            return false;
          },
          shouldPlayContentBehindAd: function shouldPlayContentBehindAd(somePlayer) {
            if (somePlayer === void 0) {
              somePlayer = player;
            }
            if (!somePlayer) {
              throw new Error("shouldPlayContentBehindAd requires a player as a param");
            } else if (!somePlayer.ads.settings.liveCuePoints) {
              return false;
            } else {
              return !videojs2.browser.IS_IOS && !videojs2.browser.IS_ANDROID && somePlayer.duration() === Infinity;
            }
          },
          shouldTakeSnapshots: function shouldTakeSnapshots(somePlayer) {
            if (somePlayer === void 0) {
              somePlayer = player;
            }
            return !this.shouldPlayContentBehindAd(somePlayer) && !this.stitchedAds();
          },
          isInAdMode: function isInAdMode() {
            return this._state.isAdState();
          },
          isWaitingForAdBreak: function isWaitingForAdBreak() {
            return this._state.isWaitingForAdBreak();
          },
          isContentResuming: function isContentResuming() {
            return this._state.isContentResuming();
          },
          isAdPlaying: function isAdPlaying() {
            return this._state.inAdBreak();
          },
          inAdBreak: function inAdBreak() {
            return this._state.inAdBreak();
          },
          removeNativePoster: function removeNativePoster() {
            var tech = player.$(".vjs-tech");
            if (tech) {
              tech.removeAttribute("poster");
            }
          },
          debug: function debug() {
            if (this.settings.debug) {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              if (args.length === 1 && typeof args[0] === "string") {
                videojs2.log("ADS: " + args[0]);
              } else {
                videojs2.log.apply(videojs2, ["ADS:"].concat(args));
              }
            }
          }
        };
      }
      var cancelEvent = function cancelEvent2(player, event) {
        event.isImmediatePropagationStopped = function() {
          return true;
        };
        event.cancelBubble = true;
        event.isPropagationStopped = function() {
          return true;
        };
      };
      var prefixEvent = function prefixEvent2(player, prefix, event) {
        cancelEvent(player, event);
        player.trigger({
          type: prefix + event.type,
          originalEvent: event
        });
      };
      var handlePlaying = function handlePlaying2(player, event) {
        if (player.ads.isInAdMode()) {
          if (player.ads.isContentResuming()) {
            if (player.ads._contentEnding) {
              prefixEvent(player, "content", event);
            }
          } else {
            prefixEvent(player, "ad", event);
          }
        }
      };
      var handleEnded = function handleEnded2(player, event) {
        if (player.ads.isInAdMode()) {
          if (player.ads.isContentResuming()) {
            cancelEvent(player, event);
            player.trigger("resumeended");
          } else {
            prefixEvent(player, "ad", event);
          }
        } else if (!player.ads._contentHasEnded && !player.ads.stitchedAds()) {
          prefixEvent(player, "content", event);
          player.trigger("readyforpostroll");
        }
      };
      var handleLoadEvent = function handleLoadEvent2(player, event) {
        if (event.type === "loadstart" && !player.ads._hasThereBeenALoadStartDuringPlayerLife || event.type === "loadeddata" && !player.ads._hasThereBeenALoadedData || event.type === "loadedmetadata" && !player.ads._hasThereBeenALoadedMetaData) {
          return;
        } else if (player.ads.inAdBreak()) {
          prefixEvent(player, "ad", event);
        } else if (player.currentSrc() !== player.ads.contentSrc) {
          return;
        } else {
          prefixEvent(player, "content", event);
        }
      };
      var handlePlay = function handlePlay2(player, event) {
        if (player.ads.inAdBreak()) {
          prefixEvent(player, "ad", event);
        } else if (player.ads.isContentResuming()) {
          prefixEvent(player, "content", event);
        }
      };
      function redispatch(event) {
        if (event.type === "playing") {
          handlePlaying(this, event);
        } else if (event.type === "ended") {
          handleEnded(this, event);
        } else if (event.type === "loadstart" || event.type === "loadeddata" || event.type === "loadedmetadata") {
          handleLoadEvent(this, event);
        } else if (event.type === "play") {
          handlePlay(this, event);
        } else if (this.ads.isInAdMode()) {
          if (this.ads.isContentResuming()) {
            prefixEvent(this, "content", event);
          } else {
            prefixEvent(this, "ad", event);
          }
        }
      }
      function initializeContentupdate(player) {
        player.ads.contentSrc = player.currentSrc();
        player.ads._seenInitialLoadstart = false;
        var checkSrc = function checkSrc2() {
          if (!player.ads.inAdBreak()) {
            var src = player.currentSrc();
            if (src !== player.ads.contentSrc) {
              if (player.ads._seenInitialLoadstart) {
                player.trigger({
                  type: "contentchanged"
                });
              }
              player.trigger({
                type: "contentupdate",
                oldValue: player.ads.contentSrc,
                newValue: src
              });
              player.ads.contentSrc = src;
            }
            player.ads._seenInitialLoadstart = true;
          }
        };
        player.on("loadstart", checkSrc);
        window2.setTimeout(checkSrc, 1);
      }
      var tcData = {};
      var proxyTcfApi = function proxyTcfApi2(_) {
        if (videojs2.dom.isInFrame() && typeof window2.__tcfapi !== "function") {
          var frame = window2;
          var cmpFrame;
          var cmpCallbacks = {};
          while (frame) {
            try {
              if (frame.frames.__tcfapiLocator) {
                cmpFrame = frame;
                break;
              }
            } catch (ignore) {
            }
            if (frame === window2.top) {
              break;
            }
            frame = frame.parent;
          }
          if (!cmpFrame) {
            return;
          }
          window2.__tcfapi = function(cmd, version2, callback, arg) {
            var callId = Math.random() + "";
            var msg = {
              __tcfapiCall: {
                command: cmd,
                parameter: arg,
                version: version2,
                callId
              }
            };
            cmpCallbacks[callId] = callback;
            cmpFrame.postMessage(msg, "*");
          };
          window2.addEventListener("message", function(event) {
            var json = {};
            try {
              json = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
            } catch (ignore) {
            }
            var payload = json.__tcfapiReturn;
            if (payload) {
              if (typeof cmpCallbacks[payload.callId] === "function") {
                cmpCallbacks[payload.callId](payload.returnValue, payload.success);
                cmpCallbacks[payload.callId] = null;
              }
            }
          }, false);
        }
      };
      var listenToTcf = function listenToTcf2() {
        proxyTcfApi();
        if (typeof window2.__tcfapi === "function") {
          window2.__tcfapi("addEventListener", 2, function(data, success) {
            if (success) {
              tcData = data;
            }
          });
        }
      };
      var uriEncodeIfNeeded = function uriEncodeIfNeeded2(value, uriEncode) {
        if (uriEncode) {
          return encodeURIComponent(value);
        }
        return value;
      };
      var customFields = function customFields2(mediainfo, macros, customFieldsName) {
        if (mediainfo && mediainfo[customFieldsName]) {
          var fields = mediainfo[customFieldsName];
          var fieldNames = Object.keys(fields);
          for (var i = 0; i < fieldNames.length; i++) {
            var tag = "{mediainfo." + customFieldsName + "." + fieldNames[i] + "}";
            macros[tag] = fields[fieldNames[i]];
          }
        }
      };
      function adMacroReplacement(string, uriEncode, customMacros) {
        var _this = this;
        var defaults2 = {};
        string = string.replace(/{([^}=]+)=([^}]+)}/g, function(match, name, defaultVal2) {
          defaults2["{" + name + "}"] = defaultVal2;
          return "{" + name + "}";
        });
        if (uriEncode === void 0) {
          uriEncode = false;
        }
        var macros = {};
        if (customMacros !== void 0) {
          macros = customMacros;
        }
        macros["{player.id}"] = this.options_["data-player"] || this.id_;
        macros["{player.height}"] = this.currentHeight();
        macros["{player.width}"] = this.currentWidth();
        macros["{mediainfo.id}"] = this.mediainfo ? this.mediainfo.id : "";
        macros["{mediainfo.name}"] = this.mediainfo ? this.mediainfo.name : "";
        macros["{mediainfo.duration}"] = this.mediainfo ? this.mediainfo.duration : "";
        macros["{player.duration}"] = this.duration();
        macros["{player.pageUrl}"] = videojs2.dom.isInFrame() ? document2.referrer : window2.location.href;
        macros["{playlistinfo.id}"] = this.playlistinfo ? this.playlistinfo.id : "";
        macros["{playlistinfo.name}"] = this.playlistinfo ? this.playlistinfo.name : "";
        macros["{timestamp}"] = new Date().getTime();
        macros["{document.referrer}"] = document2.referrer;
        macros["{window.location.href}"] = window2.location.href;
        macros["{random}"] = Math.floor(Math.random() * 1e12);
        ["description", "tags", "reference_id", "ad_keys"].forEach(function(prop) {
          if (_this.mediainfo && _this.mediainfo[prop]) {
            macros["{mediainfo." + prop + "}"] = _this.mediainfo[prop];
          } else if (defaults2["{mediainfo." + prop + "}"]) {
            macros["{mediainfo." + prop + "}"] = defaults2["{mediainfo." + prop + "}"];
          } else {
            macros["{mediainfo." + prop + "}"] = "";
          }
        });
        customFields(this.mediainfo, macros, "custom_fields");
        customFields(this.mediainfo, macros, "customFields");
        Object.keys(tcData).forEach(function(key) {
          macros["{tcf." + key + "}"] = tcData[key];
        });
        macros["{tcf.gdprAppliesInt}"] = tcData.gdprApplies ? 1 : 0;
        for (var i in macros) {
          string = string.split(i).join(uriEncodeIfNeeded(macros[i], uriEncode));
        }
        string = string.replace(/{pageVariable\.([^}]+)}/g, function(match, name) {
          var value;
          var context = window2;
          var names = name.split(".");
          for (var _i = 0; _i < names.length; _i++) {
            if (_i === names.length - 1) {
              value = context[names[_i]];
            } else {
              context = context[names[_i]];
            }
          }
          var type = typeof value;
          if (value === null) {
            return "null";
          } else if (value === void 0) {
            if (defaults2["{pageVariable." + name + "}"]) {
              return defaults2["{pageVariable." + name + "}"];
            }
            videojs2.log.warn('Page variable "' + name + '" not found');
            return "";
          } else if (type !== "string" && type !== "number" && type !== "boolean") {
            videojs2.log.warn('Page variable "' + name + '" is not a supported type');
            return "";
          }
          return uriEncodeIfNeeded(String(value), uriEncode);
        });
        for (var defaultVal in defaults2) {
          string = string.replace(defaultVal, defaults2[defaultVal]);
        }
        return string;
      }
      var cueTextTracks = {};
      cueTextTracks.processMetadataTracks = function(player, processMetadataTrack) {
        var tracks = player.textTracks();
        var setModeAndProcess = function setModeAndProcess2(track) {
          if (track.kind === "metadata") {
            player.ads.cueTextTracks.setMetadataTrackMode(track);
            processMetadataTrack(player, track);
          }
        };
        for (var i = 0; i < tracks.length; i++) {
          setModeAndProcess(tracks[i]);
        }
        tracks.addEventListener("addtrack", function(event) {
          setModeAndProcess(event.track);
        });
      };
      cueTextTracks.setMetadataTrackMode = function(track) {
        return;
      };
      cueTextTracks.getSupportedAdCue = function(player, cue) {
        return cue;
      };
      cueTextTracks.isSupportedAdCue = function(player, cue) {
        return true;
      };
      cueTextTracks.getCueId = function(player, cue) {
        return cue.id;
      };
      var cueAlreadySeen = function cueAlreadySeen2(player, cueId) {
        return cueId !== void 0 && player.ads.includedCues[cueId];
      };
      var setCueAlreadySeen = function setCueAlreadySeen2(player, cueId) {
        if (cueId !== void 0 && cueId !== "") {
          player.ads.includedCues[cueId] = true;
        }
      };
      cueTextTracks.processAdTrack = function(player, cues, processCue, cancelAdsHandler) {
        player.ads.includedCues = {};
        for (var i = 0; i < cues.length; i++) {
          var cue = cues[i];
          var cueData = this.getSupportedAdCue(player, cue);
          if (!this.isSupportedAdCue(player, cue)) {
            videojs2.log.warn("Skipping as this is not a supported ad cue.", cue);
            return;
          }
          var cueId = this.getCueId(player, cue);
          var startTime = cue.startTime;
          if (cueAlreadySeen(player, cueId)) {
            videojs2.log("Skipping ad already seen with ID " + cueId);
            return;
          }
          if (cancelAdsHandler) {
            cancelAdsHandler(player, cueData, cueId, startTime);
          }
          processCue(player, cueData, cueId, startTime);
          setCueAlreadySeen(player, cueId);
        }
      };
      function initCancelContentPlay(player, debug) {
        if (debug) {
          videojs2.log("Using cancelContentPlay to block content playback");
        }
        player.on("play", cancelContentPlay);
      }
      function cancelContentPlay() {
        if (this.ads._shouldBlockPlay === false) {
          return;
        }
        if (!this.paused()) {
          this.ads.debug("Playback was canceled by cancelContentPlay");
          this.pause();
        }
        this.ads._cancelledPlay = true;
      }
      var obj = {};
      var videojsReference = videojs2;
      obj.isMiddlewareMediatorSupported = function() {
        if (videojsReference.browser.IS_IOS || videojsReference.browser.IS_ANDROID) {
          return false;
        } else if (videojsReference.use && videojsReference.middleware && videojsReference.middleware.TERMINATOR) {
          return true;
        }
        return false;
      };
      obj.playMiddleware = function(player) {
        return {
          setSource: function setSource(srcObj, next) {
            next(null, srcObj);
          },
          callPlay: function callPlay() {
            if (player.ads && player.ads._shouldBlockPlay === true) {
              player.ads.debug("Using playMiddleware to block content playback");
              player.ads._playBlocked = true;
              return videojsReference.middleware.TERMINATOR;
            }
          },
          play: function play(terminated, playPromise) {
            if (player.ads && player.ads._playBlocked && terminated) {
              player.ads.debug("Play call to Tech was terminated.");
              player.trigger("play");
              player.addClass("vjs-has-started");
              player.ads._playBlocked = false;
            } else if (playPromise && playPromise.catch) {
              playPromise.catch(function(e) {
                if (e.name === "NotAllowedError" && !videojs2.browser.IS_SAFARI) {
                  player.trigger("pause");
                }
              });
            }
          }
        };
      };
      obj.testHook = function(testVjs) {
        videojsReference = testVjs;
      };
      var playMiddleware = obj.playMiddleware, isMiddlewareMediatorSupported = obj.isMiddlewareMediatorSupported;
      var hasAdsPlugin = function hasAdsPlugin2() {
        if (videojs2.getPlugin) {
          return Boolean(videojs2.getPlugin("ads"));
        }
        var Player = videojs2.getComponent("Player");
        return Boolean(Player && Player.prototype.ads);
      };
      function register2(contribAdsPlugin2) {
        if (hasAdsPlugin(videojs2)) {
          return false;
        }
        var registerPlugin = videojs2.registerPlugin || videojs2.plugin;
        registerPlugin("ads", contribAdsPlugin2);
        if (isMiddlewareMediatorSupported() && !videojs2.usingContribAdsMiddleware_) {
          videojs2.use("*", playMiddleware);
          videojs2.usingContribAdsMiddleware_ = true;
          videojs2.log.debug("Play middleware has been registered with videojs");
        }
        return true;
      }
      var States = /* @__PURE__ */ function() {
        function States2() {
        }
        States2.getState = function getState(name) {
          if (!name) {
            return;
          }
          if (States2.states_ && States2.states_[name]) {
            return States2.states_[name];
          }
        };
        States2.registerState = function registerState(name, StateToRegister) {
          if (typeof name !== "string" || !name) {
            throw new Error('Illegal state name, "' + name + '"; must be a non-empty string.');
          }
          if (!States2.states_) {
            States2.states_ = {};
          }
          States2.states_[name] = StateToRegister;
          return StateToRegister;
        };
        return States2;
      }();
      var State = /* @__PURE__ */ function() {
        State2._getName = function _getName() {
          return "Anonymous State";
        };
        function State2(player) {
          this.player = player;
        }
        var _proto = State2.prototype;
        _proto.transitionTo = function transitionTo(NewState) {
          var player = this.player;
          this.cleanup(player);
          var newState = new NewState(player);
          player.ads._state = newState;
          player.ads.debug(this.constructor._getName() + " -> " + newState.constructor._getName());
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          newState.init.apply(newState, [player].concat(args));
        };
        _proto.init = function init() {
        };
        _proto.cleanup = function cleanup() {
        };
        _proto.onPlay = function onPlay() {
        };
        _proto.onPlaying = function onPlaying() {
        };
        _proto.onEnded = function onEnded() {
        };
        _proto.onAdEnded = function onAdEnded() {
        };
        _proto.onAdsReady = function onAdsReady() {
          videojs2.log.warn("Unexpected adsready event");
        };
        _proto.onAdsError = function onAdsError() {
        };
        _proto.onAdsCanceled = function onAdsCanceled() {
        };
        _proto.onAdTimeout = function onAdTimeout() {
        };
        _proto.onAdStarted = function onAdStarted() {
        };
        _proto.onContentChanged = function onContentChanged() {
        };
        _proto.onContentResumed = function onContentResumed() {
        };
        _proto.onReadyForPostroll = function onReadyForPostroll() {
          videojs2.log.warn("Unexpected readyforpostroll event");
        };
        _proto.onNoPreroll = function onNoPreroll() {
        };
        _proto.onNoPostroll = function onNoPostroll() {
        };
        _proto.startLinearAdMode = function startLinearAdMode() {
          videojs2.log.warn("Unexpected startLinearAdMode invocation (State via " + this.constructor._getName() + ")");
        };
        _proto.endLinearAdMode = function endLinearAdMode() {
          videojs2.log.warn("Unexpected endLinearAdMode invocation (State via " + this.constructor._getName() + ")");
        };
        _proto.skipLinearAdMode = function skipLinearAdMode() {
          videojs2.log.warn("Unexpected skipLinearAdMode invocation (State via " + this.constructor._getName() + ")");
        };
        _proto.isAdState = function isAdState() {
          throw new Error("isAdState unimplemented for " + this.constructor._getName());
        };
        _proto.isWaitingForAdBreak = function isWaitingForAdBreak() {
          return false;
        };
        _proto.isContentResuming = function isContentResuming() {
          return false;
        };
        _proto.inAdBreak = function inAdBreak() {
          return false;
        };
        _proto.handleEvent = function handleEvent(type) {
          var player = this.player;
          if (type === "play") {
            this.onPlay(player);
          } else if (type === "adsready") {
            this.onAdsReady(player);
          } else if (type === "adserror") {
            this.onAdsError(player);
          } else if (type === "adscanceled") {
            this.onAdsCanceled(player);
          } else if (type === "adtimeout") {
            this.onAdTimeout(player);
          } else if (type === "ads-ad-started") {
            this.onAdStarted(player);
          } else if (type === "contentchanged") {
            this.onContentChanged(player);
          } else if (type === "contentresumed") {
            this.onContentResumed(player);
          } else if (type === "readyforpostroll") {
            this.onReadyForPostroll(player);
          } else if (type === "playing") {
            this.onPlaying(player);
          } else if (type === "ended") {
            this.onEnded(player);
          } else if (type === "nopreroll") {
            this.onNoPreroll(player);
          } else if (type === "nopostroll") {
            this.onNoPostroll(player);
          } else if (type === "adended") {
            this.onAdEnded(player);
          }
        };
        return State2;
      }();
      States.registerState("State", State);
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }
      var AdState = /* @__PURE__ */ function(_State) {
        _inheritsLoose(AdState2, _State);
        function AdState2(player) {
          var _this;
          _this = _State.call(this, player) || this;
          _this.contentResuming = false;
          _this.waitingForAdBreak = false;
          return _this;
        }
        var _proto = AdState2.prototype;
        _proto.isAdState = function isAdState() {
          return true;
        };
        _proto.onPlaying = function onPlaying() {
          var ContentPlayback2 = States.getState("ContentPlayback");
          if (this.contentResuming) {
            this.transitionTo(ContentPlayback2);
          }
        };
        _proto.onContentResumed = function onContentResumed() {
          var ContentPlayback2 = States.getState("ContentPlayback");
          if (this.contentResuming) {
            this.transitionTo(ContentPlayback2);
          }
        };
        _proto.isWaitingForAdBreak = function isWaitingForAdBreak() {
          return this.waitingForAdBreak;
        };
        _proto.isContentResuming = function isContentResuming() {
          return this.contentResuming;
        };
        _proto.inAdBreak = function inAdBreak() {
          return this.player.ads._inLinearAdMode === true;
        };
        return AdState2;
      }(State);
      States.registerState("AdState", AdState);
      var ContentState = /* @__PURE__ */ function(_State) {
        _inheritsLoose(ContentState2, _State);
        function ContentState2() {
          return _State.apply(this, arguments) || this;
        }
        var _proto = ContentState2.prototype;
        _proto.isAdState = function isAdState() {
          return false;
        };
        _proto.onContentChanged = function onContentChanged(player) {
          var BeforePreroll2 = States.getState("BeforePreroll");
          var Preroll2 = States.getState("Preroll");
          player.ads.debug("Received contentchanged event (ContentState)");
          if (player.paused()) {
            this.transitionTo(BeforePreroll2);
          } else {
            this.transitionTo(Preroll2, false);
            player.pause();
            player.ads._pausedOnContentupdate = true;
          }
        };
        return ContentState2;
      }(State);
      States.registerState("ContentState", ContentState);
      var ContentState$1 = States.getState("ContentState");
      var AdsDone = /* @__PURE__ */ function(_ContentState) {
        _inheritsLoose(AdsDone2, _ContentState);
        function AdsDone2() {
          return _ContentState.apply(this, arguments) || this;
        }
        AdsDone2._getName = function _getName() {
          return "AdsDone";
        };
        var _proto = AdsDone2.prototype;
        _proto.init = function init(player) {
          player.ads._contentHasEnded = true;
          player.trigger("ended");
        };
        _proto.startLinearAdMode = function startLinearAdMode() {
          videojs2.log.warn("Unexpected startLinearAdMode invocation (AdsDone)");
        };
        return AdsDone2;
      }(ContentState$1);
      States.registerState("AdsDone", AdsDone);
      var tryToResumeTimeout_;
      function getPlayerSnapshot(player) {
        var currentTime;
        if (videojs2.browser.IS_IOS && player.ads.isLive(player)) {
          if (player.seekable().length > 0) {
            currentTime = player.currentTime() - player.seekable().end(0);
          } else {
            currentTime = player.currentTime();
          }
        } else {
          currentTime = player.currentTime();
        }
        var tech = player.$(".vjs-tech");
        var tracks = player.textTracks ? player.textTracks() : [];
        var suppressedTracks = [];
        var snapshotObject = {
          ended: player.ended(),
          currentSrc: player.currentSrc(),
          sources: player.currentSources(),
          src: player.tech_.src(),
          currentTime,
          type: player.currentType()
        };
        if (tech) {
          snapshotObject.style = tech.getAttribute("style");
        }
        for (var i = 0; i < tracks.length; i++) {
          var track = tracks[i];
          suppressedTracks.push({
            track,
            mode: track.mode
          });
          track.mode = "disabled";
        }
        snapshotObject.suppressedTracks = suppressedTracks;
        return snapshotObject;
      }
      function restorePlayerSnapshot(player, callback) {
        var snapshotObject = player.ads.snapshot;
        if (callback === void 0) {
          callback = function callback2() {
          };
        }
        if (player.ads.disableNextSnapshotRestore === true) {
          player.ads.disableNextSnapshotRestore = false;
          delete player.ads.snapshot;
          callback();
          return;
        }
        var tech = player.$(".vjs-tech");
        var attempts = 20;
        var suppressedTracks = snapshotObject.suppressedTracks;
        var trackSnapshot;
        var restoreTracks = function restoreTracks2() {
          for (var i = 0; i < suppressedTracks.length; i++) {
            trackSnapshot = suppressedTracks[i];
            trackSnapshot.track.mode = trackSnapshot.mode;
          }
        };
        var resume = function resume2() {
          var currentTime;
          if (videojs2.browser.IS_IOS && player.ads.isLive(player)) {
            if (snapshotObject.currentTime < 0) {
              if (player.seekable().length > 0) {
                currentTime = player.seekable().end(0) + snapshotObject.currentTime;
              } else {
                currentTime = player.currentTime();
              }
              player.currentTime(currentTime);
            }
            if (player.paused()) {
              var playPromise2 = player.play();
              if (playPromise2 && playPromise2.catch) {
                playPromise2.catch(function(error) {
                  videojs2.log.warn("Play promise rejected in IOS snapshot resume", error);
                });
              }
            }
          } else if (snapshotObject.ended) {
            player.currentTime(player.duration());
          } else {
            player.currentTime(snapshotObject.currentTime);
            var _playPromise = player.play();
            if (_playPromise && _playPromise.catch) {
              _playPromise.catch(function(error) {
                videojs2.log.warn("Play promise rejected in snapshot resume", error);
              });
            }
          }
          if (player.ads.shouldRemoveAutoplay_) {
            player.autoplay(false);
            player.ads.shouldRemoveAutoplay_ = false;
          }
        };
        var tryToResume = function tryToResume2() {
          player.off("contentcanplay", tryToResume2);
          if (tryToResumeTimeout_) {
            player.clearTimeout(tryToResumeTimeout_);
          }
          tech = player.el().querySelector(".vjs-tech");
          if (tech.readyState > 1) {
            return resume();
          }
          if (tech.seekable === void 0) {
            return resume();
          }
          if (tech.seekable.length > 0) {
            return resume();
          }
          if (attempts--) {
            player.setTimeout(tryToResume2, 50);
          } else {
            try {
              resume();
            } catch (e) {
              videojs2.log.warn("Failed to resume the content after an advertisement", e);
            }
          }
        };
        if ("style" in snapshotObject) {
          tech.setAttribute("style", snapshotObject.style || "");
        }
        if (player.ads.videoElementRecycled()) {
          player.one("resumeended", function() {
            delete player.ads.snapshot;
            callback();
          });
          player.one("contentloadedmetadata", restoreTracks);
          if (videojs2.browser.IS_IOS && !player.autoplay()) {
            player.autoplay(true);
            player.ads.shouldRemoveAutoplay_ = true;
          }
          player.src(snapshotObject.sources);
          player.one("contentcanplay", tryToResume);
          tryToResumeTimeout_ = player.setTimeout(tryToResume, 2e3);
        } else {
          restoreTracks();
          if (!player.ended()) {
            var playPromise = player.play();
            if (playPromise && playPromise.catch) {
              playPromise.catch(function(error) {
                videojs2.log.warn("Play promise rejected in snapshot restore", error);
              });
            }
          }
          delete player.ads.snapshot;
          callback();
        }
      }
      function start(player) {
        player.ads.debug("Starting ad break");
        player.ads._inLinearAdMode = true;
        player.trigger("adstart");
        if (player.ads.shouldTakeSnapshots()) {
          player.ads.snapshot = getPlayerSnapshot(player);
        }
        if (player.ads.shouldPlayContentBehindAd(player)) {
          player.ads.preAdVolume_ = player.volume();
          player.volume(0);
        }
        player.addClass("vjs-ad-playing");
        if (player.hasClass("vjs-live")) {
          player.removeClass("vjs-live");
        }
        player.ads.removeNativePoster();
      }
      function end(player, callback) {
        player.ads.debug("Ending ad break");
        if (callback === void 0) {
          callback = function callback2() {
          };
        }
        player.ads.adType = null;
        player.ads._inLinearAdMode = false;
        player.trigger("adend");
        player.removeClass("vjs-ad-playing");
        if (player.ads.isLive(player)) {
          player.addClass("vjs-live");
        }
        if (player.ads.shouldTakeSnapshots()) {
          restorePlayerSnapshot(player, callback);
        } else {
          player.volume(player.ads.preAdVolume_);
          callback();
        }
      }
      var obj$1 = {
        start,
        end
      };
      var AdState$1 = States.getState("AdState");
      var Preroll = /* @__PURE__ */ function(_AdState) {
        _inheritsLoose(Preroll2, _AdState);
        function Preroll2() {
          return _AdState.apply(this, arguments) || this;
        }
        Preroll2._getName = function _getName() {
          return "Preroll";
        };
        var _proto = Preroll2.prototype;
        _proto.init = function init(player, adsReady, shouldResumeToContent) {
          this.waitingForAdBreak = true;
          player.addClass("vjs-ad-loading");
          if (shouldResumeToContent || player.ads.nopreroll_) {
            return this.resumeAfterNoPreroll(player);
          }
          var timeout = player.ads.settings.timeout;
          if (typeof player.ads.settings.prerollTimeout === "number") {
            timeout = player.ads.settings.prerollTimeout;
          }
          this._timeout = player.setTimeout(function() {
            player.trigger("adtimeout");
          }, timeout);
          if (adsReady) {
            this.handleAdsReady();
          } else {
            this.adsReady = false;
          }
        };
        _proto.onAdsReady = function onAdsReady(player) {
          if (!player.ads.inAdBreak()) {
            player.ads.debug("Received adsready event (Preroll)");
            this.handleAdsReady();
          } else {
            videojs2.log.warn("Unexpected adsready event (Preroll)");
          }
        };
        _proto.handleAdsReady = function handleAdsReady() {
          this.adsReady = true;
          this.readyForPreroll();
        };
        _proto.afterLoadStart = function afterLoadStart(callback) {
          var player = this.player;
          if (player.ads._hasThereBeenALoadStartDuringPlayerLife) {
            callback();
          } else {
            player.ads.debug("Waiting for loadstart...");
            player.one("loadstart", function() {
              player.ads.debug("Received loadstart event");
              callback();
            });
          }
        };
        _proto.noPreroll = function noPreroll() {
          var _this = this;
          this.afterLoadStart(function() {
            _this.player.ads.debug("Skipping prerolls due to nopreroll event (Preroll)");
            _this.resumeAfterNoPreroll(_this.player);
          });
        };
        _proto.readyForPreroll = function readyForPreroll() {
          var player = this.player;
          this.afterLoadStart(function() {
            player.ads.debug("Triggered readyforpreroll event (Preroll)");
            player.trigger("readyforpreroll");
          });
        };
        _proto.onAdsCanceled = function onAdsCanceled(player) {
          var _this2 = this;
          player.ads.debug("adscanceled (Preroll)");
          this.afterLoadStart(function() {
            _this2.resumeAfterNoPreroll(player);
          });
        };
        _proto.onAdsError = function onAdsError(player) {
          var _this3 = this;
          videojs2.log("adserror (Preroll)");
          if (this.inAdBreak()) {
            player.ads.endLinearAdMode();
          } else {
            this.afterLoadStart(function() {
              _this3.resumeAfterNoPreroll(player);
            });
          }
        };
        _proto.startLinearAdMode = function startLinearAdMode() {
          var player = this.player;
          if (this.adsReady && !player.ads.inAdBreak() && !this.isContentResuming()) {
            this.clearTimeout(player);
            player.ads.adType = "preroll";
            this.waitingForAdBreak = false;
            obj$1.start(player);
            player.ads._shouldBlockPlay = false;
          } else {
            videojs2.log.warn("Unexpected startLinearAdMode invocation (Preroll)");
          }
        };
        _proto.onAdStarted = function onAdStarted(player) {
          player.removeClass("vjs-ad-loading");
        };
        _proto.endLinearAdMode = function endLinearAdMode() {
          var player = this.player;
          if (this.inAdBreak()) {
            player.removeClass("vjs-ad-loading");
            player.addClass("vjs-ad-content-resuming");
            this.contentResuming = true;
            obj$1.end(player);
          }
        };
        _proto.skipLinearAdMode = function skipLinearAdMode() {
          var _this4 = this;
          var player = this.player;
          if (player.ads.inAdBreak() || this.isContentResuming()) {
            videojs2.log.warn("Unexpected skipLinearAdMode invocation");
          } else {
            this.afterLoadStart(function() {
              player.trigger("adskip");
              player.ads.debug("skipLinearAdMode (Preroll)");
              _this4.resumeAfterNoPreroll(player);
            });
          }
        };
        _proto.onAdTimeout = function onAdTimeout(player) {
          var _this5 = this;
          this.afterLoadStart(function() {
            player.ads.debug("adtimeout (Preroll)");
            _this5.resumeAfterNoPreroll(player);
          });
        };
        _proto.onNoPreroll = function onNoPreroll(player) {
          if (player.ads.inAdBreak() || this.isContentResuming()) {
            videojs2.log.warn("Unexpected nopreroll event (Preroll)");
          } else {
            this.noPreroll();
          }
        };
        _proto.resumeAfterNoPreroll = function resumeAfterNoPreroll(player) {
          this.contentResuming = true;
          player.ads._shouldBlockPlay = false;
          this.cleanupPartial(player);
          if (player.ads._playRequested || player.ads._pausedOnContentupdate) {
            if (player.paused()) {
              player.ads.debug("resumeAfterNoPreroll: attempting to resume playback (Preroll)");
              var playPromise = player.play();
              if (playPromise && playPromise.then) {
                playPromise.then(null, function(e) {
                });
              }
            } else {
              player.ads.debug("resumeAfterNoPreroll: already playing (Preroll)");
              player.trigger("play");
              player.trigger("playing");
            }
          }
        };
        _proto.cleanup = function cleanup(player) {
          if (!player.ads._hasThereBeenALoadStartDuringPlayerLife) {
            videojs2.log.warn("Leaving Preroll state before loadstart event can cause issues.");
          }
          this.cleanupPartial(player);
        };
        _proto.cleanupPartial = function cleanupPartial(player) {
          player.removeClass("vjs-ad-loading");
          player.removeClass("vjs-ad-content-resuming");
          this.clearTimeout(player);
        };
        _proto.clearTimeout = function clearTimeout2(player) {
          player.clearTimeout(this._timeout);
          this._timeout = null;
        };
        return Preroll2;
      }(AdState$1);
      States.registerState("Preroll", Preroll);
      var ContentState$2 = States.getState("ContentState");
      var BeforePreroll = /* @__PURE__ */ function(_ContentState) {
        _inheritsLoose(BeforePreroll2, _ContentState);
        function BeforePreroll2() {
          return _ContentState.apply(this, arguments) || this;
        }
        BeforePreroll2._getName = function _getName() {
          return "BeforePreroll";
        };
        var _proto = BeforePreroll2.prototype;
        _proto.init = function init(player) {
          this.adsReady = false;
          this.shouldResumeToContent = false;
          player.ads._shouldBlockPlay = player.ads.settings.allowVjsAutoplay ? !player.autoplay() : true;
        };
        _proto.onAdsReady = function onAdsReady(player) {
          player.ads.debug("Received adsready event (BeforePreroll)");
          this.adsReady = true;
        };
        _proto.onPlay = function onPlay(player) {
          var Preroll2 = States.getState("Preroll");
          player.ads.debug("Received play event (BeforePreroll)");
          this.transitionTo(Preroll2, this.adsReady, this.shouldResumeToContent);
        };
        _proto.onAdsCanceled = function onAdsCanceled(player) {
          player.ads.debug("adscanceled (BeforePreroll)");
          this.shouldResumeToContent = true;
        };
        _proto.onAdsError = function onAdsError() {
          this.player.ads.debug("adserror (BeforePreroll)");
          this.shouldResumeToContent = true;
        };
        _proto.onNoPreroll = function onNoPreroll() {
          this.player.ads.debug("Skipping prerolls due to nopreroll event (BeforePreroll)");
          this.shouldResumeToContent = true;
        };
        _proto.skipLinearAdMode = function skipLinearAdMode() {
          var player = this.player;
          player.trigger("adskip");
          player.ads.debug("skipLinearAdMode (BeforePreroll)");
          this.shouldResumeToContent = true;
        };
        _proto.onContentChanged = function onContentChanged() {
          this.init(this.player);
        };
        return BeforePreroll2;
      }(ContentState$2);
      States.registerState("BeforePreroll", BeforePreroll);
      var AdState$2 = States.getState("AdState");
      var Midroll = /* @__PURE__ */ function(_AdState) {
        _inheritsLoose(Midroll2, _AdState);
        function Midroll2() {
          return _AdState.apply(this, arguments) || this;
        }
        Midroll2._getName = function _getName() {
          return "Midroll";
        };
        var _proto = Midroll2.prototype;
        _proto.init = function init(player) {
          player.ads.adType = "midroll";
          obj$1.start(player);
          player.addClass("vjs-ad-loading");
        };
        _proto.onAdStarted = function onAdStarted(player) {
          player.removeClass("vjs-ad-loading");
        };
        _proto.endLinearAdMode = function endLinearAdMode() {
          var player = this.player;
          if (this.inAdBreak()) {
            this.contentResuming = true;
            player.addClass("vjs-ad-content-resuming");
            player.removeClass("vjs-ad-loading");
            obj$1.end(player);
          }
        };
        _proto.onAdsError = function onAdsError(player) {
          if (this.inAdBreak()) {
            player.ads.endLinearAdMode();
          }
        };
        _proto.cleanup = function cleanup(player) {
          player.removeClass("vjs-ad-loading");
          player.removeClass("vjs-ad-content-resuming");
        };
        return Midroll2;
      }(AdState$2);
      States.registerState("Midroll", Midroll);
      var AdState$3 = States.getState("AdState");
      var Postroll = /* @__PURE__ */ function(_AdState) {
        _inheritsLoose(Postroll2, _AdState);
        function Postroll2() {
          return _AdState.apply(this, arguments) || this;
        }
        Postroll2._getName = function _getName() {
          return "Postroll";
        };
        var _proto = Postroll2.prototype;
        _proto.init = function init(player) {
          this.waitingForAdBreak = true;
          player.ads._contentEnding = true;
          if (!player.ads.nopostroll_) {
            player.addClass("vjs-ad-loading");
            var timeout = player.ads.settings.timeout;
            if (typeof player.ads.settings.postrollTimeout === "number") {
              timeout = player.ads.settings.postrollTimeout;
            }
            this._postrollTimeout = player.setTimeout(function() {
              player.trigger("adtimeout");
            }, timeout);
          } else {
            this.resumeContent(player);
            var AdsDone2 = States.getState("AdsDone");
            this.transitionTo(AdsDone2);
          }
        };
        _proto.startLinearAdMode = function startLinearAdMode() {
          var player = this.player;
          if (!player.ads.inAdBreak() && !this.isContentResuming()) {
            player.ads.adType = "postroll";
            player.clearTimeout(this._postrollTimeout);
            this.waitingForAdBreak = false;
            obj$1.start(player);
          } else {
            videojs2.log.warn("Unexpected startLinearAdMode invocation (Postroll)");
          }
        };
        _proto.onAdStarted = function onAdStarted(player) {
          player.removeClass("vjs-ad-loading");
        };
        _proto.endLinearAdMode = function endLinearAdMode() {
          var _this = this;
          var player = this.player;
          var AdsDone2 = States.getState("AdsDone");
          if (this.inAdBreak()) {
            player.removeClass("vjs-ad-loading");
            this.resumeContent(player);
            obj$1.end(player, function() {
              _this.transitionTo(AdsDone2);
            });
          }
        };
        _proto.skipLinearAdMode = function skipLinearAdMode() {
          var player = this.player;
          if (player.ads.inAdBreak() || this.isContentResuming()) {
            videojs2.log.warn("Unexpected skipLinearAdMode invocation");
          } else {
            player.ads.debug("Postroll abort (skipLinearAdMode)");
            player.trigger("adskip");
            this.abort(player);
          }
        };
        _proto.onAdTimeout = function onAdTimeout(player) {
          player.ads.debug("Postroll abort (adtimeout)");
          this.abort(player);
        };
        _proto.onAdsError = function onAdsError(player) {
          player.ads.debug("Postroll abort (adserror)");
          if (player.ads.inAdBreak()) {
            player.ads.endLinearAdMode();
          } else {
            this.abort(player);
          }
        };
        _proto.onContentChanged = function onContentChanged(player) {
          if (this.isContentResuming()) {
            var BeforePreroll2 = States.getState("BeforePreroll");
            this.transitionTo(BeforePreroll2);
          } else if (!this.inAdBreak()) {
            var Preroll2 = States.getState("Preroll");
            this.transitionTo(Preroll2);
          }
        };
        _proto.onNoPostroll = function onNoPostroll(player) {
          if (!this.isContentResuming() && !this.inAdBreak()) {
            this.abort(player);
          } else {
            videojs2.log.warn("Unexpected nopostroll event (Postroll)");
          }
        };
        _proto.resumeContent = function resumeContent(player) {
          this.contentResuming = true;
          player.addClass("vjs-ad-content-resuming");
        };
        _proto.abort = function abort(player) {
          var AdsDone2 = States.getState("AdsDone");
          this.resumeContent(player);
          player.removeClass("vjs-ad-loading");
          this.transitionTo(AdsDone2);
        };
        _proto.cleanup = function cleanup(player) {
          player.removeClass("vjs-ad-content-resuming");
          player.clearTimeout(this._postrollTimeout);
          player.ads._contentEnding = false;
        };
        return Postroll2;
      }(AdState$3);
      States.registerState("Postroll", Postroll);
      var ContentState$3 = States.getState("ContentState");
      var ContentPlayback = /* @__PURE__ */ function(_ContentState) {
        _inheritsLoose(ContentPlayback2, _ContentState);
        function ContentPlayback2() {
          return _ContentState.apply(this, arguments) || this;
        }
        ContentPlayback2._getName = function _getName() {
          return "ContentPlayback";
        };
        var _proto = ContentPlayback2.prototype;
        _proto.init = function init(player) {
          player.ads._shouldBlockPlay = false;
        };
        _proto.onAdsReady = function onAdsReady(player) {
          player.ads.debug("Received adsready event (ContentPlayback)");
          if (!player.ads.nopreroll_) {
            player.ads.debug("Triggered readyforpreroll event (ContentPlayback)");
            player.trigger("readyforpreroll");
          }
        };
        _proto.onReadyForPostroll = function onReadyForPostroll(player) {
          var Postroll2 = States.getState("Postroll");
          player.ads.debug("Received readyforpostroll event");
          this.transitionTo(Postroll2);
        };
        _proto.startLinearAdMode = function startLinearAdMode() {
          var Midroll2 = States.getState("Midroll");
          this.transitionTo(Midroll2);
        };
        return ContentPlayback2;
      }(ContentState$3);
      States.registerState("ContentPlayback", ContentPlayback);
      var ContentState$4 = States.getState("ContentState");
      var StitchedContentPlayback = /* @__PURE__ */ function(_ContentState) {
        _inheritsLoose(StitchedContentPlayback2, _ContentState);
        function StitchedContentPlayback2() {
          return _ContentState.apply(this, arguments) || this;
        }
        StitchedContentPlayback2._getName = function _getName() {
          return "StitchedContentPlayback";
        };
        var _proto = StitchedContentPlayback2.prototype;
        _proto.init = function init() {
          this.player.ads._shouldBlockPlay = false;
        };
        _proto.onContentChanged = function onContentChanged() {
          this.player.ads.debug("Received contentchanged event (" + this.constructor._getName() + ")");
        };
        _proto.startLinearAdMode = function startLinearAdMode() {
          var StitchedAdRoll2 = States.getState("StitchedAdRoll");
          this.transitionTo(StitchedAdRoll2);
        };
        return StitchedContentPlayback2;
      }(ContentState$4);
      States.registerState("StitchedContentPlayback", StitchedContentPlayback);
      var AdState$4 = States.getState("AdState");
      var StitchedAdRoll = /* @__PURE__ */ function(_AdState) {
        _inheritsLoose(StitchedAdRoll2, _AdState);
        function StitchedAdRoll2() {
          return _AdState.apply(this, arguments) || this;
        }
        StitchedAdRoll2._getName = function _getName() {
          return "StitchedAdRoll";
        };
        var _proto = StitchedAdRoll2.prototype;
        _proto.init = function init() {
          this.waitingForAdBreak = false;
          this.contentResuming = false;
          this.player.ads.adType = "stitched";
          obj$1.start(this.player);
        };
        _proto.onPlaying = function onPlaying() {
        };
        _proto.onContentResumed = function onContentResumed() {
        };
        _proto.onAdEnded = function onAdEnded() {
          this.endLinearAdMode();
          this.player.trigger("ended");
        };
        _proto.endLinearAdMode = function endLinearAdMode() {
          var StitchedContentPlayback2 = States.getState("StitchedContentPlayback");
          obj$1.end(this.player);
          this.transitionTo(StitchedContentPlayback2);
        };
        return StitchedAdRoll2;
      }(AdState$4);
      States.registerState("StitchedAdRoll", StitchedAdRoll);
      var isMiddlewareMediatorSupported$1 = obj.isMiddlewareMediatorSupported;
      var VIDEO_EVENTS = videojs2.getTech("Html5").Events;
      var defaults = {
        timeout: 5e3,
        prerollTimeout: void 0,
        postrollTimeout: void 0,
        debug: false,
        stitchedAds: false,
        contentIsLive: void 0,
        liveCuePoints: true,
        allowVjsAutoplay: videojs2.options.normalizeAutoplay || false
      };
      var contribAdsPlugin = function contribAdsPlugin2(options) {
        var player = this;
        var settings2 = videojs2.mergeOptions(defaults, options);
        var videoEvents = [];
        VIDEO_EVENTS.concat(["firstplay", "loadedalldata"]).forEach(function(eventName) {
          if (videoEvents.indexOf(eventName) === -1) {
            videoEvents.push(eventName);
          }
        });
        player.on(videoEvents, redispatch);
        if (!isMiddlewareMediatorSupported$1()) {
          initCancelContentPlay(player, settings2.debug);
        }
        player.setTimeout(function() {
          if (!player.ads._hasThereBeenALoadStartDuringPlayerLife && player.src() !== "") {
            videojs2.log.error("videojs-contrib-ads has not seen a loadstart event 5 seconds after being initialized, but a source is present. This indicates that videojs-contrib-ads was initialized too late. It must be initialized immediately after video.js in the same tick. As a result, some ads will not play and some media events will be incorrect. For more information, see http://videojs.github.io/videojs-contrib-ads/integrator/getting-started.html");
          }
        }, 5e3);
        player.on("ended", function() {
          if (!player.hasClass("vjs-has-started")) {
            player.addClass("vjs-has-started");
          }
        });
        player.on("contenttimeupdate", function() {
          player.removeClass("vjs-waiting");
        });
        player.on(["addurationchange", "adcanplay"], function() {
          if (player.ads.settings.stitchedAds) {
            return;
          }
          if (player.hasStarted()) {
            return;
          }
          if (player.ads.snapshot && player.currentSrc() === player.ads.snapshot.currentSrc) {
            return;
          }
          if (!player.ads.inAdBreak()) {
            return;
          }
          var playPromise = player.play();
          if (playPromise && playPromise.catch) {
            playPromise.catch(function(error) {
              videojs2.log.warn("Play promise rejected when playing ad", error);
            });
          }
        });
        player.on("nopreroll", function() {
          player.ads.debug("Received nopreroll event");
          player.ads.nopreroll_ = true;
        });
        player.on("nopostroll", function() {
          player.ads.debug("Received nopostroll event");
          player.ads.nopostroll_ = true;
        });
        player.on("playing", function() {
          player.ads._cancelledPlay = false;
          player.ads._pausedOnContentupdate = false;
        });
        player.on("play", function() {
          player.ads._playRequested = true;
        });
        player.one("loadstart", function() {
          player.ads._hasThereBeenALoadStartDuringPlayerLife = true;
        });
        player.on("loadeddata", function() {
          player.ads._hasThereBeenALoadedData = true;
        });
        player.on("loadedmetadata", function() {
          player.ads._hasThereBeenALoadedMetaData = true;
        });
        player.ads = getAds(player);
        player.ads.settings = settings2;
        settings2.stitchedAds = !!settings2.stitchedAds;
        if (settings2.stitchedAds) {
          player.ads._state = new (States.getState("StitchedContentPlayback"))(player);
        } else {
          player.ads._state = new (States.getState("BeforePreroll"))(player);
        }
        player.ads._state.init(player);
        player.ads.cueTextTracks = cueTextTracks;
        player.ads.adMacroReplacement = adMacroReplacement.bind(player);
        initializeContentupdate(player);
        player.on("contentchanged", player.ads.reset);
        var shouldDisableTracks = function shouldDisableTracks2() {
          return !player.ads.shouldPlayContentBehindAd(player) && player.ads.inAdBreak() && player.tech_.featuresNativeTextTracks && videojs2.browser.IS_IOS && !Array.isArray(player.textTracks());
        };
        var textTrackChangeHandler = function textTrackChangeHandler2() {
          var textTrackList = player.textTracks();
          if (shouldDisableTracks()) {
            for (var i = 0; i < textTrackList.length; i++) {
              var track = textTrackList[i];
              if (track.mode === "showing") {
                track.mode = "disabled";
              }
            }
          }
        };
        player.ready(function() {
          player.textTracks().addEventListener("change", textTrackChangeHandler);
        });
        player.on(["play", "playing", "ended", "adsready", "adscanceled", "adskip", "adserror", "adtimeout", "adended", "ads-ad-started", "contentchanged", "dispose", "contentresumed", "readyforpostroll", "nopreroll", "nopostroll"], function(e) {
          player.ads._state.handleEvent(e.type);
        });
        player.on("dispose", function() {
          player.ads.reset();
          player.textTracks().removeEventListener("change", textTrackChangeHandler);
        });
        listenToTcf();
        player.ads.listenToTcf = listenToTcf;
      };
      contribAdsPlugin.VERSION = version;
      register2(contribAdsPlugin);
      return contribAdsPlugin;
    });
  }
});

// public/scripts/videojsx.vast.js
var require_videojsx_vast = __commonJS({
  "public/scripts/videojsx.vast.js"() {
    (() => {
      var e = { 248: function(e2, t2) {
        !function(e3) {
          "use strict";
          function t3(e4, t4) {
            var r3 = Object.keys(e4);
            if (Object.getOwnPropertySymbols) {
              var i2 = Object.getOwnPropertySymbols(e4);
              t4 && (i2 = i2.filter(function(t5) {
                return Object.getOwnPropertyDescriptor(e4, t5).enumerable;
              })), r3.push.apply(r3, i2);
            }
            return r3;
          }
          function r2(e4) {
            for (var r3 = 1; r3 < arguments.length; r3++) {
              var i2 = arguments[r3] != null ? arguments[r3] : {};
              r3 % 2 ? t3(Object(i2), true).forEach(function(t4) {
                s(e4, t4, i2[t4]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(i2)) : t3(Object(i2)).forEach(function(t4) {
                Object.defineProperty(e4, t4, Object.getOwnPropertyDescriptor(i2, t4));
              });
            }
            return e4;
          }
          function i(e4) {
            return i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e5) {
              return typeof e5;
            } : function(e5) {
              return e5 && typeof Symbol == "function" && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
            }, i(e4);
          }
          function n(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(e4, t4) {
            for (var r3 = 0; r3 < t4.length; r3++) {
              var i2 = t4[r3];
              i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e4, i2.key, i2);
            }
          }
          function o(e4, t4, r3) {
            return t4 && a(e4.prototype, t4), r3 && a(e4, r3), Object.defineProperty(e4, "prototype", { writable: false }), e4;
          }
          function s(e4, t4, r3) {
            return t4 in e4 ? Object.defineProperty(e4, t4, { value: r3, enumerable: true, configurable: true, writable: true }) : e4[t4] = r3, e4;
          }
          function l(e4, t4) {
            if (typeof t4 != "function" && t4 !== null)
              throw new TypeError("Super expression must either be null or a function");
            e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, writable: true, configurable: true } }), Object.defineProperty(e4, "prototype", { writable: false }), t4 && u(e4, t4);
          }
          function c(e4) {
            return c = Object.setPrototypeOf ? Object.getPrototypeOf : function(e5) {
              return e5.__proto__ || Object.getPrototypeOf(e5);
            }, c(e4);
          }
          function u(e4, t4) {
            return u = Object.setPrototypeOf || function(e5, t5) {
              return e5.__proto__ = t5, e5;
            }, u(e4, t4);
          }
          function d(e4, t4) {
            if (t4 && (typeof t4 == "object" || typeof t4 == "function"))
              return t4;
            if (t4 !== void 0)
              throw new TypeError("Derived constructors may only return object or undefined");
            return function(e5) {
              if (e5 === void 0)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return e5;
            }(e4);
          }
          function p(e4) {
            var t4 = function() {
              if (typeof Reflect == "undefined" || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if (typeof Proxy == "function")
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e5) {
                return false;
              }
            }();
            return function() {
              var r3, i2 = c(e4);
              if (t4) {
                var n2 = c(this).constructor;
                r3 = Reflect.construct(i2, arguments, n2);
              } else
                r3 = i2.apply(this, arguments);
              return d(this, r3);
            };
          }
          function h(e4) {
            return function(e5) {
              if (Array.isArray(e5))
                return f(e5);
            }(e4) || function(e5) {
              if (typeof Symbol != "undefined" && e5[Symbol.iterator] != null || e5["@@iterator"] != null)
                return Array.from(e5);
            }(e4) || function(e5, t4) {
              if (e5) {
                if (typeof e5 == "string")
                  return f(e5, t4);
                var r3 = Object.prototype.toString.call(e5).slice(8, -1);
                return r3 === "Object" && e5.constructor && (r3 = e5.constructor.name), r3 === "Map" || r3 === "Set" ? Array.from(e5) : r3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3) ? f(e5, t4) : void 0;
              }
            }(e4) || function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }();
          }
          function f(e4, t4) {
            (t4 == null || t4 > e4.length) && (t4 = e4.length);
            for (var r3 = 0, i2 = new Array(t4); r3 < t4; r3++)
              i2[r3] = e4[r3];
            return i2;
          }
          function m() {
            var e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            return { id: e4.id || null, adId: e4.adId || null, sequence: e4.sequence || null, apiFramework: e4.apiFramework || null, universalAdIds: [], creativeExtensions: [] };
          }
          var v = ["ADCATEGORIES", "ADCOUNT", "ADPLAYHEAD", "ADSERVINGID", "ADTYPE", "APIFRAMEWORKS", "APPBUNDLE", "ASSETURI", "BLOCKEDADCATEGORIES", "BREAKMAXADLENGTH", "BREAKMAXADS", "BREAKMAXDURATION", "BREAKMINADLENGTH", "BREAKMINDURATION", "BREAKPOSITION", "CLICKPOS", "CLICKTYPE", "CLIENTUA", "CONTENTID", "CONTENTPLAYHEAD", "CONTENTURI", "DEVICEIP", "DEVICEUA", "DOMAIN", "EXTENSIONS", "GDPRCONSENT", "IFA", "IFATYPE", "INVENTORYSTATE", "LATLONG", "LIMITADTRACKING", "MEDIAMIME", "MEDIAPLAYHEAD", "OMIDPARTNER", "PAGEURL", "PLACEMENTTYPE", "PLAYERCAPABILITIES", "PLAYERSIZE", "PLAYERSTATE", "PODSEQUENCE", "REGULATIONS", "SERVERSIDE", "SERVERUA", "TRANSACTIONID", "UNIVERSALADID", "VASTVERSIONS", "VERIFICATIONVENDORS"];
          function g(e4) {
            var t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r3 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i2 = [], n2 = T(e4);
            for (var a2 in !t4.ERRORCODE || r3.isCustomCode || /^[0-9]{3}$/.test(t4.ERRORCODE) || (t4.ERRORCODE = 900), t4.CACHEBUSTING = R(Math.round(1e8 * Math.random())), t4.TIMESTAMP = new Date().toISOString(), t4.RANDOM = t4.random = t4.CACHEBUSTING, t4)
              t4[a2] = E(t4[a2]);
            for (var o2 in n2) {
              var s2 = n2[o2];
              typeof s2 == "string" && i2.push(y(s2, t4));
            }
            return i2;
          }
          function y(e4, t4) {
            var r3 = (e4 = A(e4, t4)).match(/[^[\]]+(?=])/g);
            if (!r3)
              return e4;
            var i2 = r3.filter(function(e5) {
              return v.indexOf(e5) > -1;
            });
            return i2.length === 0 ? e4 : A(e4, i2 = i2.reduce(function(e5, t5) {
              return e5[t5] = -1, e5;
            }, {}));
          }
          function A(e4, t4) {
            var r3 = e4;
            for (var i2 in t4) {
              var n2 = t4[i2];
              r3 = r3.replace(new RegExp("(?:\\[|%%)(".concat(i2, ")(?:\\]|%%)"), "g"), n2);
            }
            return r3;
          }
          function T(e4) {
            return Array.isArray(e4) ? e4.map(function(e5) {
              return e5 && e5.hasOwnProperty("url") ? e5.url : e5;
            }) : e4;
          }
          function k(e4, t4) {
            for (var r3 = 0; r3 < t4.length; r3++)
              if (b(t4[r3], e4))
                return true;
            return false;
          }
          function b(e4, t4) {
            if (e4 && t4) {
              var r3 = Object.getOwnPropertyNames(e4), i2 = Object.getOwnPropertyNames(t4);
              return r3.length === i2.length && e4.id === t4.id && e4.url === t4.url;
            }
            return false;
          }
          function E(e4) {
            return encodeURIComponent(e4).replace(/[!'()*]/g, function(e5) {
              return "%".concat(e5.charCodeAt(0).toString(16));
            });
          }
          function R(e4) {
            var t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
            return e4.toString().padStart(t4, "0");
          }
          var w = { track: function(e4, t4, r3) {
            g(e4, t4, r3).forEach(function(e5) {
              typeof window != "undefined" && window !== null && (new Image().src = e5);
            });
          }, resolveURLTemplates: g, extractURLsFromTemplates: T, containsTemplateObject: k, isTemplateObjectEqual: b, encodeURIComponentRFC3986: E, replaceUrlMacros: y, isNumeric: function(e4) {
            return !isNaN(parseFloat(e4)) && isFinite(e4);
          }, flatten: function e4(t4) {
            return t4.reduce(function(t5, r3) {
              return t5.concat(Array.isArray(r3) ? e4(r3) : r3);
            }, []);
          }, joinArrayOfUniqueTemplateObjs: function() {
            var e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r3 = Array.isArray(e4) ? e4 : [], i2 = Array.isArray(t4) ? t4 : [];
            return r3.concat(i2).reduce(function(e5, t5) {
              return k(t5, e5) || e5.push(t5), e5;
            }, []);
          }, isValidTimeValue: function(e4) {
            return Number.isFinite(e4) && e4 >= -2;
          }, addLeadingZeros: R };
          function C(e4) {
            return ["true", "TRUE", "True", "1"].indexOf(e4) !== -1;
          }
          var N = { childByName: function(e4, t4) {
            var r3 = e4.childNodes;
            for (var i2 in r3) {
              var n2 = r3[i2];
              if (n2.nodeName === t4)
                return n2;
            }
          }, childrenByName: function(e4, t4) {
            var r3 = [], i2 = e4.childNodes;
            for (var n2 in i2) {
              var a2 = i2[n2];
              a2.nodeName === t4 && r3.push(a2);
            }
            return r3;
          }, resolveVastAdTagURI: function(e4, t4) {
            if (!t4)
              return e4;
            if (e4.indexOf("//") === 0) {
              var r3 = location.protocol;
              return "".concat(r3).concat(e4);
            }
            if (e4.indexOf("://") === -1) {
              var i2 = t4.slice(0, t4.lastIndexOf("/"));
              return "".concat(i2, "/").concat(e4);
            }
            return e4;
          }, parseBoolean: C, parseNodeText: function(e4) {
            return e4 && (e4.textContent || e4.text || "").trim();
          }, copyNodeAttribute: function(e4, t4, r3) {
            var i2 = t4.getAttribute(e4);
            i2 && r3.setAttribute(e4, i2);
          }, parseAttributes: function(e4) {
            for (var t4 = e4.attributes, r3 = {}, i2 = 0; i2 < t4.length; i2++)
              r3[t4[i2].nodeName] = t4[i2].nodeValue;
            return r3;
          }, parseDuration: function(e4) {
            if (e4 == null)
              return -1;
            if (w.isNumeric(e4))
              return parseInt(e4);
            var t4 = e4.split(":");
            if (t4.length !== 3)
              return -1;
            var r3 = t4[2].split("."), i2 = parseInt(r3[0]);
            r3.length === 2 && (i2 += parseFloat("0.".concat(r3[1])));
            var n2 = parseInt(60 * t4[1]), a2 = parseInt(60 * t4[0] * 60);
            return isNaN(a2) || isNaN(n2) || isNaN(i2) || n2 > 3600 || i2 > 60 ? -1 : a2 + n2 + i2;
          }, splitVAST: function(e4) {
            var t4 = [], r3 = null;
            return e4.forEach(function(i2, n2) {
              if (i2.sequence && (i2.sequence = parseInt(i2.sequence, 10)), i2.sequence > 1) {
                var a2 = e4[n2 - 1];
                if (a2 && a2.sequence === i2.sequence - 1)
                  return void (r3 && r3.push(i2));
                delete i2.sequence;
              }
              r3 = [i2], t4.push(r3);
            }), t4;
          }, assignAttributes: function(e4, t4) {
            if (e4)
              for (var r3 in e4) {
                var i2 = e4[r3];
                if (i2.nodeName && i2.nodeValue && t4.hasOwnProperty(i2.nodeName)) {
                  var n2 = i2.nodeValue;
                  typeof t4[i2.nodeName] == "boolean" && (n2 = C(n2)), t4[i2.nodeName] = n2;
                }
              }
          }, mergeWrapperAdData: function(e4, t4) {
            e4.errorURLTemplates = t4.errorURLTemplates.concat(e4.errorURLTemplates), e4.impressionURLTemplates = t4.impressionURLTemplates.concat(e4.impressionURLTemplates), e4.extensions = t4.extensions.concat(e4.extensions), t4.viewableImpression.length > 0 && (e4.viewableImpression = [].concat(h(e4.viewableImpression), h(t4.viewableImpression))), e4.followAdditionalWrappers = t4.followAdditionalWrappers, e4.allowMultipleAds = t4.allowMultipleAds, e4.fallbackOnNoAd = t4.fallbackOnNoAd;
            var r3 = (t4.creatives || []).filter(function(e5) {
              return e5 && e5.type === "companion";
            }), i2 = r3.reduce(function(e5, t5) {
              return (t5.variations || []).forEach(function(t6) {
                (t6.companionClickTrackingURLTemplates || []).forEach(function(t7) {
                  w.containsTemplateObject(t7, e5) || e5.push(t7);
                });
              }), e5;
            }, []);
            e4.creatives = r3.concat(e4.creatives);
            var n2 = t4.videoClickTrackingURLTemplates && t4.videoClickTrackingURLTemplates.length, a2 = t4.videoCustomClickURLTemplates && t4.videoCustomClickURLTemplates.length;
            e4.creatives.forEach(function(e5) {
              if (t4.trackingEvents && t4.trackingEvents[e5.type])
                for (var r4 in t4.trackingEvents[e5.type]) {
                  var o2 = t4.trackingEvents[e5.type][r4];
                  Array.isArray(e5.trackingEvents[r4]) || (e5.trackingEvents[r4] = []), e5.trackingEvents[r4] = e5.trackingEvents[r4].concat(o2);
                }
              e5.type === "linear" && (n2 && (e5.videoClickTrackingURLTemplates = e5.videoClickTrackingURLTemplates.concat(t4.videoClickTrackingURLTemplates)), a2 && (e5.videoCustomClickURLTemplates = e5.videoCustomClickURLTemplates.concat(t4.videoCustomClickURLTemplates)), !t4.videoClickThroughURLTemplate || e5.videoClickThroughURLTemplate !== null && e5.videoClickThroughURLTemplate !== void 0 || (e5.videoClickThroughURLTemplate = t4.videoClickThroughURLTemplate)), e5.type === "companion" && i2.length && (e5.variations || []).forEach(function(e6) {
                e6.companionClickTrackingURLTemplates = w.joinArrayOfUniqueTemplateObjs(e6.companionClickTrackingURLTemplates, i2);
              });
            }), t4.adVerifications && (e4.adVerifications = e4.adVerifications.concat(t4.adVerifications)), t4.blockedAdCategories && (e4.blockedAdCategories = e4.blockedAdCategories.concat(t4.blockedAdCategories));
          } };
          function L(e4, t4) {
            var r3 = function() {
              var e5 = m(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {});
              return { id: e5.id, adId: e5.adId, sequence: e5.sequence, apiFramework: e5.apiFramework, type: "companion", required: null, variations: [] };
            }(t4);
            return r3.required = e4.getAttribute("required") || null, r3.variations = N.childrenByName(e4, "Companion").map(function(e5) {
              var t5 = function() {
                var e6 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return { id: e6.id || null, adType: "companionAd", width: e6.width || 0, height: e6.height || 0, assetWidth: e6.assetWidth || null, assetHeight: e6.assetHeight || null, expandedWidth: e6.expandedWidth || null, expandedHeight: e6.expandedHeight || null, apiFramework: e6.apiFramework || null, adSlotID: e6.adSlotID || null, pxratio: e6.pxratio || "1", renderingMode: e6.renderingMode || "default", staticResources: [], htmlResources: [], iframeResources: [], adParameters: null, xmlEncoded: null, altText: null, companionClickThroughURLTemplate: null, companionClickTrackingURLTemplates: [], trackingEvents: {} };
              }(N.parseAttributes(e5));
              t5.htmlResources = N.childrenByName(e5, "HTMLResource").reduce(function(e6, t6) {
                var r5 = N.parseNodeText(t6);
                return r5 ? e6.concat(r5) : e6;
              }, []), t5.iframeResources = N.childrenByName(e5, "IFrameResource").reduce(function(e6, t6) {
                var r5 = N.parseNodeText(t6);
                return r5 ? e6.concat(r5) : e6;
              }, []), t5.staticResources = N.childrenByName(e5, "StaticResource").reduce(function(e6, t6) {
                var r5 = N.parseNodeText(t6);
                return r5 ? e6.concat({ url: r5, creativeType: t6.getAttribute("creativeType") || null }) : e6;
              }, []), t5.altText = N.parseNodeText(N.childByName(e5, "AltText")) || null;
              var r4 = N.childByName(e5, "TrackingEvents");
              r4 && N.childrenByName(r4, "Tracking").forEach(function(e6) {
                var r5 = e6.getAttribute("event"), i3 = N.parseNodeText(e6);
                r5 && i3 && (Array.isArray(t5.trackingEvents[r5]) || (t5.trackingEvents[r5] = []), t5.trackingEvents[r5].push(i3));
              }), t5.companionClickTrackingURLTemplates = N.childrenByName(e5, "CompanionClickTracking").map(function(e6) {
                return { id: e6.getAttribute("id") || null, url: N.parseNodeText(e6) };
              }), t5.companionClickThroughURLTemplate = N.parseNodeText(N.childByName(e5, "CompanionClickThrough")) || null;
              var i2 = N.childByName(e5, "AdParameters");
              return i2 && (t5.adParameters = N.parseNodeText(i2), t5.xmlEncoded = i2.getAttribute("xmlEncoded") || null), t5;
            }), r3;
          }
          function I(e4) {
            return e4.type === "linear";
          }
          function U(e4, t4) {
            var r3, i2 = function() {
              var e5 = m(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {});
              return { id: e5.id, adId: e5.adId, sequence: e5.sequence, apiFramework: e5.apiFramework, type: "linear", duration: 0, skipDelay: null, mediaFiles: [], mezzanine: null, interactiveCreativeFile: null, closedCaptionFiles: [], videoClickThroughURLTemplate: null, videoClickTrackingURLTemplates: [], videoCustomClickURLTemplates: [], adParameters: null, icons: [], trackingEvents: {} };
            }(t4);
            i2.duration = N.parseDuration(N.parseNodeText(N.childByName(e4, "Duration")));
            var n2 = e4.getAttribute("skipoffset");
            if (n2 == null)
              i2.skipDelay = null;
            else if (n2.charAt(n2.length - 1) === "%" && i2.duration !== -1) {
              var a2 = parseInt(n2, 10);
              i2.skipDelay = i2.duration * (a2 / 100);
            } else
              i2.skipDelay = N.parseDuration(n2);
            var o2 = N.childByName(e4, "VideoClicks");
            if (o2) {
              var s2 = N.childByName(o2, "ClickThrough");
              i2.videoClickThroughURLTemplate = s2 ? { id: s2.getAttribute("id") || null, url: N.parseNodeText(s2) } : null, N.childrenByName(o2, "ClickTracking").forEach(function(e5) {
                i2.videoClickTrackingURLTemplates.push({ id: e5.getAttribute("id") || null, url: N.parseNodeText(e5) });
              }), N.childrenByName(o2, "CustomClick").forEach(function(e5) {
                i2.videoCustomClickURLTemplates.push({ id: e5.getAttribute("id") || null, url: N.parseNodeText(e5) });
              });
            }
            var l2 = N.childByName(e4, "AdParameters");
            l2 && (i2.adParameters = N.parseNodeText(l2)), N.childrenByName(e4, "TrackingEvents").forEach(function(e5) {
              N.childrenByName(e5, "Tracking").forEach(function(e6) {
                var t5 = e6.getAttribute("event"), n3 = N.parseNodeText(e6);
                if (t5 && n3) {
                  if (t5 === "progress") {
                    if (!(r3 = e6.getAttribute("offset")))
                      return;
                    t5 = r3.charAt(r3.length - 1) === "%" ? "progress-".concat(r3) : "progress-".concat(Math.round(N.parseDuration(r3)));
                  }
                  Array.isArray(i2.trackingEvents[t5]) || (i2.trackingEvents[t5] = []), i2.trackingEvents[t5].push(n3);
                }
              });
            }), N.childrenByName(e4, "MediaFiles").forEach(function(e5) {
              N.childrenByName(e5, "MediaFile").forEach(function(e6) {
                i2.mediaFiles.push(function(e7) {
                  var t6 = { id: null, fileURL: null, fileSize: 0, deliveryType: "progressive", mimeType: null, mediaType: null, codec: null, bitrate: 0, minBitrate: 0, maxBitrate: 0, width: 0, height: 0, apiFramework: null, scalable: null, maintainAspectRatio: null };
                  t6.id = e7.getAttribute("id"), t6.fileURL = N.parseNodeText(e7), t6.deliveryType = e7.getAttribute("delivery"), t6.codec = e7.getAttribute("codec"), t6.mimeType = e7.getAttribute("type"), t6.mediaType = e7.getAttribute("mediaType") || "2D", t6.apiFramework = e7.getAttribute("apiFramework"), t6.fileSize = parseInt(e7.getAttribute("fileSize") || 0), t6.bitrate = parseInt(e7.getAttribute("bitrate") || 0), t6.minBitrate = parseInt(e7.getAttribute("minBitrate") || 0), t6.maxBitrate = parseInt(e7.getAttribute("maxBitrate") || 0), t6.width = parseInt(e7.getAttribute("width") || 0), t6.height = parseInt(e7.getAttribute("height") || 0);
                  var r5 = e7.getAttribute("scalable");
                  r5 && typeof r5 == "string" && (t6.scalable = N.parseBoolean(r5));
                  var i3 = e7.getAttribute("maintainAspectRatio");
                  return i3 && typeof i3 == "string" && (t6.maintainAspectRatio = N.parseBoolean(i3)), t6;
                }(e6));
              });
              var t5 = N.childByName(e5, "InteractiveCreativeFile");
              t5 && (i2.interactiveCreativeFile = function(e6) {
                var t6 = function() {
                  var e7 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                  return { type: e7.type || null, apiFramework: e7.apiFramework || null, variableDuration: N.parseBoolean(e7.variableDuration), fileURL: null };
                }(N.parseAttributes(e6));
                return t6.fileURL = N.parseNodeText(e6), t6;
              }(t5));
              var r4 = N.childByName(e5, "ClosedCaptionFiles");
              r4 && N.childrenByName(r4, "ClosedCaptionFile").forEach(function(e6) {
                var t6 = function() {
                  var e7 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                  return { type: e7.type || null, language: e7.language || null, fileURL: null };
                }(N.parseAttributes(e6));
                t6.fileURL = N.parseNodeText(e6), i2.closedCaptionFiles.push(t6);
              });
              var n3, a3, o3, s3 = N.childByName(e5, "Mezzanine"), l3 = (n3 = s3, a3 = {}, o3 = false, ["delivery", "type", "width", "height"].forEach(function(e6) {
                n3 && n3.getAttribute(e6) ? a3[e6] = n3.getAttribute(e6) : o3 = true;
              }), o3 ? null : a3);
              if (l3) {
                var c3 = { id: null, fileURL: null, delivery: null, codec: null, type: null, width: 0, height: 0, fileSize: 0, mediaType: "2D" };
                c3.id = s3.getAttribute("id"), c3.fileURL = N.parseNodeText(s3), c3.delivery = l3.delivery, c3.codec = s3.getAttribute("codec"), c3.type = l3.type, c3.width = parseInt(l3.width, 10), c3.height = parseInt(l3.height, 10), c3.fileSize = parseInt(s3.getAttribute("fileSize"), 10), c3.mediaType = s3.getAttribute("mediaType") || "2D", i2.mezzanine = c3;
              }
            });
            var c2 = N.childByName(e4, "Icons");
            return c2 && N.childrenByName(c2, "Icon").forEach(function(e5) {
              i2.icons.push(function(e6) {
                var t5 = { program: null, height: 0, width: 0, xPosition: 0, yPosition: 0, apiFramework: null, offset: null, duration: 0, type: null, staticResource: null, htmlResource: null, iframeResource: null, pxratio: "1", iconClickThroughURLTemplate: null, iconClickTrackingURLTemplates: [], iconViewTrackingURLTemplate: null };
                t5.program = e6.getAttribute("program"), t5.height = parseInt(e6.getAttribute("height") || 0), t5.width = parseInt(e6.getAttribute("width") || 0), t5.xPosition = function(e7) {
                  return ["left", "right"].indexOf(e7) !== -1 ? e7 : parseInt(e7 || 0);
                }(e6.getAttribute("xPosition")), t5.yPosition = function(e7) {
                  return ["top", "bottom"].indexOf(e7) !== -1 ? e7 : parseInt(e7 || 0);
                }(e6.getAttribute("yPosition")), t5.apiFramework = e6.getAttribute("apiFramework"), t5.pxratio = e6.getAttribute("pxratio") || "1", t5.offset = N.parseDuration(e6.getAttribute("offset")), t5.duration = N.parseDuration(e6.getAttribute("duration")), N.childrenByName(e6, "HTMLResource").forEach(function(e7) {
                  t5.type = e7.getAttribute("creativeType") || "text/html", t5.htmlResource = N.parseNodeText(e7);
                }), N.childrenByName(e6, "IFrameResource").forEach(function(e7) {
                  t5.type = e7.getAttribute("creativeType") || 0, t5.iframeResource = N.parseNodeText(e7);
                }), N.childrenByName(e6, "StaticResource").forEach(function(e7) {
                  t5.type = e7.getAttribute("creativeType") || 0, t5.staticResource = N.parseNodeText(e7);
                });
                var r4 = N.childByName(e6, "IconClicks");
                return r4 && (t5.iconClickThroughURLTemplate = N.parseNodeText(N.childByName(r4, "IconClickThrough")), N.childrenByName(r4, "IconClickTracking").forEach(function(e7) {
                  t5.iconClickTrackingURLTemplates.push({ id: e7.getAttribute("id") || null, url: N.parseNodeText(e7) });
                })), t5.iconViewTrackingURLTemplate = N.parseNodeText(N.childByName(e6, "IconViewTracking")), t5;
              }(e5));
            }), i2;
          }
          function S(e4, t4) {
            var r3 = function() {
              var e5 = m(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {});
              return { id: e5.id, adId: e5.adId, sequence: e5.sequence, apiFramework: e5.apiFramework, type: "nonlinear", variations: [], trackingEvents: {} };
            }(t4);
            return N.childrenByName(e4, "TrackingEvents").forEach(function(e5) {
              var t5, i2;
              N.childrenByName(e5, "Tracking").forEach(function(e6) {
                t5 = e6.getAttribute("event"), i2 = N.parseNodeText(e6), t5 && i2 && (Array.isArray(r3.trackingEvents[t5]) || (r3.trackingEvents[t5] = []), r3.trackingEvents[t5].push(i2));
              });
            }), N.childrenByName(e4, "NonLinear").forEach(function(e5) {
              var t5 = { id: null, width: 0, height: 0, expandedWidth: 0, expandedHeight: 0, scalable: true, maintainAspectRatio: true, minSuggestedDuration: 0, apiFramework: "static", adType: "nonLinearAd", type: null, staticResource: null, htmlResource: null, iframeResource: null, nonlinearClickThroughURLTemplate: null, nonlinearClickTrackingURLTemplates: [], adParameters: null };
              t5.id = e5.getAttribute("id") || null, t5.width = e5.getAttribute("width"), t5.height = e5.getAttribute("height"), t5.expandedWidth = e5.getAttribute("expandedWidth"), t5.expandedHeight = e5.getAttribute("expandedHeight"), t5.scalable = N.parseBoolean(e5.getAttribute("scalable")), t5.maintainAspectRatio = N.parseBoolean(e5.getAttribute("maintainAspectRatio")), t5.minSuggestedDuration = N.parseDuration(e5.getAttribute("minSuggestedDuration")), t5.apiFramework = e5.getAttribute("apiFramework"), N.childrenByName(e5, "HTMLResource").forEach(function(e6) {
                t5.type = e6.getAttribute("creativeType") || "text/html", t5.htmlResource = N.parseNodeText(e6);
              }), N.childrenByName(e5, "IFrameResource").forEach(function(e6) {
                t5.type = e6.getAttribute("creativeType") || 0, t5.iframeResource = N.parseNodeText(e6);
              }), N.childrenByName(e5, "StaticResource").forEach(function(e6) {
                t5.type = e6.getAttribute("creativeType") || 0, t5.staticResource = N.parseNodeText(e6);
              });
              var i2 = N.childByName(e5, "AdParameters");
              i2 && (t5.adParameters = N.parseNodeText(i2)), t5.nonlinearClickThroughURLTemplate = N.parseNodeText(N.childByName(e5, "NonLinearClickThrough")), N.childrenByName(e5, "NonLinearClickTracking").forEach(function(e6) {
                t5.nonlinearClickTrackingURLTemplates.push({ id: e6.getAttribute("id") || null, url: N.parseNodeText(e6) });
              }), r3.variations.push(t5);
            }), r3;
          }
          function x(e4) {
            var t4 = [];
            return e4.forEach(function(e5) {
              var r3 = D(e5);
              r3 && t4.push(r3);
            }), t4;
          }
          function D(e4) {
            if (e4.nodeName === "#comment")
              return null;
            var t4, r3 = { name: null, value: null, attributes: {}, children: [] }, i2 = e4.attributes, n2 = e4.childNodes;
            if (r3.name = e4.nodeName, e4.attributes) {
              for (var a2 in i2)
                if (i2.hasOwnProperty(a2)) {
                  var o2 = i2[a2];
                  o2.nodeName && o2.nodeValue && (r3.attributes[o2.nodeName] = o2.nodeValue);
                }
            }
            for (var s2 in n2)
              if (n2.hasOwnProperty(s2)) {
                var l2 = D(n2[s2]);
                l2 && r3.children.push(l2);
              }
            if (r3.children.length === 0 || r3.children.length === 1 && ["#cdata-section", "#text"].indexOf(r3.children[0].name) >= 0) {
              var c2 = N.parseNodeText(e4);
              c2 !== "" && (r3.value = c2), r3.children = [];
            }
            return (t4 = r3).value === null && Object.keys(t4.attributes).length === 0 && t4.children.length === 0 ? null : r3;
          }
          function O(e4) {
            var t4 = [];
            return e4.forEach(function(e5) {
              var r3, i2 = { id: e5.getAttribute("id") || null, adId: V(e5), sequence: e5.getAttribute("sequence") || null, apiFramework: e5.getAttribute("apiFramework") || null }, n2 = [];
              N.childrenByName(e5, "UniversalAdId").forEach(function(e6) {
                var t5 = { idRegistry: e6.getAttribute("idRegistry") || "unknown", value: N.parseNodeText(e6) };
                n2.push(t5);
              });
              var a2 = N.childByName(e5, "CreativeExtensions");
              for (var o2 in a2 && (r3 = x(N.childrenByName(a2, "CreativeExtension"))), e5.childNodes) {
                var s2 = e5.childNodes[o2], l2 = void 0;
                switch (s2.nodeName) {
                  case "Linear":
                    l2 = U(s2, i2);
                    break;
                  case "NonLinearAds":
                    l2 = S(s2, i2);
                    break;
                  case "CompanionAds":
                    l2 = L(s2, i2);
                }
                l2 && (n2 && (l2.universalAdIds = n2), r3 && (l2.creativeExtensions = r3), t4.push(l2));
              }
            }), t4;
          }
          function V(e4) {
            return e4.getAttribute("AdID") || e4.getAttribute("adID") || e4.getAttribute("adId") || null;
          }
          var P = { Wrapper: { subElements: ["VASTAdTagURI", "Impression"] }, BlockedAdCategories: { attributes: ["authority"] }, InLine: { subElements: ["AdSystem", "AdTitle", "Impression", "AdServingId", "Creatives"] }, Category: { attributes: ["authority"] }, Pricing: { attributes: ["model", "currency"] }, Verification: { oneOfinLineResources: ["JavaScriptResource", "ExecutableResource"], attributes: ["vendor"] }, UniversalAdId: { attributes: ["idRegistry"] }, JavaScriptResource: { attributes: ["apiFramework", "browserOptional"] }, ExecutableResource: { attributes: ["apiFramework", "type"] }, Tracking: { attributes: ["event"] }, Creatives: { subElements: ["Creative"] }, Creative: { subElements: ["UniversalAdId"] }, Linear: { subElements: ["MediaFiles", "Duration"] }, MediaFiles: { subElements: ["MediaFile"] }, MediaFile: { attributes: ["delivery", "type", "width", "height"] }, Mezzanine: { attributes: ["delivery", "type", "width", "height"] }, NonLinear: { oneOfinLineResources: ["StaticResource", "IFrameResource", "HTMLResource"], attributes: ["width", "height"] }, Companion: { oneOfinLineResources: ["StaticResource", "IFrameResource", "HTMLResource"], attributes: ["width", "height"] }, StaticResource: { attributes: ["creativeType"] }, Icons: { subElements: ["Icon"] }, Icon: { oneOfinLineResources: ["StaticResource", "IFrameResource", "HTMLResource"] } };
          function M(e4, t4) {
            if (P[e4.nodeName] && P[e4.nodeName].attributes) {
              var r3 = P[e4.nodeName].attributes.filter(function(t5) {
                return !e4.getAttribute(t5);
              });
              r3.length > 0 && F({ name: e4.nodeName, parentName: e4.parentNode.nodeName, attributes: r3 }, t4);
            }
          }
          function B(e4, t4, r3) {
            var i2 = P[e4.nodeName], n2 = !r3 && e4.nodeName !== "Wrapper";
            if (i2 && !n2) {
              if (i2.subElements) {
                var a2 = i2.subElements.filter(function(t5) {
                  return !N.childByName(e4, t5);
                });
                a2.length > 0 && F({ name: e4.nodeName, parentName: e4.parentNode.nodeName, subElements: a2 }, t4);
              }
              r3 && i2.oneOfinLineResources && (i2.oneOfinLineResources.some(function(t5) {
                return N.childByName(e4, t5);
              }) || F({ name: e4.nodeName, parentName: e4.parentNode.nodeName, oneOfResources: i2.oneOfinLineResources }, t4));
            }
          }
          function _(e4) {
            return e4.children && e4.children.length !== 0;
          }
          function F(e4, t4) {
            var r3 = e4.name, i2 = e4.parentName, n2 = e4.attributes, a2 = e4.subElements, o2 = e4.oneOfResources, s2 = "Element '".concat(r3, "'");
            t4("VAST-warning", { message: s2 += n2 ? " missing required attribute(s) '".concat(n2.join(", "), "' ") : a2 ? " missing required sub element(s) '".concat(a2.join(", "), "' ") : o2 ? " must provide one of the following '".concat(o2.join(", "), "' ") : " is empty", parentElement: i2, specVersion: 4.1 });
          }
          var j = { verifyRequiredValues: function e4(t4, r3, i2) {
            if (t4 && t4.nodeName)
              if (t4.nodeName === "InLine" && (i2 = true), M(t4, r3), _(t4)) {
                B(t4, r3, i2);
                for (var n2 = 0; n2 < t4.children.length; n2++)
                  e4(t4.children[n2], r3, i2);
              } else
                N.parseNodeText(t4).length === 0 && F({ name: t4.nodeName, parentName: t4.parentNode.nodeName }, r3);
          }, hasSubElements: _, emitMissingValueWarning: F, verifyRequiredAttributes: M, verifyRequiredSubElements: B };
          function W(e4, t4) {
            var r3 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i2 = r3.allowMultipleAds, n2 = r3.followAdditionalWrappers, a2 = e4.childNodes;
            for (var o2 in a2) {
              var s2 = a2[o2];
              if (["Wrapper", "InLine"].indexOf(s2.nodeName) !== -1 && (s2.nodeName !== "Wrapper" || n2 !== false)) {
                if (N.copyNodeAttribute("id", e4, s2), N.copyNodeAttribute("sequence", e4, s2), N.copyNodeAttribute("adType", e4, s2), s2.nodeName === "Wrapper")
                  return { ad: z(s2, t4), type: "WRAPPER" };
                if (s2.nodeName === "InLine")
                  return { ad: H(s2, t4, { allowMultipleAds: i2 }), type: "INLINE" };
              }
            }
          }
          function H(e4, t4) {
            return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).allowMultipleAds === false && e4.getAttribute("sequence") ? null : q(e4, t4);
          }
          function q(e4, t4) {
            var r3 = [];
            t4 && j.verifyRequiredValues(e4, t4);
            var i2 = e4.childNodes, n2 = function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              return { id: e5.id || null, sequence: e5.sequence || null, adType: e5.adType || null, adServingId: null, categories: [], expires: null, viewableImpression: [], system: null, title: null, description: null, advertiser: null, pricing: null, survey: null, errorURLTemplates: [], impressionURLTemplates: [], creatives: [], extensions: [], adVerifications: [], blockedAdCategories: [], followAdditionalWrappers: true, allowMultipleAds: false, fallbackOnNoAd: null };
            }(N.parseAttributes(e4));
            for (var a2 in i2) {
              var o2 = i2[a2];
              switch (o2.nodeName) {
                case "Error":
                  n2.errorURLTemplates.push(N.parseNodeText(o2));
                  break;
                case "Impression":
                  n2.impressionURLTemplates.push({ id: o2.getAttribute("id") || null, url: N.parseNodeText(o2) });
                  break;
                case "Creatives":
                  n2.creatives = O(N.childrenByName(o2, "Creative"));
                  break;
                case "Extensions":
                  var s2 = N.childrenByName(o2, "Extension");
                  n2.extensions = x(s2), n2.adVerifications.length || (r3 = Q(s2));
                  break;
                case "AdVerifications":
                  n2.adVerifications = G(N.childrenByName(o2, "Verification"));
                  break;
                case "AdSystem":
                  n2.system = { value: N.parseNodeText(o2), version: o2.getAttribute("version") || null };
                  break;
                case "AdTitle":
                  n2.title = N.parseNodeText(o2);
                  break;
                case "AdServingId":
                  n2.adServingId = N.parseNodeText(o2);
                  break;
                case "Category":
                  n2.categories.push({ authority: o2.getAttribute("authority") || null, value: N.parseNodeText(o2) });
                  break;
                case "Expires":
                  n2.expires = parseInt(N.parseNodeText(o2), 10);
                  break;
                case "ViewableImpression":
                  n2.viewableImpression.push(X(o2));
                  break;
                case "Description":
                  n2.description = N.parseNodeText(o2);
                  break;
                case "Advertiser":
                  n2.advertiser = { id: o2.getAttribute("id") || null, value: N.parseNodeText(o2) };
                  break;
                case "Pricing":
                  n2.pricing = { value: N.parseNodeText(o2), model: o2.getAttribute("model") || null, currency: o2.getAttribute("currency") || null };
                  break;
                case "Survey":
                  n2.survey = N.parseNodeText(o2);
                  break;
                case "BlockedAdCategories":
                  n2.blockedAdCategories.push({ authority: o2.getAttribute("authority") || null, value: N.parseNodeText(o2) });
              }
            }
            return r3.length && (n2.adVerifications = n2.adVerifications.concat(r3)), n2;
          }
          function z(e4, t4) {
            var r3 = q(e4, t4), i2 = e4.getAttribute("followAdditionalWrappers"), n2 = e4.getAttribute("allowMultipleAds"), a2 = e4.getAttribute("fallbackOnNoAd");
            r3.followAdditionalWrappers = !i2 || N.parseBoolean(i2), r3.allowMultipleAds = !!n2 && N.parseBoolean(n2), r3.fallbackOnNoAd = a2 ? N.parseBoolean(a2) : null;
            var o2 = N.childByName(e4, "VASTAdTagURI");
            if (o2 ? r3.nextWrapperURL = N.parseNodeText(o2) : (o2 = N.childByName(e4, "VASTAdTagURL")) && (r3.nextWrapperURL = N.parseNodeText(N.childByName(o2, "URL"))), r3.creatives.forEach(function(e5) {
              if (["linear", "nonlinear"].indexOf(e5.type) !== -1) {
                if (e5.trackingEvents) {
                  r3.trackingEvents || (r3.trackingEvents = {}), r3.trackingEvents[e5.type] || (r3.trackingEvents[e5.type] = {});
                  var t5 = function(t6) {
                    var i4 = e5.trackingEvents[t6];
                    Array.isArray(r3.trackingEvents[e5.type][t6]) || (r3.trackingEvents[e5.type][t6] = []), i4.forEach(function(i5) {
                      r3.trackingEvents[e5.type][t6].push(i5);
                    });
                  };
                  for (var i3 in e5.trackingEvents)
                    t5(i3);
                }
                e5.videoClickTrackingURLTemplates && (Array.isArray(r3.videoClickTrackingURLTemplates) || (r3.videoClickTrackingURLTemplates = []), e5.videoClickTrackingURLTemplates.forEach(function(e6) {
                  r3.videoClickTrackingURLTemplates.push(e6);
                })), e5.videoClickThroughURLTemplate && (r3.videoClickThroughURLTemplate = e5.videoClickThroughURLTemplate), e5.videoCustomClickURLTemplates && (Array.isArray(r3.videoCustomClickURLTemplates) || (r3.videoCustomClickURLTemplates = []), e5.videoCustomClickURLTemplates.forEach(function(e6) {
                  r3.videoCustomClickURLTemplates.push(e6);
                }));
              }
            }), r3.nextWrapperURL)
              return r3;
          }
          function G(e4) {
            var t4 = [];
            return e4.forEach(function(e5) {
              var r3 = { resource: null, vendor: null, browserOptional: false, apiFramework: null, type: null, parameters: null, trackingEvents: {} }, i2 = e5.childNodes;
              for (var n2 in N.assignAttributes(e5.attributes, r3), i2) {
                var a2 = i2[n2];
                switch (a2.nodeName) {
                  case "JavaScriptResource":
                  case "ExecutableResource":
                    r3.resource = N.parseNodeText(a2), N.assignAttributes(a2.attributes, r3);
                    break;
                  case "VerificationParameters":
                    r3.parameters = N.parseNodeText(a2);
                }
              }
              var o2 = N.childByName(e5, "TrackingEvents");
              o2 && N.childrenByName(o2, "Tracking").forEach(function(e6) {
                var t5 = e6.getAttribute("event"), i3 = N.parseNodeText(e6);
                t5 && i3 && (Array.isArray(r3.trackingEvents[t5]) || (r3.trackingEvents[t5] = []), r3.trackingEvents[t5].push(i3));
              }), t4.push(r3);
            }), t4;
          }
          function Q(e4) {
            var t4 = null, r3 = [];
            return e4.some(function(e5) {
              return t4 = N.childByName(e5, "AdVerifications");
            }), t4 && (r3 = G(N.childrenByName(t4, "Verification"))), r3;
          }
          function X(e4) {
            var t4 = {};
            t4.id = e4.getAttribute("id") || null;
            var r3 = e4.childNodes;
            for (var i2 in r3) {
              var n2 = r3[i2], a2 = n2.nodeName, o2 = N.parseNodeText(n2);
              if ((a2 === "Viewable" || a2 === "NotViewable" || a2 === "ViewUndetermined") && o2) {
                var s2 = a2.toLowerCase();
                Array.isArray(t4[s2]) || (t4[s2] = []), t4[s2].push(o2);
              }
            }
            return t4;
          }
          var Y = function() {
            function e4() {
              n(this, e4), this._handlers = [];
            }
            return o(e4, [{ key: "on", value: function(e5, t4) {
              if (typeof t4 != "function")
                throw new TypeError("The handler argument must be of type Function. Received type ".concat(i(t4)));
              if (!e5)
                throw new TypeError("The event argument must be of type String. Received type ".concat(i(e5)));
              return this._handlers.push({ event: e5, handler: t4 }), this;
            } }, { key: "once", value: function(e5, t4) {
              return this.on(e5, function(e6, t5, r3) {
                var i2 = { fired: false, wrapFn: void 0 };
                function n2() {
                  i2.fired || (e6.off(t5, i2.wrapFn), i2.fired = true, r3.bind(e6).apply(void 0, arguments));
                }
                return i2.wrapFn = n2, n2;
              }(this, e5, t4));
            } }, { key: "off", value: function(e5, t4) {
              return this._handlers = this._handlers.filter(function(r3) {
                return r3.event !== e5 || r3.handler !== t4;
              }), this;
            } }, { key: "emit", value: function(e5) {
              for (var t4 = arguments.length, r3 = new Array(t4 > 1 ? t4 - 1 : 0), i2 = 1; i2 < t4; i2++)
                r3[i2 - 1] = arguments[i2];
              var n2 = false;
              return this._handlers.forEach(function(t5) {
                t5.event === "*" && (n2 = true, t5.handler.apply(t5, [e5].concat(r3))), t5.event === e5 && (n2 = true, t5.handler.apply(t5, r3));
              }), n2;
            } }, { key: "removeAllListeners", value: function(e5) {
              return e5 ? (this._handlers = this._handlers.filter(function(t4) {
                return t4.event !== e5;
              }), this) : (this._handlers = [], this);
            } }, { key: "listenerCount", value: function(e5) {
              return this._handlers.filter(function(t4) {
                return t4.event === e5;
              }).length;
            } }, { key: "listeners", value: function(e5) {
              return this._handlers.reduce(function(t4, r3) {
                return r3.event === e5 && t4.push(r3.handler), t4;
              }, []);
            } }, { key: "eventNames", value: function() {
              return this._handlers.map(function(e5) {
                return e5.event;
              });
            } }]), e4;
          }(), K = { get: function(e4, t4, r3) {
            r3(new Error("Please bundle the library for node to use the node urlHandler"));
          } }, $ = 12e4;
          function J() {
            try {
              var e4 = new window.XMLHttpRequest();
              return "withCredentials" in e4 ? e4 : null;
            } catch (e5) {
              return null;
            }
          }
          function Z(e4, t4, r3) {
            var i2 = r3 ? 408 : e4.status, n2 = r3 ? "XHRURLHandler: Request timed out after ".concat(e4.timeout, " ms (").concat(i2, ")") : "XHRURLHandler: ".concat(e4.statusText, " (").concat(i2, ")");
            t4(new Error(n2), null, { statusCode: i2 });
          }
          var ee = { get: function(e4, t4, r3) {
            if (window.location.protocol === "https:" && e4.indexOf("http://") === 0)
              return r3(new Error("XHRURLHandler: Cannot go from HTTPS to HTTP."));
            try {
              var i2 = J();
              i2.open("GET", e4), i2.timeout = t4.timeout || $, i2.withCredentials = t4.withCredentials || false, i2.overrideMimeType && i2.overrideMimeType("text/xml"), i2.onload = function() {
                return function(e5, t5) {
                  e5.status === 200 ? t5(null, e5.responseXML, { byteLength: e5.response.length, statusCode: e5.status }) : Z(e5, t5, false);
                }(i2, r3);
              }, i2.onerror = function() {
                return Z(i2, r3, false);
              }, i2.onabort = function() {
                return Z(i2, r3, false);
              }, i2.ontimeout = function() {
                return Z(i2, r3, true);
              }, i2.send();
            } catch (e5) {
              r3(new Error("XHRURLHandler: Unexpected error"));
            }
          }, supported: function() {
            return !!J();
          } }, te = { get: function(e4, t4, r3) {
            return r3 || (typeof t4 == "function" && (r3 = t4), t4 = {}), typeof window == "undefined" || window === null ? K.get(e4, t4, r3) : ee.supported() ? ee.get(e4, t4, r3) : r3(new Error("Current context is not supported by any of the default URLHandlers. Please provide a custom URLHandler"));
          } }, re = 0, ie = 0, ne = function(e4, t4) {
            !e4 || !t4 || e4 <= 0 || t4 <= 0 || (ie = (ie * re + 8 * e4 / t4) / ++re);
          }, ae = { ERRORCODE: 900, extensions: [] }, oe = function(e4) {
            l(r3, e4);
            var t4 = p(r3);
            function r3() {
              var e5;
              return n(this, r3), (e5 = t4.call(this)).remainingAds = [], e5.parentURLs = [], e5.errorURLTemplates = [], e5.rootErrorURLTemplates = [], e5.maxWrapperDepth = null, e5.URLTemplateFilters = [], e5.fetchingOptions = {}, e5.parsingOptions = {}, e5;
            }
            return o(r3, [{ key: "addURLTemplateFilter", value: function(e5) {
              typeof e5 == "function" && this.URLTemplateFilters.push(e5);
            } }, { key: "removeURLTemplateFilter", value: function() {
              this.URLTemplateFilters.pop();
            } }, { key: "countURLTemplateFilters", value: function() {
              return this.URLTemplateFilters.length;
            } }, { key: "clearURLTemplateFilters", value: function() {
              this.URLTemplateFilters = [];
            } }, { key: "trackVastError", value: function(e5, t5) {
              for (var r4 = arguments.length, i2 = new Array(r4 > 2 ? r4 - 2 : 0), n2 = 2; n2 < r4; n2++)
                i2[n2 - 2] = arguments[n2];
              this.emit("VAST-error", Object.assign.apply(Object, [{}, ae, t5].concat(i2))), w.track(e5, t5);
            } }, { key: "getErrorURLTemplates", value: function() {
              return this.rootErrorURLTemplates.concat(this.errorURLTemplates);
            } }, { key: "getEstimatedBitrate", value: function() {
              return ie;
            } }, { key: "fetchVAST", value: function(e5) {
              var t5 = this, r4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, n2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
              return new Promise(function(a2, o2) {
                t5.URLTemplateFilters.forEach(function(t6) {
                  e5 = t6(e5);
                }), t5.parentURLs.push(e5);
                var s2 = Date.now();
                t5.emit("VAST-resolving", { url: e5, previousUrl: i2, wrapperDepth: r4, maxWrapperDepth: t5.maxWrapperDepth, timeout: t5.fetchingOptions.timeout, wrapperAd: n2 }), t5.urlHandler.get(e5, t5.fetchingOptions, function(n3, l2) {
                  var c2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, u2 = Math.round(Date.now() - s2), d2 = Object.assign({ url: e5, previousUrl: i2, wrapperDepth: r4, error: n3, duration: u2 }, c2);
                  t5.emit("VAST-resolved", d2), ne(c2.byteLength, u2), n3 ? o2(n3) : a2(l2);
                });
              });
            } }, { key: "initParsingStatus", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              this.errorURLTemplates = [], this.fetchingOptions = { timeout: e5.timeout || $, withCredentials: e5.withCredentials }, this.maxWrapperDepth = e5.wrapperLimit || 10, this.parentURLs = [], this.parsingOptions = { allowMultipleAds: e5.allowMultipleAds }, this.remainingAds = [], this.rootErrorURLTemplates = [], this.rootURL = "", this.urlHandler = e5.urlHandler || e5.urlhandler || te, this.vastVersion = null, ne(e5.byteLength, e5.requestDuration);
            } }, { key: "getRemainingAds", value: function(e5) {
              var t5 = this;
              if (this.remainingAds.length === 0)
                return Promise.reject(new Error("No more ads are available for the given VAST"));
              var r4 = e5 ? w.flatten(this.remainingAds) : this.remainingAds.shift();
              return this.errorURLTemplates = [], this.parentURLs = [], this.resolveAds(r4, { wrapperDepth: 0, url: this.rootURL }).then(function(e6) {
                return t5.buildVASTResponse(e6);
              });
            } }, { key: "getAndParseVAST", value: function(e5) {
              var t5 = this, r4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              return this.initParsingStatus(r4), this.URLTemplateFilters.forEach(function(t6) {
                e5 = t6(e5);
              }), this.rootURL = e5, this.fetchVAST(e5).then(function(i2) {
                return r4.previousUrl = e5, r4.isRootVAST = true, r4.url = e5, t5.parse(i2, r4).then(function(e6) {
                  return t5.buildVASTResponse(e6);
                });
              });
            } }, { key: "parseVAST", value: function(e5) {
              var t5 = this, r4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              return this.initParsingStatus(r4), r4.isRootVAST = true, this.parse(e5, r4).then(function(e6) {
                return t5.buildVASTResponse(e6);
              });
            } }, { key: "buildVASTResponse", value: function(e5) {
              var t5, r4 = { ads: (t5 = { ads: e5, errorURLTemplates: this.getErrorURLTemplates(), version: this.vastVersion }).ads || [], errorURLTemplates: t5.errorURLTemplates || [], version: t5.version || null };
              return this.completeWrapperResolving(r4), r4;
            } }, { key: "parseVastXml", value: function(e5, t5) {
              var r4 = t5.isRootVAST, i2 = r4 !== void 0 && r4, n2 = t5.url, a2 = n2 === void 0 ? null : n2, o2 = t5.wrapperDepth, s2 = o2 === void 0 ? 0 : o2, l2 = t5.allowMultipleAds, c2 = t5.followAdditionalWrappers;
              if (!e5 || !e5.documentElement || e5.documentElement.nodeName !== "VAST")
                throw this.emit("VAST-ad-parsed", { type: "ERROR", url: a2, wrapperDepth: s2 }), new Error("Invalid VAST XMLDocument");
              var u2 = [], d2 = e5.documentElement.childNodes, p2 = e5.documentElement.getAttribute("version");
              for (var h2 in i2 && p2 && (this.vastVersion = p2), d2) {
                var f2 = d2[h2];
                if (f2.nodeName === "Error") {
                  var m2 = N.parseNodeText(f2);
                  i2 ? this.rootErrorURLTemplates.push(m2) : this.errorURLTemplates.push(m2);
                } else if (f2.nodeName === "Ad") {
                  if (this.vastVersion && parseFloat(this.vastVersion) < 3)
                    l2 = true;
                  else if (l2 === false && u2.length > 1)
                    break;
                  var v2 = W(f2, this.emit.bind(this), { allowMultipleAds: l2, followAdditionalWrappers: c2 });
                  v2.ad ? (u2.push(v2.ad), this.emit("VAST-ad-parsed", { type: v2.type, url: a2, wrapperDepth: s2, adIndex: u2.length - 1, vastVersion: p2 })) : this.trackVastError(this.getErrorURLTemplates(), { ERRORCODE: 101 });
                }
              }
              return u2;
            } }, { key: "parse", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r4 = t5.url, i2 = r4 === void 0 ? null : r4, n2 = t5.resolveAll, a2 = n2 === void 0 || n2, o2 = t5.wrapperSequence, s2 = o2 === void 0 ? null : o2, l2 = t5.previousUrl, c2 = l2 === void 0 ? null : l2, u2 = t5.wrapperDepth, d2 = u2 === void 0 ? 0 : u2, p2 = t5.isRootVAST, h2 = p2 !== void 0 && p2, f2 = t5.followAdditionalWrappers, m2 = t5.allowMultipleAds, v2 = [];
              this.vastVersion && parseFloat(this.vastVersion) < 3 && h2 && (m2 = true);
              try {
                v2 = this.parseVastXml(e5, { isRootVAST: h2, url: i2, wrapperDepth: d2, allowMultipleAds: m2, followAdditionalWrappers: f2 });
              } catch (e6) {
                return Promise.reject(e6);
              }
              return v2.length === 1 && s2 != null && (v2[0].sequence = s2), a2 === false && (this.remainingAds = N.splitVAST(v2), v2 = this.remainingAds.shift()), this.resolveAds(v2, { wrapperDepth: d2, previousUrl: c2, url: i2 });
            } }, { key: "resolveAds", value: function() {
              var e5 = this, t5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r4 = arguments.length > 1 ? arguments[1] : void 0, i2 = r4.wrapperDepth, n2 = r4.previousUrl, a2 = r4.url, o2 = [];
              return n2 = a2, t5.forEach(function(t6) {
                var r5 = e5.resolveWrappers(t6, i2, n2);
                o2.push(r5);
              }), Promise.all(o2).then(function(t6) {
                var r5 = w.flatten(t6);
                if (!r5 && e5.remainingAds.length > 0) {
                  var o3 = e5.remainingAds.shift();
                  return e5.resolveAds(o3, { wrapperDepth: i2, previousUrl: n2, url: a2 });
                }
                return r5;
              });
            } }, { key: "resolveWrappers", value: function(e5, t5, r4) {
              var i2 = this;
              return new Promise(function(n2) {
                var a2;
                if (t5++, !e5.nextWrapperURL)
                  return delete e5.nextWrapperURL, n2(e5);
                if (t5 >= i2.maxWrapperDepth || i2.parentURLs.indexOf(e5.nextWrapperURL) !== -1)
                  return e5.errorCode = 302, delete e5.nextWrapperURL, n2(e5);
                e5.nextWrapperURL = N.resolveVastAdTagURI(e5.nextWrapperURL, r4), i2.URLTemplateFilters.forEach(function(t6) {
                  e5.nextWrapperURL = t6(e5.nextWrapperURL);
                });
                var o2 = (a2 = i2.parsingOptions.allowMultipleAds) !== null && a2 !== void 0 ? a2 : e5.allowMultipleAds, s2 = e5.sequence;
                i2.fetchVAST(e5.nextWrapperURL, t5, r4, e5).then(function(a3) {
                  return i2.parse(a3, { url: e5.nextWrapperURL, previousUrl: r4, wrapperSequence: s2, wrapperDepth: t5, followAdditionalWrappers: e5.followAdditionalWrappers, allowMultipleAds: o2 }).then(function(t6) {
                    if (delete e5.nextWrapperURL, t6.length === 0)
                      return e5.creatives = [], n2(e5);
                    t6.forEach(function(t7) {
                      t7 && N.mergeWrapperAdData(t7, e5);
                    }), n2(t6);
                  });
                }).catch(function(t6) {
                  e5.errorCode = 301, e5.errorMessage = t6.message, n2(e5);
                });
              });
            } }, { key: "completeWrapperResolving", value: function(e5) {
              if (e5.ads.length === 0)
                this.trackVastError(e5.errorURLTemplates, { ERRORCODE: 303 });
              else
                for (var t5 = e5.ads.length - 1; t5 >= 0; t5--) {
                  var r4 = e5.ads[t5];
                  (r4.errorCode || r4.creatives.length === 0) && (this.trackVastError(r4.errorURLTemplates.concat(e5.errorURLTemplates), { ERRORCODE: r4.errorCode || 303 }, { ERRORMESSAGE: r4.errorMessage || "" }, { extensions: r4.extensions }, { system: r4.system }), e5.ads.splice(t5, 1));
                }
            } }]), r3;
          }(Y), se = null, le = { data: {}, length: 0, getItem: function(e4) {
            return this.data[e4];
          }, setItem: function(e4, t4) {
            this.data[e4] = t4, this.length = Object.keys(this.data).length;
          }, removeItem: function(e4) {
            delete this.data[e4], this.length = Object.keys(this.data).length;
          }, clear: function() {
            this.data = {}, this.length = 0;
          } }, ce = function() {
            function e4() {
              n(this, e4), this.storage = this.initStorage();
            }
            return o(e4, [{ key: "initStorage", value: function() {
              if (se)
                return se;
              try {
                se = typeof window != "undefined" && window !== null ? window.localStorage || window.sessionStorage : null;
              } catch (e5) {
                se = null;
              }
              return se && !this.isStorageDisabled(se) || (se = le).clear(), se;
            } }, { key: "isStorageDisabled", value: function(e5) {
              var t4 = "__VASTStorage__";
              try {
                if (e5.setItem(t4, t4), e5.getItem(t4) !== t4)
                  return e5.removeItem(t4), true;
              } catch (e6) {
                return true;
              }
              return e5.removeItem(t4), false;
            } }, { key: "getItem", value: function(e5) {
              return this.storage.getItem(e5);
            } }, { key: "setItem", value: function(e5, t4) {
              return this.storage.setItem(e5, t4);
            } }, { key: "removeItem", value: function(e5) {
              return this.storage.removeItem(e5);
            } }, { key: "clear", value: function() {
              return this.storage.clear();
            } }]), e4;
          }(), ue = function() {
            function e4(t4, r3, i2) {
              n(this, e4), this.cappingFreeLunch = t4 || 0, this.cappingMinimumTimeInterval = r3 || 0, this.defaultOptions = { withCredentials: false, timeout: 0 }, this.vastParser = new oe(), this.storage = i2 || new ce(), this.lastSuccessfulAd === void 0 && (this.lastSuccessfulAd = 0), this.totalCalls === void 0 && (this.totalCalls = 0), this.totalCallsTimeout === void 0 && (this.totalCallsTimeout = 0);
            }
            return o(e4, [{ key: "getParser", value: function() {
              return this.vastParser;
            } }, { key: "lastSuccessfulAd", get: function() {
              return this.storage.getItem("vast-client-last-successful-ad");
            }, set: function(e5) {
              this.storage.setItem("vast-client-last-successful-ad", e5);
            } }, { key: "totalCalls", get: function() {
              return this.storage.getItem("vast-client-total-calls");
            }, set: function(e5) {
              this.storage.setItem("vast-client-total-calls", e5);
            } }, { key: "totalCallsTimeout", get: function() {
              return this.storage.getItem("vast-client-total-calls-timeout");
            }, set: function(e5) {
              this.storage.setItem("vast-client-total-calls-timeout", e5);
            } }, { key: "hasRemainingAds", value: function() {
              return this.vastParser.remainingAds.length > 0;
            } }, { key: "getNextAds", value: function(e5) {
              return this.vastParser.getRemainingAds(e5);
            } }, { key: "get", value: function(e5) {
              var t4 = this, r3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i2 = Date.now();
              return (r3 = Object.assign({}, this.defaultOptions, r3)).hasOwnProperty("resolveAll") || (r3.resolveAll = false), this.totalCallsTimeout < i2 ? (this.totalCalls = 1, this.totalCallsTimeout = i2 + 36e5) : this.totalCalls++, new Promise(function(n2, a2) {
                if (t4.cappingFreeLunch >= t4.totalCalls)
                  return a2(new Error("VAST call canceled \u2013 FreeLunch capping not reached yet ".concat(t4.totalCalls, "/").concat(t4.cappingFreeLunch)));
                var o2 = i2 - t4.lastSuccessfulAd;
                if (o2 < 0)
                  t4.lastSuccessfulAd = 0;
                else if (o2 < t4.cappingMinimumTimeInterval)
                  return a2(new Error("VAST call canceled \u2013 (".concat(t4.cappingMinimumTimeInterval, ")ms minimum interval reached")));
                t4.vastParser.getAndParseVAST(e5, r3).then(function(e6) {
                  return n2(e6);
                }).catch(function(e6) {
                  return a2(e6);
                });
              });
            } }]), e4;
          }(), de = function(e4) {
            l(a2, e4);
            var t4 = p(a2);
            function a2(e5, r3, i2) {
              var o2, s2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
              for (var l2 in n(this, a2), (o2 = t4.call(this)).ad = r3, o2.creative = i2, o2.variation = s2, o2.muted = false, o2.impressed = false, o2.skippable = false, o2.trackingEvents = {}, o2.lastPercentage = 0, o2._alreadyTriggeredQuartiles = {}, o2.emitAlwaysEvents = ["creativeView", "start", "firstQuartile", "midpoint", "thirdQuartile", "complete", "resume", "pause", "rewind", "skip", "closeLinear", "close"], o2.creative.trackingEvents) {
                var c2 = o2.creative.trackingEvents[l2];
                o2.trackingEvents[l2] = c2.slice(0);
              }
              return I(o2.creative) ? o2._initLinearTracking() : o2._initVariationTracking(), e5 && o2.on("start", function() {
                e5.lastSuccessfulAd = Date.now();
              }), o2;
            }
            return o(a2, [{ key: "_initLinearTracking", value: function() {
              this.linear = true, this.skipDelay = this.creative.skipDelay, this.setDuration(this.creative.duration), this.clickThroughURLTemplate = this.creative.videoClickThroughURLTemplate, this.clickTrackingURLTemplates = this.creative.videoClickTrackingURLTemplates;
            } }, { key: "_initVariationTracking", value: function() {
              if (this.linear = false, this.skipDelay = -1, this.variation) {
                for (var e5 in this.variation.trackingEvents) {
                  var t5 = this.variation.trackingEvents[e5];
                  this.trackingEvents[e5] ? this.trackingEvents[e5] = this.trackingEvents[e5].concat(t5.slice(0)) : this.trackingEvents[e5] = t5.slice(0);
                }
                this.variation.adType === "nonLinearAd" ? (this.clickThroughURLTemplate = this.variation.nonlinearClickThroughURLTemplate, this.clickTrackingURLTemplates = this.variation.nonlinearClickTrackingURLTemplates, this.setDuration(this.variation.minSuggestedDuration)) : function(e6) {
                  return e6.adType === "companionAd";
                }(this.variation) && (this.clickThroughURLTemplate = this.variation.companionClickThroughURLTemplate, this.clickTrackingURLTemplates = this.variation.companionClickTrackingURLTemplates);
              }
            } }, { key: "setDuration", value: function(e5) {
              w.isValidTimeValue(e5) && (this.assetDuration = e5, this.quartiles = { firstQuartile: Math.round(25 * this.assetDuration) / 100, midpoint: Math.round(50 * this.assetDuration) / 100, thirdQuartile: Math.round(75 * this.assetDuration) / 100 });
            } }, { key: "setProgress", value: function(e5) {
              var t5 = this, r3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (w.isValidTimeValue(e5) && i(r3) === "object") {
                var n2 = this.skipDelay || -1;
                if (n2 === -1 || this.skippable || (n2 > e5 ? this.emit("skip-countdown", n2 - e5) : (this.skippable = true, this.emit("skip-countdown", 0))), this.assetDuration > 0) {
                  var a3 = Math.round(e5 / this.assetDuration * 100), o2 = [];
                  if (e5 > 0) {
                    o2.push("start");
                    for (var s2 = this.lastPercentage; s2 < a3; s2++)
                      o2.push("progress-".concat(s2 + 1, "%"));
                    for (var l2 in o2.push("progress-".concat(Math.round(e5))), this.quartiles)
                      this.isQuartileReached(l2, this.quartiles[l2], e5) && (o2.push(l2), this._alreadyTriggeredQuartiles[l2] = true);
                    this.lastPercentage = a3;
                  }
                  o2.forEach(function(e6) {
                    t5.track(e6, { macros: r3, once: true });
                  }), e5 < this.progress && this.track("rewind", { macros: r3 });
                }
                this.progress = e5;
              }
            } }, { key: "isQuartileReached", value: function(e5, t5, r3) {
              var i2 = false;
              return t5 <= r3 && !this._alreadyTriggeredQuartiles[e5] && (i2 = true), i2;
            } }, { key: "setMuted", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              typeof e5 == "boolean" && i(t5) === "object" && (this.muted !== e5 && this.track(e5 ? "mute" : "unmute", { macros: t5 }), this.muted = e5);
            } }, { key: "setPaused", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              typeof e5 == "boolean" && i(t5) === "object" && (this.paused !== e5 && this.track(e5 ? "pause" : "resume", { macros: t5 }), this.paused = e5);
            } }, { key: "setFullscreen", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              typeof e5 == "boolean" && i(t5) === "object" && (this.fullscreen !== e5 && this.track(e5 ? "fullscreen" : "exitFullscreen", { macros: t5 }), this.fullscreen = e5);
            } }, { key: "setExpand", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              typeof e5 == "boolean" && i(t5) === "object" && (this.expanded !== e5 && (this.track(e5 ? "expand" : "collapse", { macros: t5 }), this.track(e5 ? "playerExpand" : "playerCollapse", { macros: t5 })), this.expanded = e5);
            } }, { key: "setSkipDelay", value: function(e5) {
              w.isValidTimeValue(e5) && (this.skipDelay = e5);
            } }, { key: "trackImpression", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && (this.impressed || (this.impressed = true, this.trackURLs(this.ad.impressionURLTemplates, e5), this.track("creativeView", { macros: e5 })));
            } }, { key: "error", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t5 = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
              i(e5) === "object" && typeof t5 == "boolean" && this.trackURLs(this.ad.errorURLTemplates, e5, { isCustomCode: t5 });
            } }, { key: "errorWithCode", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
              typeof e5 == "string" && typeof t5 == "boolean" && (this.error({ ERRORCODE: e5 }, t5), console.log("The method errorWithCode is deprecated, please use vast tracker error method instead"));
            } }, { key: "complete", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track("complete", { macros: e5 });
            } }, { key: "notUsed", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && (this.track("notUsed", { macros: e5 }), this.trackingEvents = []);
            } }, { key: "otherAdInteraction", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track("otherAdInteraction", { macros: e5 });
            } }, { key: "acceptInvitation", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track("acceptInvitation", { macros: e5 });
            } }, { key: "adExpand", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track("adExpand", { macros: e5 });
            } }, { key: "adCollapse", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track("adCollapse", { macros: e5 });
            } }, { key: "minimize", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track("minimize", { macros: e5 });
            } }, { key: "verificationNotExecuted", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (typeof e5 == "string" && i(t5) === "object") {
                if (!this.ad || !this.ad.adVerifications || !this.ad.adVerifications.length)
                  throw new Error("No adVerifications provided");
                if (!e5)
                  throw new Error("No vendor provided, unable to find associated verificationNotExecuted");
                var r3 = this.ad.adVerifications.find(function(t6) {
                  return t6.vendor === e5;
                });
                if (!r3)
                  throw new Error("No associated verification element found for vendor: ".concat(e5));
                var n2 = r3.trackingEvents;
                if (n2 && n2.verificationNotExecuted) {
                  var a3 = n2.verificationNotExecuted;
                  this.trackURLs(a3, t5), this.emit("verificationNotExecuted", { trackingURLTemplates: a3 });
                }
              }
            } }, { key: "overlayViewDuration", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              typeof e5 == "string" && i(t5) === "object" && (t5.ADPLAYHEAD = e5, this.track("overlayViewDuration", { macros: t5 }));
            } }, { key: "close", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track(this.linear ? "closeLinear" : "close", { macros: e5 });
            } }, { key: "skip", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track("skip", { macros: e5 });
            } }, { key: "load", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              i(e5) === "object" && this.track("loaded", { macros: e5 });
            } }, { key: "click", value: function() {
              var e5 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if ((e5 === null || typeof e5 == "string") && i(t5) === "object") {
                this.clickTrackingURLTemplates && this.clickTrackingURLTemplates.length && this.trackURLs(this.clickTrackingURLTemplates, t5);
                var n2 = this.clickThroughURLTemplate || e5, a3 = r2({}, t5);
                if (n2) {
                  this.progress && (a3.ADPLAYHEAD = this.progressFormatted());
                  var o2 = w.resolveURLTemplates([n2], a3)[0];
                  this.emit("clickthrough", o2);
                }
              }
            } }, { key: "track", value: function(e5) {
              var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r3 = t5.macros, n2 = r3 === void 0 ? {} : r3, a3 = t5.once, o2 = a3 !== void 0 && a3;
              if (i(n2) === "object") {
                e5 === "closeLinear" && !this.trackingEvents[e5] && this.trackingEvents.close && (e5 = "close");
                var s2 = this.trackingEvents[e5], l2 = this.emitAlwaysEvents.indexOf(e5) > -1;
                s2 ? (this.emit(e5, { trackingURLTemplates: s2 }), this.trackURLs(s2, n2)) : l2 && this.emit(e5, null), o2 && (delete this.trackingEvents[e5], l2 && this.emitAlwaysEvents.splice(this.emitAlwaysEvents.indexOf(e5), 1));
              }
            } }, { key: "trackURLs", value: function(e5) {
              var t5, i2, n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a3 = r2({}, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {});
              this.linear && (this.creative && this.creative.mediaFiles && this.creative.mediaFiles[0] && this.creative.mediaFiles[0].fileURL && (a3.ASSETURI = this.creative.mediaFiles[0].fileURL), this.progress && (a3.ADPLAYHEAD = this.progressFormatted())), (t5 = this.creative) !== null && t5 !== void 0 && (i2 = t5.universalAdIds) !== null && i2 !== void 0 && i2.length && (a3.UNIVERSALADID = this.creative.universalAdIds.map(function(e6) {
                return e6.idRegistry.concat(" ", e6.value);
              }).join(",")), this.ad && (this.ad.sequence && (a3.PODSEQUENCE = this.ad.sequence), this.ad.adType && (a3.ADTYPE = this.ad.adType), this.ad.adServingId && (a3.ADSERVINGID = this.ad.adServingId), this.ad.categories && this.ad.categories.length && (a3.ADCATEGORIES = this.ad.categories.map(function(e6) {
                return e6.value;
              }).join(",")), this.ad.blockedAdCategories && this.ad.blockedAdCategories.length && (a3.BLOCKEDADCATEGORIES = this.ad.blockedAdCategories)), w.track(e5, a3, n2);
            } }, { key: "convertToTimecode", value: function(e5) {
              if (!w.isValidTimeValue(e5))
                return "";
              var t5 = 1e3 * e5, r3 = Math.floor(t5 / 36e5), i2 = Math.floor(t5 / 6e4 % 60), n2 = Math.floor(t5 / 1e3 % 60), a3 = Math.floor(t5 % 1e3);
              return "".concat(w.addLeadingZeros(r3, 2), ":").concat(w.addLeadingZeros(i2, 2), ":").concat(w.addLeadingZeros(n2, 2), ".").concat(w.addLeadingZeros(a3, 3));
            } }, { key: "progressFormatted", value: function() {
              return this.convertToTimecode(this.progress);
            } }]), a2;
          }(Y);
          e3.VASTClient = ue, e3.VASTParser = oe, e3.VASTTracker = de, Object.defineProperty(e3, "__esModule", { value: true });
        }(t2);
      }, 144: (e2, t2, r2) => {
        var i, n = r2.g !== void 0 ? r2.g : typeof window != "undefined" ? window : {}, a = r2(893);
        typeof document != "undefined" ? i = document : (i = n["__GLOBAL_DOCUMENT_CACHE@4"]) || (i = n["__GLOBAL_DOCUMENT_CACHE@4"] = a), e2.exports = i;
      }, 908: (e2, t2, r2) => {
        var i;
        i = typeof window != "undefined" ? window : r2.g !== void 0 ? r2.g : typeof self != "undefined" ? self : {}, e2.exports = i;
      }, 596: (e2) => {
        "use strict";
        var t2 = ["handshakeVersion", "initAd", "startAd", "stopAd", "skipAd", "resizeAd", "pauseAd", "resumeAd", "expandAd", "collapseAd", "subscribe", "unsubscribe"];
        function r2(e3, t3, r3) {
        }
        r2.prototype.handshakeVersion = function(e3, t3) {
        }, r2.prototype.initAd = function(e3, t3, r3, i2, n2, a, o) {
        }, r2.prototype.startAd = function(e3) {
        }, r2.prototype.stopAd = function(e3) {
        }, r2.prototype.skipAd = function(e3) {
        }, r2.prototype.resizeAd = function(e3, t3, r3, i2) {
        }, r2.prototype.pauseAd = function(e3) {
        }, r2.prototype.resumeAd = function(e3) {
        }, r2.prototype.expandAd = function(e3) {
        }, r2.prototype.collapseAd = function(e3) {
        }, r2.prototype.subscribe = function(e3, t3, r3) {
        }, r2.prototype.unsubscribe = function(e3, t3) {
        }, r2.prototype.getAdLinear = function(e3) {
        }, r2.prototype.getAdWidth = function(e3) {
        }, r2.prototype.getAdHeight = function(e3) {
        }, r2.prototype.getAdExpanded = function(e3) {
        }, r2.prototype.getAdSkippableState = function(e3) {
        }, r2.prototype.getAdRemainingTime = function(e3) {
        }, r2.prototype.getAdDuration = function(e3) {
        }, r2.prototype.getAdVolume = function(e3) {
        }, r2.prototype.getAdCompanions = function(e3) {
        }, r2.prototype.getAdIcons = function(e3) {
        }, r2.prototype.setAdVolume = function(e3, t3) {
        }, n(r2, "METHODS", t2), n(r2, "GETTERS", ["getAdLinear", "getAdWidth", "getAdHeight", "getAdExpanded", "getAdSkippableState", "getAdRemainingTime", "getAdDuration", "getAdVolume", "getAdCompanions", "getAdIcons"]), n(r2, "SETTERS", ["setAdVolume"]), n(r2, "EVENTS", ["AdLoaded", "AdStarted", "AdStopped", "AdSkipped", "AdSkippableStateChange", "AdSizeChange", "AdLinearChange", "AdDurationChange", "AdExpandedChange", "AdRemainingTimeChange", "AdVolumeChange", "AdImpression", "AdVideoStart", "AdVideoFirstQuartile", "AdVideoMidpoint", "AdVideoThirdQuartile", "AdVideoComplete", "AdClickThru", "AdInteraction", "AdUserAcceptInvitation", "AdUserMinimize", "AdUserClose", "AdPaused", "AdPlaying", "AdLog", "AdError"]);
        var i = t2.filter(function(e3) {
          return ["skipAd"].indexOf(e3) === -1;
        });
        function n(e3, t3, r3) {
          Object.defineProperty(e3, t3, { writable: false, configurable: false, value: r3 });
        }
        n(r2, "checkVPAIDInterface", function(e3) {
          return i.every(function(t3) {
            return typeof e3[t3] == "function";
          });
        }), e2.exports = r2;
      }, 13: (e2, t2, r2) => {
        "use strict";
        var i = r2(596), n = r2(437), a = i.checkVPAIDInterface, o = r2(77), s = (i.METHODS, "AdClickThru"), l = i.EVENTS.filter(function(e3) {
          return e3 != s;
        });
        function c(e3, t3, r3, i2) {
          this._isValid = a(e3), this._isValid && (this._creative = e3, this._el = t3, this._videoEl = r3, this._iframe = i2, this._subscribers = new n(), o.setFullSizeStyle(t3), u.call(this));
        }
        function u() {
          if (l.forEach(function(e4) {
            this._creative.subscribe(p.bind(this, e4), e4);
          }.bind(this)), this._creative.subscribe(d.bind(this), s), this._videoEl) {
            var e3 = this._iframe.contentDocument.documentElement, t3 = this._videoEl;
            e3.addEventListener("click", function(r3) {
              r3.target === e3 && t3.click();
            });
          }
        }
        function d(e3, t3, r3) {
          this._subscribers.triggerSync(s, { url: e3, id: t3, playerHandles: r3 });
        }
        function p(e3) {
          this._subscribers.trigger.apply(this._subscribers, Array.prototype.slice.call(arguments));
        }
        function h(e3, t3, r3, i2) {
          e3 ? e3(r3, i2) : r3 && t3.trigger("AdError", r3);
        }
        c.prototype = Object.create(i.prototype), c.prototype.isValidVPAIDAd = function() {
          return this._isValid;
        }, i.METHODS.forEach(function(e3) {
          ["subscribe", "unsubscribe", "initAd"].indexOf(e3) === -1 && (c.prototype[e3] = function() {
            var t3 = i.prototype[e3].length, r3 = Array.prototype.slice.call(arguments), n2 = t3 === r3.length ? r3.pop() : void 0;
            setTimeout(function() {
              var t4, i2 = null;
              try {
                t4 = this._creative[e3].apply(this._creative, r3);
              } catch (e4) {
                i2 = e4;
              }
              h(n2, this._subscribers, i2, t4);
            }.bind(this), 0);
          });
        }), c.prototype.initAd = function(e3, t3, r3, i2, n2, a2, s2) {
          n2 = n2 || {}, a2 = o.extend({ slot: this._el, videoSlot: this._videoEl }, a2 || {}), setTimeout(function() {
            var o2;
            try {
              this._creative.initAd(e3, t3, r3, i2, n2, a2);
            } catch (e4) {
              o2 = e4;
            }
            h(s2, this._subscribers, o2);
          }.bind(this), 0);
        }, c.prototype.subscribe = function(e3, t3, r3) {
          this._subscribers.subscribe(t3, e3, r3);
        }, c.prototype.unsubscribe = function(e3, t3) {
          this._subscribers.unsubscribe(t3, e3);
        }, c.prototype.on = c.prototype.subscribe, c.prototype.off = c.prototype.unsubscribe, i.GETTERS.forEach(function(e3) {
          c.prototype[e3] = function(t3) {
            setTimeout(function() {
              var r3, i2 = null;
              try {
                r3 = this._creative[e3]();
              } catch (e4) {
                i2 = e4;
              }
              h(t3, this._subscribers, i2, r3);
            }.bind(this), 0);
          };
        }), c.prototype.setAdVolume = function(e3, t3) {
          setTimeout(function() {
            var r3, i2 = null;
            try {
              this._creative.setAdVolume(e3), r3 = this._creative.getAdVolume();
            } catch (e4) {
              i2 = e4;
            }
            i2 || (i2 = o.validate(r3 === e3, "failed to apply volume: " + e3)), h(t3, this._subscribers, i2, r3);
          }.bind(this), 0);
        }, c.prototype._destroy = function() {
          this.stopAd(), this._subscribers.unsubscribeAll();
        }, e2.exports = c;
      }, 178: (e2, t2, r2) => {
        "use strict";
        var i = r2(77), n = i.unique("vpaidIframe"), a = r2(13);
        function o(e3, t3, r3, a2) {
          r3 = r3 || {}, this._id = n(), this._destroyed = false, this._frameContainer = i.createElementInEl(e3, "div"), this._videoEl = t3, this._vpaidOptions = a2 || { timeout: 1e4 }, this._templateConfig = { template: r3.template || `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body style="margin:0;padding:0"><div class="ad-element"></div><script type="text/javascript" src="{{iframeURL_JS}}"><\/script><script type="text/javascript">window.parent.postMessage('{"event": "ready", "id": "{{iframeID}}"}', '{{origin}}');<\/script></body></html>`, extraOptions: r3.extraOptions || {} };
        }
        function s(e3) {
          var t3 = this[e3];
          t3 && t3.parentNode && (t3.parentNode.removeChild(t3), delete this[e3]);
        }
        function l() {
          u.call(this), delete this._adUnit;
        }
        function c() {
          u.call(this), p.call(this);
        }
        function u() {
          s.call(this, "_frame"), d.call(this);
        }
        function d() {
          this._onLoad && (window.removeEventListener("message", this._onLoad), delete this._onLoad);
        }
        function p() {
          this._adUnit && (this._adUnit.stopAd(), delete this._adUnit);
        }
        function h() {
          if (this._destroyed)
            throw new Error("VPAIDHTML5Client already destroyed!");
        }
        function f() {
          return window.location.origin ? window.location.origin : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
        }
        o.prototype.destroy = function() {
          this._destroyed || (this._destroyed = true, c.call(this));
        }, o.prototype.isDestroyed = function() {
          return this._destroyed;
        }, o.prototype.loadAdUnit = function(e3, t3) {
          if (!this._onLoad) {
            h.call(this), c.call(this);
            var r3 = this, n2 = i.createIframeWithContent(this._frameContainer, this._templateConfig.template, i.extend({ iframeURL_JS: e3, iframeID: this.getID(), origin: f() }, this._templateConfig.extraOptions));
            this._frame = n2, this._onLoad = i.callbackTimeout(this._vpaidOptions.timeout, function(e4) {
              if (e4.origin !== f())
                return;
              var n3, o2, s2, c2;
              try {
                n3 = JSON.parse(e4.data);
              } catch (e5) {
                throw e5;
              }
              if (n3.id !== r3.getID())
                return;
              r3._frame.contentWindow ? (c2 = r3._frame.contentWindow.getVPAIDAd, s2 = i.validate(typeof c2 == "function", "the ad didn't return a function to create an ad")) : s2 = "the iframe is not anymore in the DOM tree";
              if (!s2) {
                var u2 = r3._frame.contentWindow.document.querySelector(".ad-element");
                (o2 = new a(c2(), u2, r3._videoEl, r3._frame)).subscribe("AdStopped", l.bind(r3)), s2 = i.validate(o2.isValidVPAIDAd(), "the add is not fully complaint with VPAID specification");
              }
              return r3._adUnit = o2, d.call(r3), t3(s2, s2 ? null : o2), true;
            }.bind(this), function() {
              t3("timeout", null);
            }.bind(this)), window.addEventListener("message", this._onLoad);
          }
        }, o.prototype.unloadAdUnit = function() {
          c.call(this);
        }, o.prototype.getID = function() {
          return this._id;
        }, e2.exports = o, window.VPAIDHTML5Client = o;
      }, 437: (e2) => {
        "use strict";
        function t2() {
          this._subscribers = {};
        }
        t2.prototype.subscribe = function(e3, t3, r2) {
          this.isHandlerAttached(e3, t3) || this.get(t3).push({ handler: e3, context: r2, eventName: t3 });
        }, t2.prototype.unsubscribe = function(e3, t3) {
          this._subscribers[t3] = this.get(t3).filter(function(t4) {
            return e3 !== t4.handler;
          });
        }, t2.prototype.unsubscribeAll = function() {
          this._subscribers = {};
        }, t2.prototype.trigger = function(e3, t3) {
          var r2 = this;
          this.get(e3).concat(this.get("*")).forEach(function(e4) {
            setTimeout(function() {
              r2.isHandlerAttached(e4.handler, e4.eventName) && e4.handler.call(e4.context, t3);
            }, 0);
          });
        }, t2.prototype.triggerSync = function(e3, t3) {
          this.get(e3).concat(this.get("*")).forEach(function(e4) {
            e4.handler.call(e4.context, t3);
          });
        }, t2.prototype.get = function(e3) {
          return this._subscribers[e3] || (this._subscribers[e3] = []), this._subscribers[e3];
        }, t2.prototype.isHandlerAttached = function(e3, t3) {
          return this.get(t3).some(function(t4) {
            return e3 === t4.handler;
          });
        }, e2.exports = t2;
      }, 77: (e2) => {
        "use strict";
        function t2() {
        }
        function r2(e3, t3, r3) {
          var n2 = document.createElement("iframe");
          return n2.src = t3 || "about:blank", n2.marginWidth = "0", n2.marginHeight = "0", n2.frameBorder = "0", n2.width = "100%", n2.height = "100%", i(n2), r3 && (n2.style.zIndex = r3), n2.setAttribute("SCROLLING", "NO"), e3.innerHTML = "", e3.appendChild(n2), n2;
        }
        function i(e3) {
          e3 && (e3.style.position = "absolute", e3.style.left = "0", e3.style.top = "0", e3.style.margin = "0px", e3.style.padding = "0px", e3.style.border = "none", e3.style.width = "100%", e3.style.height = "100%");
        }
        function n(e3, t3) {
          return Object.keys(t3).forEach(function(r3) {
            var i2 = typeof i2 == "object" ? JSON.stringify(t3[r3]) : t3[r3];
            e3 = e3.replace(new RegExp("{{" + r3 + "}}", "g"), i2);
          }), e3;
        }
        function a(e3, t3) {
          var r3 = e3.contentWindow && e3.contentWindow.document;
          return !!r3 && (r3.write(t3), true);
        }
        e2.exports = { noop: t2, validate: function(e3, t3) {
          return e3 ? null : new Error(t3);
        }, callbackTimeout: function(e3, r3, i2) {
          var n2;
          return n2 = setTimeout(function() {
            r3 = t2, i2();
          }, e3), function() {
            var e4 = Array.prototype.slice.call(arguments);
            r3.apply(this, e4) && clearTimeout(n2);
          };
        }, createElementInEl: function(e3, t3, r3) {
          var i2 = document.createElement(t3);
          return r3 && (i2.id = r3), e3.appendChild(i2), i2;
        }, createIframeWithContent: function(e3, t3, i2) {
          var o = r2(e3, null, i2.zIndex);
          if (a(o, n(t3, i2)))
            return o;
        }, createIframe: r2, setFullSizeStyle: i, simpleTemplate: n, setIframeContent: a, extend: function(e3, t3) {
          return Object.keys(t3).forEach(function(r3) {
            e3[r3] = t3[r3];
          }), e3;
        }, unique: function(e3) {
          var t3 = -1;
          return function() {
            return e3 + "_" + ++t3;
          };
        } };
      }, 893: () => {
      } }, t = {};
      function r(i) {
        var n = t[i];
        if (n !== void 0)
          return n.exports;
        var a = t[i] = { exports: {} };
        return e[i].call(a.exports, a, a.exports, r), a.exports;
      }
      r.g = function() {
        if (typeof globalThis == "object")
          return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e2) {
          if (typeof window == "object")
            return window;
        }
      }(), (() => {
        var _e, _t, _r, _i, _n, _a, _o, _s, _l, _c, _u, _d, _p, _h, _s2, _f;
        "use strict";
        const e2 = videojs;
        var t2 = r(248), i = r(144), n = r(908);
        class a extends e2.EventTarget {
          constructor(e3, t3) {
            super();
            __privateAdd(this, _e, () => {
              const e3 = this.options.skip, t3 = this.player;
              e3 > 0 && (t3.duration() || this.duration) >= e3 && (this.skipButtonElement.style.display = "block", this.options.displayRemainingTime && (this.remainingTimeElement.style.display = "block"), this.options.displayRemainingTimeIcons && (this.remainingTimePlayElement.classList.remove("vjs-hidden"), this.remainingTimeMuteElement.classList.remove("vjs-hidden")), t3.on("adtimeupdate", __privateGet(this, _t))), t3.loadingSpinner.el().style.display = "none";
            });
            __privateAdd(this, _t, () => {
              this.player.loadingSpinner.el().style.display = "none";
              const e3 = Math.ceil(this.options.skip - this.player.currentTime());
              if (this.options.displayRemainingTime) {
                const e4 = Math.ceil(this.player.remainingTime());
                this.remainingTimeElement.innerHTML = this.options.messages.remainingTime.replace("{seconds}", e4);
              }
              var t3;
              e3 > 0 ? (o(t3 = this.skipButtonElement) && (t3.className = t3.className.replace(" enabled ", "")), this.skipButtonElement.innerHTML = this.options.messages.skipCountdown.replace("{seconds}", e3)) : (!function(e4) {
                o(e4) || (e4.className += " enabled ");
              }(this.skipButtonElement), this.skipButtonElement.innerHTML = this.options.messages.skip);
            });
            this.player = e3, this.options = t3, this.duration = 0, this.originalState = { controlsEnabled: e3.controls(), seekEnabled: e3.controlBar.progressControl.enabled() };
          }
          setUp() {
            const e3 = this.player, t3 = this.options, r2 = (r3) => {
              if (!t3.displayRemainingTimeIcons)
                return;
              const { className: i2, action: n2, toggleClasses: a2, events: o2, initialState: s2 } = { play: { className: "vjs-icon-play vast-remaining-time-icon-play", action: (e4) => e4.paused() ? e4.play() : e4.pause(), toggleClasses: ["vjs-icon-pause", "vjs-icon-play"], events: ["adplay", "adpause"], initialState: (e4) => e4.paused() ? "vjs-icon-play" : "vjs-icon-pause" }, mute: { className: "vast-remaining-time-icon-mute", action: (e4) => e4.muted(!e4.muted()), toggleClasses: ["vjs-icon-volume-high", "vjs-icon-volume-mute"], events: ["advolumechange"], initialState: (e4) => e4.muted() ? "vjs-icon-volume-mute" : "vjs-icon-volume-high" } }[r3], l2 = e3.addChild("button", { className: `vjs-hidden vjs-visible-text vjs-button vast-remaining-time-icon ${i2}`, clickHandler: function() {
                n2(this.player);
              }.bind(this) });
              l2.removeClass("vjs-control"), l2.addClass(s2(e3));
              const c2 = () => {
                a2.forEach((e4) => l2.toggleClass(e4));
              };
              this[`remainingTime${r3.charAt(0).toUpperCase() + r3.slice(1)}Element`] = l2.el(), o2.forEach((t4) => e3.on(t4, c2));
            };
            e3.controls(t3.controlsEnabled), t3.seekEnabled ? e3.controlBar.progressControl.enable() : e3.controlBar.progressControl.disable(), (() => {
              const t4 = this.blocker = n.document.createElement("div");
              t4.className = "vast-blocker", t4.onclick = () => {
                if (e3.paused())
                  return e3.play(), false;
                this.trigger("click");
              }, e3.el().insertBefore(t4, e3.controlBar.el());
            })(), (() => {
              const t4 = this.skipButtonElement = n.document.createElement("div");
              t4.className = "vast-skip-button", t4.style.display = "none", e3.el().appendChild(t4), e3.one("adplay", __privateGet(this, _e)), t4.onclick = (e4) => {
                if ((" " + t4.className + " ").indexOf(" enabled ") >= 0 && this.trigger("skip"), n.Event.prototype.stopPropagation === void 0)
                  return false;
                e4.stopPropagation();
              };
            })(), (() => {
              if (!t3.displayRemainingTime)
                return;
              const r3 = this.remainingTimeElement = n.document.createElement("div");
              r3.className = "vast-remaining-time", r3.style.display = "none", e3.el().appendChild(r3);
            })(), r2("play"), r2("mute");
          }
          tearDown() {
            const e3 = this.player, t3 = this.originalState;
            e3.controls(t3.controlsEnabled), t3.seekEnabled ? e3.controlBar.progressControl.enable() : e3.controlBar.progressControl.disable(), this.blocker.parentElement.removeChild(this.blocker), this.skipButtonElement.parentElement.removeChild(this.skipButtonElement), this.options.displayRemainingTime && this.remainingTimeElement.parentElement.removeChild(this.remainingTimeElement), this.options.displayRemainingTimeIcons && (this.remainingTimePlayElement.parentElement.removeChild(this.remainingTimePlayElement), this.remainingTimeMuteElement.parentElement.removeChild(this.remainingTimeMuteElement)), e3.off("adtimeupdate", __privateGet(this, _t)), e3.off("adplay", __privateGet(this, _e));
          }
        }
        _e = new WeakMap();
        _t = new WeakMap();
        function o(e3) {
          return (" " + e3.className + " ").indexOf(" enabled ") > -1;
        }
        function s(e3, t3 = null) {
          let r2;
          return function() {
            return e3 && (r2 = e3.apply(t3 || this, arguments), e3 = null), r2;
          };
        }
        function l(e3) {
          return e3.type === "linear" && e3.mediaFiles.length;
        }
        function c(e3) {
          return e3.type === "companion";
        }
        function u(e3, t3 = null) {
          let r2 = null;
          if (typeof e3 == "string")
            if (e3.includes("%")) {
              if (t3 != null) {
                r2 = e3.replace("%", "") / 100 * t3;
              }
            } else if (e3.includes(":")) {
              const [t4, i2, n2] = e3.split(":").slice(-3);
              r2 = 3600 * parseInt(t4 || 0, 10) + 60 * parseInt(i2 || 0, 10) + parseInt(n2 || 0, 10);
            } else
              r2 = parseInt(e3);
          return r2 == null && (r2 = Number(e3)), isNaN(r2) ? null : r2;
        }
        class d {
          constructor(e3, t3) {
            __privateAdd(this, _r, void 0);
            __privateAdd(this, _i, void 0);
            __privateAdd(this, _n, void 0);
            __privateSet(this, _r, e3), __privateSet(this, _i, t3), __privateSet(this, _n, false);
          }
          get linearCreative() {
            return __privateGet(this, _r).creative;
          }
          get linearAdTracker() {
            return __privateGet(this, _r);
          }
          get companionTracker() {
            return __privateGet(this, _i);
          }
          get skipAfterDuration() {
            return __privateGet(this, _n);
          }
          set skipAfterDuration(e3) {
            __privateSet(this, _n, e3);
          }
          hasVideoMedia() {
            return this.linearCreative.mediaFiles.some((e3) => e3 && e3.apiFramework == null);
          }
        }
        _r = new WeakMap();
        _i = new WeakMap();
        _n = new WeakMap();
        class p {
          constructor(e3, t3, r2, i2) {
            __privateAdd(this, _a, void 0);
            __privateAdd(this, _o, void 0);
            __privateAdd(this, _s, void 0);
            __privateAdd(this, _l, void 0);
            __privateAdd(this, _c, (e3) => e3.map((e4) => {
              const r2 = new t2.VASTTracker(__privateGet(this, _a), e4, e4.creatives.find(l), e4.creatives.find(c));
              r2.on("clickthrough", h);
              let i2 = null;
              const n2 = e4.creatives.find(c);
              if (n2) {
                const r3 = __privateGet(this, _s), a2 = n2.variations.filter((e5) => e5.staticResource).filter((e5) => e5.type.indexOf("image") === 0).find((e5) => parseInt(e5.width, 10) <= r3.companion.maxWidth && parseInt(e5.height, 10) <= r3.companion.maxHeight);
                a2 && (i2 = new t2.VASTTracker(__privateGet(this, _a), e4, n2, a2), i2.on("clickthrough", h));
              }
              return new d(r2, i2);
            }));
            __privateSet(this, _a, e3), __privateSet(this, _o, t3), __privateSet(this, _l, r2), __privateSet(this, _s, i2);
          }
          loadAds(e3 = {}) {
            return new Promise((t3, r2) => {
              const { url: i2, xml: n2 } = e3, a2 = (Array.isArray(i2) ? i2 : [i2]).filter((e4) => e4 != null);
              let o2;
              if (a2.length)
                o2 = Promise.resolve([]), a2.forEach((e4) => {
                  o2 = o2.then((t4) => t4 == null || t4.length === 0 ? this.loadAdsWithUrl(e4) : t4).catch((e5) => []);
                });
              else {
                if (n2 == null)
                  throw new Error("xml or url must be set");
                o2 = this.loadAdsWithXml(n2);
              }
              o2.then(t3).catch(r2);
            });
          }
          loadAdsWithXml(e3) {
            return new Promise((t3, r2) => {
              let i2;
              if (e3.constructor === n.XMLDocument)
                i2 = e3;
              else {
                if (e3.constructor !== String)
                  throw new Error("xml config option must be a String or XMLDocument");
                i2 = new n.DOMParser().parseFromString(e3, "application/xml");
              }
              __privateGet(this, _o).parseVAST(i2).then(__privateGet(this, _l).selectAds).then(__privateGet(this, _c)).then(t3).catch(r2);
            });
          }
          loadAdsWithUrl(e3) {
            return new Promise((t3, r2) => {
              __privateGet(this, _a).get(e3, { withCredentials: __privateGet(this, _s).withCredentials, wrapperLimit: __privateGet(this, _s).wrapperLimit }).then(__privateGet(this, _l).selectAds).then(__privateGet(this, _c)).then(t3).catch(r2);
            });
          }
        }
        _a = new WeakMap();
        _o = new WeakMap();
        _s = new WeakMap();
        _l = new WeakMap();
        _c = new WeakMap();
        function h(e3) {
          n.open(e3, "_blank");
        }
        class f {
          selectAds(e3) {
            if (!e3.ads || e3.ads.length === 0)
              throw new Error("no ads found in VAST");
            const t3 = e3.ads.filter((e4) => e4.creatives.some(l));
            if (!t3.length)
              throw new Error("no linear ads found in VAST");
            const r2 = t3.filter((e4) => e4.sequence);
            if (r2.length)
              return r2.sort((e4, t4) => e4.sequence - t4.sequence);
            return t3.filter((e4) => !r2.includes(e4)).slice(0, 1);
          }
        }
        var m = r(178);
        function v(e3) {
          if (e3) {
            const t3 = e3.ad, r2 = e3.creative;
            return { mediaFiles: r2.mediaFiles.map((e4) => Object.assign({}, e4)), adSequenceId: t3.sequence, adId: t3.id, creativeAdId: r2.id };
          }
        }
        const g = ["application/x-javascript", "text/javascript", "application/javascript"];
        class y {
          constructor(e3, t3) {
            __privateAdd(this, _u, void 0);
            __privateAdd(this, _d, void 0);
            __privateAdd(this, _p, void 0);
            __privateAdd(this, _h, void 0);
            __privateAdd(this, _s2, void 0);
            __privateAdd(this, _f, void 0);
            __privateSet(this, _h, e3), __privateSet(this, _s2, t3), __privateSet(this, _f, new videojs.EventTarget());
          }
          handle(e3) {
            return __privateSet(this, _d, false), __privateSet(this, _p, false), __privateSet(this, _u, false), new Promise((t3, r2) => {
              const a2 = __privateGet(this, _s2), o2 = __privateGet(this, _h);
              let l2 = null, c2 = {}, u2 = false;
              const d2 = e3.creative, p2 = d2.mediaFiles.find((e4) => e4.apiFramework === "VPAID" && function(e5) {
                return g.indexOf(e5.mimeType.trim()) > -1;
              }(e4));
              if (!p2)
                throw new Error("Invalid VPAID media file: only JavaScript is supported");
              const h2 = o2.el().querySelector(".vjs-tech");
              l2 = function(e4) {
                const t4 = e4.vpaid.containerId, r3 = e4.vpaid.containerClass;
                let n2 = i.getElementById(t4);
                n2 || (n2 = i.getElementsByClassName(r3)[0]);
                return n2;
              }(a2), l2 ? u2 = true : (l2 = function(e4) {
                const t4 = e4.vpaid.containerId, r3 = e4.vpaid.containerClass, n2 = i.createElement("div");
                t4 && n2.setAttribute("id", t4);
                r3 && n2.classList.add(r3);
                return n2;
              }(a2), u2 = false), c2 = A(l2), o2.el().insertBefore(l2, o2.controlBar.el());
              const f2 = new m(l2, h2, {});
              f2.loadAdUnit(p2.fileURL, (i2, p3) => {
                let h3;
                if (i2)
                  return void r2(i2);
                const m2 = () => {
                  y2(), t3(), o2.trigger("vpaid.AdStopped"), o2.trigger({ type: "vast.adEnd", vast: v(e3) });
                };
                p3.subscribe("AdStopped", m2);
                const g2 = (e4) => {
                  if (p3 && !__privateGet(this, _u)) {
                    p3.unsubscribe("AdStopped", m2);
                    const t4 = () => {
                      __privateSet(this, _u, true), y2(), r2(e4), o2.trigger("vpaid.AdStopped");
                    };
                    k(p3, "AdStopped", t4, t4), p3.stopAd();
                  } else
                    __privateSet(this, _u, true), r2(e4);
                };
                if (__privateGet(this, _f).on("forceStopAd", g2), __privateGet(this, _d))
                  return void g2("Received cancel signal from player");
                function y2() {
                  if (o2.controlBar.show(), o2.off("playerresize", R), a2.vpaid.videoInstance === "new" && h3.parentElement && h3.parentElement.removeChild(h3), f2.destroy(), l2) {
                    if (u2) {
                      l2.innerHTML = "";
                      const e4 = c2, t4 = A(l2);
                      for (const [r3, i3] of Object.entries(t4))
                        e4.hasOwnProperty(r3) ? e4[r3] !== i3 && l2.setAttribute(r3, e4[r3]) : l2.removeAttribute(r3);
                      for (const [r3, i3] of Object.entries(e4))
                        t4.hasOwnProperty(r3) || l2.setAttribute(r3, i3);
                    } else
                      l2.parentElement && l2.parentElement.removeChild(l2);
                    l2 = null;
                  }
                }
                const b2 = () => {
                  if (__privateGet(this, _d))
                    return void g2("Received cancel signal");
                  p3.subscribe("AdSkipped", () => {
                    e3.skip(), o2.trigger("vpaid.AdSkipped"), o2.trigger({ type: "vast.adSkip", vast: v(e3) });
                  }), p3.subscribe("AdVolumeChange", () => {
                    const t5 = o2.volume();
                    p3.getAdVolume((r3, i3) => {
                      r3 || (i3 === 0 && t5 > 0 ? e3.setMuted(true) : i3 > 0 && t5 === 0 && e3.setMuted(false), o2.volume(i3), o2.trigger("vpaid.AdVolumeChange"));
                    });
                  }), p3.subscribe("AdImpression", () => {
                    e3.trackImpression(), o2.trigger("vpaid.AdImpression");
                  }), p3.subscribe("AdClickThru", ({ url: t5, id: r3, playerHandles: i3 }) => {
                    i3 || e3.once("clickthrough", (e4) => {
                      n.open(e4, "_blank");
                    }), e3.click(t5), o2.trigger("vpaid.AdClickThru");
                  }), p3.subscribe("AdVideoFirstQuartile", () => {
                    e3.track("firstQuartile"), o2.trigger("vpaid.AdVideoFirstQuartile");
                  }), p3.subscribe("AdVideoMidpoint", () => {
                    e3.track("midpoint"), o2.trigger("vpaid.AdVideoMidpoint");
                  }), p3.subscribe("AdVideoThirdQuartile", () => {
                    e3.track("thirdQuartile"), o2.trigger("vpaid.AdVideoThirdQuartile");
                  }), p3.subscribe("AdVideoComplete", () => {
                    e3.track("complete"), o2.trigger("vpaid.AdVideoComplete");
                  }), p3.subscribe("AdUserAcceptInvitation", () => {
                    e3.acceptInvitation(), o2.trigger("vpaid.AdUserAcceptInvitation");
                  }), p3.subscribe("AdUserMinimize", () => {
                    e3.minimize(), o2.trigger("vpaid.AdUserMinimize");
                  }), p3.subscribe("AdUserClose", () => {
                    e3.close(), o2.trigger("vpaid.AdUserClose");
                  }), p3.subscribe("AdPaused", () => {
                    e3.setPaused(true), o2.trigger("vpaid.AdPaused");
                  }), p3.subscribe("AdPlaying", () => {
                    e3.setPaused(false), o2.trigger("vpaid.AdPlaying");
                  }), p3.getAdLinear(T((e4, r3) => {
                    __privateGet(this, _d) ? g2("Received cancel signal") : e4 ? g2(e4) : r3 ? t4() : g2("Non-linear not supported");
                  }, () => {
                    g2("Unable to get mode of operation: linear or non-linear");
                  }));
                  const t4 = () => {
                    o2.controlBar.hide();
                    const e4 = s(E2);
                    k(p3, "AdStarted", e4, g2), p3.startAd();
                  };
                }, E2 = () => {
                  __privateGet(this, _d) ? g2("Received cancel signal") : (__privateSet(this, _p, true), e3.track("start"), o2.on("playerresize", R), o2.trigger("ads-ad-started"), o2.trigger({ type: "vast.adStart", vast: v(e3) }));
                }, R = () => {
                  p3.resizeAd(o2.currentWidth(), o2.currentHeight(), o2.isFullscreen() ? "fullscreen" : "normal");
                };
                p3.handshakeVersion("2.0", (t4, i3) => {
                  var _a2;
                  if (t4)
                    return log.console(t4), void g2("Error on VPAID handshake");
                  const s2 = { AdParameters: d2.adParameters || "", Duration: d2.duration || 30, SkipTime: a2.skip, ClickURL: ((_a2 = d2.videoClickThroughURLTemplate) == null ? void 0 : _a2.url) || "about:blank", All: d2, Options: a2 }, c3 = a2.vpaid.videoInstance;
                  c3 === "same" ? h3 = o2.tech({ kindaKnowWhatImDoing: true }).el() : c3 === "new" ? (h3 = n.document.createElement("video"), h3.style.cssText = "position:absolute; top:0; left:0; z-index:2 !important;", l2.appendChild(h3)) : (c3 !== "none" && console.log(`${c3} is an invalid videoInstance value. Defaulting to 'none'.`), h3 = null);
                  const u3 = { slot: l2, videoSlot: h3 };
                  k(p3, "AdLoaded", b2, g2);
                  const f3 = o2.isFullscreen() ? "fullscreen" : "normal";
                  p3.subscribe("AdError", (t5) => {
                    e3.error({ ERRORCODE: 901 }), __privateSet(this, _u, true), y2(), r2(`Fatal VPAID Error: ${typeof t5 == "object" ? JSON.stringify(t5) : t5}`), o2.trigger({ type: "vpaid.AdError", error: t5 });
                  }), p3.initAd(o2.currentWidth(), o2.currentHeight(), f3, -1, s2, u3);
                });
              });
            });
          }
          cancel() {
            __privateSet(this, _d, true), __privateGet(this, _p) && __privateGet(this, _f).trigger("forceStopAd");
          }
        }
        _u = new WeakMap();
        _d = new WeakMap();
        _p = new WeakMap();
        _h = new WeakMap();
        _s2 = new WeakMap();
        _f = new WeakMap();
        function A(e3) {
          const t3 = {};
          for (const r2 of e3.attributes)
            t3[r2.name] = r2.value;
          return t3;
        }
        function T(e3, t3 = null) {
          const r2 = setTimeout(() => {
            e3 = () => {
            }, t3 && t3();
          }, 1e4);
          return function() {
            clearTimeout(r2), e3.apply(null, arguments);
          };
        }
        function k(e3, t3, r2, i2) {
          const n2 = T(r2, () => {
            i2 && i2(new Error(`Timeout while waiting for ${t3} event.`));
          });
          e3.subscribe(t3, n2);
        }
        const b = e2.getPlugin("plugin"), E = Object.freeze({ seekEnabled: false, controlsEnabled: false, wrapperLimit: 10, withCredentials: true, skip: 0, displayRemainingTime: false, displayRemainingTimeIcons: false, messages: { skip: "Skip", skipCountdown: "Skip in {seconds}...", remainingTime: "This ad will end in {seconds}" }, vpaid: { containerId: void 0, containerClass: "vjs-vpaid-container", videoInstance: "none" }, companion: { elementId: null, maxWidth: 0, maxHeight: 0 } });
        e2.registerPlugin("vast", class extends b {
          constructor(r2, n2) {
            super(r2), typeof r2.ads == "function" && r2.ads({ debug: false, liveCuePoints: false }), r2.on("play", function() {
              console.log("play event triggered");
            }), console.log("videojsx-vast-plugin running");
            const o2 = parseInt(e2.VERSION, 10) >= 8 ? e2.obj.merge : e2.mergeOptions;
            n2 = o2(E, n2 || {});
            const l2 = new t2.VASTClient(), c2 = [];
            let d2 = null, h2 = 0, m2 = 0;
            const g2 = new y(r2, n2);
            let A2 = false, T2 = n2.schedule;
            var k2;
            T2 == null || T2.length === 0 ? T2 = [{ offset: 0, url: n2.url || null, xml: n2.xml || null }] : (k2 = T2, T2 = JSON.parse(JSON.stringify(k2)), T2.forEach((e3) => delete e3.offsetInSeconds));
            const b2 = function(e3) {
              return e3.find(B);
            }(T2), R = function(e3) {
              return e3.find(_);
            }(T2), w = function(e3) {
              return e3.filter((e4) => !B(e4) && !_(e4));
            }(T2).sort((e3, t3) => e3.offset - t3.offset), C = r2.autoplay();
            r2.on("adtimeout", () => {
              A2 = true;
            });
            const N = new a(r2, n2);
            function L() {
              (d2 == null ? void 0 : d2.hasVideoMedia()) && (d2.linearAdTracker.skip(), r2.trigger({ type: "vast.skipAd", vast: v(d2.linearAdTracker) }), D());
            }
            N.on("skip", L), N.on("click", () => {
              d2.linearAdTracker.click();
            });
            const I = (() => {
              let e3 = false;
              return () => {
                if (e3)
                  return;
                let t3 = null;
                for (; w.length > 0 && (t3 = w[0].offsetInSeconds, t3 == null); ) {
                  const { offset: e4 } = w[0];
                  t3 = u(e4, r2.duration()), t3 == null ? w.shift() : w[0].offsetInSeconds = t3;
                }
                if (t3 != null && this.player.currentTime() > t3) {
                  e3 = true;
                  const t4 = w.shift();
                  S.loadAds(t4).then((e4) => {
                    e4.length > 0 && (c2.push(...e4), d2 = null, M());
                  }).catch((e4) => {
                    console.log(`An error occurred when loading ads for the midroll ad break: : ${e4 == null ? void 0 : e4.message}`);
                  }).finally(() => {
                    e3 = false;
                  });
                }
              };
            })();
            w.length > 0 && r2.on("timeupdate", I), r2.on("readyforpostroll", () => {
              A2 = false, S.loadAds(R).then((e3) => {
                A2 ? e3.forEach((e4) => {
                  e4.linearAdTracker.error({ ERRORCODE: 301 });
                }) : e3.length > 0 ? (c2.push(...e3), d2 = null, M()) : r2.trigger("nopostroll");
              }).catch((e3) => {
                console.log(`An error occurred when loading ads for the postroll ad break: : ${e3.message}`), r2.trigger("nopostroll");
              });
            }), r2.on("readyforpreroll", () => {
              M();
            });
            const U = s(() => {
              r2.trigger("adsready");
            });
            setTimeout(U, 3e3);
            const S = new p(l2, new t2.VASTParser(), new f(), n2);
            S.loadAds(b2).then((e3) => {
              A2 ? e3.forEach((e4) => {
                e4.linearAdTracker.error({ ERRORCODE: 301 });
              }) : e3.length > 0 ? (c2.push(...e3), d2 = null) : r2.trigger("nopreroll");
            }).catch((e3) => {
              console.log(`An error occurred when loading ads for the preroll ad break: ${e3.message}`), r2.trigger("nopreroll");
            }).finally(() => {
              U(), C && r2.play();
            });
            const x = (e3) => e3.filter((e4) => e4.apiFramework == null).map((e4) => ({ type: e4.mimeType, src: e4.fileURL })), D = () => {
              const e3 = c2.shift();
              if ((e3 == null ? void 0 : e3.hasVideoMedia()) ? (d2 == null ? void 0 : d2.hasVideoMedia()) || N.setUp() : (d2 == null ? void 0 : d2.hasVideoMedia()) && N.tearDown(), e3) {
                if (d2 = e3, h2++, console.log(`Playing ad ${h2}/${m2}`), d2.hasVideoMedia()) {
                  const e4 = d2.linearCreative.mediaFiles, t3 = e4.filter((e5) => e5.deliveryType === "streaming"), i2 = e4.filter((e5) => e5.deliveryType !== "streaming");
                  if (i2.length > 0)
                    r2.src(x(i2));
                  else if (t3.length > 0) {
                    let e5 = d2.linearAdTracker.assetDuration;
                    if (e5 == null || e5 < 1)
                      return console.log("Streaming ads must have a duration"), void D();
                    r2.src(x(t3)), d2.skipAfterDuration = true;
                  }
                  N.duration = d2.linearAdTracker.assetDuration || 0;
                } else
                  g2.handle(d2.linearAdTracker).then(() => {
                    D();
                  }).catch((e4) => {
                    console.log(e4), D();
                  });
                P();
              } else
                d2 = null, h2 = 0, F();
            }, { setUpEvents: O, tearDownEvents: V } = (() => {
              const e3 = () => {
                if (d2.skipAfterDuration) {
                  const e4 = d2;
                  setTimeout(() => {
                    d2 === e4 && L();
                  }, 1e3 * e4.linearAdTracker.assetDuration);
                }
                !d2.linearAdTracker.impressed && d2.hasVideoMedia() && (d2.linearAdTracker.trackImpression(), r2.trigger({ type: "vast.adStart", vast: v(d2.linearAdTracker) }));
              }, t3 = () => {
                d2 && (isNaN(d2.linearAdTracker.assetDuration) && (d2.linearAdTracker.assetDuration = r2.duration()), d2.linearAdTracker.setProgress(r2.currentTime()));
              }, i2 = () => {
                r2.remainingTime() > 0 && (d2.linearAdTracker.setPaused(true), r2.one("adplay", () => {
                  d2.linearAdTracker.setPaused(false);
                }));
              }, n3 = () => {
                d2.linearAdTracker.error({ ERRORCODE: 405 }), r2.error(null), D();
              }, a2 = () => {
                d2.linearAdTracker.setFullscreen(r2.isFullscreen());
              }, o3 = (() => {
                let e4 = r2.muted(), t4 = r2.volume();
                return () => {
                  const i3 = r2.volume(), n4 = r2.muted();
                  e4 !== n4 ? (d2.linearAdTracker.setMuted(n4), e4 = n4) : t4 !== i3 && (t4 > 0 && i3 === 0 ? d2.linearAdTracker.setMuted(true) : t4 === 0 && i3 > 0 && d2.linearAdTracker.setMuted(false), t4 = i3);
                };
              })(), s2 = () => {
                d2.hasVideoMedia() && (d2.linearAdTracker.complete(), r2.trigger({ type: "vast.adEnd", vast: v(d2.linearAdTracker) }), D());
              };
              return { setUpEvents: () => {
                r2.on("adended", s2), r2.on("adplay", e3), r2.on("adtimeupdate", t3), r2.on("adpause", i2), r2.on("aderror", n3), r2.on("advolumechange", o3), r2.on("fullscreenchange", a2);
              }, tearDownEvents: () => {
                r2.off("adended", s2), r2.off("adplay", e3), r2.off("adtimeupdate", t3), r2.off("adpause", i2), r2.off("aderror", n3), r2.off("advolumechange", o3), r2.off("fullscreenchange", a2);
              } };
            })(), P = () => {
              const e3 = d2.companionTracker, t3 = i.getElementById(n2.companion.elementId);
              if (e3 && e3.variation && t3) {
                const r3 = e3.variation, n3 = () => {
                  e3.click();
                }, a2 = i.createElement("a");
                a2.src = "#", a2.addEventListener("click", n3);
                const o3 = i.createElement("img");
                o3.src = r3.staticResource, a2.appendChild(o3), t3.innerHTML = "", t3.appendChild(a2);
              } else
                t3 && (t3.innerHTML = "");
            }, M = () => {
              m2 = c2.length, console.log(`Playing ${m2} ads`), r2.ads.startLinearAdMode(), O(), D();
            };
            function B(e3) {
              return e3.offset === 0 || e3.offset == null || e3.offset === "pre";
            }
            function _(e3) {
              return e3.offset === "post";
            }
            const F = () => {
              r2.ads.endLinearAdMode(), V(), console.log("Playing content");
            };
          }
        });
      })();
    })();
  }
});

// lib/shared.js
var DEFAULT_SKIP_TIME = 8;
var DEFAULT_SKIP_COUNTDOWN_MESSAGE = "Skip in {seconds}...";
var DEFAULT_SKIP_MESSAGE = "Skip";
var ARMANET_JS_URL = "https://assets.armanet.us/armanet-pxl.js";
var settings = (s) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  return {
    preroll: {
      enabled: (_a = s["armanet-preroll-enabled"]) != null ? _a : false,
      adUnit: s["armanet-preroll-adunit"]
    },
    midroll: {
      enabled: (_b = s["armanet-midroll-enabled"]) != null ? _b : false,
      adUnit: s["armanet-midroll-adunit"],
      offset: (_c = s["armanet-midroll-offset"]) != null ? _c : "25%"
    },
    postroll: {
      enabled: (_d = s["armanet-postroll-enabled"]) != null ? _d : false,
      adUnit: s["armanet-postroll-adunit"]
    },
    embededEnabled: (_e = s["armanet-embeded-enabled"]) != null ? _e : true,
    controlsEnabled: (_f = s["armanet-player-controls-enabled"]) != null ? _f : true,
    skipTime: (_g = s["armanet-skip-time"]) != null ? _g : DEFAULT_SKIP_TIME,
    messageSkipCountdown: (_h = s["armanet-message-skip-countdown"]) != null ? _h : DEFAULT_SKIP_COUNTDOWN_MESSAGE,
    messageSkip: (_i = s["armanet-message-skip"]) != null ? _i : DEFAULT_SKIP_MESSAGE,
    messageRemainingTime: s["armanet-message-remainingTime"],
    clientDebugEnabled: (_j = s["armanet-client-debug-enabled"]) != null ? _j : false
  };
};
var loadArmanetPxl = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = ARMANET_JS_URL;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
var loadContribAds = async (player) => {
  try {
    const { default: contrib } = await Promise.resolve().then(() => __toESM(require_videojs_ads_min()));
    player.ads({
      debug: false,
      liveCuePoints: true,
      stitchedAds: false,
      allowVjsAutoplay: true
    });
  } catch (error) {
    console.error("Error loading ads plugin:", error);
  }
};
var getRollsStatus = (pluginSettings) => {
  const isRollEnabled = (roll) => roll.adUnit && roll.enabled;
  const rolls = {
    preroll: isRollEnabled(pluginSettings.preroll),
    midroll: isRollEnabled(pluginSettings.midroll),
    postroll: isRollEnabled(pluginSettings.postroll)
  };
  return __spreadProps(__spreadValues({}, rolls), {
    hasAtLeastOneRollEnabled: Object.values(rolls).some(Boolean)
  });
};
var createVastSettings = (pluginSettings, Armanet2, channelName, channelAdUnit, userData, videoTags) => {
  const {
    skipTime,
    controlsEnabled,
    messageSkip,
    messageSkipCountdown,
    messageRemainingTime,
    clientDebugEnabled
  } = pluginSettings;
  const vastSettings = {
    skip: skipTime,
    controlsEnabled,
    seekEnabled: controlsEnabled,
    withCredentials: false,
    messages: {
      skip: messageSkip,
      skipCountdown: messageSkipCountdown
    },
    schedule: []
  };
  if (messageRemainingTime == null ? void 0 : messageRemainingTime.includes("{seconds}")) {
    Object.assign(vastSettings, {
      displayRemainingTime: true,
      displayRemainingTimeIcons: true,
      messages: __spreadProps(__spreadValues({}, vastSettings.messages), {
        remainingTime: messageRemainingTime
      })
    });
  }
  const getArmanetVastUrl = (adUnit, roll) => {
    const armanetParams = __spreadValues(__spreadValues({
      roll,
      channel: channelName,
      skippable: skipTime > 0
    }, (userData == null ? void 0 : userData.username) && (userData == null ? void 0 : userData.email) && { viewer: [userData.username, userData.email] }), videoTags.length > 0 && { tags: videoTags });
    if (clientDebugEnabled) {
      console.log("[ARMANET INTEGRATION PLUGIN] [debug] [createVastSettings] [getArmanetVastUrl]", { adUnit, armanetParams });
    }
    return Armanet2.getVastTag(adUnit, armanetParams) || "";
  };
  const rollsStatus = getRollsStatus(pluginSettings);
  const rollConfigs = {
    preroll: { offset: "pre", roll: "pre" },
    midroll: { offset: pluginSettings.midroll.offset, roll: "mid" },
    postroll: { offset: "post", roll: "post" }
  };
  Object.entries(rollConfigs).forEach(([rollType, { offset, roll }]) => {
    if (rollsStatus[rollType]) {
      const rollAdUnit = channelAdUnit || pluginSettings[rollType].adUnit;
      if (rollAdUnit && offset) {
        const vastUrl = getArmanetVastUrl(rollAdUnit, roll);
        if (clientDebugEnabled) {
          console.log("[ARMANET INTEGRATION PLUGIN] [debug] [createVastSettings] adding roll schedule", { rollAdUnit, offset, vastUrl });
        }
        vastSettings.schedule.push({
          offset,
          url: vastUrl
        });
      }
    }
  });
  return vastSettings;
};
var buildVastPlayer = async (vastSettings, player) => {
  try {
    const { default: VastPlugin } = await Promise.resolve().then(() => __toESM(require_videojsx_vast()));
    player.vast(vastSettings);
  } catch (error) {
    console.error("Error loading VastPlugin:", error);
  }
};

// client/video-watch-client-plugin.js
function register({ registerHook, peertubeHelpers }) {
  initArmanetIntegration(registerHook, peertubeHelpers).catch((err) => console.error("[ARMANET INTEGRATION PLUGIN] Cannot initialize plugin", err));
}
async function initArmanetIntegration(registerHook, peertubeHelpers) {
  var _a, _b;
  const s = await peertubeHelpers.getSettings();
  if (!s) {
    console.error("Could not find settings.");
    return;
  }
  const pluginSettings = settings(s);
  const clientDebugEnabled = pluginSettings.clientDebugEnabled;
  const rollsStatus = getRollsStatus(pluginSettings);
  const authUser = await peertubeHelpers.getUser();
  const userData = {
    username: (_a = authUser == null ? void 0 : authUser.username) != null ? _a : "",
    email: (_b = authUser == null ? void 0 : authUser.email) != null ? _b : ""
  };
  registerHook({
    target: "action:video-watch.player.loaded",
    handler: async ({ videojs: videojs2, player, video }) => {
      var _a2, _b2, _c, _d, _e, _f, _g;
      if (!rollsStatus.hasAtLeastOneRollEnabled)
        return;
      window.videojs = videojs2;
      window.player = player;
      await loadContribAds(player);
      try {
        await loadArmanetPxl();
        if (typeof Armanet !== "undefined" && Armanet && typeof Armanet.getVastTag === "function") {
          const channelName = (_b2 = (_a2 = video == null ? void 0 : video.channel) == null ? void 0 : _a2.name) != null ? _b2 : "unknown";
          const channelAdUnit = (_f = (_e = (_d = (_c = video == null ? void 0 : video.pluginData) == null ? void 0 : _c.armanet) == null ? void 0 : _d.channel_adUnit) == null ? void 0 : _e.uuid) != null ? _f : null;
          const videoTags = (_g = video == null ? void 0 : video.tags) != null ? _g : [];
          if (clientDebugEnabled) {
            console.log("[ARMANET INTEGRATION PLUGIN] [debug] [player loaded] video", { video, videoTags });
            console.log("[ARMANET INTEGRATION PLUGIN] [debug] [player loaded] channel", { channelName, channelAdUnit });
            console.log("[ARMANET INTEGRATION PLUGIN] [debug] [player loaded] user", { userData });
          }
          const vastSettings = createVastSettings(pluginSettings, Armanet, channelName, channelAdUnit, userData, videoTags);
          await buildVastPlayer(vastSettings, player);
        } else {
          if (clientDebugEnabled) {
            console.error("[ARMANET INTEGRATION PLUGIN] [debug] Armanet or Armanet.getVastTag is not available");
          }
        }
      } catch (error) {
        if (clientDebugEnabled) {
          console.error("[ARMANET INTEGRATION PLUGIN] [debug] Error in Armanet integration:", error);
        }
      }
    }
  });
}
export {
  register
};
/*! @name videojs-contrib-ads @version 6.9.0 @license Apache-2.0 */
