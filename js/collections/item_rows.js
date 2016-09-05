define(['underscore','backbone','models/item_row'],function(_, Backbone, Model) {
   
    var Item_areas = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			require(['modules/itemrow_module'], function(itemrow_module){
                    itemrow_module.populateAll();
                });
    		});
    		this.on('remove', function(model){
    			require(['modules/collection_module','modules/itemrow_module'], function(cm, itemrow_module){
                    cm.removeDB('item_rows', model.get('id'), 'id', itemrow_module);
                    itemrow_module.populateAll();
                });
    		});
    	},
    
    	print: function(){
    		item_rows.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Item_areas; 
});