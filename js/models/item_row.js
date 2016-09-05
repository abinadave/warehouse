define(['underscore','backbone'], function(_, Backbone) {
   
    var Item_row = Backbone.Model.extend({
    
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
               return "Row is required";
            }

            if (item_rows.where({name: attrs.name}).length) {
                return 'Row name: <b>' +attrs.name+'</b>, already exist';
            }
        }
        
    });
   
    return Item_row; 
});