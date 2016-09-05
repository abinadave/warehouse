define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_table_history_borrowed.html',
    // 'css!libs/css/page-break-table'
	], function(_, Backbone, template, css) {
   
    var ViewTableHistoryBorrowed = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main-borrowed',
    
        	template: _.template(template),
    
          events: {
                // bound events
          },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.hide().append(output).fadeIn();
                self.init();
    	        return self;
        	},
    
        	init: function(){

               var self = this, num = 0;
               var $panel = $('#panel-history-borrow');

               $(function() {
                    var width = $(window).width();
                    console.log(width);
                    self.$el.find('#div-table-history-borrow').css({
                        width: width + 'px'
                    });
               });

                $(function() {
                  //initialize print..
                  //reuse code for printing tool report..
                   require(['modules/tool_module'], function(tm){
                       tm.initReportPrintEvent(self, '#btnPrintBorrowerForm', '#table-history-borrow', 
                        '#div-table-history-borrow', 'B.S reports', '#header-report-placeholder-borrow');
                   });
                });

                jQuery(document).ready(function($) {
                    $('#btnReset').click(function(event) {
                        self.appendLists(borrower_forms);
                    });
                });
                
                jQuery(document).ready(function($) {
                    self.$el.find('#search').keyup(function(event) {
                      var value = $(this).val();
                       require(['modules/borrowerform_module','modules/functions'], function(BFM, fn){
                           var lists = BFM.search(value.toLowerCase());
                           if (lists.length) {
                              self.appendLists(lists);
                           } else{
                               fn.noDataWasFound('#list-of-borrower-forms',11, 'No data was found for <strong>' + value +'</strong>');
                           };
                       });
                    });
                });


                jQuery(document).ready(function($) {
                   self.$el.find('#check-all').change(function(event) {
                       self.$el.find('tbody').find('input[type="checkbox"]').prop('checked', $(this).is(':checked')); 
                   });
                });


                jQuery(document).ready(function($) {
                    self.$el.find('#delete-msg').click(function(event) {
                         var ids = self.getChecked();
                         require(['modules/borrowerform_module'], function(BFM){
                            (ids.length) ? BFM.delete(ids) : router.alertify_error('Check the record that you want to delete.');
                         });
                    });
                });

                $(function() {
                    self.$el.find('thead th').click(function(event) {
                        var id = this.id;

                        ++num;

                        var type = (num % 2 == 1) ? 'asc' : 'desc';

                        require(['modules/borrowerform_module','views/tool/borrow/view_list_of_sorted_borrower_form'], function(bfm, Subview){
                            var forms = bfm.sortBy(id, type, borrower_forms);
                            var view = new Subview({ collection: forms });
                        });

                    });
                });


                $(function() {
                  $(document).ready(function() {

                        setTimeout(function() {
                           router.add_loading_btn('#btnRefreshData', 1000);
                           
                           
                        }, 1500);
   
                  });

                  $(document).ready(function() {
                      self.$el.find('#btnRefreshData').click(function(event) {
                          require(
                            [
                              'modules/borrowerform_module',
                              'modules/functions'
                            ], function(bfm, fn){
                              fn.refreshData('borrower_forms', bfm, 'borrower_forms');    
                          });
                      });
                  });

                $(function(){
                    //jQuery..
                   require(['modules/functions'], function(fn){
                       fn.datepickerPlugin('#from, #to');
                   });

                   self.$el.find('thead th').addClass('text-center');


                   $('#from').change(function(event) {
                        var $el = $(this);

                           require(['moment','modules/borrowerform_module','collections/mycollection'], function(moment, BFM, MyCollection){
                               $el.val(moment($el.val()).format('dddd MMMM DD, YYYY'));
                               var cols = new MyCollection();
                                borrower_forms.forEach(function(model) {
                                    if (moment($el.val()).isSame(model.get('date'))) {
                                        cols.add(model);
                                    }
                                });
                                if (cols.length) {
                                    self.appendLists(cols);
                                } else{
                                    require(['modules/functions'], function(fn){
                                        fn.noDataWasFound('#list-of-borrower-forms',11, 'no data was found for the date: '+$el.val());
                                    });
                                };
                                
                           });
                   });
    
                   $('#to').change(function(event) {
                        var $el = $(this);

                           require(['moment','collections/mycollection',
                                    'modules/borrowerform_module', 'modules/functions'], function(moment, MyCollection, BFM, fn){
                               $el.val(moment($el.val()).format('dddd MMMM DD, YYYY'));
                               var from = $('#from').val();
                               var to = $el.val();

                               if (moment(from).isValid()) {

                                   if (moment(from).isBefore(to)) {
                                      var lists = BFM.searchBetween(from, to, moment);
                                      (lists.length) ? self.appendLists(lists) : fn.noDataWasFound('#list-of-borrower-forms',11, 'no data was found for date: <strong class="text-primary">'+ from +'</strong> and: <strong class="text-primary">' + to+'</strong>');
                                   } else{
                                      fn.noDataWasFound('#list-of-borrower-forms',11, 'Invalid query');
                                   }

                               }else {
                                   router.alertify_error('Please select two dates');
                               }

                           });
                   });

                });


                    
                });


              $(function() {
                  var h = $(window).height();
                  var w = $(window).width();
                  console.log(h);
                  console.log(w);
                  if (w < 1500 && h < 1000) {
                     $('#table-history-borrow').css({
                        'width': '1400px'
                     });
                  }else{
                     console.log('big screen');
                  }
              });


        	 },





            //Sub methods..

            appendLists: function(cols){
                require(['views/tool/borrow/view_list_of_borrower_forms'], function(ViewListOfBorrowerForms){
                    var view = new ViewListOfBorrowerForms({
                        collection: cols
                    });
                    view.render();
                });
            },

            getChecked: function(){
                var ids = [];
                $('#list-of-borrower-forms').find('input[type="checkbox"]:checked').each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
            }

    
    });
   
    return ViewTableHistoryBorrowed; 
});