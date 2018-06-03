
/**
 * 
 * @class SyntheticConstruct
 * @constructor
 * @vueType Mixin
 */
Gaze.defineSubsystem("SyntheticConstruct", function() {
	/**
	 * 
	 * @method createCconstruct
	 * @param {Event} event The event that signaled to create this Construct
	 * @return {Construct}
	 */
	
	
	/**
	 * 
	 * @class Construct
	 * @constructor
	 * @param {Event} event
	 */
	var Construct = function(event) {
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

		/**
		 * 
		 * @method modify
		 * @param {Event} event Contains the modification information
		 */
		this.modify = function(event) {
			
		};
	};
	
	
	return {
		"methods": {
			"Construct": function(event) {
				
				return new Construct(event);
			}
		}
	};
});
