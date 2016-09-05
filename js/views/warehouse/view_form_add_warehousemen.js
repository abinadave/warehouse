define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_form_add_warehousemen.html'
	],  function(_, Backbone, template) {
   
    var ViewFormAddWarehouseMen = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-form-add-warehousemen',
    
        	template: _.template(template),
    
            events: {
                // bound events,
                'click #btnSaveWarehousemen': 'saveWarehouseMen'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template();
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                   require(['libs/jquery-ui/jquery-ui.min'], function(){
                      $('#div-modalAddNewWarehouseMen').draggable({cursor: 'move'});
                   });
                });
        	},

            saveWarehouseMen: function(event){
                event.preventDefault();
                var form = $('#form-add-warehousemen').serialize();
                require(['modules/warehousemen_module'], function(module){
                    module.saveDB(form);
                    console.log(form)
                });
            }
    
    });
   
    return ViewFormAddWarehouseMen; 
});