define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Repair_form = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Repair_form; 
});