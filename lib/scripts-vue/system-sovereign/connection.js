
/**
 * 
 * @class SovereignConnection
 * @extends EventEmitter
 * @constructor
 * @vueType Mixin
 * @param {Object} configuration Passed by Gaze to initialize the Mixin during defining.
 */
Gaze.defineSubsystem("SoverignConnection", function(configuration) {
	configuration = configuration || {};
	
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
	if(debugging) {
		window.sovEmit = [];
	}
	
	
	/**
	 * Key:Value pairs for headers to set on requests to Sovereign.
	 * @property authenticator
	 * @type Object
	 * @private
	 */
	var authenticator = null;
	configuration.authenticator = configuration.authenticator || {};
	var buffer = JSON.parse(JSON.stringify(configuration.authenticator));
	var defaultAuthenticator = {
		"type": "localStorage",
		"key": "authenticatorKey"
	};
	Object.assign(configuration.authenticator, defaultAuthenticator, buffer);
	
	switch(configuration.authenticator.type) {
		case "localStorage":
			authenticator = localStorage.getItem(configuration.authenticator.key) || null;
			break;
		default:
			console.warn("Unable to determine Sovereign Connection authentication type");
	};
	
	document.cookie = "Test=example";
	
	/**
	 * Tracks Constructs against whom the UI is listening for
	 * Events to drive active displays.
	 * @property constructs
	 * @type Object
	 * @private
	 */
	/* TODO: This needs some kind of clean-up to drop a Construct when the UI
	 * no longer needs the information.
	 * 
	 * Possible on a timed delay incase we need to come back to the data to
	 * speed up the return; Something like setTimeout and track the timeout
	 * ID with the Construct to the clearTimeout if we come back to it.
	*/
	var constructs = {};
	
	/**
	 * Tracks Resources that the UI has indexed.
	 * @property resources
	 * @type Object
	 * @private
	 */
	var resources = {};
	
	/**
	 * 
	 * @method options
	 */
	
	/**
	 * 
	 * @method debug
	 */
	
	
	var SovereignConnection = function(url) {
		var emitter = new Gaze.EventEmitter();
		var socket = new WebSocket(url + "?authenticator=" + authenticator);
		
		this.eventNames = emitter.eventNames.bind(this);
		this.once = emitter.once.bind(this);
		this.off = emitter.off.bind(this);
		this.on = emitter.on.bind(this);
		
		if(debugging) {
			window.sovEmit.push(function(event) {
				emitter.emit(event.key, event);
			});
		}
		
		this.send = function(data) {
			socket.send(JSON.stringify({
				"sent": Date.now(),
				"data": data
			}));
		};

		socket.onmessage = function(message) {
			var event = JSON.parse(message.data);
			emitter.emit(event.key, event);
			console.log("Event Data: ", event);
		};
		
		socket.onerror = function(error) {
			console.log("Err: ", error);
		};
		
		socket.onopen = function(message) {
			console.log("open: ", message);
		};
		
		socket.onclose = function(code) {
			console.log("Code: ", code);
		};
	};
	
	var connection = {};
	connection[configuration.sovereign.url] = new SovereignConnection(configuration.sovereign.url);
	
	/**
	 * 
	 * @property socket
	 * @type WebSocket
	 * @private
	 */
	
	
	
	return {
		"created": function(opt) {
			this.configuration = Object.assign({}, configuration.sovereign, opt);
			this.instance = instance++;
		},
		"methods": {
			"options": function(key, field) {
				if(!field && !key) {
					return this.configuration;
				} else if(!field) {
					return this.configuration[key];
				} else {
					this.configuration[key] = field;
				}
			},
			"getSovereignConnection": function(url) {
				url = url || configuration.sovereign.url;
				connection[url] = connection[url] || new SovereignConnection(url);
				return connection[url];
			},
			"getConstruct": function(ids) {
				if(!ids || !ids.length) {
					throw new Error("No IDs passed");
				}
				return new Promise(function(done, fail) {
					var x, fetch = [], returning = {};
					
					// Cache Read
					for(x=0; x<ids.length; x++) {
						if(constructs[ids[x]]) {
							clearTimeout(constructs[ids[x]].timeout);
							returning[ids[x]] = constructs[ids[x]];
						} else {
							fetch.push(ids);
						}
					}
					
					if(fetch.length) {
						// Fetch Missing
						if(debugging) {
							
						} else {
							// TODO: Replace with live data
							console.error("Debug mode offline and live data not yet ready");
							fail(new Error("Live data not yet supported"));
						}
					} else {
						// No Missing
						done(returning);
					}
				});
			},
			"getResources": function(ids) {
				if(!ids || !ids.length) {
					throw new Error("No IDs passed");
				}
				return new Promise(function(done, fail) {
					var x, fetch = [], returning = [];
					for(x=0; x<ids.length; x++) {
						if(resources[ids[x]]) {
							returning.push(resources[ids[x]]);
							clearTimeout(resources[ids[x]].timeout);
						} else {
							fetch.push(ids[x]);
						}
					}

					if(fetch.length) {
						// Fetch Missing
						if(debugging) {
							for(x=0; x<fetch.length; x++) {
								returning.push(window.sovereignDebug.resources[fetch[x]]);
							}
							done(returning);
						} else {
							// TODO: Replace with live data
							console.error("Debug mode offline and live data not yet ready");
							fail(new Error("Live data not yet supported"));
						}
					} else {
						// No Missing
						done(returning);
					}
				});
			},
			"getRelations": function(ids) {
				if(!ids || !ids.length) {
					throw new Error("No IDs passed");
				}
				return new Promise(function(done, fail) {
					if(debugging) {
						var x, fulfill = [];
						for(x=0; x<ids.length; x++) {
							fulfill.push(window.sovereignDebug.relations[ids[x]]);
						}
						done(fulfill);
					} else {
						// TODO: Replace with live data
						console.error("Debug mode offline and live data not yet ready");
						fail(new Error("Live data not yet supported"));
					}
				});
			},
			"createResource": function(resource, construct) {
				if(!resource) {
					throw new Error("No Resource passed");
				}
				
				return new Promise(function(done, fail) {
					if(debugging) {
						
					} else {
						// TODO: Replace with live data
						console.error("Debug mode offline and live data not yet ready");
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
