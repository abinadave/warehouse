define(
	[
		'underscore',
		'backbone',
		'text!templates/project/temp_admin_gallery.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('button#btnAddProject').click(function(event) {
                    	require(['modules/functions'], function(fn){
                    	    fn.appendView('views/project/view_modal_new_project');
                    	});
                    });
                });
        	}
    
    });
   
    return Subview; 
});