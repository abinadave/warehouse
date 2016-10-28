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
                    // var id = '#table-receive-history';
                    // require(['modules/functions'], function(fn){
                    //     fn.datatablePlugin(id);
                    // });
                });

                $(function() {
                    var current = Backbone.history.fragment;
                    var str = current.toString().split('/');
                    var stock_id = str[1];
                    var prod = products.get(stock_id);
                    self.getInitialAddInLogs(prod);
                });
        	},

            getInitialAddInLogs(prod){
                // console.log(prod)
                var self = this;
                jQuery(document).ready(function($) {
                    $.get('ajax/select/get_userlogs_initial_add.php', {
                        name: prod.get('name'),
                        id: prod.get('id')
                    }, function(data) {
                        
                    }).success(function(data){
                        var json = $.parseJSON(data);
                        console.log(json);
                        if (json.found === true) {
                            var withdrawals = json.withdrawals;
                            if(json.receivings.length === 0){
                                let qty = self.calculateQty(json);
                                var tr = '<tr>';
                                    tr += '<td class="text-center">'+qty+'</td>';
                                    tr += '<td class="text-center">'+json.log.user+'</td>';
                                    tr += '<td class="text-center"></td>';
                                    tr += '<td class="text-center">'+moment(json.log.date).format('MMMM DD, YYYY ddd')+'</td>';
                                    tr += '<td class="text-center">'+json.log.time+'</td>';
                                    tr += '<td class="text-center">'+moment(json.log.date).fromNow() +'</td>';
                                    tr += '</tr>';
                                $('#list-of-receiving-history').prepend(tr);
                            }
                        }
                       
                    });
                });
            },

            calculateQty(json){
                if (json.withdrawals.length === 0 && json.receivings.length === 0) {
                    return json.item.running_bal;
                }else {
                    if (!json.receivings.length) {
                        let quantities = _.pluck(json.withdrawals, 'qty');
                        if (quantities.length) {
                            return _.reduce(quantities, function(memo, num){ return Number(memo) + Number(num); });
                        }else {
                            return 0;
                        }
                    }else {

                    }
                }
                
            }
    
    });
   
    return ListOfHistoryRItem; 
});