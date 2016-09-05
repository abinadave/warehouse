define(
	[
		'underscore',
		'backbone',
		'models/transfer_item'
	],  function(_, Backbone, Transfer_item) {
   
    var Transfer_items = Backbone.Collection.extend({
    
    	model: Transfer_item,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new transfer item was added');
                // pubnub.publish({channel: 'transfer_items', message: {model, type: 'add', user: sessionStorage.getItem('uid') }});
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
                 // pubnub.publish({channel: 'borrower_items', message: {model, type: 'remove', user: sessionStorage.getItem('uid') }});
    		});
    	},
    
    	print: function(){
    		transfer_items.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Transfer_items; 
});