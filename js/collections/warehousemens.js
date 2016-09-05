define(
	[
		'underscore',
		'backbone',
		'models/warehousemen',
        'modules/warehousemen_module',
        'modules/warehouse_module'
	],  function(_, Backbone, Warehousemen, WarehousemenModule, WarehouseModule) {
   
    var Warehousemens = Backbone.Collection.extend({

    	model: Warehousemen,

    	initialize: function(){
    		
    		this.on('add', function(model){
    			console.log('New Warehousemen added');
                WarehouseModule.appendListOfWareHouseBranches();

    		});
    		this.on('remove', function(model){
    			console.log('Warehousemen Removed');
                require(['modules/warehousemen_module'], function(module){
                    module.afterRemoved( model.get('code'));
                });
                WarehouseModule.appendListOfWareHouseBranches();
    		});

    	},


    	print: function(){
    		warehousemens.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    	
    });
   
    return Warehousemens; 
});