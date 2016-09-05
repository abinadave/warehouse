define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Receive_form = Backbone.Model.extend({

    	initialize: function(){
    		//console.log('New Receive_form model initialized');
    		this.on('change', function(){
    			console.log('Receive_form model changed attributes: ' + this.changedAttributes());
    		});
    	},

    	defaults: {
    		id: 0,
    		location_receive: 'no location',
    		supplier_name: 'no supplier',
    		received_by: 'no receive through',
            date: 0,
            time: 0,
            verified_by: 'no verifier',
            position: 'uknown position'
    	}


    });
   
    return Receive_form; 
});