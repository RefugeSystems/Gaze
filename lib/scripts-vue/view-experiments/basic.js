
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
	"props": ["testdata","aaa", "aaaBbb", "data-stuffing", "dance"],
	"mounted": function() {
		console.log("Mounted: ", this);
	},
	"data": function() {
		return {
			"content": "Example",
			"fields": [{
				"title": "hi",
				"type": "text"
			}]
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
		},
		"testLeft": function(event, a, b) {
			console.log("Swiped Left: ", event, a, b);
		}
	},
	"template": Vue.templified("experiments/basic.html")
});

var execTest = function() {
	var x, q = 0, linkage = [];

	for(x=0; x<100; x++) {
		console.log("Node" + x);
		window.sovEmit[0]({
			"key": "addResource",
			"id": "Node" + x,
			"name": "Node" + x
		});
	}


	for(x=0; x<parseInt(Math.random()*100) + 100; x++) {
		linkage.push({
			"source": "Node" + parseInt(Math.random()*100),
			"target": "Node" + parseInt(Math.random()*100)
		});
	}

	linkage.forEach(function(l) {
		window.sovEmit[0]({
			"key": "addRelation",
			"id": "link" + q,
			"name": "link" + q,
			"source": l.source,
			"target": l.target
		});
		q++;
	});
};
