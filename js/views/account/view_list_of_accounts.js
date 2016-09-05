define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_list_of_accounts.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfAccounts = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-accounts',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
                var self = this;
                    require(['modules/account_module'], function(module){ 
                        self.$el.empty();
                        var output = self.template({'library': self.collection.toJSON(), 'AccountModule': module});
                        self.$el.append(output);
                        self.init();
                    });
                   
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    require(['libs/load_css/loadcss','DT-bootstrap','datatable'
                        ], function(css, dt1, dt2){
                        loadCSS('sb-admin2/css/plugins/dataTables.bootstrap.css');
                        $('#table-accounts').dataTable();
                    });
                });
        	}
    
    });
   
    return ViewListOfAccounts; 
});