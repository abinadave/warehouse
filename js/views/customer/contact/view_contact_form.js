define(
	[
		'underscore',
		'backbone',
		'text!templates/customer/contact/temp_contact_form.html'
	],  function(_, Backbone, template, css, js) {
   
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
        		var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('#contactForm').submit(function(event) {
                    	event.preventDefault();
                        var form = $(this).serialize();

                        require(['moment'], function(moment){

                            $.post('ajax/others/validate.php', form, function(data, textStatus, xhr) {
                                /*optional stuff to do after success */
                            }).success(function(data){
                                if ($.isNumeric(data)) {

                                    form += '&date=' + moment().format("YYYY-MM-DD HH:mm:ss");
                                    form += '&table=contacts';
                                    $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                                     /*optional stuff to do after success */
                                    }).success(function(data){
                                         router.alertify_success('Process completed');
                                         self.$el.find('#contactForm')[0].reset();
                                    }).fail(function(xhr){
                                     alert('error type: '+xhr.status);
                                    });
                                    
                                }else {
                                    router.alertify_success('All fields are required.');
                                }
                            }).fail(function(xhr){
                                alert('error type: '+xhr.status);
                            }); 	

                        });

                    });
                });

               
        	}
    
    });
   
    return Subview; 
});