define(['underscore','backbone','text!templates/product/history/temp_table_receiving_history_of_item.html',
	'modules/product_module','modules/receiveitem_module','modules/receiveform_module'], 
	function(_, Backbone, template, pm, rim, rfm) {
   
    var TableHistory = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#receive-history-item',
    
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
                    if (self.$el.length) {
                        var current = Backbone.history.fragment;
                        var str = current.toString().split('/');
                        var stock_id = str[1];
                        var rs = receive_items.where({receive_id: stock_id});
                        var list = rim.findReceiving(stock_id);
                        rim.appendReceiveHistoryItems(list);
                        
                    };
                    
                });

                $(function() {
                    self.$el.find('th').addClass('text-center');
                });

                
        	}
    
    });
   
    return TableHistory; 
});