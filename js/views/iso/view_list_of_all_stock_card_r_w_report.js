define([
	'underscore',
    'backbone',
	'text!templates/iso/temp_list_of_all_stock_card_r_w_report.html',
	'modules/receiveitem_module',
    'moment'
    ], function(_, Backbone, template, RIM, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-stock-card-report-w-r',
    
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
                	'self': self,
                    'moment': moment
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    self.$el.find('th,td').css({
                        'font-size': '12px',
                        'padding': '2px'
                    });
                });
        	},

        	getWithdrawAndReceived(i){
        		var self = this;
                var r_obj = receive_items.where({receive_id: i}, false);
                var w_obj = withdraw_items.where({item: i}, false);
                var list = RIM.createList(r_obj, w_obj);
                return list.toJSON();
        	}
    
    });
   
    return Subview; 
});