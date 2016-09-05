define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_list_of_return_tools.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-return-tools',
    
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
                self.init(self.collection.length);
    	        return self;
        	},
    
        	init: function(length){
                var self = this;
                  self.$el.find('a').click(function(event) {
                        var res = this.id.split('-');
                        var cond = {borrower_id: res[0], tool_id: 'TL-' + res[2]};
                        var rs = borrower_items.where(cond);
                        if (rs.length) {
                            var item = borrower_items.findWhere(cond);
                            item.set({status: '1'});
                            var id = res[0] + '-TL-' + res[2];
                            $(this).replaceWith('<i id="'+id+'" class="fa fa-refresh fa-spin fa-2x"></i>');
                            borrower_items.current_return = id;
                        }else {
                            console.log('cant find item');
                            router.alertify_error('Tool has already returned');
                        }
                    });
        	}
    
    });
   
    return Subview; 
});