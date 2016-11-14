define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_list_of_receiving_items.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfReceivingItems = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-receiving-items',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/product_module'], function(module){
                    self.$el.empty();
                    var output = self.template({'library': self.collection.toJSON(), 'ProductModule': module});
                    self.$el.append(output);
                    self.init();
                });
                
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                    
                    //jQuery
                    self.$el.find('a').click(function(event) {
                        var id = this.id;
                        var res = id.split(',');

                        var thisid = 'el-' + id;
                        var newid = thisid.replace(',','-');
                        $(this).replaceWith('<i id="'+ newid +'" class="fa fa-spinner fa-spin fa-2x"></i>');

                        var rs = self.findItem(res);

                        if (rs) {
                           
                            var rs = transfered_tools.where({tool_id: res[0]});
                            if (rs.length) {
                                require(['models/model','modules/transferedtool_module','modules/transferitem_module'], 
                                    function(Transfered_tool, TransferedToolModule, TransferItemModule){
                                        var tool = transfered_tools.findWhere({tool_id: res[0]});
                                        var transfered_tool = new Transfered_tool({  id: tool.get('id'),  tool_id: tool.get('tool_id'),  classification: tool.get('classification'),  model: tool.get('model'),  size: tool.get('size'),  rand: tool.get('rand'),  remarks: tool.get('remarks'),  serial_no: tool.get('serial_no'),  unit: tool.get('unit'),  area_located: tool.get('area_located'),  warehouse_code: sessionStorage.getItem('code'), shelf: tool.get('shelf'), row: tool.get('row') });
                                        transfered_tools.afterRemoved(transfered_tool.attributes);
                                        TransferedToolModule.removeDB(res[0], true);
                                        TransferItemModule.editStatus(res, newid);
                                });
                            } else{
                                router.alertify_error('Cant find item');
                            };

                        }else {
                            console.log('no item was found for: '+ res);
                        }

                        setTimeout(function() {
                           
                        }, 2000);

                    }); 

                });

                $(function() {
                    self.$el.find('th, td').css({
                        padding: '2px',
                        fontSize: '12px'
                    });
                });

                $(function() {
                    let count = self.collection.length;
                    let rows_to_append = 10 - count;
                    let html = '';
                    for (var i = 0; i < rows_to_append; i++) {
                        html += '<tr>';
                            html += '<td style="color: white; !important"><span style="color: transparent !important">-</span></td>'
                            html += '<td style="color: white; !important"><span style="color: transparent !important">-</span></td>'
                            html += '<td style="color: white; !important"><span style="color: transparent !important">-</span></td>'
                            html += '<td style="color: white; !important"><span style="color: transparent !important">-</span></td>'
                            html += '<td style="color: white; !important"><span style="color: transparent !important">-</span></td>'
                        html += '</tr>';
                    }
                    self.$el.append(html);
                });
        	}
    
    });
   
    return ViewListOfReceivingItems; 
});