define(
	[
		'underscore',
		'backbone',
		'models/decommission_item'
	],  function(_, Backbone, Model) {
   
    var Decommission_items = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new decommission_item was added');
    		});
    		this.on('remove', function(model){
    			console.log('decommission_item successfully removed');
    		});
    	},
    
    	print: function(){
    		decommission_items.forEach(function(model) {
    			console.log(model.attributes);
    		});
    	}
    
    });
   
    return Decommission_items; 
});