define(['underscore','backbone',
	'text!templates/warehouse/temp_list_of_current_stocks.html'], function(_, Backbone, template) {
   
    var SubviewList = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-current-stocks',
    
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
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    require(['modules/functions'], function(fn){
                        fn.datatablePlugin('#table-current-stocks');
                    });
                    $('span#no-of-current-items').text(self.collection.length);
                });
        	}
    
    });
   
    return SubviewList; 
});