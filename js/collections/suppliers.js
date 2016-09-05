define(
	[
		'underscore',
		'backbone',
		'models/supplier'
	],  function(_, Backbone, Supplier) {
   
    var Suppliers = Backbone.Collection.extend({
    
    	model: Supplier,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Supplier was added');
    		});
    		this.on('remove', function(model){
    			console.log('Supplier successfully removed');
    		});
            this.on('all', function(model){
                this.callback();
            });
    	},
    
    	print: function(){
    		suppliers.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

    	callback: function(){
    		require(['modules/supplier_module'], function(SM){
                SM.appendList();
            });
    	}
    
    });
   
    return Suppliers; 
});