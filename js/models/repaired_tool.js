define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Repaired_tool = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Repaired_tool; 
});