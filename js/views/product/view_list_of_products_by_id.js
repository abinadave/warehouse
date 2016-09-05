    define(
	[
		'underscore',
		'backbone',
		'text!templates/product/temp_list_of_products_by_id.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfProductsById = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-products',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(rids){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'ids': rids});
                self.$el.append(output);
                self.init(rids.length);
    	        return self;
        	},
    
        	init: function(length){
                var self = this, $panel = $('#panel-stock-cards');
                $(function(){
                    //jQuery
                    $panel.find('#num-of-stocks').text(length);
                    require(['modules/product_module'], function(module){
                        module.initJQueryClick().initPopoverImage();
                        if (Number(sessionStorage.getItem('usertype')) === 3) {
                            module.initEditableTable();
                        }
                    });
                    
                });
        	}
    
    });
   
    return ViewListOfProductsById; 
});