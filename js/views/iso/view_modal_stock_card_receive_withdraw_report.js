define([
	'underscore',
	'backbone',
	'text!templates/iso/temp_modal_stock_card_receive_withdraw_report.html'], 
	function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-receive-withdraw-report',
    
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
                    var i = Backbone.history.fragment.split('/')[1];
					 $('#modal-receive-withdraw-report').on('shown.bs.modal', function(event){
                          self.getWithdrawAndReceived(i);
                     });                  
                });
                $(function(){
                    self.$el.find('#a-print').on('click', function(event){
                        require(['printarea'], function(printArea){
                            self.$el.find('th, td').css({fontSize: '10px'});
                            $('#table-list-of-report').printArea();
                        });
                    });
                });
        	},

            getWithdrawAndReceived(i){
                var self = this;
                var r_obj = receive_items.where({receive_id: i}, false);
                var w_obj = withdraw_items.where({item: i}, false);
                require(['modules/receiveitem_module'], function(RIM){
                    var list = RIM.createList(r_obj, w_obj);
                    if (list.length) {
                        console.log(list);
                        self.showReport(list, i);
                    }else {
                        $('#modal-receive-withdraw-report').modal('hide');
                        alert('No report was found for this item');
                    }
                });
            },

            showReport(list, i){
                require(
                        [
                          'views/iso/view_list_of_stock_card_withdraw_receive_report'
                        ], 
                        function(ListOfReports){
                            new ListOfReports({
                                collection: list,
                                model: products.get(i)
                            });
                    });
            }

            
    });
   
    return Subview; 
});