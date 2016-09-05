define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/temp_header_print_tool_report.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.on('render', this.onRender());
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['moment','modules/warehouse_module','modules/tool_module'], function(moment, wm, tm){
	                self.$el.off();
	                var output = self.template({'moment': moment, 'wm': wm, 'tm': tm });
	                self.$el.prepend(output);
                });
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return Subview; 
});