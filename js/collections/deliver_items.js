define(
	[
		'underscore',
		'backbone',
		'models/deliver_item'
	],  function(_, Backbone, Deliver_item) {
   
    var Deliver_items = Backbone.Collection.extend({

    	model: Deliver_item,

    	initialize: function(){
    		//console.log('Collection Deliver_items initialized');
    		this.on('add', function(model){
    			console.log('New item has delivered');
    		});
    		this.on('remove', function(model){
    			console.log('delivered item removed');
    		});
    	},

    	print: function(){
    		deliver_items.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    });
   
    return Deliver_items; 
});