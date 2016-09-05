define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_form_receiving_report.html'
	],  function(_, Backbone, template) {
   
    var ViewFormReceivingReport = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #btnViewAllCarts': 'viewAllCarts'
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
                $(function(){
                    //jQuery
                    $('#form-receiving-report').find('label').css({
                        marginTop: '10px'
                    });
                });
        	},

            viewAllCarts: function(event){
                require(['modules/cart_module','modules/receiveform_module'], function(CartModule, ReceiveFormModule){
                     if (carts.length) {
                        $('#modalListOfAllCarts').modal('show');
                        CartModule.appendListOfSelectedCarts();
                        
                        ReceiveFormModule.generateCrm();

                    }else {
                        router.alertify_error('Nothing to display');
                    }
                });
                           
            }
    
    });
   
    return ViewFormReceivingReport; 
});