define(
	[
		'underscore',
		'backbone',
		'text!templates/deliver/temp_modal_delivery_form.html',
        'moment'
	],  function(_, Backbone, template, moment) {
   
    var ViewModalDeliveryForm = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-delivery-form',
    
        	template: _.template(template),
    
            events: {
                // bound events
              
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
                var self = this;

                $(function(){
                    //jQuery
                    $('#form-deliver-receipt').find('label').css({
                        margin: '10px'
                    });

                    $('#form-deliver-receipt').find('input').css('height', '33px');
                });

                $(function() {
                    self.$el.find('#to-location').change(function(event) {
                        var value = $(this).val();
                        var warehouse = warehouses.get(value);
                        $('#hidden-to-location').val(warehouse.get('location'));
                        require(['modules/warehouse_module'], function(wm){
                            wm.initWarehouseManByCode('#to-person', value);
                        });
                    });
                });

                $(function() {
                    self.$el.find('#form-deliver-receipt').submit(function(event) {
                        event.preventDefault();
                        var form = $('#form-deliver-receipt').serialize();
                        var momentDate = moment(event.timeStamp);
                        var now = moment().format("YYYY-MM-DD HH:mm:ss");
                        form += '&date=' + now;
                        form += '&time=' + router.getCurrectHour();
                        var tli = $('#to-location').val();
                        if ($.isNumeric(tli)) {
                            require(['modules/deliverform_module'], function(DeliverFormModule){
                                DeliverFormModule.saveDB(form);
                                DeliverFormModule.isDelivered = true;
                            });
                        }else {
                            router.alertify_error("Location is not defined");
                        }
                        
                    });
                });
        	}
    
    });
   
    return ViewModalDeliveryForm; 
});