define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Project = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	}
    
    });
   
    return Project; 
});