define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_list_of_tools_tobe_returned.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfToolsToBeReturned = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-tools-tobe-returned',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this
                require(['modules/borroweritem_module','moment'], function(BorrowedToolModule, momentJS){
                    self.$el.off();
                    self.$el.empty();
                    var output = self.template({'library': self.collection.toJSON(), 'btm': BorrowedToolModule, 'moment': momentJS });
                    self.$el.append(output);
                    self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
                var self = this;
           

                $(function() {
                    if (length == 0) {
                        $('#btnReturnTool').hide();
                        $(self.$el.selector).html('<tr class="text-danger" style="font-size: 13px"><td colspan="8">No data was found</td></tr>');
                    }
                });


                $(function() {
                    // self.$el.find('a').click(function(event) {
                    //     var id = this.id;
                    //     var bm = require('modules/borroweritem_module');
                    //     var fn = require('modules/functions');
                    //     var items = bm.getItemsWhereIdOf(borrower_items, id);
                    //     fn.appendView('views/tool/borrow/view_modal_return_tools');
                    //     bm.appendReturnTools(items);
                    // });
                });

                $(function() {
                    self.$el.find('td').addClass('text-center');
                });
        	}
    
    });
   
    return ViewListOfToolsToBeReturned; 
});