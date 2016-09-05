define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/temp_modal_upload_tool_photo.html'
	],  function(_, Backbone, template) {
   
    var ViewUploadToolPhoto = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modals',
    
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
                    $('#modalAddToolPhoto').modal('show');
                    require(['modules/tool_module'], function(ToolModule){
                        ToolModule.initFileUploaderToolPhoto();
                    });
                });

                self.$el.find('#btnNotNow').click(function(event) {
                    setTimeout(function() {
                        router.addNewTool();
                    }, 1000)
                    
                });


        	}
    
    });
   
    return ViewUploadToolPhoto; 
});