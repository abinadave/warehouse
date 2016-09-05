define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_list_of_pawn.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfPawns = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-pawns',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/tool_module'], function(ToolMod){ 
                    self.$el.off();
                    self.$el.empty();
                    var output = self.template({'library': self.collection.toJSON(), 'ToolModule': ToolMod});
                    self.$el.append(output);
                    self.init();
                });
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return ViewListOfPawns; 
});