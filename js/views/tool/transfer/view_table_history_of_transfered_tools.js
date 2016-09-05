define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_table_history_of_transfered_tools.html'
	],  function(_, Backbone, template) {
   
    var ViewTableHistoryTransferedTool = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main-transfered',
    
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
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this, num = 0;
                var $panel = $('#panel-history-transfered-tools');
                $(function(){
                    //jQuery
                    require(['modules/functions'], function(fn){
                        fn.datepickerPlugin('#from, #to');
                    });

                    self.$el.find('thead th').click(function(event) {
                        var id = this.id;
                        ++num;
                        var type = (num % 2 == 1) ? 'asc' : 'desc';
                        var module = require('modules/transferform_module');
                        var forms = module.sortBy(id, type, transfer_forms);
                        module.appendListOfSortedCollection(forms);
                    });
                    
                });

                $(function() {
                  //initialize print..
                  //reuse code for printing tool report..
                   require(['modules/tool_module'], function(tm){
                       tm.initReportPrintEvent(self, '#btnPrintTransferForm', '#table-history-transferedtools', 
                        '#div-table-history-transferedtools', 'E.T.S reports', '#header-report-placeholder-transfer')
                   });
                });

                $(function() {
                     require(['moment','collections/mycollection','views/tool/transfer/view_list_of_transferforms'], function(moment, MyCollection, ViewListOfTransferForms){
                        $panel.find('#search').change(function(event) {
                            var $el = $(this);
                           
                                $el.val(moment($el.val()).format('dddd MMMM DD, YYYY'));
                            
                        }).change(function(event) {
                            var lists = new MyCollection();
                            var value = $(this).val();
                            transfer_forms.forEach(function(model) {
                                var rs = moment(value).isSame(model.get('date'));
                                if (rs) {
                                    lists.add(model);
                                }
                            });

                            if (lists.length) {
                                var view = new ViewListOfTransferForms({
                                    collection: lists
                                });
                                view.render();
                            } else{
                                require(['modules/functions'], function(fn){
                                    fn.noDataWasFound('#history-of-transfered-tool', 10, 'no data was found for the date: '+value);
                                });
                            };
                        });
                    });    
                });
                    
                jQuery(document).ready(function($) {
                    self.$el.find('#to').change(function(event) {
                        var $el = $(this); 
                        require(['moment','modules/transferform_module','modules/functions'], function(moment, TFM, fn){
                            $el.val(moment($el.val()).format('dddd MMMM DD, YYYY'));  
                            var from = self.$el.find('#search').val();
                            var to = self.$el.find('#to').val();
                           
                                if (moment(from).isValid()) {

                                   if (moment(from).isBefore(to)) {
                                      var lists = TFM.searchBetween(from, to, moment);
                                      (lists.length) ? TFM.appendListOfTransferForms2(lists) : fn.noDataWasFound('#history-of-transfered-tool',11, 'no data was found for date: <strong class="text-primary">'+ from +'</strong> and: <strong class="text-primary">' + to+'</strong>');
                                   } else{
                                      fn.noDataWasFound('#history-of-transfered-tool', 11, 'Invalid query');
                                   }

                               }else {
                                   router.alertify_error('Please select two dates');
                               }

                        }); 
                    });
                });

                $(function() {
                    self.$el.find('#check-all').change(function(event) {
                        self.$el.find('tbody').find(':checkbox').prop('checked', $(this).is(':checked'));
                    });
                });

                $(function() {
                    self.$el.find('#search-box').keyup(function(event) {
                        var value = $(this).val();
                        require(['modules/transferform_module','modules/functions'], function(TFM, fn){
                            var lists = TFM.search(value.toLowerCase());
                            (lists.length > 0) ? TFM.appendListOfTransferForms2(lists) : fn.noDataWasFound('#history-of-transfered-tool', 11, 'No history was found for: '+value) ;
                        });
                    });
                });

                jQuery(document).ready(function($) {
                    self.$el.find('#btnReset').click(function(event) {
                        require(['modules/transferform_module'], function(TFM){
                            TFM.appendListOfTransferForms();
                        });
                    });
                });

                $(function() {
                    self.$el.find('thead th').css('text-align', 'center');
                });

                $(function() {
                  $(document).ready(function() {

                        setTimeout(function() {
                           router.add_loading_btn('#btnRefreshData', 1000);
                        }, 1500);
   
                  });

                  $(document).ready(function() {
                       self.$el.find('#btnRefreshData').click(function(event) {
                         var fn = require('modules/functions');
                         var tfm = require('modules/transferform_module');
                         fn.refreshData('transfer_forms', tfm, 'transfer_forms');
                       });
                  });
                    
                });
        	},





            
    
    });
   
    return ViewTableHistoryTransferedTool; 

});