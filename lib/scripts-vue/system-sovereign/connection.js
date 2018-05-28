
/**
 * 
 * @class SovereignConnection
 * @constructor
 * @vueType Mixin
 * @param {Object} configuration Passed by Gaze to initialize the Mixin during defining.
 */
Gaze.defineSubsystem("SoverignConnection", function(configuration) {
	
	
	return {
		"created": function(opt) {
			this.configuration = Object.assign({}, configuration, opt);
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
			"debug": function() {
				console.log("Gaze: " + this.g$Version + "@" + this.g$Start);
			}
		}
	};
});