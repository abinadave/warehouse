define(
	[
		'underscore',
		'backbone',
		'models/warehouse',
        'modules/warehouse_module',
        'libs/backbone-query.min'
	],  function(_, Backbone, Warehouse, WarehouseModule) {
   
    var Warehouses = Backbone.Collection.extend({
        url: 'api.php/warehouse',
    	model: Warehouse,

    	initialize: function(){

    		this.on('add', function(model){
                WarehouseModule.appendListOfWareHouseBranches();
    		});
    		this.on('remove', function(model){
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