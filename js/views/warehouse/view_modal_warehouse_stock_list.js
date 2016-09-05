define(['underscore','backbone','text!templates/warehouse/temp_modal_warehouse_stock_list.html',
	'modules/currentstock_module'], 
	function(_, Backbone, template, currentstock_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'model': self.model.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('#modalStockList').modal('show');
                    current_stocks.reset();
                    $.post('ajax/select/select_all_where.php', {
                    	table: 'products',
                    	where: 'warehouse_code',
                    	value: self.model.get('id')
                    }, function(json, textStatus, xhr) {
                    	/*optional stuff to do after success */
                    }).success(function(data){
                    	var json = $.parseJSON(data);
                    	current_stocks.add(json);
                    	currentstock_module.appendList(current_stocks);
                    }).fail(function(xhr){
                    	alert('error type: '+xhr.status);
                    });
                });

                jQuery(document).ready(function($) {
                    setTimeout(function() {
                        $.post('ajax/select/select_all_where.php', {
                            table: 'tools',
                            where: 'warehouse_code',
                            value: self.model.get('id')
                        }, function(json, textStatus, xhr) {
                            /*optional stuff to do after success */
                        }).success(function(data){
                            var json = $.parseJSON(data);
                            
                        }).fail(function(xhr){
                            alert('error types: '+xhr.status);
                        });
                    }, 1000);
                });
        	}
    
    });
   
    return Subview; 
});