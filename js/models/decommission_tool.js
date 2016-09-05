define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Decommission_tool = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
    			console.log('Decommission_tool model changed');
                console.log(this.changedAttributes());
    		});
    	}
    
    });
   
    return Decommission_tool; 
});