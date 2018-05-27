/* Used for base line tests to establish baseline functionality */

describe("Assumptions for unit testing", function() {
	
	describe("Jasmine", function() {
		it("Exists", function() {
			expect(true).toBe(true);
		});
	});
	
	describe("Promises", function() {
		it("Exists", function() {
			expect(Promise).toBeDefined();
		});
		
		it("Execute successfully", function(done) {
			var promise = new Promise(function(pass) {
				pass();
			});
			
			promise.then(function() {
				done();
			});
		});
		
		it("Fail correctly", function(done) {
			var promise = new Promise(function(pass, fail) {
				fail();
			});
			
			promise.catch(function() {
				done();
			});
		});
	});
	
	describe("jQuery", function() {
		it("Exists", function() {
			expect($).toBeDefined();
		});
	});
	
	describe("AngularJS", function() {
		it("Exists", function() {
			expect(angular).toBeDefined();
			expect(angular.module).toBeDefined();
		});
		
		it("Can mock appropriately", function() {
			var testing;
			
			module(function($provide) {
				$provide.value("fake", {
					"faked": 10
				});
				
				$provide.value("another", {
					"fake": function() {
						return 20;
					}
				});
			});
			
			inject(function($injector) {
				testing = $injector.get("another");
			});

			expect(testing.fake()).toBe(20);
		});
	});
	
	describe("VueJS", function() {
		it("Exists", function() {
			expect(Vue).toBeDefined();
			expect(function() {
				new Vue({});
			}).not.toThrow();
		});
		
		// How to fully Mock?
		it("Can mock appropriately", function() {
			expect(function() {
				Vue.component("test", {});
				new Vue({});
			}).not.toThrow();
		});
	});
});