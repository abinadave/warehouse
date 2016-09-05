define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Transfer_form = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                //console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Transfer_form; 
});