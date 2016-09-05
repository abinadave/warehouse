define(
	[
		'underscore',
		'backbone',
		'text!templates/classification/temp_list_of_classifications.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfClassifications = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'ul',
    
        	el: '#list-of-classifications',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/classification_module','libs/backbone.obscura'], function(CM, Obscura){
                    var sorted = CM.sort(Obscura, self.collection);
                    self.$el.off();
                    self.$el.empty();
                    var output = self.template({'library': sorted.toJSON(), 'CM': CM});
                    self.$el.append(output);
                    self.init();
                });
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return ViewListOfClassifications; 
});