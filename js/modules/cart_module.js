define(
	[
		'underscore',
		'backbone',
		'models/cart',
        //views...
        'views/receiving_report/view_modal_input_qty_cart',
        'views/receiving_report/view_modal_list_of_all_carts',
        'views/receiving_report/view_list_of_selected_carts'
	],  function(
		_, 	
		Backbone, //views...
		Cart,
        ViewModalInputQtyCart,
        ViewModalListOfAllCarts,
        ViewListOfSelectedCarts
        ) {
   
    var CartModule = {

    		addToCart: function(pid){
                var $form = $('#form-input-qty-cart');
                $('#modalInputQtyCart').modal('show');
                require(['libs/jquery-ui/jquery-ui.min'], function(){
                    $('#div-modalInputQtyCart').draggable({cursor: 'move'});
                });

                setTimeout(function(){
                    $form.find('#qty').focus()
                }, 700);   

                var model = products.get(pid);
                $form.find('#item-name').text(model.get('name')).end()
                .find('#hidden-id').val(pid);
            },

            saveModel: function(model, bal){
                var cart = new Cart(model);
                carts.add(cart);
                CartModule.deductRunningBalance(model, bal);
                //router.alertify_success('Successfully Added');
            },

            deductRunningBalance: function(model, bal){
                var total = 0;
                total = parseInt(bal) + parseInt(model.qty);
                var product = products.get(model.id);
                product.set({running_bal: total.toString()});
            },

            removeModel: function(id){
                require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                 function(css, alertify){
                     loadCSS('js/libs/alertify/css/alertify.core.css');
                     loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                         alertify.confirm('Are you sure ?', function(e){
                             if (e) {

                                var modelCart = carts.get(id);
                                var modelProd = products.get(id);

                                var total = 0;

                                total = parseInt(modelProd.get('running_bal')) - parseInt(modelCart.get('qty'));
                                modelProd.set({running_bal: total});

                                carts.remove(id);

                             }else {
                                console.log(e);
                             }
                     });
                });
                
            },

            updateModel: function(model){

                var cart = products.get(model.id);
                  
                var bal = parseInt(cart.get('running_bal'));
                
                //verify running balance..
                console.log(1)
                if (bal < model.qty) {
                    router.alertify_error('Out of stock: remaining balance --> ' + bal);
                 }else {
                    var cart = carts.get(model.id);
                    var total = 0;
                    total = parseInt(model.qty) + parseInt(cart.get('qty'));
                    cart.set({
                        qty: total.toString(),
                        remarks: model.remarks
                    });

                    var product = products.get(model.id);

                    CartModule.deductRunningBalance(model, product.get('running_bal'));

                    router.alertify_success('Successfully updated')
                }

               
            },

            print: function(){
                carts.forEach(function(model) {
                    console.log(model.attributes); 
                });
            },

            afterSaving: function(id){
                $('#badge-receiving').hide().text(carts.length).fadeIn(700);
                $('#modalInputQtyCart').modal('hide');
                $('#form-input-qty-cart')[0].reset();
            },

            isInt: function(obj){
                var re = /^\d+$/;
                return re.test(obj);
            },

            isString: function(){
                return typeof (obj) == 'string';
            },

            appendModalInputQtyCart: function(){
                var view = new ViewModalInputQtyCart();
                view.render();
            },

            appendModalListOfAllCarts: function(){
                var view = new ViewModalListOfAllCarts();
                view.render();
            },

            appendListOfSelectedCarts: function(){
                var view = new ViewListOfSelectedCarts({
                    collection: carts
                });
                view.render();
            }
    }
   
    return CartModule; 
});