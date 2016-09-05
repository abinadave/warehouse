define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_list_of_receving_forms.html'
        
	],  function(_, Backbone, template) {
   
    var ViewListOfReceivingForm = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-receiving-reports',
    
        	template: _.template(template),
    
            events: {
                // bound events..
            },
    
        	render: function(){
        	    var self = this;
                require(['moment','modules/receiveform_module','libs/backbone.obscura'], function(momentJS, RFM, Obscura){    
                    self.$el.empty();
                    var list = RFM.sortByDate(self.collection, Obscura);
                    var output = self.template({'library': list.toJSON(), 'moment': momentJS });
                    self.$el.append(output);
                    RFM.formInit(self, self.collection.length);    
                });
    	        return self;
        	},
    
        	
    
    });
   
    return ViewListOfReceivingForm; 
});