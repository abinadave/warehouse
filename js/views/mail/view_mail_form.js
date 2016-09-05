define(
	[
		'underscore',
		'backbone',
		'text!templates/mail/temp_mail_form.html'
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
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},

            onAddTag: function(value){
                require(['modules/functions'], function(fn){     
                    if (!fn.validateEmail(value)) router.alertify_error('Invalid email address');  
                });
            },
    
        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#modalMailForm').modal('show');

                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#div-modalMailForm').draggable({});
                    });

                    setTimeout(function() {
                    	$('input[name="recipient"]').focus();
                        require(['modules/account_module'], function(AccountModule){
                            AccountModule.removeAttachedFiles();
                            router.add_loading_btn('#btnSendMail', 1500);
                        });
                    }, 1000);

                });

                $(function() {
                    setTimeout(function() {
                        require(['css!libs/tags-input/jquery.tagsinput.min','libs/tags-input/jquery.tagsinput.min'], function(tagsJS, tagsCSS){
                            self.$el.find('#recipient').tagsInput({
                                'height': '60px',
                                'defaultText':'add new',
                                'width':'540px',
                                'onAddTag': self.onAddTag
                            });
                        });
                    }, 200);
                });

                $(function() {
                    self.initFileUploader();

                    self.$el.find('#form-mail').submit(function(event) {
                        event.preventDefault();
                        
                        var values = $(this).serialize();
                        values.sender = sessionStorage.getItem('email');
                        values.sender_name = sessionStorage.getItem('name');
                        var isValid = self.validateNumOfEmail();
                        console.log(isValid);
                        if(!isValid){
                            router.alertify_error('Maximum of 20 emails is not allowed.');
                        }else {
                            $.post('ajax/others/send_mail.php', values, function(data, textStatus, xhr) {
                                $('#output-send-email').hide().html(data).fadeIn('fast');
                            }).success(function(data){
                                var json = $.parseJSON(data);
                                if (json.success) {
                                    self.sendEmails(values);
                                    // require(['modules/account_module','modules/userlog_module'], 
                                    //     function(AccountModule, UserlogModule){
                                    //         AccountModule.removeAttachedFiles();
                                    //         UserlogModule.saveDB('New email has been sent');
                                    // });
                                };
                            }).fail(function(xhr){
                                console.log('error type: '+xhr.status);
                            });
                        }


                    });

                });


        	},

            sendEmails: function(values) {
                    $.post('http://emailtest.uphero.com/mailtest.php', values, function(data, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(data){
                        // var json = $.parseJSON(data);
                        console.log(data);
                    }).fail(function(xhr){
                        alert('error type: '+xhr.status);
                    });
            },

            initFileUploader: function(){
                var self = this;
                $(function(){
                    require(['libs/fileuploader/fileuploader'], function(){
                         new qq.FileUploader({
                            element: $('#attach-file-mail')[0],
                            action: 'ajax/others/upload_attach_mail_form.php',
                            
                            allowedExtensions: [],
                            onComplete: function(id, filename, json){
                               self.initFileUploader();
                               self.onComplete(filename);
                            }
                        });
                    });
                });
            },

            onComplete: function(filename){
                require(['views/mail/view_append_attached_files'], function(Subview){
                    var view = new Subview({
                        model: filename
                    });
                });
            },

            validateNumOfEmail: function(){
                var emails = $('#recipient').val();
                var rs = emails.split(',');
                return (rs.length > 20) ? false : true;
            }

    
    });
   
    return Subview; 
});
