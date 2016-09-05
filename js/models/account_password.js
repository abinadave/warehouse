define(['underscore','backbone'], function(_, Backbone) {
   
    var Model = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
    	defaults: {
    		
    	},
    
        validate: function(attrs, options) {
            if (!attrs.current) {
               return "Cant leave empty fields.";
            }
            if (!attrs.newpassword) {
               return "Please Re-type your password.";
            }
        }
    
    
    });
   
    return Model; 
});