define(
	[
		'underscore',
		'backbone',
		'text!templates/conversation/temp_list_of_conversation.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfConversation = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'ul',
    
        	el: '#list-ofconversation',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                var chat = $('#current-chat').val();
                require(['moment','modules/account_module','modules/blockedconversation_module'], function(momentJS, AM, BCM){
                    self.$el.off();
                    self.$el.empty();
                    var lists = BCM.filterBlockedChat(self.collection);
                    var output = self.template({'library': lists.toJSON(), 'moment': momentJS , 'chatmate': chat ,'AccountModule': AM });
                    self.$el.append(output);
                    self.init();
                });
    	        return self;
        	},
    
        	init: function(){
                var self = this;

                $(function(){
                    //jQuery
                    require(['modules/conversation_module'], function(ConversationModule){
                        ConversationModule.scrollChatBox();
                        ConversationModule.initDownloadFile();
                    });
                });

        	},

            
    
    });
   
    return ViewListOfConversation; 
});