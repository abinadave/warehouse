define(
	[
		'underscore',
		'backbone',
		'models/tool'
	],  function(_, Backbone, Tool) {
   
    var Collection = Backbone.Collection.extend({
    
    	model: Tool,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
                // pubnub.publish({channel: 'tools', message: {model, type: 'add'}});
                this.afterAddRemove();
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
                // pubnub.publish({channel: 'tools', message: {model, type: 'remove'}});
                this.afterAddRemove();
    		});
            this.on('sort', function(model){
                console.log('sorted')
                this.afterAddRemove();
            });
    	},

        comparator: function(thetool) {
             return thetool.get("id");
        },

        afterAddRemove: function(){
            require(['modules/tool_module'], function(ToolModule){
                ToolModule.appendListOfTools();
            });
        },
    
    	print: function(){
    		tools.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    
    });
   
    return Collection; 
});