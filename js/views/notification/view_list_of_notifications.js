define(['underscore','backbone','text!templates/notification/temp_list_of_notifications.html'], 

	function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'ul',
    
        	el: '#list-of-notifications',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['moment'], function(moment){
	                self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(), 'moment': moment });
	                self.$el.append(output);
                    self.onRender(self.collection.length);
                });
    	        return self;
        	},
    
        	onRender: function(length){
                var self = this;
                $(function(){
                    //jQuery

                    if (length == 0) {
                    	var output = '';
                    	    output += '<li>';
                            output += '<a href="#">';
                            output += '<div>';
                            output += '<i class="fa fa-comment fa-fw"></i> No result was found';
                            output += '</div>';
                            output += '</a>';
                        	output += '</li>';
                    	self.$el.html(output);	
                    }else {
                        
                    }


                    //notification IOSBadge..
                    
                    
                });
        	}
    
    });
   
    return Subview; 
});