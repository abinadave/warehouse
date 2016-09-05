define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_list_of_pullouts.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfPullouts = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-pullouts',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['modules/product_module'], function(product_module){
        	        self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(),'ProductModule': product_module});
	                self.$el.append(output);
	                self.init();
        	    });
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return ViewListOfPullouts; 
});