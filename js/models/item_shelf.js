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

        validate: function(attrs, options) {
            if (!attrs.name) {
               return "Shelf is required";
            }

            if (item_shelfs.where({name: attrs.name}).length) {
                return 'Shelf name: <b>' +attrs.name+'</b>, already exist';
            }
        }
    
    });
   
    return Model; 
});