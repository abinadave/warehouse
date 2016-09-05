define(
	[
		'underscore',
		'backbone',
		'models/warehouse',
        'modules/warehouse_module',
        'libs/backbone-query.min'
	],  function(_, Backbone, Warehouse, WarehouseModule) {
   
    var Warehouses = Backbone.Collection.extend({
        url: '/warehouse',
    	model: Warehouse,

    	initialize: function(){

    		this.on('add', function(model){
    			console.log('Warehouse added');
                WarehouseModule.appendListOfWareHouseBranches();
    		});
    		this.on('remove', function(model){
    			console.log('Warehouse removed');
                WarehouseModule.appendListOfWareHouseBranches();
    		});
    	},

        print: function(){
            warehouses.forEach(function(model) {
                console.log(model.attributes); 
            });
        }
    });
   
    return Warehouses; 
});