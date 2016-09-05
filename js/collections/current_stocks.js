define(['underscore','backbone','models/current_stock'], function(_, Backbone, Model) {
   
    var Current_stocks = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new current stock was added');
    		});
    		this.on('remove', function(model){
    			console.log('current stock successfully removed');
    		});
    	},
    
    	print: function(){
    		current_stocks.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Current_stocks; 
});