define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_modal_receivable_tools.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
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
                    $('#modalReceivableTools').modal();
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#div-modalReceiveableTools').draggable({});
                    });
                });

                 $(function() {
                    

                    self.$el.find('#btnReceiveTool').click(function(event) {
                        /* Act on the event */
                       var found = self.findChecked();
                       console.log(found)
                        require(
                                [
                                    'modules/transferedtool_module',
                                    'libs/load_css/loadcss',
                                    'libs/alertify/js/alertify.min',
                                    'modules/tool_module',
                                    'models/transfered_tool'
                                ], function(TransferedToolModule, css, alertify, ToolModule, Transfered_tool){

                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                    alertify.confirm('Are you sure ?', function(e){

                                    if (e) {
                                        var rs = transfered_tools.where({id: found});
                                        if (rs.length) {
                                            var tool = transfered_tools.get(found);
                                            var transfered_tool = new Transfered_tool({ id: tool.get('id'), tool_id: tool.get('tool_id'), classification: tool.get('classification'), model: tool.get('model'), size: tool.get('size'), rand: tool.get('rand'), remarks: tool.get('remarks'), serial_no: tool.get('serial_no'), unit: tool.get('unit'), area_located: tool.get('area_located'), warehouse_code: sessionStorage.getItem('code') });
                                            transfered_tools.afterRemoved(transfered_tool.attributes);
                                            TransferedToolModule.removeDB(found, true);
                                        }
                                    }else {
                                        console.log(e);
                                    }

                                });    
                               
                            });
                    });
                });

        	},

            findChecked: function(){
                var found = '';
                $(this.$el.selector).find('tr').each(function(index, el) {
                    if ($(this).hasClass('tr-2')) {
                        found = this.id;
                    };
                });
                return found;
            }
    
    });
   
    return Subview; 
});