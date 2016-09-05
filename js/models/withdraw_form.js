define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Withdraw_form = Backbone.Model.extend({

    	initialize: function(){
    		//console.log('model Withdraw_form initialized');
    		this.on('change', function(){
    			console.log('model Withdraw_form changed');
    		});
    	},

    	defaults: {
    	    id: 0,
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