
/**
 * Provides a simple form for creating a resource.
 * @class gazeForm
 * @constructor
 * @param {String} fieldLimit Number of arbitrary fields that can be added. Undefined for no limit.
 */
Vue.component("gazeInfini", {
	"inherit": true,
	"props": {
		"step": {
			"type": Number,
			"default": 10
		},
		"records": {
			"type": Array,
			"default": function() {
				return [];
			}
		},
		"resolve": {
			"type": Function,
			"default": function() {
				return function(record) {
					console.log("Resolve: ", record);
					record._loaded = true;
					this.$set("record._loaded", true);
				};
			}
		}
	},
	"mounted": function() {
		// TODO: Detect full scroll
		var infini = this;
		this.loaded = 0;
		
		window.onscroll = function(event) {
			console.log("Scrolled[" + infini.hasMore + "]");
			if(infini.hasMore && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				console.log("Bottom");
				infini.loadNext();
			}
			
		};
	},
	"data": function() {
		var data = {
			"hasMore": true
		};

		return data;
	},
	"methods": {
		"loadNext": function() {
			var toLoad = [];
			while(toLoad.length < this.step && this.loaded < this.records.length) {
				this.records[this.loaded]._loaded = true;
				toLoad.push(this.records[this.loaded++]);
			}

			this.hasMore = this.loaded !== this.records.length;
			this.loadRecords(toLoad);
			
		},
		"loadRecords": function(records) {
			for(var x=0; x<records.length; x++) {
				console.log("Load[" + records[x].id + "]: ", records);
			}
		},
		"scrolled": function() {
			
		}
	},
	"template": Vue.templified("infini/scroll.html")
});
