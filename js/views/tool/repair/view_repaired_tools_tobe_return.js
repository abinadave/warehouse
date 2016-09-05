define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/repair/temp_repaired_tools_tobe_return.html'
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
                    self.$el.find('#modalRepairedToolsToBeReturn').modal('show');
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        self.$el.find('#div-modalRepairedToolsToBeReturn').draggable({cursor: 'move'});
                    });
                });

                $(function() {
                	self.$el.find('th td').addClass('text-center')
                });

                $(function() {
                	self.$el.find('a').click(function(event) {
                		var res = this.id.split(",");
                		var className = $(this).attr('class');
                		require(['modules/repairitem_module'], function(rim){
                		    rim.editStatus(res, className) 
                		});
                	});
                });
        	}
    
    });
   
    return Subview; 
});