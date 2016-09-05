define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/decommission/temp_list_of_decommission_forms.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-decommission-forms',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['moment','modules/warehouse_module','modules/decommissionform_module'], function(moment, wm, dfm){
	                self.$el.off();
	                self.$el.empty();
                    var list = dfm.sortBy('date', 'desc', self.collection);
	                var output = self.template({'library': list.toJSON(), 'moment': moment, 'wm': wm });
	                self.$el.append(output);
	                self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
        		var self = this;
                $(function(){
                    //jQuery

                    self.$el.find('td').addClass('text-center');

                    if (length == 0) {
                        self.$el.html('<tr><td colspan="4" class="text-danger"><b>No reports was found for Decommissioned tool.</b></td></tr>')
                    };

                    self.$el.find('a').click(function(event) {
                        var id = this.id;
                        var rs = decommission_items.where({decommission_id: id.toString()});
                        if (rs.length) {
                            var item = decommission_items.findWhere({decommission_id: id.toString()});
                            require(['modules/decommissionitem_module'], function(dim){
                                dim.appendTableDecommissionItem(item);
                            });
                        };

                    });

                });
        	}
    
    });
   
    return Subview; 
});