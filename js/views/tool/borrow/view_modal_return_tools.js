define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_modal_return_tools.html'
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
                $(function(){
                    //jQuery
                    $('#modalReturnedTools').modal('show');
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#div-modalReturnedTools').draggable({cursor: 'move'});
                    });
                });
        	}
    
    });
   
    return Subview; 
});