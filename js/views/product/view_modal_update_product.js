
define(
	[
		'underscore',
		'backbone',
		'text!templates/product/temp_modal_update_product.html'
	],  function(_, Backbone, template) {
   
    var ViewModalUpdateProduct = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-update-product',
    
        	template: _.template(template),
    
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;

                $(function() {
                    self.$el.find('#item-setting').click(function(event) {
                        require(['views/product/attribute/view_modal_item_setting'], function(Subview){
                            var view = new Subview();
                        });
                    });
                });
                
                $(function(){

                    //jQuery
                     $('#form-update-product').find('input, select').css({
                        width: '300px',
                        margin: '5px'
                    }).end().find('label').addClass('text-info');

                });

                $(function() {
                    self.$el.find('#btnUpdateItem').click(function(event) {
                        event.preventDefault();
                        var form = $('#form-update-product').serialize();
                        form+='&pid=' + $('#hidden-pid').val();
                        require(['modules/product_module'], function(module){
                            module.updateDB(form);
                            // console.log(form);
                        });
                    });
                });
        	}
    
    });
   
    return ViewModalUpdateProduct; 
});