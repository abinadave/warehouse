define([
    'underscore',
    'backbone',
	'text!templates/withdraw/report/temp_inventory_report_stock_cards.html'
    ], 
	function(_, Backbone, template) {
    
    var SubviewReport = Backbone.View.extend({
    
        	initialize: function(){
                this.loadingIndicator = '<i class="fa fa-spinner fa-2x fa-spin fa-fw"></i><span class="sr-only">Loading...</span> Loading Report Please Wait';
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-stock-card-inventory-report',
    
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
                    self.$el.find('#loading-indicator').html(self.loadingIndicator);
                });

                $(function() {
                    $('#modal-stock-card-inventory-report').on('hidden.bs.modal', function(event) {
                        router.navigate('products', ($('#table-products').length > 0) ? false : true);
                        self.$el.find('#list-of-report-stock-cards').empty();
                    });  
                });

                $(function(){
                    $('#modal-stock-card-inventory-report').on('shown.bs.modal', function(event) {
                        setTimeout(function() {
                            $('#loading-indicator').show();
                            self.checkForReport();
                        }, 600);
                    }); 
                });
        	},

            checkForReport(){
                var self = this;
                if (products.length === 0 || categories.length === 0 || warehouses.length === 0) {
                    require(['modules/functions'], function(Fn){
                        Fn.loadData([
                            'products',
                            'categories',
                            'warehouses'
                        ], function(){
                            self.createReport();
                        });
                    });
                }else {
                    self.createReport();
                }
            },

        	createReport(){
        		var self = this;
        		var arr = products.pluck('id');
				var newArr = [];
				while(arr.length) newArr.push(arr.splice(0,21));
				require(['views/withdraw/report/view_list_of_inventory_report_stock_cards'], 
					function(SubviewList){

                    var pageNumber = 1;
					newArr.forEach(function(models) {
						var models = self.findModels(models);
						new SubviewList({
							collection: new Backbone.Collection(models),
                            model: new Backbone.Model({page_no: pageNumber})
						});
                        ++pageNumber;
					});
                    $('#loading-indicator').hide();
				});
        	},

        	findModels(models){
        		return models.map(function(i) {
        			return products.get(i);
        		});
        	}
    
    });
   
    return SubviewReport; 
});