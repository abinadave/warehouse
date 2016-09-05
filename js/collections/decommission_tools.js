define(
	[
		'underscore',
		'backbone',
        'models/decommission_tool'
	],  function(_, Backbone, Decommission_tool) {
   
    var Decommission_tools = Backbone.Collection.extend({
    
    	model: Decommission_tool,
    		
    	initialize: function(){
            
    		this.on('add', function(model){
                var attr = model.attributes;
                require(['modules/collection_module','modules/tool_module'], function(cm, tm){
                    cm.removeDB('tools', attr.id, 'id', tm);
                });
    		});
            
    		this.on('remove', function(model){
                var form = $.param(model.attributes);
                form += '&table=tools';
                require(['modules/collection_module','modules/tool_module'], function(cm, tm){
                    cm.saveDB(form, 'tools', tm);
                });
    		});
            
    	},
    
    	print: function(){
    		decommission_tools.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Decommission_tools; 
});