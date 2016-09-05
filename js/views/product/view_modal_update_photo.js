define(
	[
		'underscore',
		'backbone',
		'text!templates/product/temp_modal_update_photo.html'
	],  function(_, Backbone, template) {
   
    var ViewModalUpdateItemPhoto = Backbone.View.extend({
    
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
                    $('#modalUpdateItemPhoto').modal('show');
                    require(['libs/jquery-ui/jquery-ui.min','modules/product_module'], function(jQUeryUI, PM){
                        $('#modalUpdateItemPhoto').draggable();
                        PM.fileUploader();
                    });
                });

                
        	}
    
    });
   
    return ViewModalUpdateItemPhoto; 
});