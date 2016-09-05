define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Cart = Backbone.Model.extend({

    	initialize: function(){
    		this.on('change', function(){

                var id = this.get('id');
                require(['modules/cart_module'], function(CartModule){
                    CartModule.afterSaving(id); 
                }); 

                if (this.hasChanged('qty')) {
                    this.afterChangeQty(this.attributes);
                    require(['modules/cart_module'], function(CartModule){
                        CartModule.appendListOfSelectedCarts();
                    });
                };

    		});
    	},

    	defaults: {
    		id: 0,
    		qty: 0,
    		remarks: 'no remarks',
            item: 0
    	},

        afterChangeQty: function(model){
           var prod = products.get(model.id);
           var total = 0;
           total = parseInt(prod.get('running_bal')) + parseInt(model.qty);
           prod.set({running_bal: total.toString()});
        }
    	
    });
   
    return Cart; 
});


