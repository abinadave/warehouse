define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_panel_chat.html'
	],  function(_, Backbone, template) {
   
    var ViewPanelChat = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
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
    
        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#modalPanelChat').modal();
                        $('#div-modalPanelChat').draggable({cursor: 'move'});
                       
                    });
                });

                jQuery(document).ready(function($) {
                    self.$el.find('#form-submit-chat').on('submit', function(event) {
                        event.preventDefault();
                        var value = $(this).find('#input-chat').val();
                        var chatmate = $('#current-chat').val();
                        require(['modules/account_module','modules/conversation_module','moment'], function(AM, ConversationModule, moment){
                            var now = moment().format("YYYY-MM-DD HH:mm:ss");
                            var obj = { table: 'conversations', user: sessionStorage.getItem('uid'), receiver: chatmate, name: sessionStorage.getItem('name'), chat: value, time: now, file: 0 };
                            ConversationModule.saveDB($.param(obj));
                            // ConversationModule.appendMyChat(obj);
                        });
                        $(this).find('#input-chat').val('').focus();
                    });
                });

                jQuery(document).ready(function($) {    
                    self.$el.find('#delete-conversation').on('click', function(event) {
                         var chatmate = $('#current-chat').val();
                         if ($.isNumeric(chatmate)) {
                            require(['modules/blockedconversation_module'], function(BCM){
                                var obj = { user: sessionStorage.getItem('uid'), receiver: chatmate };
                                BCM.saveDB($.param(obj));
                            });
                         } else{
                            router.alertify_error('Please select a chatmate');
                         };
                    });
                });

                

                this.subviews();
        	},

            subviews: function(){
                require(['modules/account_module','modules/conversation_module'], function(AM, CM){
                    AM.appendListOfOnlineUsers();
                    CM.fileSharing();
                });
            }

    
    });
   
    return ViewPanelChat; 
});