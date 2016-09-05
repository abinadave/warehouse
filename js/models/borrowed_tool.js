define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Borrowed_tool = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Borrowed_tool; 
});