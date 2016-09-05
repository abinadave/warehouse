define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_modal_input_qty_cart.html'
	],  function(_, Backbone, template) {
   
    var ViewModalInputQtyCart = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-input-qty-cart',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #btnSaveCart': 'saveCart'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#form-input-qty-cart').find('input').css({
                    	width: '300px'
                    });

                    self.$el.find('#qty').keyup(function(event) {
                        var value = $(this).val(), id = $('#hidden-id').val(), total = 0;
                        var pm = require('modules/product_module');
                        var prod = pm.getProd(id);

                        if (value != '') {
                            if (typeof prod === 'object') {
                                total = parseInt(prod.get('running_bal')) + parseInt(value);
                                self.$el.find('#running_bal').text(total);
                            }   
                        }else {
                            self.$el.find('#running_bal').text(prod.get('running_bal'));
                            if (typeof prod === 'object') {
                                total = parseInt(prod.get('running_bal')) + 0;
                            }
                        }

                    });
                });
        	},

        	saveCart: function(event){
                event.preventDefault();
                require(['modules/cart_module'], function(CartModule){
                
            		event.preventDefault();
            		var $form = $('#form-input-qty-cart');
            		var data = {};

            		data.id = $form.find('#hidden-id').val();
            		data.qty = $form.find('#qty').val();
            		data.remarks = $form.find('#remarks').val();


                    //validation...
                    var error = 0;
                    if(!CartModule.isInt(data.qty) || data.qty == ''){
                        error++;
                    }

                    if (error == 0) {
                        var result = carts.where({id: data.id});

                        if (result.length) {
                            CartModule.updateModel(data);
                        }else {

                            var result = products.where({id: data.id});
                            if (result.length) {
                                 var cart = products.get(data.id);
                                 var bal = parseInt(cart.get('running_bal'));

                                 //verify running balance..
                                 CartModule.saveModel(data, bal);
                            }else {
                                console.log('cant find that product');
                            }
                            

                        }
                    }else {
                        //if no errors..
                        router.alertify_error('Incorrect inputs');
                    }

        		});
        		
        	}
    
    });
   
    return ViewModalInputQtyCart; 
});