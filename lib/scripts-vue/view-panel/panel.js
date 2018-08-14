
/**
 * Panels serve as a basic top level compontent to wrap sub-components with
 * navigation and passive information.
 * @class Component-Panel
 * @constructor
 */
Vue.component("rsPanel", {
	"inherit": true,
	"template": Vue.templified("panel/basic.html"),
	"mixins": [
		Gaze.getSubsystem("LogSystem")
	],
	"props": {
		"topBar": {
			"type": Array,
			"default": function() {
				return [];
			}
		},
		"rightColumn": {
			"type": Array,
			"default": function() {
				return [];
			}
		},
		"bottomBar": {
			"type": Array,
			"default": function() {
				return [];
			}
		},
		"leftColumn": {
			"type": Array,
			"default": function() {
				return [];
			}
		}
	},
	"data": function() {
		return {};
	},
	"mounted": function() {
		this.leftColumn.push({
			"icon": {
				"fa fa-user": true
			},
			"text": {
				"text": "Homie" 
			}
		});
	},
	"methods": {
		
	}
});
