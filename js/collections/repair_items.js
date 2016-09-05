define(
	[
		'underscore',
		'backbone',
		'models/repair_item'
	],  function(_, Backbone, Repair_item) {
   
    var Repair_items = Backbone.Collection.extend({
    
    	model: Repair_item,
    		
    	initialize: function(){
    		this.on('add', function(model){
                // pubnub.publish({channel: 'repair_items', message: {model, type: 'add', user: sessionStorage.getItem('uid') }});
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
    		});
    	},
    
    	print: function(){
    		repair_items.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Repair_items; 
});