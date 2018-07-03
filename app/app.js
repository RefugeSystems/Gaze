Vue.use(Gaze);

Gaze.vue = new Vue({
	"el": "#gaze",
	"data": {
	    "route": window.location.hash.substring(2),
		"g$Version": Gaze.version,
		"g$Start": Date.now()
	},
	methods: {
		"g$reconfigure": Gaze.reconfigure
	},
	mounted: function() {
		var vm = this;
		var update = function() {
			Gaze.vue.route = window.location.hash.substring(2);
		};
		
		window.addEventListener("hashchange", update);
		window.addEventListener("popstate", update);
	},
	computed: {
		ViewComponent () {
			var template = Vue.templified("dashboards/" + this.route + ".html") || Vue.templified(this.route) || Vue.templified("dashboards/notfound.html");
			return {
				"template": template
			};
		}
	},
	render (h) {
		return h(this.ViewComponent)
	}
});
