define(
	[
		'underscore',
		'backbone',
		'models/userlog'
	],  function(_, Backbone, Userlog) {
   
    var Userlogs = Backbone.Collection.extend({
    
    	model: Userlog,
    		
    	initialize: function(){

    		this.on('add', function(model){
    			console.log('new log was added');
                // pubnub.publish({channel: 'userlogs', message: {model, type: 'add'}});
    		});

    		this.on('remove', function(model){
                require(['modules/userlog_module'], function(UserlogModule){
                   UserlogModule.appendListOfLogs();
                });     
    		});
            
    	},

    	print: function(){
    		userlogs.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Userlogs; 
});