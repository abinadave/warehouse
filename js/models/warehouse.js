define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Warehouse = Backbone.Model.extend({

    	initialize: function(){
    		this.on('change', function(){
    			console.log('model Warehouse initialized');
    		});
    	},

    	defaults: {
    		id: 0,
    		location: 'no location'
    	}
    	
    });
   
    return Warehouse; 
});