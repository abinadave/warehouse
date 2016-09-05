define(
	[
		'underscore',
		'backbone',
		'text!templates/project/temp_panel_project.html',
		'css!libs/css/4-col-portfolio'
	],  function(_, Backbone, template, css) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#page',
    
        	template: _.template(template),
    
            events: {
                // bound events..
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.hide().append(output).fadeIn('fast');
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return Subview; 
});