define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_list_of_transfers.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfTransfers = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
                console.log(1)
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-transfers',
    
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
                self.init(self.collection.length);
    	        return self;
        	},
    
        	init: function(length){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return ViewListOfTransfers; 
});