define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone, ViewFormAddCategory) {
   
    var Category = Backbone.Model.extend({
    	initialize: function(){
    		//console.log('Model Category initialized');
            this.on('change', function(){
                categories.appendListOfCategories();
            });

            this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},

    	defaults: {
    		name: 'no name'
    	},

        validate: function(attrs, options) {
            if (!attrs.name) {
               return "Category name is required";
            }

            if (categories.where({name: attrs.name.toUpperCase()}).length) {
                return 'Category name: <b>' +attrs.name+'</b>, already exist';
            }
        }
        
    });
   
    return Category; 
});