define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Transfer = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	}
    
    });
   
    return Transfer; 
});