define(
	[
		'underscore',
		'backbone',
		'models/online'
	],  function(_, Backbone, Online) {
   
    var Onlines = Backbone.Collection.extend({
    
    	model: Online,
    		
    	initialize: function(){

    		this.on('add', function(model){
                var num = onlines.length - 1;
                $('#chat-room-occupancy').text(num);
                this.afterAddRemove();
    		});

    		this.on('remove', function(model){
                 var num = onlines.length - 1;
                $('#chat-room-occupancy').text(num);
                this.afterAddRemove();
    		});

            require(['modules/account_module'], function(AM){
                AM.subscribeChat();
            });

    	},

        afterAddRemove: function(){
            require(['modules/account_module'], function(AM){
                AM.appendListOfOnlineUsers();
            });
        },

        addId: function(objects){
            objects.forEach(function(model) {
                onlines.add({id: model.id, name: model.firstname});
            });
        },

    	print: function(){
            onlines.forEach(function(model) {
                console.log(model.attributes); 
            });
    	}

    
    });
   
    return Onlines; 
});