define(['underscore','backbone','text!templates/product/borrow/temp_modal_returnable_item.html'], 
	function(_, Backbone, template) {
   
    var ModalReturnables = Backbone.View.extend({
    
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
                    //jQuery
                    self.$el.find('#modalReturnableItems').modal('show');
                    self.$el.find('th').addClass('text-center');
                });
        	}
    
    });
   
    return ModalReturnables; 
});