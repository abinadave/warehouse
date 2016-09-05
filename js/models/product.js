define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone, ProductModule) {
   
    var Product = Backbone.Model.extend({
		initialize: function(){
			this.on('change', function(){			
                this.afterChanged();
                
                console.log(this.changedAttributes())

                if (this.hasChanged('running_bal')) {
                	require(['modules/product_module'], function(pm){
                	    pm.checkReorderPoint();
                	});
                }

            });
		},

		defaults: {
			id: 0,
			category: 'no category',
			name: 'no name',
			area: 'no area',
			shelf: 'no shelf',
			row: 'no row',
			add_desc: 'no additional description',
			reorder_point: 'no reorder_point',
			running_bal: 0,
			unit: 'not unit'
		},


		afterChanged: function(){
			require(['modules/product_module'], function(module){
				module.appendAllProducts();
	            module.appendListOfProductsInCart();
			});
			
		}
	});
	
	return Product;
});