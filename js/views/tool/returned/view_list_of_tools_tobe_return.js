define(['underscore','backbone','text!templates/tool/returned/temp_list_of_tools_tobe_return.html'], function(_, Backbone, template) {
   	/* returnable tools */
    var ListOfTools = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-tools-tobe-return',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['modules/classification_module','modules/functions'], function(ClassificationModule, fn){ 
	                self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(), 'ClassificationModule': ClassificationModule, 'fn': fn });
	                self.$el.append(output);
	                self.onRender();
                });
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#no-of-tools').text(self.collection.length);
                });
        	}
    
    });
   
    return ListOfTools; 
});