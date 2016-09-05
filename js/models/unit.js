define(['underscore','backbone'], function(_, Backbone) {
   
    var Unit = Backbone.Model.extend({
    
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

            if (units.where({name: attrs.name}).length) {
            	return 'unit name already exist';
            }
        }
    
    
    });
   
    return Unit; 
});