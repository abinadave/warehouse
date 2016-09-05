define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_list_of_borrower_item.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfBorrowerItem = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-borrow-items',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['moment'], function(moment){
                    self.$el.off();
                    self.$el.empty();
                    var output = self.template({'library': self.collection.toJSON(), 'moment': moment });
                    self.$el.append(output);
                    self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                  
                });
        	}
    
    });
   
    return ViewListOfBorrowerItem; 
});