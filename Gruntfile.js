module.exports = function (grunt) {
require("load-grunt-tasks")(grunt);

  	grunt.initConfig({  
  		less: {
  			development: {    		
    			files: {
      				"build/css/style.css" : "less/style.less"
    			}
  			}
		},

		postcss: {
      		options: {
        		processors: [
          			require("autoprefixer")({browsers:
      			[
          			"last 1 version",
			        "last 2 Chrome versions",
			        "last 2 Firefox versions",
			        "last 2 Opera versions",
			        "last 2 Edge versions",
			        "ie 11"
          			]}),
          			require("css-mqpacker")({
			     		sort: true
		  				})
        			]
      			},
      		style: {src: "build/css/*.css"}
    	},

    	csso: {
    		style: {
    			options: {
    				report: "gzip"
    			},
    			files: {
    				"build/css/style.min.css": ["build/css/style.css"]
    			}
    		}
    	},

    	imagemin: {
      		build: {
        		options: {
          			optimizationLevel: 3
        		},        		
        		files: [{
          			expand: true,
          			src: ["build/img/**/*.{png,jpg,gif}"]          
        		}]        	
      		}
    	},

    	/*sprite:{
      		all: {
        		src: 'img/png/*.png',
        		dest: 'build/img/png-sprite.png',
        		destCss: 'build/img/png-sprite.css'
      		}
    	},*/

    	svgstore: {
    		options: {
    			svg: {
    				style: "display: none"
    			}
    		},
    		symbols: {
    			files: {
    				"build/img/svg-sprite.svg": ["img/**/*.svg"]
    			}
    		}
    	},

    	svgmin: {
    		symbols: {
    			files: [{
    				expand: true,
    				src: ["build/img/**/*.svg"]
    			}]
    		}
    	},


        uglify: {
      		start: {      			
        		files: {
          			"build/js/main.min.js": ["js/main.js"]
        		}        		
      		}
    	},


    	copy: {
    		build: {
    			files: [{
    				expand: true,
    				src: [
    				 "fonts/**/*.{woff,woff2}",
					   "img/**",
					   "js/**",
					   "*.html"
					],
					dest: "build"
				}]
			}		
		},


		clean: {
  			build: {
    			src: ['build']
  			}
		},


		jshint: {
    		all: ["Gruntfile.js", "js/main.js"]    		
  		},

  		watch: {
  			options: {
      			livereload: true,
    		},     
      		html: {
				files: ["*.html"],
				tasks: ["copy"]
	   		},
      		style: {
      			files: ["less/**/*.less"],
      			tasks: ["less", "postcss", "csso"]
      		},
      		scripts: {
        		files: ["js/*.js"],
        		tasks: ["js"]       
      		},
     		images: {
        		files: ["img/**/*.{png,jpg,svg,gif}"],
        	  	tasks: ["img"]        
      		}    
  		},

  		browserSync: {
      		default_options: {
        		bsFiles: {
          			src: [
	            		"build/css/*.css",
	            		"build/*.html",
	            		"build/js/*.js",
	            		"build/img/**/*.{png,jpg,svg,gif}"         
          			]
        		},        
        		options: {
          			server: {
            			baseDir: "./build"
          			},
          			watchTask: true
        			}
      			}
    		}
  		});


grunt.registerTask("symbols", [
	"svgmin",
	"svgstore"
]);

grunt.registerTask("js", [
    "jshint",
    "uglify"
]);

grunt.registerTask("img", [    
    "imagemin",
    //"sprite",
    "svgmin",
    "svgstore"
]); 

grunt.registerTask("default", [
    "browserSync", 
    "watch"
]);

grunt.registerTask ("build", [
  	"clean",
  	"copy",  		
  	"less",
  	"postcss",
  	"csso",  	
  	"svgmin",
    "svgstore",
  	"imagemin",
  	//"sprite",
  	"jshint",
  	"uglify"      	
	]);
};