define(['underscore','backbone',
	'text!templates/withdraw/summary/temp_modal_monthly_withdrawals.html',
    'moment'],
	 function(_, Backbone, template, moment) {
   
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
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                
                $(function(){
                    $('#modal-monthly-withdrawal-summary').modal('show');
                });

                $(function() {
                    self.$el.find('form').on('submit', function(event) {
                        event.preventDefault();
                        var d1 = moment(self.$el.find('#d1').val()).format('MMMM DD, YYYY'),
                        d2 = moment(self.$el.find('#d2').val()).format('MMMM DD, YYYY');
                        var found = self.filterBetween(d1, d2);
                        if (!found.length) {
                            router.alertify_error('No withdraw item was found from: ' +d1 + ' to: ' +d2);
                        }else {
                            var collection = self.createReport(found);
                            self.appendList(collection);
                        }
                    });
                });
        	},

            createReport(list){
                /* 
                    finding items in specific dates. 
                    finding total withdraw in every item inside the database. (Tools not included) 
                */
                var collection = new Backbone.Collection();
                var items = [];
                list.forEach(function(json) {
                    items = withdraw_items.where({withdraw_id: json.id}, false);
                    items.forEach(function(item) {
                        if (collection.where({item: item.get('item')}).length) {
                            var model = collection.where({item: item.get('item')}, true);
                            var qty = Number(model.get('qty')) + Number(item.get('qty'));
                            model.set({qty: qty.toString()}, {silent: true});
                        }else {
                            collection.add(item);
                        }
                    });
                });
                return collection;
            },

            filterBetween(d1, d2){
                var date = '', isBetween = false;
                return withdraw_forms.toJSON().filter(function(model) {
                    date = moment(model.date).format('MMMM DD, YYYY');
                    isBetween = moment(date).isBetween(d1, d2);
                    return isBetween === true;
                });
            },

            appendList(list){
                require(['views/withdraw/summary/view_list_of_monthly_withdrawal'], 
                    function(ListOfSummary){
                    new ListOfSummary({
                        collection: list
                    });
                });
            }
    
    });
   
    return Subview; 
});