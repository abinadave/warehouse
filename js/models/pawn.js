define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   //Borrow_items
    var Pawn = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		qty: 0
    	}
    
    });
   
    return Pawn; 
});