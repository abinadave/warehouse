define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/returned/temp_panel_returned_tools.html'
	],  function(_, Backbone, template) {
   
    var ViewPanelReturnedTool = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main-returned',
    
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
                   self.$el.find('th').addClass('text-center');

                   self.$el.find('#search').keyup(function(event) {
                       var value = $(this).val().toLowerCase();
                       require(['modules/collection_module','views/tool/returned/view_list_of_returned_tools'], 
                            function(colmod, Subview){
                                var list = colmod.search('returned_tools', value);
                                var view = new Subview({
                                    collection: list
                                });
                                view.render();
                       });
                   });
                });
        	}
    
    });
   
    return ViewPanelReturnedTool; 
});