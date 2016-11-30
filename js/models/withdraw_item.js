define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Withdraw_item = Backbone.Model.extend({
        url: 'api.php/withdraw_item',
    	initialize: function(){
    		//console.log('Model Withdraw_item initialized');
    		this.on('change', function(){
    			console.log('model Withdraw_item changed');
    		});
    	},

    	defaults: {
    		withdraw_id: 0,
    		qty: 0,
    		remarks: 'no remarks',
    		item: 0,
            name: 'no name',
            unit: 'no unit'
    	}
    	
    });
   
    return Withdraw_item; 
});