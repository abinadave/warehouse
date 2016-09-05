define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_list_of_withdraw_by_prod_id.html',
		'moment'
	],  function(_, Backbone, template, momentJS) {
   
    var ViewListOfWithdrawById = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-withdraw-history-by-id',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'moment': momentJS });
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    require(['datatable'], function(dt){
                        $('#table-history-withdraw').dataTable();
                    });
                });
        	}
    
    });
   
    return ViewListOfWithdrawById; 
});