define(['underscore','backbone','models/item_shelf'],function(_, Backbone, Model) {
   
    var Item_shelfs = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			require(['modules/itemshelf_module'], function(thismodule){
                    thismodule.populateAll();
                });
    		});
    		this.on('remove', function(model){
    			require(['modules/collection_module','modules/itemshelf_module'], function(cm, thismodule){
                    cm.removeDB('item_shelfs', model.get('id'), 'id', thismodule);
                    thismodule.populateAll();
                });
    		});
    	},
    
    	print: function(){
    		item_shelfs.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Item_shelfs; 
});