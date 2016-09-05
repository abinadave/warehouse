define(
	[
		'underscore',
		'backbone',
		'text!templates/product/temp_item_details.html'
	],  function(_, Backbone, template) {
   
    var ViewItemDetails = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
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
                self.$el.hide().append(output).fadeIn('slow');
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var $panel = $('#panel-image-details');
        		
                $(function(){
                    $panel.find('#form-update-item').find('input').addClass('form-control');
                });

                jQuery(document).ready(function($) {
                    $panel.find('#btnUpdateItemImage').click(function(event) {
                        /* Act on the event */
                        require(['modules/product_module'], function(PM){
                            PM.displayModalUpdatePhoto();
                        });
                    });
                });

                $(function() {
                    require(['modules/product_module'], function(pm){
                        pm.appendItemHistory();
                    });
                });
        	}
    
    });
   
    return ViewItemDetails; 
});