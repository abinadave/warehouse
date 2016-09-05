define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_form_add_account.html'
	],  function(_, Backbone, template) {
   
    var ViewFormAddAccount = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#form-create-account',
    
        	template: _.template(template),
    
            events: {
                // bound events',
                'change #usertype': 'usertypeChanged'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},

            usertypeChanged: function(event){
                var type = $('select#usertype').val(), isHidden = $('#btnUpdateAccount').is(':hidden');
                if (isHidden && type == 3) {
                    
                    require(
                        [
                            'modules/warehouse_module'
                        ], function(WarehouseModule){

                        WarehouseModule.appendModalChooseWarehouseMenBranchLocation();
                        WarehouseModule.fetchData();

                    });
                }
            },
    
        	init: function(){
                var $form = $('#form-add-account');
                $(function(){
                    //jQuery
                    $('#form-create-account').find('input, select').css({
                    	width: '300px',

                    });

                    $('#form-create-account').find('button').css({
                    	margin: '10px 0 10px 10px',
                    	width: '143px'

                    });

                    $('#form-create-account').find('label').css({
                    	margin: '10px'
                    });
                });

                $(function() {

                	$('#btnSaveAccount').click(function(event) {
                		/* Act on the event */
                		event.preventDefault();
                        if (sessionStorage.getItem('usertype') == 1) {
                            var form = $('#form-add-account').serialize();
                            require(['modules/account_module'], function(module){
                                module.saveDB(form);
                            });
                        }else {
                            router.alertify_error('Access Denied');
                        }
                            
                	});

                    $('#btnUpdateAccount').click(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        if (sessionStorage.getItem('usertype') == 1) {
                            var form = $('#form-add-account').serialize();
                            require(['modules/account_module'], function(module){
                                module.updateDB(form);
                            });
                        }else {
                            router.alertify_error('Access Denied');
                        }
                    });
                });

                $(function() {
                     $form.find('#check-confirm-password').change(function(event) {
                         if ($(this).is(':checked')) {
                            $('#password, #confirm-password').attr('type','text');
                         }else {
                            $('#password, #confirm-password').attr('type','password');
                         }
                     });
                });
                
                $(function() {
                    $('#btnUpdateAccount').hide();
                    
                });
        	}
    
    });
   
    return ViewFormAddAccount; 
});