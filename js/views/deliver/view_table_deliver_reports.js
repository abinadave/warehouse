define(
	[
		'underscore',
		'backbone',
		'text!templates/deliver/temp_table_deliver_reports.html'
	],  function(_, Backbone, template) {
   
    var ViewDeliverReports = Backbone.View.extend({
    
        	initialize: function(){
        		  this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main-delivery',
    
        	template: _.template(template),
    
          events: {
              // bound events..
          },

        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},

          table: '#list-of-deliverforms',
    
        	init: function(){
                var $panel = $('#panel-tbl-delivery-reports');
                var self = this;

                $(function() {
                    setTimeout(function() {
                        $.when(deliver_items.fetch({
                          silent: true,
                          url: 'api.php/get/deliver_item'
                        })).then(function(arguments) {
                              $.when(deliver_forms.fetch({
                                silent: true,
                                url: 'api.php/get_order_by/deliver_form/id/desc'
                              })).then(function(arguments) {
                                  require(['views/deliver/view_list_of_deliver_form'], 
                                    function(SuviewDeliverFOrms){
                                      var view = new SuviewDeliverFOrms({
                                          collection: deliver_forms
                                      });
                                      view.render();
                                  });
                              });
                        });
                        
                    }, 1500);
                });

                $(function() {
                  var width = $(window).width();
                    self.$el.find('#table-delivery-reports').css({
                       width: width + 'px'
                    });
                });

               
                if (deliver_forms.length && self.$el.find('tbody tr').length == 0) {
                   setTimeout(function() {
                     self.appendList(deliver_forms);
                   }, 500);
                };

                require(['modules/product_module'], function(PM){
                    PM.appendFromToForm();
                });

                $(function() {
                    require(['modules/functions'], function(fn){
                        fn.tableResponsive('#table-delivery-reports');
                    });
                });

                $(function() {
                    require(['modules/tool_module'], function(tm){
                        tm.initReportPrintEvent(self, '#btnPrint', '#table-delivery-reports', '#div-table-delivery-reports', 
                          'Delivery report', '#header-delivery-reports');
                    });
                });

                $(function() {
                  //add loading btn for 1.5 sec
                  setTimeout(function() {
                     require(['modules/functions'], function(fn){
                          fn.add_loading_btn('#btnRefreshDeliver', 1500); 
                       });  
                  }, 4000);
                });

                $(function() {
                  //if btn refresh has click..
                    self.$el.find('#btnRefreshDeliver').click(function(event) {
                        require(['modules/functions','modules/deliverform_module'], function(fn, dfm){
                            fn.refreshData('deliver_form', dfm, 'deliver_forms');
                        });
                    });
                });

                jQuery(document).ready(function($) {

                    require(['libs/jquery-ui/jquery-ui.min', 'moment', 'modules/deliverform_module'], function(jQueryUI, moment, DFM){
                       
                        self.$el.find('#d-from').datepicker().change(function(event) {
                            var value = $(this).val();

                            var list = DFM.searchDate(value, moment);
                           
                            if (list.length) {
                               DFM.appendListOfDeliverForms2(list);
                            } else{
                               require(['modules/functions'], function(fn){
                                    fn.noDataWasFound(self.table , 12 , 'No data was found for the date: <b class="text-primary" style="font-weight: bolder">' + value);
                               });
                            }
                        });

                        self.$el.find('#d-to').datepicker().change(function(event) {
                            var $el = $(this);

                            require(['moment','collections/mycollection','modules/deliverform_module', 'modules/functions'], function(moment, MyCollection, DFM, fn){
                               
                               $el.val(moment($el.val()).format('dddd MMMM DD, YYYY'));
                               var from = $('#d-from').val();
                               var to = $el.val();

                               if (moment(from).isValid()) {

                                   if (moment(from).isBefore(to)) {
                                      var lists = DFM.searchBetween(from, to, moment);
                                      (lists.length) ? self.appendList(lists) : fn.noDataWasFound(self.table ,10, 'no data was found for date: <strong class="text-primary">'+ from +'</strong> and: <strong class="text-primary">' + to+'</strong>');
                                   } else{
                                      fn.noDataWasFound(self.table , 11, 'Invalid query');
                                   }

                               }else {
                                   router.alertify_error('Please select two dates');
                               }

                           });
                            
                        });

                        self.$el.find('#reset').click(function(event) {
                            self.appendList(deliver_forms);
                            self.$el.find('.panel-footer').find('input').val('');
                        });

                    });
                });

                $(function(){

                    //jQuery
                    require(['libs/jquery-ui/jquery-ui.min','moment','modules/deliverform_module'], function(jQueryui, moment, DeliverFormModule){
                        $panel.find('#search-date').datepicker().change(function(event) {
                            var value = $(this).val();
                            DeliverFormModule.searchDate(value);
                        });

                        self.$el.find('#search').keyup(function(event) {
                            /* Act on the event */
                            var value = $(this).val().toLowerCase();
                            var response = DeliverFormModule.searchModels(value);

                            if (response.length) {
                                self.appendList(response);
                            }else {
                                require(['modules/functions'], function(fn){
                                    fn.noDataWasFound('#list-of-deliverforms', 11, 'No data was found for: <b>' +value +'</b>');
                                });
                            }

                            if (value == '' && deliver_forms.length == 0) {
                                require(['modules/functions'], function(fn){
                                     fn.noDataWasFound('#list-of-deliverforms', 11, 'No History was found');
                                });
                            };

                        });
                    });
                });
                
                jQuery(document).ready(function($) {
                    self.$el.find('#check-all').click(function(event) {
                        self.$el.find(self.table).find(':checkbox').prop('checked', $(this).is(':checked'));
                    });

                    self.$el.find('#btnDelete').click(function(event) {
                       var ids = self.getChecked();
                       if (ids.length) {
                            require([ 'libs/load_css/loadcss', 'libs/alertify/js/alertify.min', 'modules/deliverform_module'], 
                              function(css, alertify, DFM){
                                  loadCSS('js/libs/alertify/css/alertify.core.css');
                                  loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                  alertify.confirm('Are you sure ?', function(e){
                                    if (e) {
                                       ids.forEach(function(model) {
                                          DFM.removeDB(model);
                                       });
                                    }else {
                                      console.log(e);
                                    }
                                  });
                            });
                       } else {
                          console.log('nothing to remove');
                       };
                    });
                });
                var num = 0;
                $(function() {
                    self.$el.find('thead th').click(function(event) {
                        var id = this.id;
                        ++num;
                        var type = (num % 2 == 1) ? 'asc': 'desc';

                        require(['views/deliver/view_list_of_sorted_deliver_form','modules/deliverform_module',
                          'libs/backbone.obscura'], 
                          function(Subview, dfm, Obscura){
                              var sortedList = dfm.sortBy(id, type, Obscura);
                              var view = new Subview({
                                 collection: sortedList
                              });
                        });

                    });
                });
                
        	},

          appendList: function(response){
                require(['views/deliver/view_list_of_deliver_form'], 
                    function(Subview){
                     var view = new Subview({ collection: response });
                     view.render();
                });
          },

          getChecked: function(){
              var self = this, ids = [];
              self.$el.find(self.table).find(':checkbox:checked').each(function(index, val) {
                  ids.push($(this).val());
              });
              return ids;
          }

    
    });
   
    return ViewDeliverReports; 
});