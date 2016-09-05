define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Transfered_tool = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Transfered_tool; 
});