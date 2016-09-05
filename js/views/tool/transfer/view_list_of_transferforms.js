define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_list_of_transferforms.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfTransferForms = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#history-of-transfered-tool',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['moment','modules/transferform_module','modules/warehouse_module','libs/backbone.obscura'], 
                    function(momentJS, TFM, warehouse_module, Obscura){
                        self.$el.off();
                        self.$el.empty();
                        var output = self.template({
                            'library': TFM.sort(self.collection, Obscura).toJSON(), 
                            'WM': warehouse_module, 
                            'moment': momentJS,
                            'tfm': TFM 
                        });
                        self.$el.append(output);
                        TFM.init(self, self.collection.length);
                });
    	        return self;
        	},

            checkedTools: function(){
                var self = this;
                var ids = [];
                $('#history-of-transfered-tool').find('input[type="checkbox"]:checked').each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
            }

    
    });
   
    return ViewListOfTransferForms; 
});