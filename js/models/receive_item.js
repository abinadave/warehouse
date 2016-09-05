define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Receive_item = Backbone.Model.extend({
        
    	initialize: function(){
    		//console.log('Model Receive_item initialized');
    		this.on('change', function(){
    			console.log('Receive item has changed');
    		});
    	},

    	defaults: {
    	   
    	}
    });
   
    return Receive_item; 
});