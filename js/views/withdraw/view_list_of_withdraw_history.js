define(['underscore','backbone',
	'text!templates/withdraw/temp_list_of_withdraw_history.html','moment',
    'modules/functions'], 
	function(_, Backbone, template, moment, FN) {
   
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
                var output = self.template({
                    'library': self.collection.toJSON(), 
                    'moment': moment,
                    'self': self
                });
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

                
        	},

            getWsNo(model){
                var year = moment(model.date).format('YY');
                var id = FN.zeroPad(Number(model.id), 5); 
                var code = sessionStorage.getItem('code');
                var rs = warehouses.where({id: code});
                if (rs.length) {
                    return rs[0].get('receipt_loc') + '-'+code+'-8'+year+'-'+id;
                }else {
                    return '-';
                }
            },
    
    });
   
    return ListOfHistories; 
});