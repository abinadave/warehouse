define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_list_of_receive_transfer_tools.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfTransferTools = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-receive-transfered-tools',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/classification_module'], function(CM){
                    self.$el.off();
                    self.$el.empty();
                    var output = self.template({'library': self.collection.toJSON(), 'ClassificationModule':  CM });
                    self.$el.append(output);
                    self.init(self.collection.length);
                });
                return self;
        	},
    
        	init: function(length){

                var self = this, $el = $('#list-of-receive-transfered-tools');
  
                $(function(){
                    if (length == 0) {  
                        $('#btnReceiveTool').hide();
                    }

                    self.$el.find('a').click(function(event) {
                        var str = this.id.split(',');
                        var className = $(this).attr('class');
                      
                         var tim = require('modules/transferitem_module');
                         tim.editStatus(str, className);
                    });
                });



                
        	},

            findItem: function(res){
                console.log(res)
                var where = {transfer_id: res[1], tool_id: res[0]};
                var rs = transfer_items.where(where);
                if (rs.length) {
                    var item = transfer_items.findWhere(where);
                    if (item.get('status') == '0') {
                        return true;
                    }else {
                        return false;
                    }
               
                } else{
                    return false;
                };
            }
    
    });
   
    return ViewListOfTransferTools; 
});