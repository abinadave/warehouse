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
    
        	el: '#list-of-borrower-forms, #list-of-borrower-pforms',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
                // alert('render')
        	    var self = this;
                require(['moment','modules/borrowerform_module','libs/backbone.obscura'], function(momentJS, BFM, Obscura){
                    self.$el.off();
                    self.$el.empty();
                    var list = BFM.sort(self.collection, Obscura);
                    var output = self.template({'library': list.toJSON(), 'moment': momentJS });
                    self.$el.append(output);
                    BFM.init(self, self.collection.length);
                });    
                return self;
        	}
    
    });
   
    return ViewListOfBorrowerForms; 
});
