define(
	[
		'underscore',
		'backbone',
		'models/transfered_tool'
	],  function(_, Backbone, Transfered_tool) {
   
    var Transfered_tools = Backbone.Collection.extend({
    
    	model: Transfered_tool,
    		
    	initialize: function(){

    		this.on('add', function(model){
    			console.log('new model was added');
                // pubnub.publish({channel: 'transfered_tools', message: {model, type: 'add'}});
    		});
            
    		this.on('remove', function(model){
    			this.afterRemoved(model.attributes);
                // pubnub.publish({channel: 'transfered_tools', message: {model, type: 'remove'}});
    		});

    	},
    
    	print: function(){
    		transfered_tools.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        afterRemoved: function(tool){
            var form = $.param(tool);
            form += '&table=tools';
            $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var model = tool;
                pubnub.publish({channel: 'tools', message: {model, type: 'add'}});
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        }

    
    });
   
    return Transfered_tools; 
});