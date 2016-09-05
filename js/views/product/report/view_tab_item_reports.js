define(
	[
		'underscore',
		'backbone',
		'text!templates/product/report/temp_tab_item_reports.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
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
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    self.onRender();
                });

                $(function() {
                    products.fetch({silent: true});
                    categories.fetch({silent: true});
                });

                $(function() {
                    self.$el.find('a[href="#Withdrawal"]').click(function(event) {
                        /* Act on the event */
                        require(['views/withdraw/view_modal_table_withdrawitems'], 
                            function(SubviewModalWithdrawItem){
                            var view = new SubviewModalWithdrawItem();
                            view.render();
                        });
                    });
                });
                
        	},

            onRender: function(){
                require([
                    'views/receiving_report/view_table_receiving_reports',
                    'views/withdraw/view_table_withdrawslips',
                    'views/deliver/view_table_deliver_reports',
                    'views/product/incomming/view_table_incomming_items',
                    'views/product/borrow/view_table_borrow_stock_cards'
                    ], function(receiveTable, withdrawTable, deliverTable, incommingItems, borrowerTable){
                        var view1 = new receiveTable();
                        var view2 = new withdrawTable();
                        var view3 = new deliverTable();
                        var view4 = new incommingItems();
                        var view5 = new borrowerTable();
                        view5.render();
                        view2.render();
                });
            }
    
    });
   
    return Subview; 
});