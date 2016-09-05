define(
	[
		'underscore',
		'backbone',
		'text!templates/category/temp_list_of_categories_by_id.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfCategoriesById = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-categories',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(rids){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'ids': rids});
                self.$el.append(output);
                self.init(rids.length);
    	        return self;
        	},
    
        	init: function(length){
                console.log(length)
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return ViewListOfCategoriesById; 
});