define(['underscore','backbone',
	'models/dr_invoice_other'], function(_, Backbone, Dr_invoice_other) {
   
    var Dr_invoice_others = Backbone.Collection.extend({
        url: 'api.php/dr_invoice',

    	model: Dr_invoice_other,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new dr_invoice_other was added');
    		});
    		this.on('remove', function(model){
    			console.log('dr_invoice_other successfully removed');
    		});
    	},
    
    	print: function(){
    		dr_invoice_others.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Dr_invoice_others; 
});