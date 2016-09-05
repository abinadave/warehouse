define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Presence = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},

    	addId: function(array){
    		$.each(array, function(index, val) {
    			 console.log(val)
    		});
    	},
    
    	defaults: {
    		occupancy: 0,
    		ids: []
    	}
    
    });
   
    return Presence; 
});