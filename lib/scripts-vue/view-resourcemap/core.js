
/**
 * 
 * @class Component-ResourceMap
 * @constructor
 */
Vue.component("resourceMap", {
	"inherit": true,
	"mixins": [
		Gaze.getSubsystem("SoverignConnection"),
		Gaze.getSubsystem("LogSystem"),
		Gaze.getSubsystem("ResourceTestData")
	],
	"props": ["testdata","aaa", "aaaBbb", "data-stuffing"],
	"mounted": function() {
//		this.map = $(this.$el).find("#map")[0];
		this.map = document.getElementById("map");
		
		this.cy = cytoscape({
			"container": this.map,
			"autounselectify": true,
			"boxSelectionEnabled": false,
			"panningEnabled": true,
			"userPanningEnabled": false,
			"zoomingEnabled": true,
			"userZoomingEnabled": false,
			"style": [{
				"selector": "node",
				"css": {
					"background-color": "#f92411"
				}
			},{
				"selector": "edge",
				"css": {
					"line-color": "#f92411"
				}
			}],
			"elements": this.testResourceData
		});
		
		
		this.$on("rerun", function() {
			console.log("welp");
		});

		this.layout = window.layout = this.cy.layout({
			"name": "cola",
			"infinite": true,
			"fit": true,
			"linkDistance": 1000
		});

		this.layout.run();
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
		"rerunLayout": function() {
			console.log("Received");
			try {
				this.layout.run();
			} catch(ex) {
				console.log("Layout run failed: ", ex);
			}
		},
		"rerun": function() {
			console.log("Received Top");
			try {
				this.layout.run();
			} catch(ex) {
				console.log("Layout run failed: ", ex);
			}
		}
	},
	"template": Vue.templified("view-resourcemap/map.html")
});
