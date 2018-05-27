var Templify = {};
Templify.install = function(Vue, options) {
	options = options || {};
	options.name = options.name || "templified";
	Vue[options.name] = function(name) {
		switch(name) {
			case "experiments/experiment.html": return "<section>\r\n\t<h3>Some Test</h3>\r\n\t<span>{{content}}</span>\r\n</section>\r\n";
			default: return null;
		}
	};
};
Vue.use(Templify);