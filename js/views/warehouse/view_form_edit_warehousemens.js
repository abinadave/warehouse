define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_form_edit_warehousemens.html'
	],  function(_, Backbone, template) {
   
    var ViewFormEditWarehousemens = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-form-edit-warehousemen',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'submit #form-edit-warehousemens': 'editWarehousemen'
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
                    $('#form-edit-warehousemens').find('label').css({
                        marginTop: '5px',
                        marginLeft:'10px'
                    });
                });
        	},

        	editWarehousemen: function(event){
        		event.preventDefault();
        		var form = $('#form-edit-warehousemens').serialize();
        		require(['modules/warehousemen_module'], function(module){
        		     module.updateDB(form);
                     console.log(form);
        		});
        	}
    
    });
   
    return ViewFormEditWarehousemens; 
});