define(
	[
		'underscore',
		'backbone',
		'models/receive_form'
	],  function(_, Backbone, Receive_form) {
   
    var ReceiveItemModule = Backbone.Collection.extend({

    	model: Receive_form,

    	initialize: function(){
    		//console.log('Receive_forms collection initialized');
    		this.on('add', function(model){
    			console.log('new receive_form was added');
                require(['modules/receiveform_module'], function(module){
                    module.appendListOfReceivingForm();
                });
    		});

    		this.on('remove', function(model){
    			console.log('receive form removed successfully');
                require(['modules/receiveform_module'], function(module){
                    module.appendListOfReceivingForm();
                });
    		});
    	},

        print: function(){
            receive_forms.forEach(function(model) {
                console.log(model.attributes); 
            });
        }


    });
   
    return ReceiveItemModule; 
});