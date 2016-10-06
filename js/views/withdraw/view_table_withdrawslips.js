define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_table_withdrawslips.html',
    'moment'
	],  function(_, Backbone, template, moment) {
   
    var ViewWithDrawSlips = Backbone.View.extend({
    
        	initialize: function(){
        		  // this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main-withdrawal',
    
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
                var $panel = $('#panel-withdrawslip');
                var self = this;



                $(function() {
                    self.$el.find('#btnSummaryOfPullout').on('click', (event) => {
                       require(['views/withdraw/summary/view_modal_monthly_withdrawals'], 
                        function(Subview){
                           new Subview();
                       });
                    });
                });

                $(function() {
                    self.$el.find('#btnSummary').on('click', function(event){
                        require(['views/withdraw/summary/view_modal_make_summary'], 
                          function(SubviewMMS){
                             new SubviewMMS();
                        });
                    });
                });

                $(function() {
                    $.when(withdraw_items.fetch({
                       silent: true,
                       url: 'api.php/get/withdraw_item'
                    })).then(function() {
                        $.when(withdraw_forms.fetch({
                           silent: true,
                        })).then(function() {
                            require(['views/withdraw/view_list_of_withdrawalslips'], 
                              function(SubviewListOfWithdrawSlip){
                                var view = new SubviewListOfWithdrawSlip({
                                    collection: withdraw_forms
                                });
                                view.render();
                            });
                        });
                    });
                     
                });

                $(function() {
                    require(['modules/functions'], function(fn){
                        fn.tableResponsive('#table-withdrawalslip');
                    });
                });
                
                $(function() {
                  //if btn refresh has click..
                    self.$el.find('#btnRefreshWithdraws').click(function(event) {
                        require(['modules/functions','modules/withdrawform_module'], function(fn, wfm){
                            fn.refreshData('withdraw_form', wfm, 'withdraw_forms');
                        });
                    });
                });

                $(function() {
                    require(['modules/tool_module'], function(tm){
                        tm.initReportPrintEvent(self, '#btnPrint', '#table-withdrawalslip', '#div-table-withdrawalslip', 
                          'W.S report', '#header-withdrawalslip-reports');
                    });
                });

                $(function() {
                  //add loading btn for 1.5 sec
                  setTimeout(function() {
                     require(['modules/functions'], function(fn){
                          fn.add_loading_btn('#btnRefreshWithdraws', 1500); 
                       });  
                  }, 4000);
                });

                $(function(){
                    //input from datepicker
                    require(['libs/jquery-ui/jquery-ui.min','moment','modules/withdrawform_module'], function(jQueryUI, moment, WFM){                       
                        self.$el.find('#date-from').datepicker().change(function(event) {
                            var value = $(this).val();
                            var obj = WFM.searchDate(value, moment);
                            if (obj.data.length) {
                               obj.module.appendListOfWithdrawalForm2(obj.data);
                            } else{
                               router.alertify_error();
                               require(['modules/functions'], function(fn){
                                    fn.noDataWasFound('#list-of-withdrawalslips',11, 'No data was found for the date: ' + value);
                               });
                            }
                        });

                        //input date-to datepicker
                        self.$el.find('#date-to').datepicker().change(function(event) {
                            var $el = $(this);

                            require(['moment','collections/mycollection',
                                    'modules/withdrawform_module', 'modules/functions'], function(moment, MyCollection, WFM, fn){
                               $el.val(moment($el.val()).format('dddd MMMM DD, YYYY'));
                               var from = $('#date-from').val();
                               var to = $el.val();

                               if (moment(from).isValid()) {

                                   if (moment(from).isBefore(to)) {
                                      var lists = WFM.searchBetween(from, to, moment);
                                      (lists.length) ? WFM.appendListOfWithdrawalForm2(lists) : fn.noDataWasFound('#list-of-withdrawalslips',10, 'no data was found for date: <strong class="text-primary">'+ from +'</strong> and: <strong class="text-primary">' + to+'</strong>');
                                   } else{
                                      fn.noDataWasFound('#list-of-withdrawalslips',11, 'Invalid query');
                                   }

                               }else {
                                   router.alertify_error('Please select two dates');
                               }

                           });
                            
                        });
                    });


                //search table
                  self.$el.find('#search').keyup(function(event) {
                      /* Act on the event */
                      var value = $(this).val().toLowerCase();
                      
                      clearTimeout(self.timer);
                      self.timer = setTimeout(function() {
                          require(['modules/collection_module','modules/functions','views/withdraw/view_list_of_withdrawalslips'], 
                              function(cm, fn, Subview){
                                  var response = cm.search('withdraw_forms', value);
                                  if (response.length) {
                                      var view = new Subview({
                                         collection: response
                                      });
                                      view.render();
                                  }else {
                                     require(['modules/functions'], function(fn){
                                         fn.noDataWasFound('#list-of-withdrawalslips',10, 'No data was found for: <b>'+value+'</b>');
                                     });
                                  }
                          });
                      }, 800);
                  });

                });

                $(document).ready(function() {
                  
                    self.$el.find('#check-all-withdraw-form').click(function(event) {
                       var is = $(this).is(':checked');
                       self.$el.find('#list-of-withdrawalslips').find('input[type="checkbox"]').prop('checked', is);
                    });

                    self.$el.find('#btnDelete').click(function(event) { 
                      var ids = self.getCheckedIds();
                      if (ids.length) {
                            require(
                                  [
                                    'libs/load_css/loadcss',
                                    'libs/alertify/js/alertify.min',
                                    'modules/withdrawform_module'
                                  ], 
                                  function(css, alertify, WFM){
                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                    alertify.confirm('Are you sure ?', function(e){
                                      if (e) {
                                          ids.forEach(function(i) {
                                             WFM.removeDB(i);
                                          });
                                      }else {
                                         console.log(e);
                                      }
                                    });
                                });
                      }else {
                         console.log('Nothing to remove');
                      }
                          
                    });
                });

                jQuery(document).ready(function($) {
                    self.$el.find('#reset').on('click', function(event) {
                        require(['modules/withdrawform_module'], function(WFM){
                            WFM.appendListOfWithdrawalForm();
                            self.$el.find('.panel-footer').find('input').val('');
                        });
                    });

                    self.$el.find('thead th').addClass('text-center');
                });

                var num = 0;

                $(function() {
                    self.$el.find('thead th').click(function(event) {
                       var id = this.id;
                       ++num;
                       var type = (num % 2 == 1) ? 'asc': 'desc';

                         require(['modules/withdrawform_module','libs/backbone.obscura','views/withdraw/view_list_of_sorted_withdrawslip'], 
                          function(wfm, Obscura, Subview){
                             var list = wfm.sortBy(id, type, Obscura);
                             var view = new Subview({
                                collection: list
                             });
                         });

                    });
                });
                
        	},

          getCheckedIds: function(){
             var self = this, ids = [];
             self.$el.find('#list-of-withdrawalslips').find('input[type="checkbox"]:checked').each(function(index, el) {
                ids.push($(this).val());
             });
             return ids;
          }
    
    });
   
    return ViewWithDrawSlips; 
});