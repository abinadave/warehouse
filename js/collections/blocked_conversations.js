define(
	[
		'underscore',
		'backbone',
		'models/model'
	],  function(_, Backbone, Model) {
   
    var Blocked_conversations = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
    		});
    	},
    
    	print: function(){
    		blocked_conversations.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    	
    
    });
   
    return Blocked_conversations; 
});