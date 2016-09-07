define(['underscore','backbone','models/borrower_pform'], function(_, Backbone, Borrower_pform) {
   
    var Borrower_pforms = Backbone.Collection.extend({
        url: 'api.php/borrower_pform',
    	model: Borrower_pform,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Borrower_pform was added');
    		});
    		this.on('remove', function(model){
    			console.log('model Borrower_pform removed');
    		});
    	},
    
    	print: function(){
            borrower_pforms.forEach(function(model) {
                console.log(model.attributes); 
            });
    	}
    
    });
   
    return Borrower_pforms; 
});