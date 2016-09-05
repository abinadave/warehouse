define(
	[
		'underscore',
		'backbone',
		'models/model'
	],  function(_, Backbone, Model) {
   
    var Conversations = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			require(['modules/conversation_module'], function(conversation_module){
                    conversation_module.afterAddChat(model.attributes);
                });
    		});
    		this.on('remove', function(model){
    			console.log('chat successfully removed');
    		});
    	},
    
    	print: function(){
    		conversations.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Conversations; 
});