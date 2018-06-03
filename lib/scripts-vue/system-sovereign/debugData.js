window.sovereignDebug = {};

window.sovereignDebug.start = Date.now();

window.sovereignDebug.resources = {};
window.sovereignDebug.resources._make = function(description, timespan) {
	window.sovereignDebug.resources._id += 1;
	window.sovereignDebug.resources[window.sovereignDebug.resources._id] = Object.assign({}, window.sovereignDebug.resources._root, {
		"name": "Resource:" + window.sovereignDebug.resources._id,
		"id": window.sovereignDebug.resources._id,
		"description": description
	});
	if(timespan) {
		delete(window.sovereignDebug.resources[window.sovereignDebug.resources._id].commence);
		delete(window.sovereignDebug.resources[window.sovereignDebug.resources._id].conclude);
	}
};
window.sovereignDebug.resources._id = 0;
window.sovereignDebug.resources._root = {
	"type": -1,
	"environment": -1,
	"audience": "Testers",
	"commence": window.sovereignDebug.start - 100000,
	"consclude": window.sovereignDebug.start + 100000,
	"created": window.sovereignDebug.start,
	"updated": window.sovereignDebug.start
};

window.sovereignDebug.resources._make("This is a test resource");
window.sovereignDebug.resources._make("This is another test resource");
window.sovereignDebug.resources._make("The cake is a lie");
window.sovereignDebug.resources._make("No it's not");
window.sovereignDebug.resources._make("Testy McTestFace the Third");
window.sovereignDebug.resources._make("Creative");
window.sovereignDebug.resources._make("Nope");
window.sovereignDebug.resources._make("Alternative Nope");
window.sovereignDebug.resources._make("Floater");

window.sovereignDebug.relations = {};
window.sovereignDebug.relations._make = function(description, source, target) {
	window.sovereignDebug.relations._id += 1;
	window.sovereignDebug.relations[window.sovereignDebug.relations._id] = Object.assign({}, window.sovereignDebug.relations._root, {
		"name": "Relation:" + window.sovereignDebug.relations._id,
		"id": window.sovereignDebug.relations._id,
		"description": description,
		"source": source,
		"target": target
	});
};
window.sovereignDebug.relations._id = 0;
window.sovereignDebug.relations._root = {
	"concept": "Testers",
	"type": -1,
	"environment": -1,
	"created": window.sovereignDebug.start,
	"updated": window.sovereignDebug.start
};
window.sovereignDebug.relations._make("This is a test relation", 0, 1);
window.sovereignDebug.relations._make("This is a test relation", 1, 2);
window.sovereignDebug.relations._make("This is a test relation", 2, 3);
window.sovereignDebug.relations._make("This is a test relation", 3, 4);
window.sovereignDebug.relations._make("This is a test relation", 4, 5);
window.sovereignDebug.relations._make("This is a test relation", 6, 1);
window.sovereignDebug.relations._make("This is a test relation", 6, 5);
window.sovereignDebug.relations._make("This is a test relation", 1, 7);
window.sovereignDebug.relations._make("This is a test relation", 4, 7);

window.sovereignDebug.events = {};
window.sovereignDebug.events.add = {
	"construct": 0,
	"ids": [0, 1, 2, 3],
	"_callID": "TestCall",
	"_time": 10000,
	"_type": "resource:append"
};
window.sovereignDebug.events.remove = {
	"construct": 0,
	"ids": [2, 3],
	"_callID": "TestCall",
	"_time": 10000,
	"_type": "resource:detach"
};
