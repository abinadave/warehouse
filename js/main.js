// This set's up the module paths for underscore and backbone
require.config({
    waitSeconds : 25, 
    'paths': {
		"underscore": "libs/underscore-min", 
		"backbone": "libs/backbone-min",
		"domReady": "libs/requirejs/domReady",
		"moment": "libs/momentjs/moment.min",
		"chosen": "libs/choosenJS/chosen.jquery.min",
		"jqueryui": "libs/jquery-ui/jquery-ui.min",
		"datatable": "../sb-admin2/js/plugins/dataTables/jquery.dataTables",
		"DT-bootstrap": "../sb-admin2/js/plugins/dataTables/dataTables.bootstrap",
		"css": "libs/require-css/css",
		"printarea": "libs/print-area/demo/jquery.PrintArea",
		"jquery": "libs/jquery-3.1.0.min"
	},
	
	'shim': 
	{	

		"jquery": {
			"exports": "$"
		},
		
		"backbone": {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		},

		"datatable": {
			"deps": ['jquery']
		},

		"DT-bootstrap": {
            "deps": ['datatable']
        },

		"underscore": {
			'exports': '_'
		},

		"domeReady": {
			"exports": "domeReady"
		}

	},

	'map': {
        "*": {
            "css":  "libs/require-css/css"
        }
    }	

}); 

require(['domReady','underscore','backbone','app'], 
	function(domReady, _,  Backbone,  app){
		
	domReady(function(){
		app.init();
	});

});

