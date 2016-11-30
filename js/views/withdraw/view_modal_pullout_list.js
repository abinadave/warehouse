define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_modal_pullout_list.html',
        'moment',
        'modules/withdrawform_module',
        'modules/functions',
        'models/withdraw_form',
        'modules/withdrawitem_module',
        'models/withdraw_item'
	],  function(_, Backbone, template, moment, WFM, fn, Withdraw_form, WIM, Withdraw_item) {
   
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
                self.$el.find('#btnWithdrawOnly').text('Please wait...').prop('disabled', true);           
                var form = {
                    requested_by: self.$el.find('#requested-by').val(),
                    requested_by_position: self.$el.find('#position-withdraw').val(),
                    issued_by: sessionStorage.getItem('name'),
                    issued_by_position: self.getPosition(sessionStorage.getItem('usertype')),
                    date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    time: router.getCurrectHour(),
                    warehouse_code: sessionStorage.getItem('code')
                };
                var withdraw_form = new Withdraw_form(form);
                $.when(withdraw_form.save()).then((resp) => {
                    let id = resp.id;
                    if (Number(id) > 0) {
                        self.saveWithdrawItems(resp);
                    }
                }, (resp) => {
                    console.log(resp);
                });
                       
            },

            getPosition(usertype){
                if (Number(usertype) === 3) {
                    return 'Warehouse Incharge';
                }else if(Number(usertype) === 2) {
                    return 'Manager';
                }else {
                    return 'Admin';
                }
            },

            saveWithdrawItems(resp){
                var self = this;
                let a = extracts.length;
                let b = 0;
                extracts.forEach(function(model) {
                    var product = products.get(model.get('id'));
                    let obj = {
                        withdraw_id: resp.id,
                        qty: model.get('qty'),
                        remarks: model.get('remarks'),
                        item: product.get('id'),
                        unit: product.get('unit'),
                        name: product.get('name')
                    };
                    let withdraw_item = new Withdraw_item(obj);
                    $.when(withdraw_item.save()).then((resp) => {
                        if (resp.hasOwnProperty('remaining_balance')) {
                            ++b;
                            if (a === b) {
                                self.doneSaving()
                            }
                        }
                    }, (resp) => {
                        console.log(resp);
                    });
                });
            },

            doneSaving(){
                let self = this;
                extracts.reset();
                self.$el.find('#btnWithdrawOnly').text('Witdraw').prop('disabled', false);
                $('#modalPullOutList').modal('hide');
                router.alertify_success('Transaction Completed.');
            },

            generateNo(){
                var warehouse = warehouses.get(sessionStorage.getItem('code'));
                var pad = fn.zeroPad(linked_to, 5);
                return warehouse.get('receipt_loc') + '-' + warehouse.get('id') + '-8' + moment().format('YY') + '-';
            }
    
    });
   
    return ViewPulloutList; 
});