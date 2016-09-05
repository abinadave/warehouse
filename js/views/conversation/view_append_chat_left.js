define(
	[
		'underscore',
		'backbone',
		'text!templates/conversation/temp_append_chat_left.html'
	],  function(_, Backbone, template) {
   
    var ViewAppendChatLeft = Backbone.View.extend({
    
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
                require(['moment','modules/account_module'], function(momentJS, AM){
                    var output = self.template({'model': self.collection, 'moment': momentJS, 'AccountModule': AM });
                    self.$el.append(output);
                    self.init();
                });
    	        return self;
        	},
    
        	init: function(){
                var self = this;

                $(function(){
                    //jQuery..
                    require(['modules/conversation_module'], function(ConversationModule){
                        ConversationModule.scrollChatBox().initDownloadFile();
                    });
                    $('#no-result-found').hide();  
                });
        	}
    
    });
   
    return ViewAppendChatLeft; 
});