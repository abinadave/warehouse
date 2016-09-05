define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_list_of_warehouse_admin.html',
        'modules/product_module',
        'views/product/view_list_of_products'
	],  function(_, Backbone, template, pm, SubviewProducts) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.on('render', this.onRender());
        		this.render();
        	},
    
        	tagName: 'select',
    
        	el: '#display-by-warehouse-admin',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},

        	onRender: function(){
                var self = this;
        		self.$el.change(function(event) {
                    /* Act on the event */
                    var value = $(this).val();
                    if ($('#panel-stock-cards').length) {
                        if (Number(value) === 0) {
                            var view = new SubviewProducts({
                                collection: products
                            });
                            view.render();
                        }else {
                            var items = pm.getItems(value);
                            var view = new SubviewProducts({
                                collection: items
                            });
                            view.render();
                        }
                    }
                });
        	}
    
    });
   
    return Subview; 
});