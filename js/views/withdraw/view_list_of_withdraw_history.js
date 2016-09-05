define(['underscore','backbone',
	'text!templates/withdraw/temp_list_of_withdraw_history.html','moment'], 
	function(_, Backbone, template, moment) {
   
    var ListOfHistories = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-withdraw-history',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'moment': moment });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    self.$el.find('td').addClass('text-center');
                    require(['modules/functions'], function(fn){
                        fn.datatablePlugin('#table-withdraw-history');
                    });
                });
        	}
    
    });
   
    return ListOfHistories; 
});