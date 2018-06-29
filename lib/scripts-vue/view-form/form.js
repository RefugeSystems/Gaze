
/**
 * Provides a simple form for creating a resource.
 * @class gazeForm
 * @constructor
 * @param {String} fieldLimit Number of arbitrary fields that can be added. Undefined for no limit.
 */
Vue.component("gazeForm", {
	"inherit": true,
	"props": ["formData", "field-limit", "fields", "format"],
	"mounted": function() {
	},
	"data": function() {
		return {
			"states": ["entry", "sending", "waiting", "sent"],
			"state": "entry"
		};
	},
	"methods": {
		"submit": function(resource) {
			console.log("Submitting: ", resource);
		},
		"validate": function(resource) {
			console.log("Validating: ", resource);
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
