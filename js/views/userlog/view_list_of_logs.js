define(
	[
		'underscore',
		'backbone',
		'text!templates/userlog/temp_list_of_logs.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfLogs = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-userlogs',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/account_module','moment','libs/backbone.obscura','modules/userlog_module'], 
                    function(AM, moments, Obscura, UM){
                      self.$el.off();
                      self.$el.empty();
                      var lists = UM.sort(Obscura, self.collection);
                      var output = self.template({'library': lists.toJSON(), 'AccountModule': AM, 'moment': moments });
                      self.$el.append(output);
                      self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
                $(function(){
                    //jQuery
                    if (length == 0) {
                        require(['modules/functions'], function(fn){
                            fn.noDataWasFound('#list-of-userlogs', 7, '<span class="text-danger"><strong>No data was found for logs</strong></span>');
                        });
                    }
                });
              
        	}
    
    });
   
    return ViewListOfLogs; 
});