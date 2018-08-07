
/**
 * 
 * @class Component-ResourceMap
 * @constructor
 */
Vue.component("resourceList", {
	"inherit": true,
	"mixins": [
		Gaze.getSubsystem("SoverignConnection"),
		Gaze.getSubsystem("LogSystem"),
		Gaze.getSubsystem("ResourceTestData")
	],
	"props": {
		"resources": {
			"type": Object,
			"default": function() {
				return {};
			}
		},
		"relationsIn": {
			"type": Object,
			"default": function() {
				return {};
			}
		},
		"relationsOut": {
			"type": Object,
			"default": function() {
				return {};
			}
		},
		"construct": {
			"type": Object,
			"default": function() {
				return {};
			}
		}
	},
	"mounted": function() {
		var connection = this.getSovereignConnection();
		
		var addResource = function(data) {
			this.$set(this.resources, data.id, data);
		};
		
		var addRelation = function(data) {
			this.$set(this.relationsOut, data.source, this.relationsOut[data.source] || {});
			this.$set(this.relationsIn, data.target, this.relationsIn[data.target] || {});
			this.$set(this.relationsOut[data.source], data.id, data);
			this.$set(this.relationsIn[data.target], data.id, data);
		};
		
		var removeResource = function(data) {
			this.$delete(this.resources, data.id);
			this.$delete(this.relationsIn, data.id);
			this.$delete(this.relationsOut, data.id);
		};
		
		var removeRelation = function(data) {
			this.$delete(this.relationsOut[data.source], data.id);
			this.$delete(this.relationsIn[data.target], data.id);
		};

		connection.on("resource:create", addResource);
		connection.on("resource:remove", removeResource);
		connection.on("resource:repeat", addResource);

		connection.on("relation:create", addRelation);
		connection.on("relation:remove", removeRelation);
		connection.on("relation:repeat", addRelation);
	},
	"data": function() {
		return {
		};
	},
	"methods": {
		"rerunLayout": function() {

		},
		"rerun": function() {
			
		}
	},
	"template": Vue.templified("resourcemap/map.html")
});
