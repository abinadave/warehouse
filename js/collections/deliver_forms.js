define(
	[
		'underscore',
		'backbone',
		'models/deliver_form'
	],  function(_, Backbone, Deliver_form) {
   
    var Deliver_forms = Backbone.Collection.extend({

    	model: Deliver_form,

    	initialize: function(){
    		//console.log('Collection Deliver form initialized');
    		this.on('add', function(model){
    			console.log('new delivery form was added');
                this.callback();
    		});
            
    		this.on('remove', function(model){
    			console.log('delivery form deleted');
                this.callback();
    		});
    	},

    	print: function(){
    		deliver_forms.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        callback: function(){
            require(['modules/deliverform_module'], function(DFM){
                DFM.appendListOfDeliverForms(deliver_forms);
            });
        }
    	
    });
   
    return Deliver_forms; 
});