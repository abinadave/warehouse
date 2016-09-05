define(['underscore','backbone',
	'text!templates/receiving_report/temp_list_of_receive_history_items.html','moment'], 
	function(_, Backbone, template, moment) {
   
    var ListOfHistoryRItem = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-receiving-history',
    
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
                });

                jQuery(document).ready(function($) {
                    var id = '#table-receive-history';
                    require(['modules/functions'], function(fn){
                        fn.datatablePlugin(id);
                    });
                });
        	}
    
    });
   
    return ListOfHistoryRItem; 
});