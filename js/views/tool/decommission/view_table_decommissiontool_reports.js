define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/decommission/temp_table_decommissiontool_reports.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main-decommissioned',
    
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
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('thead th').addClass('text-center');

                    self.$el.find('#search').keyup(function(event) {
                        var value = $(this).val();
                        require(['modules/collection_module'], function(cm){
                            var list = cm.search('decommission_forms', value);
                            if (list.length) {
                                require(['views/tool/decommission/view_list_of_decommission_forms'], function(Subview){
                                    var view = new Subview({ collection: list });
                                });
                            }else {
                                require(['modules/functions'], function(fn){
                                    fn.noDataWasFound('#list-of-decommission-forms', 4, '<strong>No data was found for: </strong>'+value);
                                });
                            }
                        });
                    });

                });
        	}
    
    });
   
    return Subview; 
});