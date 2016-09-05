define(
	[
		'underscore',
		'backbone',
		'text!templates/iso/temp_list_of_stock_card_withdraw_receive_report.html',
        'moment'
	], 
	function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#table-list-of-report',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({
                	'library': self.collection.toJSON(),
                	'model': self.model.toJSON(),
                    'moment': moment
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
               
        	}
    
    });
   
    return Subview; 
});