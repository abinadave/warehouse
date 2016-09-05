define(
	[
		'underscore',
		'backbone',
		'text!templates/category/temp_list_of_categories_display_by_category.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfCategoriesDisplayByCategory = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#products-display-by-category',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(rids){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    
                    //jQuery
                    require(['modules/product_module'], function(module){
                         module.initJQueryClick();
                    });
                   

                });

                $(function() {
                   require(['libs/choosenJS/chosen.jquery.min'], function(){
                        $('#products-display-by-category').chosen();
                   })
                });
        	}
    
    });
   
    return ViewListOfCategoriesDisplayByCategory; 
});