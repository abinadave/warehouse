define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_table_warehousemens.html'
	],  function(_, Backbone, template) {
   
    var ViewTableWarehouseMens = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-table-warehousemens',
    
        	template: _.template(template),
    
            events: {
                // bound events
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
                $(function(){
                    //jQuery

                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#div-modalWarehousemenModal').draggable({
                            cursor: "move"
                        });
                    });
                    
                });
        	}
    
    });
   
    return ViewTableWarehouseMens; 
});