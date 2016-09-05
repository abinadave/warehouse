define(
	[
		'underscore',
		'backbone',
		'models/model'
	],  function(_, Backbone, Model) {
   
    var Bulletins = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new bulletin was added');
    		});
    		this.on('remove', function(model){
    			console.log('model bulletin removed');
    		});
    	},
    
    	print: function(){
    		bulletins.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Bulletins; 
});