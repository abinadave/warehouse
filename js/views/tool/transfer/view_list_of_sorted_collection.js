define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_list_of_transferforms.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#history-of-transfered-tool',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this, moment = require('moment'), tfm = require('modules/transferform_module');
                self.$el.off();
                self.$el.empty();

                var output = self.template({
                	'library': self.collection.toJSON(), 
                	'moment': moment, 
                	'WM':  require('modules/warehouse_module'),
                    'tfm': tfm
                });

                self.$el.append(output);
                tfm.init(self, self.collection.length);
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return Subview; 
});