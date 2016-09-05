define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_modal_table_receive_transfer_tools.html'
	],  function(_, Backbone, template) {
   
    var ViewReceiveTransferedTool = Backbone.View.extend({
    
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
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self= this;
                var $panel = $('#modalReceiveTransfereTools');


              
        	}
    
    });
   
    return ViewReceiveTransferedTool; 
});
