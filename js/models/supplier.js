define(['underscore','backbone'], function(_, Backbone) {
   
    var Supplier = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
        validate: function(attrs, options) {
            if (!attrs.name) {
               return "name is required";
            }

            if (!attrs.address) {
            	return 'address is required';
            }

            if (!attrs.contact) {
            	return 'contact no. is required';
            }

            if (suppliers.where({name: attrs.name}).length) {
            	return 'supplier name already exist';
            }

            if (attrs.contact.length !== 11) {
            	return 'invalid contact number';
            }
        }
    
    
    });
   
    return Supplier; 
});