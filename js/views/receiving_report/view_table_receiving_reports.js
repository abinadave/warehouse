define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_table_receiving_reports.html'
	],  function(_, Backbone, template) {
   
    var ViewReceivingReport = Backbone.View.extend({
    
        	initialize: function(){

                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main-receiving',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){

        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},

            table: '#list-of-receiving-reports',
    
        	init: function(){

                var $panel = $('#panel-receiving-reports');
                var self = this;

                $(function() {
                    $.when(receive_items.fetch({silent: true})).then(function(arguments) {
                        $.when(receive_forms.fetch({silent: true,
                            url: 'api.php/get_order_by/receive_form/id/desc'
                        })).then(function(arguments) {
                            require(['views/receiving_report/view_list_of_receiving_forms'], 
                                function(Subview){
                                var listOfReceiveForm = new Subview({
                                    collection: receive_forms
                                });
                                listOfReceiveForm.render();
                            });
                        });        
                    });
                });

                $(function() {
                    var width = $(window).width();
                    self.$el.find('#table-receiving-reports').css({
                        width: width + 'px'
                    });
                });

                $(function(){

                    require(['libs/jquery-ui/jquery-ui.min','moment','modules/receiveform_module'], function(jQueryUI, moment, RFM){
                       
                        self.$el.find('#from').datepicker().change(function(event) {
                            var value = $(this).val();
                            var obj = RFM.searchDate(value, moment);
                            if (obj.length) {
                               require(['views/receiving_report/view_list_of_receiving_forms'], function(Subview){
                                    var view = new Subview({
                                        collection: obj
                                    });
                                    view.render();
                               });
                            } else{
                              
                               require(['modules/functions'], function(fn){
                                    fn.noDataWasFound(self.table, 8, 'No data was found for the date: <b class="text-primary" style="font-weight: bolder">' + value +'</b>');
                               });
                            }
                        });

                        self.$el.find('#to').datepicker().change(function(event) {
                            var $el = $(this);

                            require(['moment','collections/mycollection',
                                    'modules/receiveform_module', 'modules/functions'], function(moment, MyCollection, RFM, fn){
                               $el.val(moment($el.val()).format('dddd MMMM DD, YYYY'));
                               var from = $('#from').val();
                               var to = $el.val();

                               if (moment(from).isValid()) {

                                   if (moment(from).isBefore(to)) {
                                      var lists = RFM.searchBetween(from, to, moment);
                                      (lists.length) ? RFM.appendListOfReceivingForm2(lists) : fn.noDataWasFound(self.table ,10 , 'no data was found for date: <strong class="text-primary">'+ from +'</strong> and: <strong class="text-primary">' + to+'</strong>');
                                   } else{
                                      fn.noDataWasFound(self.table ,11 , 'Invalid query');
                                   }

                               }else {
                                   router.alertify_error('Please select two dates');
                               }

                           });
                            
                        });

                    });

                });

                
                jQuery(document).ready(function($) {
                    self.$el.find('#reset').click(function(event) {
                        require(['modules/receiveform_module'], function(RFM){
                            RFM.appendListOfReceivingForm();
                            self.$el.find('.panel-footer').find('input').val('');
                        });
                    });
                });


                jQuery(document).ready(function($) {
                    self.$el.find('#search').keyup(function(event) {
                        /* Act on the event */
                        var value = $(this).val().toLowerCase();
                        clearTimeout(self.timer);
                        self.timer = setTimeout(function() {
                            require(['modules/receiveform_module','views/receiving_report/view_list_of_receiving_forms'], function(RFM, Subview){
                                var results = RFM.search(value);
                                if (results.length) {
                                    var view = new Subview({
                                        collection: results
                                    });
                                    view.render();
                                } else{
                                    require(['modules/functions'], function(fn){
                                        fn.noDataWasFound('#list-of-receiving-reports', 8, 'No data was found for: <b>'+value+'</b>');
                                    });
                                }
                            });
                        }, 800);
                        
                        
                    });
                });
                
                jQuery(document).ready(function($) {
                    $panel.find('#check-all-receiving').click(function(event) {
                       $panel.find('#list-of-receiving-reports').find(':checkbox').prop('checked', $(this).is(':checked'));
                    });

                    $panel.find('#delete-receiving-reports').click(function(event) {
                        var ids = self.getCheckbox();
                        if (ids.length) {
                            require(
                                [
                                    'libs/load_css/loadcss',
                                    'libs/alertify/js/alertify.min',
                                    'modules/receiveform_module'
                                ], 
                                function(css, alertify, RFM){
                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                    alertify.confirm('Are you sure ?', function(e){
                                        if (e) {
                                            
                                            ids.forEach(function(id) {
                                                RFM.removeDB(id);
                                            });

                                        }else {
                                            console.log(e);
                                        }
                                    });
                            });
                        };
                    });
                });
                var num = 0;
                $(function() {
                    require(['modules/receiveform_module','libs/backbone.obscura'], function(rfm, Obscura){
                        
                        self.$el.find('thead th').click(function(event) {
                            var id = this.id;
                            ++num;
                            var attr = (num % 2 == 1) ? 'asc': 'desc';
                            var sortedList = rfm.sortBy(id, attr, Obscura);
                            require(['views/receiving_report/view_list_of_sorted_receiving_forms'], function(Subview){
                                var view = new Subview({
                                    collection: sortedList
                                });
                            });
                        });
                    });
                });

                $(function() {
                    self.$el.find('#btnRefreshReports').click(function(event) {
                        require(['modules/functions','modules/receiveform_module'], function(fn, rfm){
                            fn.refreshData('receive_form', rfm, 'receive_forms');
                        });
                    });
                });

                $(function() {
                    setTimeout(function() {
                        require(['modules/functions'], function(fn){
                            fn.add_loading_btn('#btnRefreshReports', 2000);
                        });
                    }, 3000)
                     
                });

                $(function() {
                                  
                      //initialize print..
                      //reuse code for printing tool report..
                       require(['modules/tool_module'], function(tm){
                           tm.initReportPrintEvent(self, '#btnPrint', '#table-receiving-reports', 
                            '#div-table-receiving-reports', 'Receiving Report', '#header-report-placeholder-receiving');
                           
                       });
               
                });

               
        	},

            getCheckbox: function(){
                var self = this, ids = [];
                self.$el.find('#list-of-receiving-reports').find('input[type="checkbox"]:checked').each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
            }
    
    });
   
    return ViewReceivingReport; 
});