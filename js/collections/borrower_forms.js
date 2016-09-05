define(
	[
		'underscore',
		'backbone',
		'models/borrower_form'
	],  function(_, Backbone, Borrower_form) {
   
    var Borrower_forms = Backbone.Collection.extend({
    
    	model: Borrower_form,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
                // pubnub.publish({channel: 'borrower_forms', message: {model, type: 'add', m: sessionStorage.getItem('uid')}});
                this.callback();
                
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
                // pubnub.publish({channel: 'borrower_forms', message: {model, type: 'remove', m: sessionStorage.getItem('uid')}});
                this.callback();
    		});
           
    	},
    
    	print: function(){
    		borrower_forms.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        callback: function(){
            require(['modules/borrowerform_module'], function(BFM){
                BFM.appendListOfBorrowerForms();
            });
        }
    
    });
   
    return Borrower_forms; 
});