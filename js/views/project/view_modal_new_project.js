define(
	[
		'underscore',
		'backbone',
		'text!templates/project/temp_modal_new_project.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
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
                    $('#modalNewProject').modal('show');
                });

                jQuery(document).ready(function($) {
                	self.$el.find('#form-project').submit(function(event) {
                		/* Act on the event */
                		event.preventDefault();
                        var form = $(this).serialize();

                        require(['moment','modules/collection_module'], function(moment, cm){
                            form += '&date=' + moment().format("YYYY-MM-DD HH:mm:ss");
                            form += '&table=projects';
                            cm.saveDB(form,'projects');
                        });
                        
                	});
                });
        	}
    
    });
   
    return Subview; 
});