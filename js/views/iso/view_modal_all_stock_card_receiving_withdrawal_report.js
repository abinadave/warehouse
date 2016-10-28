define(['underscore','backbone',
	'text!templates/iso/temp_modal_all_stock_card_receiving_withdrawal_report.html',
    'views/iso/view_list_of_all_stock_card_r_w_report'], 
	function(_, Backbone, template, SubviewReport) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-all-stock-card-r-w-report',
    
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
                    $('#modal-all-stock-card-r-w-report').on('shown.bs.modal', function(event) {
                    	self.clientRender();        
                        // self.backEndRender();         	
                    });
                    $('#modal-all-stock-card-r-w-report').on('hidden.bs.modal', function(event) {
                    	router.navigate('products');get_reports_withdrawal_receiving.php
                    });
                });

                $(function() {
                    self.$el.find('#printReport').on('click', function(event){
                        require(['printarea'], function(printArea){
                            $('#list-of-stock-card-report-w-r').printArea();
                        });
                    });
                });
        	},

            backEndRender(){
                $('#list-of-stock-card-report-w-r').load('ajax/select/iso/get_reports_withdrawal_receiving.php');
            },

            clientRender(){
                var self = this;
                $.when(products.fetch({
                    silent: true
                })).then( (resp) => {
                    new SubviewReport({
                        collection: products
                    });
                }, (errorResponse) => {
                    console.log('error');
                    alert(errorResponse);
                });
            }

    });
   
    return Subview; 
});