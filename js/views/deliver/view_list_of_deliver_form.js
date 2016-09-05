define(
	[
		'underscore',
		'backbone',
		'text!templates/deliver/temp_list_of_deliver_form.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfDeliverForm = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-deliverforms',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/warehousemen_module','modules/warehouse_module','moment','modules/deliverform_module','libs/backbone.obscura'], 
                    function(WMM, WM, momentJS, DFM, Obscura){
                    self.$el.empty();
                    var list = DFM.sortByDate(self.collection, Obscura);
                    var output = self.template({'library': list.toJSON(), 'WarehousemenModule': WMM, 'WarehouseModule': WM, 'moment': momentJS, 'dfm': DFM });
                    self.$el.append(output);
                    DFM.formInit(self, self.collection.length);
                });
    	        return self;
        	}
    
        	
    
    });
   
    return ViewListOfDeliverForm; 
});