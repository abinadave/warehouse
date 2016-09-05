define(
	[
		'underscore',
		'backbone',
		'text!templates/customer/contact/temp_list_of_contact.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-contacts',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['moment','modules/contact_module','libs/backbone.obscura'], function(momentJS, module, Obscura){
        	    	self.$el.off();
	                self.$el.empty();
                    var lists = module.sort(Obscura, self.collection);
	                var output = self.template({'library': lists.toJSON(), 'moment': momentJS });
	                self.$el.append(output);   
	                self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
                $(function(){
                    //jQuery
                    var $two = $('#check-all, #btnDeleteAll');
                    if (length == 0) {

                        require(['modules/functions'], function(fn){
                            fn.noDataWasFound('#list-of-contacts', 4, 'No data was found');
                            $two.hide();
                        });
                    }else {
                        $two.show();
                    }
                });
        	}
    
    });
   
    return Subview; 
});