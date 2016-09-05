define(['text!templates/product/attribute/temp_list_of_item_areas.html'], function(template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-item-shelfs',
    
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
                    	self.$el.html('<tr><td colspan="4">No data was found</td></tr>')
                    };
                });

                $(function() {
                	self.$el.find('a').click(function(event) {
                		var id = this.id;

                        require(
                            [
                                'libs/load_css/loadcss',
                                'libs/alertify/js/alertify.min'
                            ], 
                            function(css, alertify){
                                loadCSS('js/libs/alertify/css/alertify.core.css');
                                loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                alertify.confirm('Are you sure ?', function(e){
                                    if (e) {
                                        item_shelfs.remove(id);
                                    }else {
                                        console.log(e);
                                    }
                                });
                        }); 
                		
                	});
                });
        	}
    
    });
   
    return Subview; 
});