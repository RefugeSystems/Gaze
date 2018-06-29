
/**
 * 
 * @class Component-gazesynth
 * @constructor
 * @param {String} fieldLimit Number of arbitrary fields that can be added. Undefined for no limit.
 */
Vue.component("gazesynth", {
	"inherit": true,
	"mixins": [
		Gaze.getSubsystem("SoverignConnection"),
		Gaze.getSubsystem("LogSystem")
	],
	"props": ["field-limit", "fields"],
	"mounted": function() {
		this.conneciton = this.getSovereignConnection();
	},
	"data": function() {
		return {
			"resourceFields": [{
				"title": "Name",
				"placeholder": "Resource Name...",
				"type": "text"
			}],
			"relationFields": [{
				"title": "Name",
				"placeholder": "Relation Name...",
				"type": "text"
			}],
			"resource": {},
			"relation": {}
		};
	},
	"methods": {
		"submit": function(resources, relations) {
			console.log("Submitting: ", resources, relations);
			var request = {};
			if(resources !== undefined && resources.constructor.name !== "Array")
				resources = [resources];
			if(relations !== undefined && relations.constructor.name !== "Array")
				relations = [relations];
			
			this.connection.send({
				"action": "create",
				"resources": resources,
				"relations": relations
			});
		},
		"validate": function(resource) {
			console.log("Validating: ", resource);
		},
		"receive": function(event) {
			console.log("Response: ", event);
		},
		"shift": function(dir) {
			console.log("Swipe Direction: " + dir);
			switch(dir) {
				
			}
		},
		"debug": function() {
			console.log("Fields: ", this.fields);
			console.log("Content: ", this.content);
			console.log("Dance: ", this.dance);
		}
	},
	"template": Vue.templified("create/form.html")
});
