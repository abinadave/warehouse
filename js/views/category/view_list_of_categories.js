define(
	[
		'underscore',
		'backbone',
		'text!templates/category/temp_list_of_categories.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfCategories = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-categories',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['libs/backbone.obscura'], function(Obscura){
                    self.$el.empty();
                    var sortedCollection = categories.sort(self.collection, Obscura);
                    var output = self.template({'library': sortedCollection.toJSON()});
                    self.$el.append(output);
                    self.init();
                });
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    // $('#no-rs').text(categories.length);
                    $('#check-all-category').click(function(event) {
                    	/* Act on the event */
                    	if($(this).is(':checked')){
                    		$('#list-of-categories').find('input[type="checkbox"]').prop('checked', true)
                    	}else {
                    		$('#list-of-categories').find('input[type="checkbox"]').prop('checked', false)
                    	}
                    });
                });


        	}
    
    });
   
    return ViewListOfCategories; 
});