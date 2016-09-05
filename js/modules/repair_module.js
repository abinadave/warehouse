define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var RepairModule = {

    	afterAdding: function(tool){
    		tools.remove(tool.id);
    		require(['modules/repairform_module'], function(RepairFormModule){
    		    RepairFormModule.appendRepairForm();
    		});
    	}

    }
   
    return RepairModule; 
});