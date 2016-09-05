define(
	[
		'underscore',
		'backbone',
		'models/unit'
	],  function(_, Backbone, Unit) {
   
    var Units = Backbone.Collection.extend({
    
    	model: Unit,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			this.after(model);
    		});
    		this.on('remove', function(model){
    			this.after(model);
    		});
    	},
    
    	print: function(){
    		units.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        after: function(model){
            require(['modules/unit_module'], function(UnitModule){
                UnitModule.trigger('appendList', units);
            });
        }
    
    });
   
    return Units; 
});