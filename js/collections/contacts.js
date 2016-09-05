define(
	[
		'underscore',
		'backbone',
		'models/model'
	],  function(_, Backbone, Model) {
   
    var Contacts = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			this.after();
    		});
    		this.on('remove', function(model){
    			this.after();
    		});
    	},
    
    	print: function(){
    		contacts.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        after: function(){
            require(['modules/contact_module'], function(ContactModule){
                ContactModule.trigger('appendList', contacts);
            });
        }
    
    });
   
    return Contacts; 
});