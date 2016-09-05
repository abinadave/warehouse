define(['underscore','backbone','models/borrower_pitem'], function(_, Backbone, Borrower_pitem) {
   
    var Borrower_pitems = Backbone.Collection.extend({
    
    	model: Borrower_pitem,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Borrower_pitem was added');
    		});
    		this.on('remove', function(model){
    			console.log('model Borrower_pitem removed');
    		});
    	},
    
    	print: function(){
    		borrower_pitems.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Borrower_pitems; 
});