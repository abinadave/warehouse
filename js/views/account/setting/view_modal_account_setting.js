define(['underscore','backbone',
	'text!templates/account/setting/temp_modal_account_setting.html'], function(_, Backbone, template) {
   
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
                self.$el.off();
                self.$el.empty();
                var output = self.template({'model': sessionStorage});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#modalEditAccount').modal('show');
                });

                $(function() {
                    $.each(sessionStorage, function(index, val) {
                        self.$el.find('#'+index).val(val);
                    });    
                });

                $(function() {
                	var $form = $('#form-update-password');

                	$form.submit(function(event) {
                		/* Act on the event */
                		event.preventDefault();
                		require(['models/account_password'], function(Account_password){
                		    var model = new Account_password({
                		    	current: $form.find('input[name="pass1"]').val(),
                		    	newpassword: $form.find('input[name="pass2"]').val(),
                		    });
                		    if (model.isValid()) {
                		    	var form = $(this).serialize();
		                		var ssForm = $.param(sessionStorage);
		                		ssForm += '&newpassword=' + model.get('newpassword');
		                		ssForm += '&current=' + model.get('current');
		                		$.post('ajax/update/update_password_account.php', ssForm , function(data, textStatus, xhr) {
		                			/*optional stuff to do after success */
		                		}).success(function(data){
		                			var json = $.parseJSON(data);
		                			router.alertify_success(json.result);
		                			if (json.success) {
		                				$form[0].reset();
		                				$form.find('input[name="pass1"]').focus();
		                			}else {
		                				$form.find('input[name="pass1"]').val('').focus();
		                			}
		                		}).fail(function(xhr){
		                			console.log('Cant update account password. Error type: '+xhr.status);
		                		});
                		    }

                		});
                		
                	});

                });
        	}
    
    });
   
    return Subview; 
});