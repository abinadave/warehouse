define(['underscore','backbone',
	'text!templates/product/borrow/temp_list_of_borrower_pitems.html'], 
	function(_, Backbone, template) {
   
    var listOfBorrowerItems = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-borrower-pitems',
    
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
                    //jQuery
                    self.$el.find('td').addClass('text-center');
                });

              
        	}
    
    });
   
    return listOfBorrowerItems; 
});