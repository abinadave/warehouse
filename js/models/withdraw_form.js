define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Withdraw_form = Backbone.Model.extend({
        url: 'api.php/withdraw_form',
    	initialize: function(){
    		//console.log('model Withdraw_form initialized');
    		this.on('change', function(){
    			console.log('model Withdraw_form changed');
    		});
    	},

    	defaults: {
    	    linked_to: '',
    	    no: 0,
    	    requested_by: 0,
    	    requested_by_position: 0,
    	    issued_by: 0,
    	    issued_by_position: 0,
    	    date: 0
    	}
    });
   
    return Withdraw_form; 
});