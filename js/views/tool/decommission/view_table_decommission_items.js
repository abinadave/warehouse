define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/decommission/temp_table_decommission_items.html'
	],  function(_, Backbone, template) {
   
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
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('#modalDecommissionItems').modal('show');
                    self.$el.find('input').addClass('form-control');
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        self.$el.find('#div-modalDecommissionItems').draggable({cursor: 'move'});
                    });
                });

                $(function() {
                    self.$el.find('form button').click(function(event) {
                       var res = this.id.split(',');
                       var thisid = res[0];
                       $(this).replaceWith('<i id="' + thisid + '" class="fa fa-cog fa-spin fa-3x"></i>');
                       require(['modules/decommissionitem_module'], function(dim){
                           dim.editStatus(res, thisid);
                       });
                    });
                });
        	}
    
    });
   
    return Subview; 
});