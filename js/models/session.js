define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Session = Backbone.Model.extend({

    	initialize: function(){
    		
    		this.on('change', function(){
    			//console.log('Session Model chaged');
    		});
    	},

    	defaults: {
    		id: 0,
    		usertype: 0,
 			username: 'no username'
    	},

    	fetchData: function(){

    	}

    });
   
    return Session; 
});