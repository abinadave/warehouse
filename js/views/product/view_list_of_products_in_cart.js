define(
	[
		'underscore',
		'backbone',
		'text!templates/product/temp_list_of_products_in_cart.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfProductsInCart = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-products-cart',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/cart_module'], function(CartModule){
                    self.$el.empty();
                    var output = self.template({
                        'library': self.collection.toJSON(),
                        'module': CartModule
                    });
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
   
    return ViewListOfProductsInCart; 
});