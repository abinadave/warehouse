define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Deliver_form = Backbone.Model.extend({

    	initialize: function(){
    		//console.log('Model Deliver initialized');
    		this.on('change', function(){
    			console.log(this.changedAttributes());
    		});
    	},

    	defaults: {
    		id: 0,
    		date: 'no date',
    		time: 'no time',
    		from_location: 'unknown location',
    		to_person: 'unknown person',
    		to_location: 'unknown location',
    		prepared_by: 'no name',
    		prepared_by_position: 'unknown position',
    		delivered_by: 'no name',
    		delivered_by_position: 'unknown position'
    	}

    });
   
    return Deliver_form; 
});