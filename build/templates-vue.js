var Templify = {};
Templify.install = function(Vue, options) {
	options = options || {};
	options.name = options.name || "templified";
	Vue[options.name] = function(name) {
		switch(name) {
			case "view-experiments/experiment.html": return "<section>\r\n\t<h3>Some Test</h3>\r\n\t<span>{{content}}</span>\r\n\t<button v-on:click=\"options()\">Test</button>\r\n\t<button v-on:click=\"testing()\">Console Data</button>\r\n\t<button v-on:click=\"debug()\">Debug</button>\r\n\t<button v-on:click=\"doubled()\">Doubled</button>\r\n\t<slot name=\"carryOver\"></slot>\r\n\t<h3>After Slot</h3>\r\n\t<div id=\"info\">\r\n\t\t<span>Gaze:</span>\r\n\t\t<span>{{$root.g$Version}}</span>\r\n\t\t<span>@{{$root.g$Start}}</span>\r\n\t</div>\r\n\t<slot name=\"map\"></slot>\r\n</section>\r\n";
			case "view-resourcemap/controls.html": return "<section class=\"map controls\">\r\n\t<button v-on:click=\"rerunLayout()\">\r\n\t\t<span class=\"fas fa-sync-alt fa-spin\"></span>\r\n\t</button>\r\n</section>\r\n";
			case "view-resourcemap/map.html": return "\r\n<section class=\"resource map\">\r\n\t<div id=\"map\">\r\n\t\t<h1 v-on:click=\"rerunLayout()\">Resource Map</h1>\r\n\t\t<map-controls v-on:rerun=\"rerunLayout()\"></map-controls>\r\n\t</div>\r\n</section>\r\n";
			default: return null;
		}
	};
};
Vue.use(Templify);