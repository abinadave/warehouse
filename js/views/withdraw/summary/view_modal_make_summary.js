define([
    'underscore',
    'backbone',
	'text!templates/withdraw/summary/temp_modal_make_summary.html',
    'moment'], 
	function(_, Backbone, template, moment) {
   
    var SubModal = Backbone.View.extend({
    
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
                    $('#modalMakeSummary').modal('show');
                    self.$el.find('form').submit(function(event) {
                        event.preventDefault();
                        var date = $(this).find('input:first').val();
                        var formated = moment(date).format('MMMM DD, YYYY');
                        var list = self.filterWithdrawals(formated);
                        if (formated === 'Invalid date') {
                            alert('Invalid date, Please choose a date');
                        }else {
                            if (!list.length) {
                                alert('No Withdrawal (record) was found for: '+formated);
                            }else {
                                /* render the summary */
                                $('#modalMakeSummary').modal('hide');
                                setTimeout(function() {
                                    require(['views/withdraw/summary/view_modal_list_of_withdrawal_summary'], 
                                        function(SubviewMLOWS){
                                        new SubviewMLOWS({
                                            collection: new Backbone.Collection(list),
                                            model: new Backbone.Model({
                                                date: formated
                                            })
                                        });
                                    });
                                }, 1000);
                            }
                        }
                        
                    });
                });
        	},

            filterWithdrawals(date){
                return withdraw_forms.filter(function(model) {
                    return moment(model.get('date')).format('MMMM DD, YYYY') === date;
                });
            }
    
    });
   
    return SubModal; 
});