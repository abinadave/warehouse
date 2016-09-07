define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_modal_pullout_list.html',
        'moment',
        'modules/withdrawform_module',
        'modules/functions',
        'models/withdraw_form'
	],  function(_, Backbone, template, moment, WFM, fn, Withdraw_form) {
   
    var ViewPulloutList = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-list-of-all-pullouts',
    
        	template: _.template(template),
    
            events: {},
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#modalPullOutList').draggable({cursor: "move"});
                    });
                });

                $(function() {
                    $('#modalPullOutList').on('shown.bs.modal', function(event){
                        $.get('api.php/withdraw_form/get_max_id', function(data) {
                        }).done( (response)=> {
                           var json = JSON.parse(response);
                           self.$el.find('#linked-to').val(Number(json.max_id) + 1);
                        });
                    });
                });


                jQuery(document).ready(function($) {
                    self.$el.find('#btnWithdrawOnly').click(function(event) {
                        event.preventDefault();
                        self.withdrawOnly();                      
                    });

                    self.$el.find('#btnWithdrawAndDeliver').click(function(event) {
                        event.preventDefault();
                        require(['modules/withdrawform_module','moment','modules/warehouse_module','modules/functions'], function(module, moment, WM, fn){
                            var date = moment().format("YYYY-MM-DD HH:mm:ss");
                            var form = $('#form-save-withdraw-form-items').serialize();
                            form += '&date='+ date;
                            module.saveDB(form, 'wd');
                            
                            WM.initSystemUsersAutocomplete('#to-person');
                            WM.initSystemUsersAutocomplete('#delivered-by');
                            fn.initUsertypes('#delivered-by-position');
                                               
                        });
                    });
                });
        	},

            saveWF1(){
                var date = moment().format("YYYY-MM-DD HH:mm:ss");
                var form = $('#form-save-withdraw-form-items').serialize();
                form += '&date='+ date;
                WFM.saveDB(form, 'w');  
            },

            withdrawOnly(){
                var self = this;
                var linked_to = self.$el.find('#linked-to').val();                
                var form = {
                    linked_to: linked_to,
                    no: self.generateNo(linked_to),
                    requested_by: self.$el.find('#requested-by').val(),
                    requested_by_position: self.$el.find('#position-withdraw').val(),
                    issued_by: sessionStorage.getItem('name'),
                    issued_by_position: sessionStorage.getItem('usertype'),
                    date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    time: router.getCurrectHour(),
                    warehouse_code: sessionStorage.getItem('code')
                };
                var withdraw_form = new Withdraw_form(form);
                withdraw_forms.create(withdraw_form.attributes, {
                    success: self.saveWithdrawItems
                })              
            },

            saveWithdrawItems(a, b, c){
                var self = this;
                var product = {};
                extracts.forEach(function(model) {
                    product = products.get(model.get('id'));
                    withdraw_items.create({ withdraw_id: b.id, qty: model.get('qty'), remarks: model.get('remarks'), item: model.get('id'), name: product.get('name'), unit: product.get('unit') }, {
                        success: function(a, b, c){
                            product.save();
                        }
                    });
                });
            },

            generateNo(linked_to){
                var warehouse = warehouses.get(sessionStorage.getItem('code'));
                var pad = fn.zeroPad(linked_to, 5);
                return warehouse.get('receipt_loc') + '-' + warehouse.get('id') + '-8' + moment().format('YY') + '-' + pad;
            }
    
    });
   
    return ViewPulloutList; 
});