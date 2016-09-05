define(
	[
		'underscore',
		'backbone',
		'models/decommission_form'
	],  function(_, Backbone, Model) {
   
    var Decommission_forms = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new decommission_form was added');
    		});
    		this.on('remove', function(model){
    			console.log('decommission_form successfully removed');
    		});
    	},
    
    	print: function(){
    		decommission_forms.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Decommission_forms; 
});