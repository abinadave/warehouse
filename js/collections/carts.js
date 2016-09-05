define(
	[
		'underscore',
		'backbone',
		'models/cart',
        'modules/cart_module',

        //views...
        'views/receiving_report/view_modal_input_qty_cart',
        'views/receiving_report/view_modal_list_of_all_carts',
        'views/receiving_report/view_list_of_selected_carts'
	],  function(

        _, 
        Backbone, 
        Cart,
        CartModule,

        //views...
        ViewModalInputQtyCart,
        ViewModalListOfAllCarts,
        ViewListOfSelectedCarts

        ){
   
    var Carts = Backbone.Collection.extend({

    	model: Cart,

    	initialize: function(){
    		//console.log('Collection Carts initialized');
    		this.on('add', function(model){
                CartModule.afterSaving(model.get('id'));
    		});

    		this.on('remove', function(model){
    			console.log('cart successfully removed');
                CartModule.appendListOfSelectedCarts();
                var id = model.get('id');
                require(['modules/product_module'], function(pm){
                    pm.afterRemoveCart(id);
                });
    		});
            this.on('reset', function(model){
                $('#badge-receiving').hide().text(carts.length).fadeIn(700);
            });
    	},

        print: function(){
            carts.forEach(function(model) {
                console.log(model.attributes); 
            });
        }


    });
   
    return Carts; 
});
