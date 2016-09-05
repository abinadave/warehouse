define(
	[
		'underscore',
		'backbone',
		'text!templates/wrapper.html'
	],  function(_, Backbone, template) {
   
    var ViewWrapper = Backbone.View.extend({
    
        	initialize: function(){
        		// console.log('ViewWrapper initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
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
        	}
    
    });
   
    return ViewWrapper; 
});