define(
	[
		'underscore',
		'backbone',
		'models/repaired_tool'
	],  function(_, Backbone, Repaired_tool) {
   
    var Repaired_tools = Backbone.Collection.extend({
    
    	model: Repaired_tool,
    		
    	initialize: function(){

    		this.on('add', function(model){
    			console.log('new model was added');
    		});

    		this.on('remove', function(model){
    			var attributes = model.attributes;
                var form = $.param(model.attributes);
                form+= '&table=tools';
                require(['modules/repairedtool_module','modules/collection_module','modules/tool_module'], function(RTM, cm, tm){
                    RTM.afterRemoveModel(attributes);
                    cm.saveDB(form, 'tools', tm);
                    if (!repaired_tools.length) {
                        $('#modalToolsUnderRepair')     .modal('hide');
                    }
                });
    		});

            this.on('all', function(model){
                require(['modules/repairedtool_module'], function(RTM){
                    RTM.setNumOfRepairedTool();
                });
            });

    	},
    
    	print: function(){
    		repaired_tools.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Repaired_tools; 
});