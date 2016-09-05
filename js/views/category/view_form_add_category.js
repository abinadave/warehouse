define(
	[
		'underscore',
		'backbone',
        'text!templates/category/temp_form_add_category.html'
	],  function(_, Backbone, template) {
   
    var ViewFormAddCategory = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#subview-form-category',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #btnSaveCategory': 'saveCategory'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	},

            saveCategory: function(event){
                event.preventDefault();
                var form = $('#form-add-category').serialize();
                var cname = $('#category-name').val();
                var result = categories.validateCategory(cname);
                if(result === 0){
                    categories.saveCategory(form);
                }
               
            }
    
    });
   
    return ViewFormAddCategory; 
});