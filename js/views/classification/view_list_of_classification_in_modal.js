define(
	[
		'underscore',
		'backbone',
		'text!templates/classification/temp_list_of_classification_in_modal.html'
	],  function(_, Backbone, template, chosen) {
   
    var ViewListOfClassificationInModal = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'select',
    
        	el: '#form-add-new-tool #classificationmodal, #update-classification',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                   
                });
        	}
    
    });
   
    return ViewListOfClassificationInModal; 
});