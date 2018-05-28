
/**
 * 
 * @class Component-MapControls
 * @constructor
 */
Vue.component("mapControls", {
	"inherit": true,
	"mixins": [],
	"props": ["lock","filter"],
	"mounted": function() {
		console.log("controls mount");
		
		this.$on("rerun", function() {
			console.log("heard here...");
		});
	},
	"methods": {
		"rerunLayout": function() {
			console.log("Emit");
			this.$emit("rerun");
		}
	},
	"template": Vue.templified("view-resourcemap/controls.html")
});
