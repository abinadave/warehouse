define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/temp_update_tool_photo.html'
	],  function(_, Backbone, template) {
   
    var ViewUpdateToolPhoto = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal',
    
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
                    $('#modalUpdateToolPhoto').modal('show');
                    require(['libs/jquery-ui/jquery-ui.min','modules/tool_module'], function(jQueryUi, ToolModule){
                        $('#div-modalUpdateToolPhoto').draggable({cursor: 'move'});
                        ToolModule.initFileUploaderUpdateToolPhoto();
                    });
                });
        	}
    
    });
   
    return ViewUpdateToolPhoto; 
});