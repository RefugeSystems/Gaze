
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
		var core = this;
//			this.map = $(this.$el).find("#map")[0];
		this.map = document.getElementById("map");
		window.resource = {
			"core": core
		};

		this.cy = cytoscape({
			"container": this.map,
			"autounselectify": true,
			"boxSelectionEnabled": false,
			"panningEnabled": true,
			"userPanningEnabled": true,
			"zoomingEnabled": true,
			"userZoomingEnabled": true,
			"style": [{
				"selector": "core",
				"style": {
					"selection-box-border-color": "#8BB0D0",
					"selection-box-color": "#AAD8FF",
					"selection-box-opacity": "0.5"
				}
			}, {
				"selector": "node",
				"style": {
					"width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
					"height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
					"content": "data(name)",
					"font-size": "12px",
					"text-valign": "center",
					"text-halign": "center",
					"background-color": "#555",
					"text-outline-color": "#555",
					"text-outline-width": "1px",
					"text-max-width": "50px",
					"text-wrap": "wrap",
					"color": "#c3b601",
					"overlay-padding": "6px",
					"z-index": "10"
				}
			},{
				"selector": "edge",
				"style": {
					"content": "data(name)",
					"line-color": "#c3b601",
					"curve-style": "bezier",
					"target-arrow-color": "#c3b601",
					"target-arrow-shape": "triangle"
				}
			}]
		});

		this.$on("rerun", function() {
			console.log("welp");
		});

		this.layout = window.layout = this.cy.layout({
			"name": "cola",
			"infinite": true,
			"fit": false,
			"randomize": false,
			"animate": true,
			"linkDistance": 1000
		});

		this.layout.run();

		var connection = this.getSovereignConnection();

		connection.on("test", function(data) {
			console.log("Test Event Fired: ", data);
		});

		connection.on("reset-zoom", function(event) {
			core.cy.animate({
				"fit": true
			});
		});
		
		connection.on("center", function(event) {
			var node = core.cy.nodes("#" + event.target);
			var options = {
				"zoom": event.zoom,
				"center": {
					"eles": node
				}
			};
			core.cy.animate(options);
		});
		
		var addResource = function(data) {
			core.cy.add({
				"id": data.id,
				"group": "nodes",
				"data": data
			});
			core.rerunLayout();
		};
		
		var addRelation = function(data) {
			core.cy.add({
				"id": data.id,
				"group": "edges",
				"source": data.source,
				"target": data.target,
				"data": data
			});
			core.rerunLayout();
		};

		connection.on("resource:create", addResource);
		connection.on("resource:repeat", addResource);

		connection.on("relation:create", addRelation);
		connection.on("relation:repeat", addRelation);
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
			var core = this;
			try {
				this.layout.stop();
				this.layout = this.cy.elements().makeLayout({
					"name": "cola",
					"infinite": true,
					"fit": false,
					"randomize": false,
					"animate": true,
					"linkDistance": 1000,
					"complete": function() {
						console.warn("Complete");
						core.cy.fit();
					}
				});
				this.layout.run();
				console.log(Object.keys(this.layout), "\n", this.layout);
			} catch(ex) {
				console.log("Layout run failed: ", ex);
			}
		},
		"rerun": function() {
			console.log("Received Top");
			try {
				this.layout.run();
//					this.cy.elements().makeLayout({
//					"name": "cola",
//					"infinite": true,
//					"fit": true,
//					"linkDistance": 1000
//					});
			} catch(ex) {
				console.log("Layout run failed: ", ex);
			}
		}
	},
	"template": Vue.templified("resourcemap/map.html")
});
