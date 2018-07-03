
/**
 * 
 * Global Reference: `Gaze`
 * @class _Gaze
 * @constructor
 * @private
 * @module Gaze
 * @static
 */
window.Gaze = window._Gaze = (function() {
	var gazing = {};
	
	gazing.EventEmitter = function() {
		var events = {};
		var onces = {};
		
		this.eventNames = function() {
			return Object.keys(events).concat(Object.keys(onces));
		};
		
		this.on = function(key, listener) {
			events[key] = events[key] || [];
			if(events[key].indexOf(listener) === -1) {
				events[key].push(listener);
			}
		};

		this.once = function(key, listener) {
			onces[key] = onces[key] || [];
			if(onces[key].idexOf(listener) === -1) {
				onces[key].push(listener);
			}
		};

		this.off = function(key, listener) {
			events[key] = events[key] || [];
			var index = events[key].idexOf(listener);
			if(index !== -1) {
				events[key].splice(index, 1);
			}
		};

		this.emit = function(key, data) {
//			console.trace("Emit[" + key + "]: ", data);
			events[key] = events[key] || [];
			onces[key] = onces[key] || [];
			var x;
			
			for(x=0; x<events[key].length; x++) {
				events[key][x](data);
			}
			if(onces[key]) {
				for(x=0; x<onces[key].length; x++) {
					onces[key][x](data);
				}
				onces[key] = [];
			}
		};
	};

	var emitter = new gazing.EventEmitter();
	gazing.eventNames = emitter.eventNames.bind(gazing);
	gazing.on = emitter.on.bind(gazing);
	gazing.once = emitter.once.bind(gazing);
	gazing.off = emitter.off.bind(gazing);
	gazing.emit = emitter.emit.bind(gazing);
	
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
		for(var key in options) {
			if(options[key] instanceof Object) {
				Object.assign(configuration[key] = configuration[key] || {}, options[key]);
			} else {
				configuration[key] = options[key];
			}
		}
		
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
		if(mixins[key]) {
			return mixins[key];
		}
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
		if(!key) {
			throw new Error("Missing key for new Mix-in");
		}
		if(!definition) {
			throw new Error("Missing definition for new Mix-in '" + key + "'");
		}
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
	
	gazing.sign = function() {
		console.log("  __   __   __ \n |  \\_/  \\_/  |\n .            .      _____    _______ _______\n  \\__      __/      / __   \\/       /  ______/\n     )    (        / /__/  /   ____/  /  ___ __ ______  _____\n	/      \\      /  _   , \\____  \\  /  /  / __ \\__  / /  _  \\\n   '        '    /  / \\  \\/       / /___/ / /_/ / / /__  ____/\n  /          \\  /__/   \\__\\______/_______/\\_____\\/____/_____/\n  \\__________/\n'.____________.'");
	};
	

	gazing.app = function() {
		
	};
	
	return gazing;
})();

//Object.prototype.clone = function() {
//	return JSON.parse(JSON.stringify(this));
//};

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

/**
 * 
 * @class SyntheticConstruct
 * @extents EventEmitter
 * @constructor
 * @module Gaze
 */
Gaze.SyntheticConstruct = function(event) {
	
	/**
	 * 
	 * @property resources
	 * @type Array
	 */
	this.resources = [];
	
	/**
	 * 
	 * @property relations
	 * @type Array
	 */
	this.relations = [];

	var emitter = new Gaze.EventEmitter();
	this.eventNames = emitter.eventNames.bind(this);
	this.on = emitter.on.bind(this);
	this.once = emitter.once.bind(this);
	this.off = emitter.off.bind(this);
	this.emit = emitter.emit.bind(this);
	
	/**
	 * 
	 * @method modify
	 * @param {Event} event Contains the modification information
	 */
	this.modify = function(event) {
		
	};
};


/**
 * 
 * @class EventEmitter
 * @constructor
 * @module Gaze
 */

/**
 * 
 * @method eventNames
 * @return {Array}
 */

/**
 * 
 * @method on
 * @param {String} key
 * @param {Function} listener
 */

/**
 * 
 * @method once
 * @param {String} key
 * @param {Function} listener
 */

/**
 * 
 * @method off
 * @param {String} key
 * @param {Function} listener
 */

/**
 * 
 * @method emit
 * @param {String} key
 * @param {Object} data
 */
