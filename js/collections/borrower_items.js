define(
	[
		'underscore',
		'backbone',
		'models/borrower_item'
	],  function(_, Backbone, Borrower_item) {
   
    var Borrower_items = Backbone.Collection.extend({
     
    	model: Borrower_item,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new borrower_item was added');
                // pubnub.publish({channel: 'borrower_items', message: {model, type: 'add', user: sessionStorage.getItem('uid') }});
    		});
    		this.on('remove', function(model){
    			console.log('borrower_item successfully removed');
    		});
    	},
    
    	print: function(){
    		borrower_items.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Borrower_items; 
});