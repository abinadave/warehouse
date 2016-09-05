define(['underscore','backbone','text!templates/deliver/temp_list_of_incomming_items.html'], 
	function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-deliver-items',
    
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
                self.onRender(self.collection);
    	        return self;
        	},
    
        	onRender: function(length){
                var self = this;
                var $modal =$('#modalDeliverItems');

                $(function(){
                    //jQuery

                    $('#check-all-deliver-items').change(function(event) {
                        var is = $(this).is(':checked');
                        self.$el.find('input[type="checkbox"]').prop('checked', is);
                    });

                    
                    if (length == 0) {
                         $('#modalDeliverItems #check-all-deliver-items').hide();
                         $('#modalDeliverItems #btnReceive').hide();
                    }else {
                         $('#modalDeliverItems #check-all-deliver-items').show();
                         $('#modalDeliverItems #btnReceive').show();
                    }

                });

                $(function() {
                    require(['libs/backbone.obscura'], function(Obscura){
                        var proxy = new Obscura(self.collection);
                        proxy.filterBy('status', {status: '0'});
                        if (proxy.length) {
                            $('#modalDeliverItems #check-all-deliver-items').show();
                            $('#modalDeliverItems #btnReceive').show();
                        }else {
                            $('#modalDeliverItems #check-all-deliver-items').hide();
                            $('#modalDeliverItems #btnReceive').hide();
                        }
                    });
                });

        	}
    
    });
   
    return Subview; 
});