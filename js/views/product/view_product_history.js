define(
	[
		'underscore',
		'backbone',
		'text!templates/product/temp_product_history.html'
	],  function(_, Backbone, template) {
   
    var ViewProductHistory = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                  
                });
        	}
    
    });
   
    return ViewProductHistory; 
});