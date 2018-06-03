
/**
 * 
 * @class SovereignConnection
 * @constructor
 * @vueType Mixin
 * @param {Object} configuration Passed by Gaze to initialize the Mixin during defining.
 */
Gaze.defineSubsystem("SoverignConnection", function(configuration) {
	/**
	 * 
	 * @property instance
	 * @type Number
	 * @private
	 */
	var instance = 0;

	/**
	 * 
	 * @property debugging
	 * @type Boolean
	 * @private
	 */
	var debugging = configuration.debug || configuration.sovereign.debug;
	
	/**
	 * 
	 * @method options
	 */
	
	/**
	 * 
	 * @method getSovereignEmitter
	 * @return {SovereignEmitter}
	 */
	
	/**
	 * 
	 * @method debug
	 */
	
	
	/**
	 * 
	 * @property socket
	 * @type WebSocket
	 * @private
	 */
	var socket = new WebSocket(configuration.sovereign.url);
	socket.onerror = function(error) {
		console.log("Err: ", error);
	};
	
	socket.onmessage = function(message) {
		var data = JSON.parse(message.data);
		console.log("Data: ", data);
	};
	
	socket.onopen = function(message) {
		console.log("open: ", message);
	};
	
	socket.onclose = function(code) {
		console.log("Code: ", code);
	};
	
	var emitter = {};
	var events = {};
	var onces = {};

	/**
	 * 
	 * @method emit
	 * @private
	 * @param {String} key
	 * @param {Object} data
	 */
	var emit = function(key, data) {
		events[key] = events[key] || [];
		onces[key] = onces[key] || [];
		var x;
		
		for(x=0; x<events[key].length; x++)
			events[key][x](data);
		for(x=0; x<onces[key].length; x++)
			onces[key][x](data);
		
		onces[key].splice(0, onces[key].length);
	};
	
	if(debugging) {
		console.trace("Sovereign Emitter Debug Mode");
		window.sovereignEmitter = emitter;
		window.sovereignEmit = emit;
		window.sovereignHook = {
			"events": events,
			"onces": onces
		};
	} else {
		console.trace("Sovereign Emitter Production Mode");
		window.sovereignEmit = null;
	}
	
	/**
	 * 
	 * @class SovereignEmitter
	 * @constructor
	 */
	
	/**
	 * 
	 * @method on
	 * @param {String} key
	 * @param {Function} listener
	 */
	emitter.on = function(key, listener) {
		events[key] = events[key] || [];
		if(events[key].indexOf(listener) === -1)
			events[key].push(listener);
	};

	/**
	 * 
	 * @method once
	 * @param {String} key
	 * @param {Function} listener
	 */
	emitter.once = function(key, listener) {
		onces[key] = onces[key] || [];
		if(onces[key].idexOf(listener) === -1)
			onces[key].push(listener);
	};

	/**
	 * 
	 * @method off
	 * @param {String} key
	 * @param {Function} listener
	 */
	emitter.off = function(key, listener) {
		events[key] = events[key] || [];
		var index = events[key].idexOf(listener);
		if(index !== -1)
			events[key].splice(index, 1);
	};
	
	return {
		"created": function(opt) {
			this.configuration = Object.assign({}, configuration.sovereign, opt);
			this.instance = instance++;
		},
		"methods": {
			"options": function(key, field) {
				if(!field && !key)
					return this.configuration;
				else if(!field)
					return this.configuration[key];
				else
					this.configuration[key] = field;
			},
			"getSovereignEmitter": function() {
				return emitter;
			},
			"getResources": function(ids) {
				if(!ids || !ids.length)
					throw new Error("No IDs passed");
				return new Promise(function(done, fail) {
					if(debugging) {
						var x, fulfill = [];
						for(x=0; x<ids.length; x++)
							fulfill.push(window.sovereignDebug.resources[ids[x]]);
						done(fulfill);
					} else {
						// TODO: Replace with live data
						console.log("Debug mode offline and live data not yet ready");
						fail(new Error("Live data not yet supported"));
					}
				});
			},
			"getRelations": function(ids) {
				if(!ids || !ids.length)
					throw new Error("No IDs passed");
				return new Promise(function(done, fail) {
					if(debugging) {
						var x, fulfill = [];
						for(x=0; x<ids.length; x++)
							fulfill.push(window.sovereignDebug.relations[ids[x]]);
						done(fulfill);
					} else {
						// TODO: Replace with live data
						console.log("Debug mode offline and live data not yet ready");
						fail(new Error("Live data not yet supported"));
					}
				});
			},
			"debug": function() {
				console.log("Gaze: " + this.g$Version + "@" + this.g$Start);
			}
		}
	};
});
