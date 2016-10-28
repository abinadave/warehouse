define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone, ProductModule) {
   
    var Product = Backbone.Model.extend({
		initialize: function(){
			var self = this;
			this.on('change', function(){			
                this.afterChanged();
                
                console.log(this.changedAttributes())

                if (this.hasChanged('running_bal')) {
                	require(['modules/product_module'], function(pm){
                	    pm.checkReorderPoint();
                	});
                }

                if (this.hasChanged('id')) {
                	console.log('changed in iD')
                	require(['views/product/view_list_of_products',], function(SubviewProdList){
                        var list = self.getConvertedIdList(products.toJSON());
                        var view = new SubviewProdList({
                            collection: new Backbone.Collection(list)
                        });
                        view.render();
                   });
                }

            });
		},

		defaults: {
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

        getConvertedIdList(list){
            _.each(list, function(model){
                model.id = Number(model.id);
            });
            return _.sortBy(list, 'id','desc').reverse();
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