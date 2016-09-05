define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Returned_tool = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	}
    
    	
    
    });
   
    return Returned_tool; 
});