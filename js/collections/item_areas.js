define(['underscore','backbone','models/item_area'],function(_, Backbone, Item_area) {
   
    var Item_areas = Backbone.Collection.extend({
    
    	model: Item_area,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			require(['modules/itemarea_module'], function(itemarea_module){
                    itemarea_module.populateAll();
                });
    		});
    		this.on('remove', function(model){
    			require(['modules/collection_module','modules/itemarea_module'], function(cm, itemarea_module){
                    cm.removeDB('item_areas', model.get('id'), 'id', itemarea_module);
                    itemarea_module.populateAll();
                });
    		});
    	},
    
    	print: function(){
    		item_areas.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Item_areas; 
});