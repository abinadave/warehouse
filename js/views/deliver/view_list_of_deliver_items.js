define(
	[
		'underscore',
		'backbone',
		'text!templates/deliver/temp_list_of_deliver_items.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfDeliverItems = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-delivered-items-by-id',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/product_module'], function(PM){
                    self.$el.empty();
                    var output = self.template({
                        'library': self.collection.toJSON(),
                        'ProductModule': PM
                    });
                    self.$el.append(output);
                    self.init();
                });
    	        return self;
        	},
    
        	init: function(){
                var self = this;

                $(function(){
                    self.$el.find('th, td').css({
                        padding: '2px',
                        fontSize: '12px'
                    });
                });

                 $(function() {
                    let count = self.collection.length;
                    let rows_to_append = 10 - count;
                    let html = '';
                    for (var i = 0; i < rows_to_append; i++) {
                        html += '<tr>';
                            html += '<td style="color: white; !important">-</td>'
                            html += '<td style="color: white; !important">-</td>'
                            html += '<td style="color: white; !important">-</td>'
                            html += '<td style="color: white; !important">-</td>'
                            html += '<td style="color: white; !important">-</td>'
                        html += '</tr>';
                    }
                    self.$el.append(html);
                });
        	}
    
    });
   
    return ViewListOfDeliverItems; 
});