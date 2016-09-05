define(
	[
		'underscore',
		'backbone',
		'models/receive_item'
	],  function(_, Backbone, Receive_item) {
   
    var Receive_items = Backbone.Collection.extend({
        url: 'api.php/receive_item',
    	model: Receive_item,

    	initialize: function(){
    		
    		this.on('add', function(model){
    			console.log('New Receive_item was added');
    		});

    		this.on('remove', function(model){
    			console.log('Receive_item was remove');
    		});
    	},

    	print: function(){
    		receive_items.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}

    });
   
    return Receive_items; 
});