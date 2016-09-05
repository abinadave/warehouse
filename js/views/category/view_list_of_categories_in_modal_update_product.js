define(
	[
		'underscore',
		'backbone',
		'text!templates/category/temp_list_of_categories_in_modal_update_product.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfCategoriesInModalUpdateProduct = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#prod-category-update',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['libs/backbone.obscura'], function(Obscura){
                    var list = categories.sort(self.collection, Obscura);
                    self.$el.empty();
                    var output = self.template({'library': list.toJSON()});
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
   
    return ViewListOfCategoriesInModalUpdateProduct; 
});