define(['underscore','backbone','text!templates/tool/history/temp_modal_history_of_tool.html'], function(_, Backbone, template) {
   
    var SubviewHistory = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
					self.$el.find('#modalHistoryOfTool').modal('show');                    
                });
        	}
    
    });
   
    return SubviewHistory; 
});