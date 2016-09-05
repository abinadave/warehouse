define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/repair/temp_modal_tools_under_repair.html'
	],  function(_, Backbone, template) {
   
    var ViewModalToolsUnderRepair = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modals',
    
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
                var $modal = $('#modalToolsUnderRepair');
                $(function(){
                    //jQuery
                    $modal.modal('show');
                    require(['libs/jquery-ui/jquery-ui.min'], function(jQueryUI){
                        $('#div-modalToolsUnderRepair').draggable({cursor: 'move'})
                    });
                });

                $(function() {
                    $modal.find('#btnReturnRepairedTool').click(function(event) {
                        /* Act on the event */
                        $modal.find('#list-of-tools-under-repair').find('tr').each(function(index, el) {
                            if ($(this).hasClass('tr-2')) {
                                var id = this.id;
                                var tool = repaired_tools.get(id);
                                require(['modules/repairedtool_module','modules/userlog_module','modules/warehouse_module'], function(RTM, UserlogModule, WarehouseModule){
                                    RTM.removeDB(id);
                                    UserlogModule.saveDB('repaired tool with an ID of: '+ tool.get('tool_id') +' was returned to warehouse: ' + WarehouseModule.getWarehouseLocation(sessionStorage.getItem('code')));
                                });
                            };
                        });
                    });
                });
        	}
    
    });
   
    return ViewModalToolsUnderRepair; 
});