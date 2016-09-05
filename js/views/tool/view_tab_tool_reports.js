define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/temp_tab_tool_reports.html'
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
                $(function(){

                    //jQuery

                  
                    	require(
                            [ 'modules/borrowerform_module',
                              'modules/transferform_module',
                              'modules/classification_module',
                              'modules/warehouse_module',
                              'modules/collection_module'], 
                            function(BFM, TFM, CM, WM, colmod){

    			        	    BFM.appendTableBorrowedHistory().fetchData();
                                TFM.appendTabeHistoryOfTransferedTool().fetchData();

                                CM.fetchData();
                                WM.fetchData();
                                router.add_loading_btn('#main-transfered #btnRefreshData', 2000);

			        	});	
                   
                        require(
                            [
                                'modules/returnedtool_module',
                                'modules/classification_module',
                                'modules/decommissionform_module',
                                'modules/repairform_module',
                                'modules/transferedtool_module'
                            ], 
                            function(ReturnedToolModule, CM, dfm, RepairFormModule, ttm){
                                ReturnedToolModule.appendPanelReturnedTool().fetchData();
                                dfm.appendTableDecommissionReport();
                                RepairFormModule.appendHistoryOfRepairtool().fetchData();
                                CM.fetchData();
                                ttm.getNumberOfReceivableTools();
                        });


                    

                    setTimeout(function() {
                        require([
                            'modules/collection_module','modules/decommissionform_module',
                            'modules/decommissionitem_module',
                            'modules/decommissiontool_module'
                            ], 
                            function(cm, dfm, dim, dtm){
                               // str_collection, thismodule, tbl, code
                               cm.fetchWhere('decommission_forms', dfm);
                               cm.fetchData('decommission_items', 'decommission_items', dim);
                               cm.fetchData('decommission_tools', 'decommission_tools', dtm);
                        });
                    }, 1000);

                    

                });
        	}
    
    });
   
    return Subview; 
});