define(['underscore','backbone','text!templates/product/history/temp_item_tab_history.html',
    'modules/product_module',
    'views/iso/view_modal_stock_card_receive_withdraw_report'], 
    function(_, Backbone, template, pm, SubviewModalreport) {
   
    var SubivewTab = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#item-history',
    
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

                $(function() {
                    new SubviewModalreport();
                });

                $(function(){
                    pm.appendReceivingItemHistory().appendWithdrawItemHistory();
                    var i = Backbone.history.fragment.split('/')[1];
                    if (self.$el.length) {
                         var item = products.get(i);
                         $('#item-name').text($.trim(item.get('name')));
                    }; 
                });

                $(function() {
                    self.$el.find('#print-report').on('click', function(event){
                        $('#modal-receive-withdraw-report').modal('show');
                    });
                });

        	}
    
    });
   
    return SubivewTab; 
});