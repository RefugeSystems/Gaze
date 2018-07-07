
/**
 * 
 * @class Component-gazesynth
 * @constructor
 * @param {String} fieldLimit Number of arbitrary fields that can be added. Undefined for no limit.
 */
Vue.component("gazesynth", {
	"inherit": true,
	"mixins": [
		Gaze.getSubsystem("SoverignConnection"),
		Gaze.getSubsystem("LogSystem")
	],
	"props": ["field-limit", "fields"],
	"mounted": function() {
		var creation = this;
		
		this.connection = this.getSovereignConnection();
		
		this.connection.on("error", function(error) {
			console.error("Found Error: ", error);
			creation.errors.push(error);
		});
		console.log("Mounted: ", this);
	},
	"data": function() {
		return {
			"name": "",
			"errors": [],
			"resourceText": {
				"title": "Synthesize Resource",
				"fieldErrorTitle": null,
				"submit": "Create"
			},
			"resourceFields": [{
				"title": "Name",
				"placeholder": "Resource Name...",
				"key": "name",
				"type": "text",
				"required": true,
				"validations": [{
					"type": "length",
					"min": 1,
					"max": 128
				}]
			}],
			"relationFields": [{
				"title": "Name",
				"placeholder": "Relation Name...",
				"key": "name",
				"required": true,
				"type": "text",
				"validations": [{
					"type": "length",
					"min": 1,
					"max": 128
				}]
			}, {
				"title": "Source",
				"placeholder": "Relation Source Resource...",
				"key": "sourceName",
				"required": true,
				"type": "text",
				"validations": [{
					"type": "length",
					"min": 1,
					"max": 128
				}]
			}, {
				"title": "Target",
				"placeholder": "Relation Target Resource...",
				"key": "targetName",
				"required": true,
				"type": "text",
				"validations": [{
					"type": "length",
					"min": 1,
					"max": 128
				}]
			}],
			"csv": {
				"resources": [],
				"relations": []
			},
			"resource": {
				"fields":{}
			},
			"relation": {
				"fields":{}
			}
		};
	},
	"methods": {
		"submit": function(resources, relations) {
			console.log("Submitting - : ", this, resources, relations);
			var request = {};
			if(resources !== undefined && resources.constructor.name !== "Array") {
				resources = [resources];
				this.newResource();
			}
			if(relations !== undefined && relations.constructor.name !== "Array") {
				relations = [relations];
				this.newRelation();
			} 
			
			this.connection.send({
				"key": "create",
				"resources": resources,
				"relations": relations
			});
		},
		"validate": function(resource) {
			console.log("Validating: ", resource);
		},
		"receive": function(event) {
			console.log("Response: ", event);
		},
		"shift": function(dir) {
			console.log("Swipe Direction: " + dir);
			switch(dir) {
				
			}
		},
		"newResource": function() {
			this.resource = {
				"fields": {}
			};
		},
		"newRelation": function() {
			this.relation = {
				"fields": {}
			};
		},
		"addField": function(object, field) {
			if(field) {
				this.$set(object.fields, field, "");
			}
		},
		"removeField": function(object, field) {
			this.$delete(object.fields, field);
		},
		"parseCSV": function(parsing) {
			return new Promise(function(done, fail) {
				var x, loaded, reader, text;
				reader = new FileReader();
				loaded = [];
				
				reader.onload = function(event) {
					var loaded, loading, l, f, text, lines, header, fields;
					
					text = event.target.result;
					lines = text.split("\n");
					loaded = [];
					
					header = lines[0].trim().split(/[,;]/);
					for(f=0; f<header.length; f++) {
						header[f] = header[f].trim();
					}

					for(l=1; l<lines.length; l++) {
						if(lines[l].length) {
							fields = lines[l].trim().split(/[,;]/);
							loading = {};
							for(f=0; f<fields.length; f++) {
								loading[header[f]] = fields[f].trim();
							}
							loaded.push(loading);
						}
					}
					
					done(loaded);
				};
				
				reader.onerror = function(error) {
					fail(error);
				};

				console.log("Parsing: ", parsing);
				for(x=0; x<parsing.files.length; x++) {
					reader.readAsText(parsing.files[x]);
				}
			});
		},
		"parseResourceCSV": function() {
			var vm = this;
			if(this.$refs.resourceCSV && this.$refs.resourceCSV.files && this.$refs.resourceCSV.files.length) {
				this.parseCSV(this.$refs.resourceCSV)
				.then(function(resources) {
					vm.$set(vm.csv, "resources", resources);
				})
				.catch(function(error) {
					console.error("Parse Failure: ", error, error.stack);
					vm.$set(vm.csv, "resError", error);
				});
			}
		},
		"parseRelationCSV": function() {
			
		},
		"dismiss": function(message) {
			var index;
			
			index = this.errors.indexOf(message);
			if(index !== -1) {
				this.errors.splice(index, 1);
			}
		},
		"debug": function() {
			console.log("Fields: ", this.fields);
			console.log("Content: ", this.content);
			console.log("Dance: ", this.dance);
		}
	},
	"template": Vue.templified("create/form.html")
});
