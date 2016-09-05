define(
	[
		'underscore',
		'backbone',
		'models/returned_tool'
	],  function(_, Backbone, Returned_tool) {
   
    var Returned_tools = Backbone.Collection.extend({
    
    	model: Returned_tool,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			this.after();
    		});
    		this.on('remove', function(model){
    			this.after();
    		});
    	},
    
    	print: function(){
    		returned_tools.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        after: function(arguments) {
            require(['modules/returnedtool_module'], function(rtm){
                rtm.appendListOfReturnedTools();
            });
        }
    
    });
   
    return Returned_tools; 
});