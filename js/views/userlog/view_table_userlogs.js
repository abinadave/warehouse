define(
	[
		'underscore',
		'backbone',
		'text!templates/userlog/temp_table_userlogs.html'
	],  function(_, Backbone, template) {
   
    var ViewTableUserlogs = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
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
                var $panel = $('#panel-userlogs');
                var self = this;
                $(function(){
                    //jQuery
                    $panel.find('select#usertype').change(function(event) {
                        /* Act on the event */
                        var val = $(this).val();
                        require(['modules/userlog_module','modules/functions'], function(UserlogModule, fn){
                            var lists = UserlogModule.searchWithUsertypeOf(val);
                            if (lists.length) {                          
                                self.appendListOfLogs(lists);
                            } else{
                                fn.noDataWasFound('#list-of-userlogs',6,'No data was found for: '+ UserlogModule.getUsertype(val));
                            }   
                        });
                    });

                    $panel.find('input#check-all-logs').change(function(event) {
                        /* Act on the event */
                        if ($(this).is(':checked')) {
                           self.check(true);
                        } else{
                            self.check(false);
                        };
                    });

                    $panel.find('#search').keyup(function(event) {
                        /* Act on the event */
                        var value = $(this).val();
                        var cbo = $('select#usertype').val();
                        require(['modules/userlog_module','collections/mycollection','modules/functions'], function(UserlogModule, MyCollection, fn){
                            if (cbo == 0) {
                                var lists = UserlogModule.search(value.toLowerCase());
                                if (lists.length) {                          
                                    self.appendListOfLogs(lists);
                                } else{
                                    fn.noDataWasFound('#list-of-userlogs',6,'No data was found for: '+ value);
                                }  
                            } else{
                                var logs = UserlogModule.searchWithUsertypeOf(cbo);
                                var libs = new MyCollection();
                                logs.forEach(function(model) {
                                    $.each(model.attributes, function(index, val) {
                                         if (model.get(index).indexOf(value) !== -1) {
                                            libs.add(model);
                                         }
                                    });
                                });
                                if (libs.length) {
                                    self.appendListOfLogs(libs);
                                } else{
                                    fn.noDataWasFound('#list-of-userlogs',6,'No data was found');
                                };
                               
                            }
                            
                        });
                    });
                });
                

                $(function() {

                    /*
                        Filter dates..
                    */

                    require(['libs/fixed-thead/jquery.floatThead','libs/jquery-ui/jquery-ui.min'], function(){
                        var $table = $('#table-logs');
                        $panel.find('#d1, #d2').datepicker();
                    });

                    self.$el.find('#btnFilterDate').click(function(event) {
                        var d1 = $('#d1').val(), d2 = $('#d2').val();
                        require(['modules/userlog_module'], function(userlog_module){
                            var list = userlog_module.filterDates(d1, d2);
                            userlog_module.appendList(list);
                        });
                    });

                    self.$el.find('#btnReset').click(function(event) {
                        /* Act on the event */
                        self.$el.find('#d1,#d2').val('');
                        self.$el.find('#d1').focus();
                        require(['modules/userlog_module'], function(userlog_module){
                            userlog_module.appendList(userlogs);
                        });
                    });
                    
                });

                $(function() {
                    $panel.find('#date').change(function(event) {
                        var value = $(this).val();
                        var $el = $(this), format = 'dddd MMMM DD, YYYY';
                           require(['moment','collections/mycollection'], function(moment, MyCollection){
                               var newdt = moment(value).format(format);
                               var lists = new MyCollection();
                               userlogs.forEach(function(model) {
                                   var dt = moment(model.get('date')).format(format);
                                   if (moment(newdt).isSame(dt)) {
                                      lists.add(model);
                                   }
                               });
                               if (lists.length) {
                                    self.appendListOfLogs(lists);
                               } else{
                                    router.alertify_error('No data was found for the date: '+newdt);
                                    $el.val('');
                               };
                           });
                    });
                });   

                jQuery(document).ready(function($) {
                    self.$el.find('#delete-logs').click(function(event) {
                        /* Act on the event */
                       require(
                            [
                                'libs/load_css/loadcss',
                                'libs/alertify/js/alertify.min',
                                'modules/userlog_module'
                            ], 
                            function(css, alertify, UserlogModule){
                                loadCSS('js/libs/alertify/css/alertify.core.css');
                                loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                alertify.confirm('Are you sure', function(e){
                                    if (e) {
                                        var ids = UserlogModule.getChecked();
                                        if (ids.length) {
                                            
                                            ids.forEach(function(value) {
                                                UserlogModule.deleteDB(value);
                                            });

                                        } else{

                                        };
                                    }else {
                                        console.log(e);
                                    }
                                });
                        });
                    });      
                });  
        	},

            check: function(type){
                this.$el.find('tbody').find('input[type="checkbox"]').prop('checked', type);
            },

            appendListOfLogs: function(lists){
                require(['views/userlog/view_list_of_logs'], function(ViewListOfLogs){
                    var view = new ViewListOfLogs({
                        collection: lists
                    });
                    view.render();
                });
            }

    
    });
   
    return ViewTableUserlogs; 
});