define([
	'underscore',
	'backbone',
	'text!templates/withdraw/report/temp_list_of_inventory_report_stock_cards.html',
    'moment'], 
	function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-report-stock-cards',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                var output = self.template({
                    'library': self.collection.toJSON(),
                    'model': self.model.toJSON(),
                    'moment': moment,
                    'self': self 
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
               
        	},

            getWarehouseName(){
                var id = sessionStorage.getItem('code');
                var rs = warehouses.where({id: id});
                if (rs.length) {
                    var model = warehouses.get(id);
                    return model.get('location');
                }else {
                    return id;
                }
            },

            whoPreparedThis(){
                return sessionStorage.getItem('name');
            }
    
    });
   
    return Subview; 
});