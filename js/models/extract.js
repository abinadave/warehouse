define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Extract = Backbone.Model.extend({

    	initialize: function(){
    		//console.log('model Extract initialized');
    		this.on('change', function(model){
    			console.log('Model Extract change');
    		});
    	},

    	defaults: {
    		id: 0,
    		qty: 0,
    		remarks: 'no remarks',
            item: 0,
            name: 'no name'
    	}

    });
   
    return Extract; 
});