define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Decommission_form = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Decommission_form; 
});