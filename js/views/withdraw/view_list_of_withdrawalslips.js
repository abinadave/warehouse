define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_list_of_withdrawalslips.html',
		'moment',
        'modules/warehousemen_module',
        'modules/functions'
	],  function(_, Backbone, template, moment, WAREHOUSEMEN_MODULE, FN) {
   
    var ViewListOfWithdrawalSlips = Backbone.View.extend({
    
        	initialize: function(){

        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-withdrawalslips',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                // var lists = WFM.sort(Obscura, self.collection);
                var output = self.template({
                    'library': self.collection.toJSON(), 
                    'moment': moment, 
                    'WarehousemenModule': WAREHOUSEMEN_MODULE,
                    'self': self
                });
                self.$el.append(output);
                self.formInit(self, self.collection.length);
    	        return self;
        	},

            onRender(){
                var self = this;
            },

            getGetNo(model){
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

            formInit: function(self, length){
                $(function(){
                    //jQuery
                   if (length == 0) {
                       $('#list-of-withdrawalslips').html('<tr class="text-danger" style="font-size: 13px; font-weight: bolder"><td colspan="9">No data was found</td></tr>');
                       $('.withdraw-print').hide();
                   }else {
                       $('.withdraw-print').show();
                   }
                   self.$el.find('a').click(function(event) {
                        var id = this.id;
                        console.log(id);
                        WithDrawFormModule.showAllWithDrawSlipsWithIdOf(id);
                   });

                   self.$el.find('td').addClass('text-center');
                });
            }
    });
   
    return ViewListOfWithdrawalSlips; 
});