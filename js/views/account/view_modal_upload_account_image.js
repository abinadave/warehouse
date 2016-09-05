define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_modal_upload_account_image.html'
	],  function(_, Backbone, template) {
   
    var ViewModal = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#page-wrapper #placeholder',
    
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
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#modalAccountImage').modal('show');
                        $('#div-modalAccountImage').draggable();
                    });
                });

                jQuery(document).ready(function($) {
                	require(['modules/account_module'], function(AccountModule){
                	    AccountModule.initFileUploaderAccountPhoto();
                	});
                });
                
        	}
    
    });
   
    return ViewModal; 
});