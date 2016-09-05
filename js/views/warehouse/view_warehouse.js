define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_warehouse.html',
        'modules/warehouse_module'
	],  function(_, Backbone, template, wm) {
   
    var ViewWarehouse = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'keyup #search-warehouse': 'searchForWarehouse'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                var $panel = $('#panel-warehouse');
                $(function(){
                    //jQuery
                   $('#form-create-warehouse-branch').find('input[type="text"]').css({
                   		width: '280px'
                   }); 
                });

                $(function() {
                    self.$el.find('#btnViewStocks').click(function(event) {
                        var warehouse = warehouses.get($('#hidden-warehouse-location-table').val());
                        wm.appendWarehouseStockList(warehouse);
                    });
                });

                $(function() {
                    $('#btnShowWarehouseMen').click(function(event) {
                       var value = $('#hidden-warehouse-location-table').val();
                           var result = warehousemens.where({code: value});
                           if (result.length) {

                                require(['libs/jquery-ui/jquery-ui.min'], function(){
                                    $('#modalWarehousemenModal').modal({
                                       backdrop: 'static',
                                       keyboard: false
                                    });
                                    $('#div-modalWarehousemenModal').draggable({cursor:"move"});
                                });
                                
                                require(['modules/warehousemen_module','modules/warehouse_module'], function(WarehousemenModule, WarehouseModule){
                                     var myCollection = WarehousemenModule.getAllWarehousemenWithCodeOf(value);
                                     var name = WarehouseModule.getWarehouseLocation(value);
                                     $('#warehouse-table-code').text(name);
                                     WarehousemenModule.appendListOfWarehouseMens(myCollection);
                                });

                           }else {
                               router.alertify_error('No warehousemen was found');
                           }
                    });


                    $panel.find('input#search').keyup(function(event) {
                        var value = $(this).val();
                        var $el = $(this);
                        require(['modules/warehouse_module','views/warehouse/view_list_of_warehouse_branches'], function(WarehouseModule, ViewListOfWarehouseBranches){
                            var lists = WarehouseModule.searchAndReturnModels(value.toLowerCase());
                            if (lists.length) {
                                var view = new ViewListOfWarehouseBranches({
                                    collection: lists
                                });
                                view.render();
                            } else{
                                var output = '<tr><td colspan="5">No data was found for: '+ value+'</td></tr>';
                                $('#list-of-warehouse-branches').html(output);
                            };  
                        });
                    });
                });
        	},

            searchForWarehouse: function(event){
                var value = event.currentTarget.value;
                require(['modules/warehouse_module'], function(WarehouseModule){
                    WarehouseModule.searchAndReturnModels(value);
                });
            }


            
    
    });
   
    return ViewWarehouse; 
});