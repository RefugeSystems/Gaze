
/**
 * Provides a simple form for creating a resource.
 * @class gazeForm
 * @constructor
 * @param {String} fieldLimit Number of arbitrary fields that can be added. Undefined for no limit.
 */
Vue.component("gazeForm", {
	"inherit": true,
	"props": {
		"formData": Object,
		"field-limit": {
			"type": Number,
			"default": 50
		},
		"fields": Array,
		"format": {
			"type": String,
			"default": "basic"
		},
		"text": {
			"type": Object,
			"default": function(val) {
				return {};
			}
		},
		"submittable": {
			"type": Boolean,
			"default": true
		},
		"preservable": {
			"type": Boolean,
			"default": false
		},
		"cancellable": {
			"type": Boolean,
			"default": false
		}
	},
	"mounted": function() {
	},
	"data": function() {
		var priority = JSON.parse(JSON.stringify(this.text));
		var defaults = {
			"title": "Gaze Form",
			"genErrorTitle": "Formation Errors",
			"fieldErrorTitle": "Field Errors",
			"submit": "Submit",
			"cancel": "Cancel",
			"preserve": "Preverse"
		};
		
		Object.assign(this.text, defaults, priority);
		
		var data = {
			"errors": [],
			"states": ["entry", "sending", "waiting", "sent"],
			"state": "entry"
		};
		
		return data;
	},
	"methods": {
		"submit": function(formData) {
			if(this.submittable && this.validate(formData) === 0) {
				this.$emit("gaze-submit", formData);
			}
		},
		"preserve": function(formData) {
			if(this.preservable) {
				this.$emit("gaze-preserve", formData);
			}
		},
		"cancel": function(formData) {
			if(this.cancellable) {
				this.$emit("gaze-cancel", formData);
			}
		},
		"validate": function(formData) {
			var violations = 0;
			var f, v;
			
			for(f=0; f<this.fields.length; f++) {
				this.fields[f].errors = [];
			}
			
			this.errors.splice(0);
			if(!this.fields) {
				this.errors.push({
					"message": "No Form this.fields Specified"
				});
			}
			
			for(f=0; f<this.fields.length; f++) {
				if(this.fields[f].validations && this.fields[f].validations.length) {
					for(v=0; v<this.fields[f].validations[v].length; v++) {
						switch(this.fields[f].validations[v].type) {
							case "length":
								if(this.fields[f].validations[v].min !== undefined && formData[this.fields[f].key] && formData[this.fields[f].key].length < this.fields[f].validations[v].min) {
									this.fields[f].errors.push({
										"message": this.fields[f].validations[v].message || "Failed validation of min " + this.fields[f].validations[v].type,
										"validaiton": this.fields[f].validations[v],
										"field": this.fields[f],
										"violation": violations++
									});
								}
								if(this.fields[f].validations[v].max !== undefined && formData[this.fields[f].key] && formData[this.fields[f].key].length > this.fields[f].validations[v].max) {
									this.fields[f].errors.push({
										"message": this.fields[f].validations[v].message || "Failed validation of max " + this.fields[f].validations[v].type,
										"validaiton": this.fields[f].validations[v],
										"field": this.fields[f],
										"violation": violations++
									});
								}
								break;
							default:
								console.warn("Unknown field validation: " + this.fields[f].validations[v].type);
						}
					}
				}
			}
			
			return violations;
		},
		"receive": function(event) {
			console.log("Response: ", event);
		},
		"debug": function() {
			console.log("Fields: ", this.fields);
			console.log("Content: ", this.content);
			console.log("Dance: ", this.dance);
		}
	},
	"template": Vue.templified("form/basic.html")
});

/**
 * 
 * @class gazeForm-Field
 * @constructor
 */

/**
 * 
 * @property title
 * @type String
 */

/**
 * text, number, checkbox, paragraph
 * @property type
 * @type String
 * @default text
 */

/**
 * 
 * @property placeholder
 * @type String
 */

/**
 * 
 * @property placeholder
 * @type String
 */