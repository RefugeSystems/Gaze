
new Vue({
	"el": "#hello",
	"data": {
		"message": "Hello world",
		"name": {
			"first": "John",
			"last": "doe"
		}
	},
	methods: {
		"test": function() {
			console.log(this.name);
		}
	},
	computed: {
		"fullName": function() {
			return this.name.first + " " + this.name.last;
		}
	}
});
