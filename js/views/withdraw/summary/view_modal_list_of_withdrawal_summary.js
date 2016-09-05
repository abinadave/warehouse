define([
	'underscore',
	'backbone',
	'text!templates/withdraw/summary/temp_modal_list_of_withdrawal_summary.html',
	'moment',
    'libs/backbone.obscura',
    'printarea',
    'css!libs/css/style_transparent.css'], 
	function(_, Backbone, template, moment, Obscura, printArea, css1Transparent) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var proxy = new Obscura(self.collection);
                self.collection = proxy.setSort('date', 'asc');
                var output = self.template({
                	'library': self.collection.toJSON(),
                	'model': self.model.toJSON(),
                	'moment': moment,
                	'self': self
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                var transClass = 'transparent-color';
                $(function(){
                    $('#modal-withdrawal-summary').modal('show');
                    self.$el.find('th, td').css({
                    	'padding': '2px'
                    });
                    // self.$el.find('th, td').addClass('transparent-color');
                });

                $(function() {
                    self.$el.find('#btnPrintSummary').on('click', function(event){
                        self.printTable();
                    });
                }); 
                
        	},

            printTable(){
                var self = this;
                $(function() {
                    setTimeout(function() {
                       var div = '#summary-for-printing';
                       $(div).printArea();
                    }, 700);
                });

            },

        	getSite(items){
        		var first = _.first(items);
        		return first.get('remarks');
        	}
    
    });
   
    return Subview; 
});