define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/returned/temp_list_of_returned_tools.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfReturnedTools = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-returned-tools',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/collection_module','libs/backbone.obscura','moment'], function(colmod, Obscura, moment){
                    var list = colmod.sortBy(Obscura, self.collection, 'date', 'desc');
                    self.$el.off();
                    self.$el.empty();
                    var output = self.template({'library': list.toJSON(), 'moment': moment});
                    self.$el.append(output);
                    self.init();
                });
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                     self.$el.find('td').addClass('text-center');
                });
        	}
    
    });
   
    return ViewListOfReturnedTools; 
});