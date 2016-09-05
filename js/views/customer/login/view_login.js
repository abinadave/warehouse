define(
	[
		'underscore',
		'backbone',
		'text!templates/customer/login/temp_login.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#page',
    
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
                
                $(function() {
                    $('#form-login').submit(function(event) {
                       /* Act on the event */
                        event.preventDefault();
                        var form = $('#form-login').serialize();
                        var self = this;
                        $.post('ajax/select/verify_account.php', form , function(data, textStatus, xhr) {
                            /*optional stuff to do after success */
                            $('#output-login').hide().html(data).fadeIn('fast');
                        }).success(function(data){
                            console.log(data);
                        }).fail(function(xhr){
                            alert('error type: '+xhr.status);
                        });
                     });
                });

        	}
    
    });
   
    return Subview; 
});