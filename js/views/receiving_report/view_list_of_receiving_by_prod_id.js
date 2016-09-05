define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_list_of_receiving_by_prod_id.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfReceivingByProdId = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-receiving-history-by-id',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var $table = $('#table-history-receiving');
                $(function(){
                    //jQuery
                    require(['datatable'], function(){
                        $table.dataTable();
                    });
                }); 	   
            }
    });


   
    return ViewListOfReceivingByProdId; 
});