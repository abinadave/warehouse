define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_modal_list_of_all_carts.html'
	],  function(_, Backbone, template) {
   
    var ViewModalListOfAllCarts = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-list-of-all-carts',
    
        	template: _.template(template),
    
            events: {},
                
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

                $(function() {
                    self.$el.find('input[name="inlineRadioOptions"]').on('change', function(event){
                        let value = $(this).val();
                        self.$el.find('#dr-invoice-others').attr('placeholder', value);
                    });
                });

                $(function(){

                    if (carts.length) {
                        require(['modules/cart_module','modules/receiveform_module'], function(cart_module, rfm){
                            if (carts.isDelivered) {
                                
                                //the id of deliver_form..
                                //append to location input form..
                                var form = deliver_forms.get(self.delivered_id);
                                rfm.generateCrm();
                                self.$el.find('#location').val(form.get('from_location'));

                                require(['views/receiving_report/view_list_of_carts_deliver_items'], function(Subview){
                                    var view = new Subview({
                                        collection: carts
                                    });
                                });


                            }else {
                                cart_module.appendListOfSelectedCarts();
                            }
                        });
                    };
                    
                    self.$el.find('#form-receive-item').submit(function(event) {
                        event.preventDefault();
                        console.log(carts.isDelivered);
                        require(['modules/receiveform_module','modules/functions','moment'], 
                            function(module, fn, moment){
                                var form = $('#form-receive-item').serialize();
                                form +='&date='+ moment().format("YYYY-MM-DD HH:mm:ss");
                                let dr_invoice_ob = {
                                    value: self.$el.find('#dr-invoice-others').val(),
                                    type: self.getTypeOfDrNo()
                                };
                                console.log(dr_invoice_ob);
                                if (carts.isDelivered) {
                                    self.callbackSave(form);
                                }else {
                                    module.saveDB(form, dr_invoice_ob);
                                }
                            
                        });
                        
                    });

                     require(['libs/jquery-ui/jquery-ui.min'], function(){
                          $('#div-modalListOfAllCarts').draggable({cursor: 'move'});
                     });

                });

        	},

            getTypeOfDrNo(){
                let self = this;
                let value = $('input[name="inlineRadioOptions"]:checked').attr('id');
                if (Number(value) === 1) {
                    return 'dr';
                }else if(Number(value) === 2){
                    return 'invoice';
                }else {
                    return 'others';
                }
            },

            callbackSave: function(form){
                var self = this;
                var a = carts.length, b = 0;
                carts.forEach(function(model) {
              
                        //if not found create item..
                        var item = deliver_items.findWhere({delivered_id: carts.delivered_id, item: model.get('item')});

                        require(['modules/collection_module','modules/product_module'], function(colmod, product_module){
                            var obj = _.omit(item.attributes, 'delivered_id','item','qty','remarks','status','id');
                            var rs = products.where({name: item.get('name')});

                            obj.warehouse_code = sessionStorage.getItem('code');
                            obj.running_bal = item.get('qty'); obj.table = 'products';
                            
                            if (rs.length) {
                                var prod = products.findWhere({name: item.get('name')});
                                var total = parseInt(prod.get('running_bal')) + parseInt(item.get('qty'));
                                var obj = {
                                    values: {
                                        running_bal: total
                                    },
                                    where: 'id',
                                    where_value: prod.get('id'),
                                    table: 'products'
                                };
                                colmod.updateDB(obj, 'products', product_module);
                                products.obj = obj;
                            }else {
                                colmod.saveDB($.param(obj), 'products', product_module);
                            }

                            $.post('ajax/update/update_deliver_items.php', 
                                {
                                    status: 1, 
                                    delivered_id: carts.delivered_id, 
                                    item: item.get('item') 
                                }, 
                            function(data, textStatus, xhr) {
                                /*optional stuff to do after success */
                            }).success(function(data){

                                ++b;
                                
                                item.set({status: '1'});

                                if (a == b) {
                                    router.alertify_success('process completed');
                                    carts.reset();
                                    self.$el.find('form')[0].reset();
                                    $('#modalListOfAllCarts').modal('hide');
                                    require(['modules/deliveritem_module','views/deliver/view_list_of_incomming_items'], function(dim, Sublist){
                                        var items = dim.getItems(deliveredId);
                                        var view = new Sublist({
                                            collection: items
                                        });
                                    });
                                }

                            }).fail(function(xhr){
                                console.log('error type: '+xhr.status);
                            });

                        });
                   
                });
            },

            createStockCards: function(){
                setTimeout(function() {
                  $('#modalAddProduct').modal('show');
                 
                }, 400);
            }
    
    });
   
    return ViewModalListOfAllCarts; 
});