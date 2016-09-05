define(
	[
		'underscore',
		'backbone',
		'models/transfer_form'
	],  function(_, Backbone, Transfer_form) {
   
    var Transfer_forms = Backbone.Collection.extend({
    
    	model: Transfer_form,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
                var attr = model.attributes;
                // pubnub.publish({channel: 'transfer_forms', message: {model, type: 'add'}});
                this.after();
    		});
    		this.on('remove', function(model){
                var attr = model.attributes;
    			console.log('model successfully removed');
                // pubnub.publish({channel: 'transfer_forms', message: {model, type: 'remove'}});
                this.after();
    		});
    	},
    
    	print: function(){
    		transfer_forms.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        after: function(){
            require(['modules/transferform_module'], function(TFM){
                TFM.appendListOfTransferForms();
            });
        }
    
    });
   
    return Transfer_forms; 
});