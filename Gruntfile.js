
module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks("grunt-contrib-templify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-mkdir");
	grunt.loadNpmTasks("grunt-karma");

	var pkg = grunt.file.readJSON("package.json");
	var footer = "\r\nGaze.version = \"V" + pkg.version + "\";\r\nVue.use(Gaze);";
	var config = {
		"pkg": pkg,
		"eslint": {
			"options": {
				"globals": [
					"sessionStorage",
					"localStorage",
					"_gazeVersion",
					"cytoscape",
					"location",
					"document",
					"angular",
					"Promise",
					"global",
					"window",
					"inject",
					"Gaze",
					"cola",
					"atob",
					"btoa",
					"Vue",
					"d3",
					"$"
				],
				"rules": {
					"eqeqeq": 0,
					"curly": [2, "multi"],
					"no-undef": 2,
					"semi": 2,
					"indent": [2, "tab", {
						"ignoreComments": true,
						"MemberExpression": 0,
						"SwitchCase": 1,

					}],
					"comma-dangle": 2,
					"quotes": [2, "double"],
					"no-unused-vars": [2, {
						"varsIgnorePattern": "^_?ignore"
					}],
					"block-scoped-var": 2,
					"no-undef": 2,
					"semi": 2,
					"camelcase": 2,
					"max-depth": 2,
					"no-unused-vars": 1
				},
				"terminateOnCallback": false,
				"callback": function(response) {
					if(response.errorCount) {
						var result, message;
						for(result=response.results.length-1; result !== -1; --result) {
							if(!response.results[result].errorCount) {
								response.results.splice(result,1);
							} else {
								for(message=response.results[result].messages.length-1; message !== -1; --message) {
									if(response.results[result].messages[message].severity !== 2) {
										response.results[result].messages.splice(message,1);
									}
								}
							}
						}
					}
					return response;
				},
				"envs": ["browser", "node", "jasmine"]
			},
			"lib": [
				"lib/**/*.js",
				"spec/**/*.js"
			]
		},
		"mkdir": {
			"build": {
				"options": {
					"create": ["build"]
				}
			}
		},
		"concat": {
			"appCSS": {
				"src": [
					"lib/**/*.css"
				],
				"dest": "app/gaze.css"
			},
			"cytoscape": {
				"options": {
					"process": function(src, file) {
						return src.replace(/sourceMappingURL=[a-zA-Z0-9\.-_]+/, "");
					}
				},
				"src": [
					"node_modules/cytoscape/dist/cytoscape.js",
					"node_modules/cytoscape-cola/cola.js",
					"node_modules/cytoscape-cola/cytoscape-cola.js",
				],
				"dest": "build/cytoscape.js"
			},
			"appJS": {
				"options": {
					"sourceMap": true,
					"footer": footer,
				},
				"src": [
//					"node_modules/angular/angular.js",
//					"node_modules/angular-mocks/angular-mocks.js",
					"node_modules/vue/dist/vue.js",
					"node_modules/jquery/dist/jquery.min.js",
					"node_modules/rx-lite/rx-lite.js",
					"node_modules/vue-rx/dist/vue-rx.js",

					"build/cytoscape.js",
					"lib/gaze.js",
					"lib/common/*.js",
					
					"build/templates-angular.js",
					"lib/scripts-angular/**/*configuration.js",
					"lib/scripts-angular/**/*module.js",
					"lib/scripts-angular/**/*provider.js",
					"lib/scripts-angular/**/*filter.js",
					"lib/scripts-angular/**/*factory.js",
					"lib/scripts-angular/**/*directive.js",
					"lib/scripts-angular/**/*controller.js",
					"lib/scripts-angular/**/*service.js",
					
					"build/templates-vue.js",
					"lib/scripts-vue/*-subsystem/**/*.js",
					"lib/scripts-vue/subsystem-*/**/*.js",
					"lib/scripts-vue/*-system/**/*.js",
					"lib/scripts-vue/system-*/**/*.js",
					"lib/scripts-vue/*-component/**/*.js",
					"lib/scripts-vue/component-*/**/*.js",
					"lib/scripts-vue/*-view/**/*.js",
					"lib/scripts-vue/view-*/**/*.js",
					"lib/scripts-vue/index.js",
					"lib/scripts-vue/add-*.js"
				],
				"dest": "app/gaze.js"
			},
			"css": {
				"src": [
					"lib/**/*.css"
				],
				"dest": "dist/gaze.css"
			}
		},
		"connect": {
			"server": {
				"options": {
					"port": 3080,
					"base": "app/",
					"hostname": "*",
					"livereload": 3081,
					"middleware": function(connect, options, middlewares) {
						middlewares.unshift(function(req, res, next) {
							res.setHeader("Access-Control-Allow-Origin", "*");
							res.setHeader("Content-Security-Policy",
									"default-src " +
									"'self' " +
									"ws://127.0.0.1:3081/livereload " +
									"ws://192.168.13.40:3081 " +
									"ws://192.168.13.40:3081/livereload " +
									"ws://localhost:3081  " +
									"http://127.0.0.1:3081 " +
									"http://localhost:3081 " +
									"http://192.168.13.40:3081 " +
									"ws://192.168.13.40:3000 " +
									"ws://192.168.13.40:3000/connect " +
									"ws://192.168.13.40:3443 " +
									"ws://192.168.13.40:3443/connect " +
									"ws://localhost:3000 " +
									"ws://localhost:3000/connect " +
									"wss://localhost:3443 " +
									"wss://localhost:3443/connect " +
									"wss://tower.refugesystems.net:3443 " +
									"ws://beta.refugesystems.net:3000 " +
									"wss://beta.refugesystems.net:3443 " +
									"http://d3js.org " +
									"'unsafe-inline' " +
									"'unsafe-eval'; " +
									"media-src " +
									"'self' " +
									"http://localhost:3081 " +
									"blob: " +
									"data:; " +
									"script-src " +
									"'self' " +
									"http://127.0.0.1:3081 " +
									"http://localhost:3081 " +
									"http://192.168.13.40:3081 " +
									"http://192.168.13.40:3081/livereload " +
									"http://192.168.13.40:3081/livereload.js " +
									"'unsafe-inline' " +
									"'unsafe-eval' " +
									"blob: " +
									"data: " +
							";");
							next();
						});
						return middlewares;
					}
				}
			},
			"docs": {
				"options": {
					"port": 3090,
					"base": "docs/",
					"hostname": "localhost"
				}
			}
		},
		"open": {
			"app": {
				"path": "http://127.0.0.1:3080/"
			},
			"docs": {
				"path": "http://127.0.0.1:3090/"
			},
			"karma": {
				"path": "http://127.0.0.1:5060/"
			}
		},
		"watch": {
			"app": {
				"options": {
					"livereload": {
						"host": "0.0.0.0",
						"port": 3081
					},
					"livereloadOnError": false
				},
				"files": ["lib/**/*.js", "lib/**/*.js", "lib/**/*.css", "lib/**/*.html", "app/index.html"],
				"tasks": ["dev"]
			},
			"beta": {
				"options": {
					"livereload": {
						"host": "0.0.0.0",
						"port": 3081
					},
					"livereloadOnError": false
				},
				"files": ["lib/**/*.js", "lib/**/*.js", "lib/**/*.css", "lib/**/*.html"],
				"tasks": ["beta"]
			},
			"docs": {
				"files": ["lib/**/*.js", "lib/**/*.js", "lib/**/*.css", "lib/**/*.html"],
				"tasks": ["yuidoc"]
			}
		},
		"uglify": {
			"app": {
				"options": {
					"sourceMap": true,
					"sourceMapName": "./app/gaze.min.js.map",
					"footer": footer,
				},
				"files": {
					"./app/gaze.min.js": [
						"node_modules/angular/angular.js",
						"node_modules/angular-mocks/angular-mocks.js",
						"node_modules/vue/dist/vue.min.js",
						"node_modules/jquery/dist/jquery.min.js",
						"node_modules/rx-lite/rx-lite.js",
						"node_modules/vue-rx/dist/vue-rx.js",

						"node_modules/cytoscape/dist/cytoscape.js",
						"node_modules/cytoscape-cola/cola.js",
						"node_modules/cytoscape-cola/cytoscape-cola.js",

						"lib/gaze.js",
						"lib/common/*.js",
						
						"build/templates-angular.js",
						"lib/scripts-angular/**/*configuration.js",
						"lib/scripts-angular/**/*module.js",
						"lib/scripts-angular/**/*provider.js",
						"lib/scripts-angular/**/*filter.js",
						"lib/scripts-angular/**/*factory.js",
						"lib/scripts-angular/**/*directive.js",
						"lib/scripts-angular/**/*controller.js",
						"lib/scripts-angular/**/*service.js",
						"lib/scripts-angular/index.js",
						
						"build/templates-vue.js",
						"lib/scripts-vue/*-subsystem/**/*.js",
						"lib/scripts-vue/subsystem-*/**/*.js",
						"lib/scripts-vue/*-system/**/*.js",
						"lib/scripts-vue/system-*/**/*.js",
						"lib/scripts-vue/*-component/**/*.js",
						"lib/scripts-vue/component-*/**/*.js",
						"lib/scripts-vue/*-view/**/*.js",
						"lib/scripts-vue/view-*/**/*.js",
						"lib/scripts-vue/add-*.js",
						"lib/scripts-vue/index.js"
					]
				}
			},
			"angular": {
				"options": {
					"sourceMap": true,
					"sourceMapName": "./dist/gaze-angular.min.js.map"
				},
				"files": {
					"./dist/gaze-angular.min.js": [
						"lib/gaze.js",
						"lib/common/*.js",
						"lib/scripts-angular/**/*configuration.js",
						"lib/scripts-angular/**/*module.js",
						"lib/scripts-angular/**/*provider.js",
						"lib/scripts-angular/**/*filter.js",
						"lib/scripts-angular/**/*factory.js",
						"lib/scripts-angular/**/*directive.js",
						"lib/scripts-angular/**/*controller.js",
						"lib/scripts-angular/**/*service.js"
					]
				}
			},
			"vue": {
				"options": {
					"sourceMap": true,
					"sourceMapName": "./dist/gaze-vue.min.js.map",
					"banner": "LCARS = {}; LCARS.install = function(Vue, options) {",
					"footer": "\r\n};"
				},
				"files": {
					"./dist/gaze-vue.min.js": [
						"lib/gaze.js",
						"lib/common/*.js",
						"build/templates-vue.js",
						"lib/scripts-vue/*-subsystem/**/*.js",
						"lib/scripts-vue/subsystem-*/**/*.js",
						"lib/scripts-vue/*-system/**/*.js",
						"lib/scripts-vue/system-*/**/*.js",
						"lib/scripts-vue/*-component/**/*.js",
						"lib/scripts-vue/component-*/**/*.js",
						"lib/scripts-vue/*-view/**/*.js",
						"lib/scripts-vue/view-*/**/*.js",
						"lib/scripts-vue/index.js",
						"lib/scripts-vue/add-*.js"
					]
				}
			}
		},
		"karma": {
			"options": {
				"frameworks": ["jasmine"],
				"singleRun": true,
				"junitReporter": {
					"outputDir": "./reports/jasmine",
					"outputFile": undefined,
					"suite": "",
					"useBrowserName": true,
					"nameFormatter": undefined,
					"classNameFormatter": undefined,
					"properties": {}
				},
				"files": [
					"node_modules/angular/angular.js",
					"node_modules/angular-mocks/angular-mocks.js",
					"node_modules/vue/dist/vue.min.js",
					"node_modules/jquery/dist/jquery.min.js",

					"node_modules/cytoscape/dist/cytoscape.js",
					"node_modules/cytoscape-cola/cola.js",
					"node_modules/cytoscape-cola/cytoscape-cola.js",

					"lib/gaze.js",
					"lib/common/*.js",
					"spec/support/*.js",
					"spec/data/*.js",
					
					"build/templates-angular.js",
					"lib/scripts-angular/**/*module.js",
					"lib/scripts-angular/**/*configuration.js",
					"lib/scripts-angular/**/*provider.js",
					"lib/scripts-angular/**/*filter.js",
					"lib/scripts-angular/**/*factory.js",
					"lib/scripts-angular/**/*directive.js",
					"lib/scripts-angular/**/*controller.js",
					"lib/scripts-angular/**/*service.js",

					"build/templates-vue.js",
					"lib/scripts-vue/*-subsystem/**/*.js",
					"lib/scripts-vue/subsystem-*/**/*.js",
					"lib/scripts-vue/*-system/**/*.js",
					"lib/scripts-vue/system-*/**/*.js",
					"lib/scripts-vue/*-component/**/*.js",
					"lib/scripts-vue/component-*/**/*.js",
					"lib/scripts-vue/*-view/**/*.js",
					"lib/scripts-vue/view-*/**/*.js",
					"lib/scripts-vue/index.js",
					"lib/scripts-vue/add-*.js",
					"spec/*-spec.js"
				]
			},
			"continuous": {
				"singleRun": false,
				"reporters": ["junit", "live-html"],
				"browsers": ["PhantomJS", "Chrome"],
				"htmlLiveReporter": {
					"colorScheme": "jasmine",
					"defaultTab": "summary",
					"focusMode": true,
				}
			},
			"deployment": {
				"reporters": ["junit"],
				"browsers": ["PhantomJS"],
				"singleRun": true,
				"htmlReporter": null,
				"htmlLiveReporter": null
			}
		},
		"templify": {
			"options": {
				"autoAffix": true,
			},
			"angular": {
				"templates": [{
					"path": "lib/scripts-angular/**/*.html",
					"rewrite": function(name) {
						return name.replace(/.*lib[\/\\]scripts-angular[\/\\]/, "");
					}
				}],
				"suffixes": [".html"],
				"mode": "angular",
				"output": "build/templates-angular.js"
			},
			"vue": {
				"templates": [{
					"path": "lib/scripts-vue/**/*.html",
					"rewrite": function(name) {
						return name.replace(/.*lib[\/\\]scripts-vue[\/\\]/, "");
					}
				}],
				"suffixes": [".html"],
				"mode": "vue",
				"output": "./build/templates-vue.js"
			}
		},
		"yuidoc": {
			"compile": {
				"name": "<%= pkg.name %>",
				"description": "<%= pkg.description %>",
				"version": "<%= pkg.version %>",
				"url": "<%= pkg.homepage %>",
				"options": {
					"paths": ["./lib/"],
					"outdir": "./docs",
					"markdown": true
				}
			}
		},
		"concurrent": {
			"development": {
				"tasks": [
					["document"],
					["testing"],
					["general"]
				],
				"options": {
					"logConcurrentOutput": true
				}
			}
		}
	};

	grunt.initConfig(config);
	grunt.registerTask("jasmine", function() {
		var done = this.async();
		var Jasmine = require("jasmine");
		var jasmine = new Jasmine();

		var Reporter = require("jasmine-console-reporter");
		var reporter = new Reporter({
			colors:2,
			verbosity: 3,
			emoji: false
		});

		jasmine.configureDefaultReporter(false);
		jasmine.onComplete(done);
		jasmine.loadConfig({
			"spec_dir": "spec",
			"spec_files": ["**/*-spec.js"],
			"random": false,
			"helpers": [
				"**/data/*.js",
				"**/support/*.js"
				]
		});


		jasmine.addReporter(reporter);

		jasmine.execute();
	});

	grunt.registerTask("default", ["mkdir:build", "lint", "concurrent:development"]);

	grunt.registerTask("lint", ["eslint:lib"]);
	grunt.registerTask("dev", ["eslint:lib", "templify:vue", "templify:angular", "concat:cytoscape", "concat:appCSS", "concat:appJS"]);
	grunt.registerTask("beta", ["eslint:lib", "templify:vue", "templify:angular", "concat:cytoscape","concat:appCSS", "uglify:app"]);

	grunt.registerTask("document", ["yuidoc", "connect:docs", "open:docs", "watch:docs"]);
	grunt.registerTask("testing", ["templify:vue", "templify:angular", "open:karma", "karma:continuous"]);
	grunt.registerTask("general", ["dev", "connect:server", "open:app", "watch:app"]);

	grunt.registerTask("beta-test", ["beta", "connect:server", "open:app", "watch:beta"]);
	grunt.registerTask("test", ["eslint:client", "templify:testing", "karma:deployment"]);
	
	grunt.registerTask("distribute", ["mkdir:build", "templify:vue", "uglify:angular", "uglify:vue", "concat:css"]);
};
