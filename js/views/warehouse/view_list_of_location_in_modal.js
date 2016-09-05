define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_list_of_location_in_modal.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfLocationInModal = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'select',
    
        	el: '#warehousemen-location, #code-edit-warehousemen, #to-warehouse-location, #to-location',
    
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
                $(function(){
                   
                });
        	}
    
    });
   
    return ViewListOfLocationInModal; 
});