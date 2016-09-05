define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_list_of_borrower_forms.html',
        // 'css!libs/css/page-break-table'
	],  function(_, Backbone, template, css) {
   
    var ViewListOfBorrowerForms = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-borrower-pforms',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },

        	render: function(){
        	    var self = this;
                require(['moment','modules/borrowerform_module','modules/borrowerpform_module','libs/backbone.obscura'], function(momentJS, BFM, BPFM, Obscura){
                    self.$el.off();
                    self.$el.empty();
                    var list = BFM.sort(self.collection, Obscura);
                    var output = self.template({'library': list.toJSON(), 'moment': momentJS });
                    self.$el.append(output);
                    BPFM.init(self);
                    self.onRender(self);
                });    
                return self;
        	},

            onRender: function(self) {
                if (!self.collection.length) {
                    var output = '';
                    output += '<tr>';
                    output += '<td colspan="11">No data was found for borrowed items</td>';
                    output += '</tr>';
                    self.$el.html(output);
                };
            }
    
    });
   
    return ViewListOfBorrowerForms; 
});
