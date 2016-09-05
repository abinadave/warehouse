define(['underscore','backbone','models/item_borrow'], function(_, Backbone, Item_borrow) {
   
    var Item_borrows = Backbone.Collection.extend({
    
    	model: Item_borrow,
    		
    	initialize: function(){

    		this.on('add', function(model){
    			console.log('new Item_borrow was added');
                require(['modules/itemborrow_module'], function(ibm){
                    ibm.afterAddRemove();
                });
    		});

    		this.on('remove', function(model){
    			console.log('Item_borrow successfully removed');
                require(['modules/itemborrow_module'], function(ibm){
                    ibm.afterAddRemove();
                });
    		});
            
    	},
    
    	print: function(){
    		item_borrows.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Item_borrows; 
});