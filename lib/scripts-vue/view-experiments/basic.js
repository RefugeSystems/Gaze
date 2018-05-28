
/**
 * 
 * 
 * @class Component-Basic
 * @constructor
 * @param {String} testData
 */
Vue.component("basic", {
	"inherit": true,
	"mixins": [
		Gaze.getSubsystem("SoverignConnection"),
		Gaze.getSubsystem("LogSystem")
	],
	"props": ["testdata","aaa", "aaaBbb", "data-stuffing"],
	"mounted": function() {
		//console.log("mounted");
	},
	"data": function() {
		return {
			"content": "Example"
		};
	},
	"methods": {
		"testing": function() {
			console.log("Basic Data: ", this);
		},
		"doubled": function() {
			this.deliverLogEntry(this._props, "huh");
		},
		"huh": function() {
			console.log("Yup");
		}
	},
	"template": Vue.templified("view-experiments/experiment.html")
});
