define(['underscore','backbone',
	'text!templates/withdraw/summary/temp_list_of_monthly_withdrawal.html',
	'modules/functions',
	'moment',
	'printarea'], 
	function(_, Backbone, template, fn, moment, printArea) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#tbl-summary-list-withdrawal',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var sortedList = fn.sortByKey(self.collection.toJSON(), 'name'); 
                var output = self.template({
                	'library': new Backbone.Collection(sortedList).toJSON(),
                	'self': self
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    	
        	onRender: function(){
                var self = this;

                $(function() {
                	var d1 = moment($('#d1').val()).format('MMMM DD, YYYY'), 
                	d2 = moment($('#d2').val()).format('MMMM DD, YYYY');
                	var text = 'WITHDRAWAL SUMMARY: ' + self.getDate(d1, d2);
                	self.$el.find('#page-header').html(text);
                });

                $(function() {

                	self.$el.find('#btnPrint').on('click', function(event){
                		self.$el.find('th, td').css({
                            'font-size': '12px',
                            'padding': '2px'
                        });
                		$('#tbl-to-print').printArea();
                	});
                });
        	},

        	findCategory(model){
        		var rs = products.where({id: model.item});
        		if (rs.length) {
                    var item = products.get(model.item);
                    var rsCat = categories.where({id: item.get('category')});
                    if (rsCat.length) {
                        return categories.get(item.get('category')).get('name');
                    }else {
                        return '-';
                    }
                }else {
                    return '-';
                }
        	},

        	getDate(d1, d2){
        		var year1 = moment(d1).format('YYYY');
        		var year2 = moment(d2).format('YYYY');
        		if (year1 === year2) {
        			return moment(d1).format('MMMM DD') + ' to ' + moment(d2).format('MMMM DD, YYYY')
        		}else {
        			return moment(d1).format('MMMM DD, YYYY') + ' to ' + moment(d2).format('MMMM DD, YYYY')
        		}
        	}
    
    });
   
    return Subview; 
});