define(['underscore','backbone','models/notification'], function(_, Backbone, Notification) {
   
    var Notifications = Backbone.Collection.extend({
    
    	model: Notification,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Notification was added');
                this.after();
    		});
    		this.on('remove', function(model){
    			console.log('Notification successfully removed');
                this.after();
    		});
    	},
    
    	print: function(){
    		notifications.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        after: function(){
            require(['modules/functions'], function(fn){
                fn.iosBadge(notifications.length, 'red', 20, 'bell-notifications', 'bottom-left');
            });
        }
    
    });
   
    return Notifications; 
});