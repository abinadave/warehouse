define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_list_of_transfer_items.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfTransferItems = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-transfer-items',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    console.log(111)
                });
        	}
    
    });
   
    return ViewListOfTransferItems; 
});