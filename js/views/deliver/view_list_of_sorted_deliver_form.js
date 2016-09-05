define(
	[
		'underscore',
		'backbone',
		'text!templates/deliver/temp_list_of_deliver_form.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-deliverforms',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['modules/warehousemen_module','modules/warehouse_module','moment','modules/deliverform_module'], 
                    function(WMM, WM, moment, DFM){
	                self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(), 'WarehousemenModule': WMM, 'WarehouseModule': WM, 'moment': moment, 'dfm': DFM});
	                self.$el.append(output);
	                DFM.formInit(self, self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return Subview; 
});