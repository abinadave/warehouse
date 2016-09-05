define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/repair/temp_list_of_repair_forms.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfRepairForms = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-repairforms',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['moment','modules/repairform_module','libs/backbone.obscura'], function(momentJS, RFM, Obscura){
                    self.$el.off();
                    self.$el.empty();
                    var list = RFM.sort(self.collection, Obscura);
                    var output = self.template({'library': list.toJSON(), 'moment': momentJS });
                    self.$el.append(output);
                    self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
                var self = this;
                var $el = $('#list-of-repairforms');
                var $panel2 = $('#panel-repairitem');
                $(function(){
                    //jQuery
                    self.$el.find('a').click(function(event) {
                        var id = this.id;
                        var rim = require('modules/repairitem_module');
                        var item = repair_items.findWhere({repair_id: id.toString()});
                        rim.appendItemToBeReturn(item);
                        console.log(item.attributes)
                    });
                });

                jQuery(document).ready(function($) {
                    if (length == 0) {
                        require(['modules/functions'], function(fn){
                            fn.noDataWasFound('#list-of-repairforms', 5, '<b style="text-danger">No history was found for Repaired Tools</b>');
                        });
                    };
                });

                $(document).ready(function() {
                    var popover = self.$el.find('[data-toggle="popover"]').popover({
                            trigger : 'hover',  
                            placement : 'left',
                            html: 'true'
                        });

                        popover.on('show.bs.popover', function() {
                            var i = this.id;
                            var rs = repair_items.where({repair_id: i});
                            if (rs.length) {
                                var item = repair_items.findWhere({repair_id: i});
                                var output = '';
                                output += '<div style="width: 100px"><label>Tool name</label>: <h5></small><i>'+ item.get('name')+'</i></small></h5>';
                                output += '<label>Unit</label> <h5></small><i>'+ item.get('unit')+'</i></small></h5>';
                                output += '</div>';
                                popover.attr('data-content', output);
                            }
                        });
                });
        	}
    
    });
   
    return ViewListOfRepairForms; 
});