define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var PawnModule = {
    	saveModel: function(model){
    		pawns.add(model);
    	}
    }
   
    return PawnModule; 
});