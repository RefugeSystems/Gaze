
/**
 * Provides a simple form for creating a resource.
 * @class gazeForm
 * @constructor
 * @param {String} fieldLimit Number of arbitrary fields that can be added. Undefined for no limit.
 */
Vue.component("gazecsv", {
	"inherit": true,
	"props": ["format"],
	"mounted": function() {
	},
	"data": function() {
		return {
		};
	},
	"methods": {
		"parse": function() {
			console.log("Parsing: ", text, parsing);
			var reader, text, parsing;
			
			parsing = this.$el.getElementsByClassName("upload")[0];
			reader = new FileReader();
			reader.onload = function(event) {
				var loaded, loading, l, f, text, lines, header, fields;
				
				text = event.target.result;
				lines = text.split("\n");
				loaded = [];
				
				header = lines[0].trim().split(/[,;]/);
				for(f=0; f<header.length; f++) {
					header[f] = header[f].trim();
				}
				console.log("Header: ", header);
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
				
				console.log("Read: ", loaded);
			};
			reader.onerror = function(error) {
				console.error("Error: ", error);
			};
			
			reader.readAsText(parsing.files[0]);
		}
	},
	"template": Vue.templified("csvparser/input.html")
});
