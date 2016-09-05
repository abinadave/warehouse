define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_list_of_withdrawalslips.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-withdrawalslips',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['modules/warehousemen_module','modules/withdrawform_module','moment'], function(WMM, WFM, moment){
	                self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(), 'moment': moment, 'WarehousemenModule': WMM});
	                self.$el.append(output);
	                WFM.formInit(self, self.collection.length);
                });
    	        return self;
        	}
    
    });
   
    return Subview; 
});