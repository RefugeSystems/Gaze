Vue.component("basic", {
	"data": function() {
		console.log(Vue.templified("experiments/experiment.html"));
		return {
			"content": "Example"
		};
	},
	"template": Vue.templified("experiments/experiment.html")
});
