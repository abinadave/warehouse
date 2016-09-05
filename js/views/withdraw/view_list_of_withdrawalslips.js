define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_list_of_withdrawalslips.html',
		'moment'
	],  function(_, Backbone, template, momentJS) {
   
    var ViewListOfWithdrawalSlips = Backbone.View.extend({
    
        	initialize: function(){

        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-withdrawalslips',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/warehousemen_module','modules/withdrawform_module','libs/backbone.obscura'], 
                    function(WMM, WFM, Obscura){
                        self.$el.empty();
                        var lists = WFM.sort(Obscura, self.collection);
                        var output = self.template({'library': lists.toJSON(), 'moment': momentJS, 'WarehousemenModule': WMM});
                        self.$el.append(output);
                        WFM.formInit(self, self.collection.length);
                });
    	        return self;
        	}
    });
   
    return ViewListOfWithdrawalSlips; 
});