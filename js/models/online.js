define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Online = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		id: 0
    	}
    
    });
   
    return Online; 
});