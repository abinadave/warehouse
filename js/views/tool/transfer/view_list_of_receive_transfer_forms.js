define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_list_of_receive_transfer_forms.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-receiving-transfer-forms',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['moment','modules/warehouse_module','modules/transferedtool_module','modules/transferform_module'], 
        	    	function(momentJS, WarehouseModule, TTM, TFModule){
		                self.$el.off();
		                self.$el.empty();
		                var list = TTM.sortReceivableTools(self.collection,);
		                var output = self.template({'library': list.toJSON(), 'moment': momentJS, 'WM': WarehouseModule, 'TFM': TFModule });
		                self.$el.append(output);
		                self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
        		var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('a').click(function(event) {
                    	var id = this.id;

	                    	require(['modules/transferitem_module','collections/mycollection','libs/backbone.obscura'], 
	                    		function(TIM, MyCollection, Obscura){

		                    	    var items = TIM.getTransferItems(id, transfer_items);
		                    	    var ids = items.pluck('tool_id');
		                    	    var found = new MyCollection();     	    
		                    	   
		                    	    require(['modules/transferedtool_module'], function(TTM){
		                    	        TTM.appendModalReceivableTools();
		                    	        setTimeout(function() {
		                    	        	TTM.appendListOfTransferedTools(items);
		                    	        }, 500);
		                    	    });	   
							});

                    });
                });

				$(function() {
					console.log(length)
					if (length == 0) {
						router.alertify_error('No receivable item was found');
						setTimeout(function() {
							router.navigate('availableTools', true);
						}, 500)

					}
				});


        	}
    
    });
   
    return Subview; 
});