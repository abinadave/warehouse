define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_list_of_borrower_forms.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-borrower-forms',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this, moment = require('moment'), bfm = require('modules/borrowerform_module');
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'moment': moment});
                self.$el.append(output);
                bfm.init(self, self.collection.length);
    	        return self;
        	}
    
    });
   
    return Subview; 
});