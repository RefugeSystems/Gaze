
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
			"type": Object,
			"default": function() {
				return null;
			}
		},
		"rightColumn": {
			"type": Object,
			"default": function() {
				return null;
			}
		},
		"bottomBar": {
			"type": Object,
			"default": function() {
				return null;
			}
		},
		"leftColumn": {
			"type": Object,
			"default": function() {
				return null;
			}
		}
	},
	"data": function() {
		return {};
	},
	"mounted": function() {
		
	},
	"methods": {
		
	}
});
