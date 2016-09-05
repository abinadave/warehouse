define(['underscore','backbone'], function(_, Backbone) {
   
    var Item_area = Backbone.Model.extend({
    
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
               return "Area is required";
            }

            if (item_areas.where({name: attrs.name}).length) {
                return 'Area name: <b>' +attrs.name+'</b>, already exist';
            }
        }
    
    });
   
    return Item_area; 
});