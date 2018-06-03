
/**
 * 
 * 
 * Global Reference: `Gaze`
 * 
 * @class _Gaze
 * @constructor
 * @private
 * @module Gaze
 * @static
 */
window.Gaze = window._Gaze = (function() {
	var gazing = {};
	
	/**
	 * 
	 * @property configuration
	 * @type Object
	 * @private
	 */
	var configuration = {};

	/**
	 * 
	 * @property defaults
	 * @type Object
	 * @private
	 */
	var defaults = {
		"element": "#gaze",
		"debug": true,
		"mixins": {
			"missing": "NotFound"
		},
		"console": {
			"trace": true,
			"debug": true,
			"info": true,
			"warn": true,
			"error": true,
			"fatal": true
		},
		"sovereign": {
			"url": "ws://beta.refugesystems.net:3000/connect",
			"construct": null
		}
	};
	
	Object.assign(configuration, defaults);
	var socket;
	
	/**
	 * Acts as an initialization for Gaze in Vue.
	 * @method install
	 * @param {Vue} Vue
	 * @param {Object} options
	 */
	gazing.install = function(Vue, options) {
		initialize(options);
		
		gazing.vue = new Vue({
			"el": configuration.element,
			"data": {
				"g$Version": Gaze.version,
				"g$Start": Date.now()
			},
			methods: {
				"g$reconfigure": Gaze.reconfigure
			},
			computed: {}
		});
	};
	
	/**
	 * 
	 * @method reconfigure
	 * @param {String} field
	 * @param {Object | String | Number | Boolean} value 
	 */
	gazing.reconfigure = function(field, value) {
		configuration[field] = value;
	};
	
	/**
	 * Initializes Gaze with the configuration passed in options. 
	 * @method initialize
	 * @param {Object} options
	 */
	var initialize = function(options) {
		for(var key in options)
			if(options[key] instanceof Object)
				Object.assign(configuration[key] = configuration[key] || {}, options[key]);
			else
				configuration[key] = options[key];
		
		console.log("Console Configuration: ", configuration.console);
		display.trace = configuration.console.trace?console.trace:noOp;
		display.debug = configuration.console.debug?console.trace:noOp;
		display.info = configuration.console.info?console.log:noOp;
		display.warn = configuration.console.warn?console.warn:noOp;
		display.error = configuration.console.error?console.error:noOp;
		display.fatal = configuration.console.fatal?console.fatal:noOp;
	};
	
	var mixins = {};
	var display = {};
	var noOp = function(){};
	
	/**
	 * 
	 * @method getSubsystem
	 * @param {String} key
	 * @param {String} definition
	 */
	gazing.getSubsystem = function(key) {
		if(mixins[key])
			return mixins[key];
		console.warn("Requested undefined Subsystem: " + key);
		return undefined;
	};
	
	/**
	 * 
	 * @method defineSubsystem
	 * @param {String} key
	 * @param {String} definition
	 */
	gazing.defineSubsystem = function(key, definition) {
		if(!key)
			throw new Error("Missing key for new Mix-in");
		if(!definition)
			throw new Error("Missing definition for new Mix-in '" + key + "'");
		mixins[key] = mixins[key] || {};
		Object.assign(mixins[key], definition(configuration));
	};

	/**
	 * 
	 * @class Configuration
	 * @constructor
	 */
	mixins.Configuration = {
		"data": function() {
			return configuration;
		}
	};

	/**
	 * 
	 * @class LogSystem
	 * @constructor
	 */
	var logEntryDefaults = {
		"level": 30,
		"system": "Gaze"
	};
	
	mixins.LogSystem = {
		"methods": {
			"deliverLogEntry": function(details, message) {
				if(!message) {
					message = details;
					details = undefined;
				}
				details = Object.assign({}, logEntryDefaults, details);
				details.message = message;
				details.url = location.toString();
				details.time = Date.now();
				details.component = this.$vnode?this.$vnode.componentOptions.tag:details.component;
				
				switch(details.level) {
					case 10: return display.trace(details);
					case 20: return display.debug(details);
					case 30: return display.info(details);
					case 40: return display.warn(details);
					case 50: return display.error(details);
					case 60: return display.fatal(details);
					default: return display.log(details);
				}
			}
		}
	};
	
	return gazing;
})();

/* Handled outside the library in some way */

/**
 * @class _Gaze
 */

/**
 * The version of Gaze running.
 * @property version
 * @type String
 * @static
 */
