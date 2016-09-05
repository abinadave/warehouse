define(['underscore','backbone','text!templates/warehouse/temp_slip_footer.html'], function(_, Backbone, template) {
   
    var SlipFooter = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#slip-footer',
    
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
                    //jQuery
                    self.$el.find('td').css({
                        fontSize: '10px',
                        padding: '2px'
                    });
                });
        	}
    
    });
   
    return SlipFooter; 
});