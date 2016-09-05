define(['underscore','backbone',
	'text!templates/product/history/temp_table_withdraw_history_of_item.html',
	'modules/withdrawitem_module'], 
	function(_, Backbone, template, wim) {
   
    var SubviewTable = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#withdraw-history-item',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    var route = Backbone.history.fragment;
                    // alert(route);
                    var id = route.split('/')[1];
                    if (self.$el.length) {
                    	var list = wim.findWithdraws(id);
                    	wim.appendHistoryOfItem(list);
                    }

                    self.$el.find('th').addClass('text-center');
                    
                });

                $(function() {
                    var PC_width = $(window).width();
                    self.$el.find('#table-withdraw-history').css({
                        'width': PC_width + 'px',
                        'font-size': '12px'
                    });
                });
        	}
    
    });
   
    return SubviewTable; 
});