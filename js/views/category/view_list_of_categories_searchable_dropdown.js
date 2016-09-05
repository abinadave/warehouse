define(
	[
		'underscore',
		'backbone',
		'text!templates/category/temp_list_of_categories_searchable_dropdown.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfCategoriesSearchableDropdown = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#output-product-search-category',
    
        	template: _.template(template),
    
            events: {
                // bound events

            },
    
        	render: function(rid){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'ids': rid});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    $('#output-product-search-category').css({
                    	width: 'auto'
                    });

                });

                $(function() {
                    require(['product_module'], function(module){

                        var $target = $('#output-product-search-category');

                        $target.css({
                            cursor: 'pointer'
                        });

                        $target.find('li').hover(function() {
                            $(this).addClass('active');
                        }, function() {
                            $(this).removeClass('active');
                        });


                        $target.find('li').click(function(event) {
                            if (this.id != 0) {
                                $('#selected-category-prodcut').val(this.id)
                                var ids = module.searchAndReturnIdsWithCategoryOf(this.id);
                                if (ids.length) {
                                    module.appendListOfProductsById(ids);
                                }else {
                                    module.appendNoResultWasFound('#list-of-products', 'No result was found for: <span class="text-primary" style="font-weight: bold"> '+ categories.getName(this.id) +' </span>');
                                }
                                
                                $('#output-product-search-category').empty();
                            }else {
                                $('#selected-category-prodcut').val('');
                                module.appendAllProducts();
                                $('#output-product-search-category').empty();
                            }
                        });

                    });
                });

        	}
    
    });
   
    return ViewListOfCategoriesSearchableDropdown; 
});