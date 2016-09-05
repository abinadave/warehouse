define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Classification = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		id: 0,
    		name: 'none'
    	}
    
    });
   
    return Classification; 
});