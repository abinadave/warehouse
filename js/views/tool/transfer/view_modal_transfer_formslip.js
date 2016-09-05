define(
	[
		'underscore',
		'backbone',
        'text!templates/tool/transfer/temp_modal_transfer_formslip.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/warehouse_module'], function(wm){          
                    self.$el.off();
                    self.$el.empty();
                    var output = self.template({
                        'from_warehouse': wm.getWarehouseLocation(sessionStorage.getItem('code'))
                    });
                    self.$el.append(output);
                    self.init();
                });
    	        return self;
        	},
    
        	init: function(){

                var self = this;
                
                $(function() {
                    require(['modules/account_module'], function(am){
                        am.checkSession();
                    });
                });

                $(function() {
                    self.$el.find('#to-warehouse-location').change(function(event) {
                        var code = $(this).val();
                        require(['modules/warehouse_module'], function(wm){
                            wm.initWarehouseManByCode('#recipient-name', code);
                            wm.initWarehouseManByCode('#noter-name', code);
                        });
                    });
                });

                $(function(){
                    self.$el.find('#modalTransferFormSlip').modal();
                    var bfm = require('modules/borrowerform_module');
                    bfm.transfer = true;
                });

                $(function() {
                    self.$el.find('input').addClass('form-control');
                    self.$el.find('input').css({
                        height: '33px',
                        width: '280px'
                    });
                });

                $(function() {
                    self.$el.find('#form-submit-transferslip').submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        var form = $(this).serialize();
                      
                        require(['modules/transferform_module','modules/warehouse_module','moment'], function(TFM, WM, moment){
                            var to_warehouse_id = $('#to-warehouse-location').val();
                            form += '&time=' + router.getCurrectHour() + '&date=' + moment().format("YYYY-MM-DD HH:mm:ss") + '&table=' + 'transfer_forms';
                            form += '&to_warehouse_id=' + to_warehouse_id + '&status=0';
                            form += '&to_warehouse=' + WM.getWarehouseLocation(to_warehouse_id);
                            TFM.saveDB(form);
                        });

                    });
                });

                $(function() {
                    setTimeout(function() {
                       var TM  = require('modules/tool_module');
                       var WM  = require('modules/warehouse_module');                  
                       WM.appendListOfLocationsInModal();
                       TM.appendListOfTransfers();
                    }, 200);
                });
        	}
    
    });
   
    return Subview; 
});