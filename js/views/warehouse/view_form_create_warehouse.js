define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_form_create_warehouse.html'
	],  function(_, Backbone, template) {
   
    var ViewFormCreateWarehouse = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-form-create-warehouse-branch',
    
        	template: _.template(template),
    
            events: {
                // bound events'
               
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self =  this;
                $(function(){
                    //jQuery
                    self.$el.find('#form-create-warehouse-branch').submit(function(event) {
                        event.preventDefault();
                        var form = $('#form-create-warehouse-branch').serialize();
                        if (sessionStorage.getItem('usertype') == 3) {
                            router.alertify_error('Access denied');
                        }else {
                            require(['modules/warehouse_module'], function(WarehouseModule){
                                WarehouseModule.saveDB(form);
                            });
                        }
                    });
                });

                $(function() {
                    self.$el.find('#code').keyup(function(event) {
                       var value = event.currentTarget.value, $btn = $('#btnSaveWHB');
                        if (warehouses.length) {
                            var rs = warehouses.where({id: value});
                            if (rs.length) {
                                $btn.prop('disabled', true).removeClass('btn-outline');
                                router.alertify_error('Warehouse Code Already Exist');
                            }else {
                                $btn.prop('disabled', false).addClass('btn-outline');
                            }
                        }

                        if (!$.isNumeric(value)) {  
                             $btn.prop('disabled', true);
                             router.alertify_error('Warehouse code should be integer');
                        }else {
                             $btn.prop('disabled', false);
                        }
                        
                    });
                });
        	}
    
    });
   
    return ViewFormCreateWarehouse; 
});