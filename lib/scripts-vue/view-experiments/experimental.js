
/**
 * 
 * 
 * @class Component-Basic
 * @constructor
 * @param {String} testData
 */
Vue.component("experiment", {
	"inherit": true,
	"props": [],
	"mounted": function() {
	},
	"data": function() {
		var records = [];
		for(var x=0; x<100; x++) {
			records.push({
				"id": "node" + x,
				"description": "This is node " + x,
				"name": "node-" + x
			});
		}
		
		return {
			"records": records
		};
	},
	"methods": {
	},
	"template": Vue.templified("experiments/experimental.html")
});
