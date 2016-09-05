define(
	[
		'underscore',
		'backbone',
		'models/repair_form'
	],  function(_, Backbone, Repair_form) {
   
    var Repair_forms = Backbone.Collection.extend({
    
    	model: Repair_form,
    		
    	initialize: function(){

    		this.on('add', function(model){
    			console.log('new repair_form was added');
                this.after();
                // pubnub.publish({channel: 'repair_forms', message: {model, type: 'add', user: sessionStorage.getItem('uid') }});
    		});

    		this.on('remove', function(model){
    			console.log('repair_form successfully removed');
                this.after();
                // pubnub.publish({channel: 'repair_forms', message: {model, type: 'remove', user: sessionStorage.getItem('uid') }});
    		});

    	},

        after: function(){
            require(['modules/repairform_module'], function(RFM){
                RFM.appendListOfRepairForms();
            });
        },
    
    	print: function(){
    		repair_forms.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Repair_forms; 
});