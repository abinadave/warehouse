define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Warehousemen = Backbone.Model.extend({

    	initialize: function(){
    		this.on('change', function(){
                var prevcode = this.previous('code');
                require(['modules/warehousemen_module','modules/warehouse_module'], function(WarehousemenModule, WarehouseModule){
                    WarehousemenModule.afterChangedCode(prevcode);
                    WarehouseModule.appendListOfWareHouseBranches();
                });

    		});
    	},

    	defaults: {
    		id: 0,
    		firstname: 'none',
    		lastname: 'none',
    		username: 'none',
    		password: 'none',
    		code: 0
    	}

    });
   
    return Warehousemen; 
});