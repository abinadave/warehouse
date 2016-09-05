define(
	[
		'underscore',
		'backbone',
		'text!templates/classification/temp_list_of_searched_classification.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'ul',
    
        	el: '#list-searched-classification',
    
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
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('li').hover(function() {
                    	$(this).addClass('text-primary');
                    }, function() {
                    	$(this).removeClass('text-primary');
                    });
                });

                $(function() {
                	self.$el.find('li').click(function(event) {
                		var id = this.id;
                		var target = event.target.nodeName;
                		var res = id.split('-');
                		self.$el.empty();
                		$('#search-classification').val(res[1]);
                		$('#hidden-classification').val(res[0]);
                	});
                });
        	}
    
    });
   
    return Subview; 
});