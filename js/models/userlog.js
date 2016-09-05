define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Userlog = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Userlog; 
});