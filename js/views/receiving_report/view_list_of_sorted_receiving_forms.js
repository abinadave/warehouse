define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_list_of_receving_forms.html'
        
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-receiving-reports',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['moment','modules/receiveform_module'], function(moment, rfm){	
	                self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(),'moment': moment});
	                self.$el.append(output);
	                rfm.formInit(self, self.collection.length);
                });
    	        return self;
        	}
    
    });
   
    return Subview; 
});