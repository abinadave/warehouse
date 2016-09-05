define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_transfer_slip_form.html'
	],  function(_, Backbone, template) {
   
    var ViewTransferSlipForm = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-transfer-slip-form',
    
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
        		var $form = $('#form-save-transer-slip');
                $(function(){
                    //jQuery
                    $form.find('input').addClass('form-control');
                    require(['modules/warehouse_module'], function(WarehouseModule){
                        WarehouseModule.appendListOfLocationsInModal();
                        setTimeout(function() {
                            $('select').find('#code-'+ sessionStorage.getItem('code')).prop('disabled', true);
                        }, 1000)
                    });
                });

                $(function() {
                    $form.find('#to-warehouse-location').change(function(event) {
                        /* Act on the event */
                        var loc = $(this).val();
                        var found = warehouses.get(loc);
                        $form.find('#to-warehouse').val(found.get('location'));
                    });
                });

                $(function() {
                    $form.find('input').css({
                        width: '220px',
                        height: '33px'
                    });
                    setTimeout(function() {
                        require(['modules/extract_module','modules/warehouse_module','modules/functions'], function(ExtractModule, WM, fn){
                            WM.initAutocomplete('#to-warehouse').initSystemUsersAutocomplete('#sender-name');
                            WM.initSystemUsersAutocomplete('#recipient-name');
                            WM.initSystemUsersAutocomplete('#noter-name');
                            fn.initUsertypes('#recipient-position');
                            fn.initUsertypes('#noter-position');
                        });
                    }, 100)
                }); 
        	}
    
    });
   
    return ViewTransferSlipForm; 
});