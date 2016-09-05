define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/available/temp_table_tools.html'
	],  function(_, Backbone, template) {
   
    var ViewTableTools = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
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
    
        	init: function(){
                var $panel = $('#panel-tool'), self = this;

                $(function() {
                    var height = $(window).height();
                    self.$el.find('#div-table-tools').css({
                        height: height - 270 + 'px'
                    });
                });

                $(function() {
                    if (Number(sessionStorage.getItem('usertype')) !== 1) {
                        self.$el.find('#div-admin-side').remove();
                    }
                });

                $(function() {
                    self.$el.find('#initialAdd').click(function(event) {
                        require(['modules/tool_module'], function(tm){ 
                           var rs = $('#modalAddInitialTool').length;
                           if (rs) {
                                $('#modalAddInitialTool').modal('show');
                               
                           }else {
                                tm.appendModalInitialTool(); 
                           }
                        });
                    });
                });

                $(function() {
                    
                    $('#receiver-transfer-tool-btn').click(function(event) {
                        /* Act on the event */
                        require(['modules/transferedtool_module'], function(TTM){
                            TTM.displayTransferedTool();
                        });
                    });
               
                });

                $(function() {
                    var n = 0;
                    $panel.find('#viewDropDownTool').click(function(event) {
                        n++;
                        if (n % 2 !== 0) {
                            
                            var Obscura = require('libs/backbone.obscura');
                            var MyCollection = require('collections/mycollection');
                            var forms = new Obscura(transfer_forms);
                            var list = new MyCollection();

                            forms.filterBy('warehouse code',{to_warehouse_id: sessionStorage.getItem('code')});

                            if (forms.length) {

                                forms.forEach(function(model) {
                                    var items = new Obscura(transfer_items);
                                    items.filterBy('tid status', {transfer_id: model.get('id'), status: '0'});
                                    if (items.length) {
                                        items.forEach(function(model) {
                                            list.add(model);
                                        });
                                    }
                                });       
                                (list.length > 0) ? $('#badge-transferform-nitifiation').text(list.length) : console.log('no receivable item was found for this warehouse.');
                            }
                        }
                    });
                });


                $(function(){
                    //jQuery
                    $panel.find('#search-box').keyup(function(event) {
                        var value = $(this).val();

                            require(['modules/tool_module','modules/classification_module','views/tool/available/view_list_of_tools'], function(ToolModule, ClassificationModule, ViewListOfTools){               
                                    
                                    var myCollection = ToolModule.searchModels(value.toLowerCase());

                                    if (sessionStorage.getItem('usertype') == 1) {
                                            var code = $('#display-by-warehouse-admin').val();
                                            if (code != 0) {

                                                //if warehouse combobox is not emty.
                                                var list = ToolModule.getToolWithLocationOf(code);
                                                var found = new Backbone.Collection();
                                                list.forEach(function(model) {
                                                    $.each(model.attributes, function(index, val) {
                                                         if (model.get(index).toLowerCase().indexOf(value.toLowerCase()) != -1) {
                                                            found.add(model);
                                                         };
                                                    });
                                                });

                                                var view = new ViewListOfTools({
                                                    collection: found
                                                });
                                                view.render();

                                            }else{
                                                var myCollection2 = ClassificationModule.searchByTool(value.toLowerCase());

                                                myCollection2.forEach(function(model) {
                                                    myCollection.add(model);
                                                });

                                                if (myCollection.length) {
                                                    var view = new ViewListOfTools({
                                                        collection: myCollection
                                                    });
                                                    view.render();
                                                }else {
                                                    $('#list-of-available-tools').html('<tr class="text-danger" style="font-weight: bolder"><td colspan="11">no data was found for \'' + value + '\'</td></tr>')
                                                }
                                            }
                                    }else {
                                        var myCollection2 = ClassificationModule.searchByTool(value.toLowerCase());

                                        myCollection2.forEach(function(model) {
                                            myCollection.add(model);
                                        });

                                        if (myCollection.length) {
                                            var view = new ViewListOfTools({
                                                collection: myCollection
                                            });
                                            view.render();
                                        }else {
                                            $('#list-of-available-tools').html('<tr class="text-danger" style="font-weight: bolder"><td colspan="11">no data was found for \'' + value + '\'</td></tr>')
                                        }

                                        if (value == '' && myCollection.length == 0) {
                                            require(['modules/functions'], function(fn){
                                                fn.noDataWasFound('#list-of-available-tools',9,'<b style="text-danger">No tool was found for this warehouse</b>');
                                            });
                                        }
                                    }
        
                            });             

                    });

                });

                $(function() {
                    require(['modules/tool_module'], function(ToolModule){
                        var ctr = 0;
                        $panel.find('th').click(function(event) {
                            ++ctr;
                            var istype = (ctr % 2 == 1) ? 'asc': 'desc';
                            var theid = this.id;
                            if (sessionStorage.getItem('usertype') == 1) {
                                var code = $('#display-by-warehouse-admin').val();

                                if (code != 0) {
                                    
                                    var list = ToolModule.getToolWithLocationOf(code);
                                    ToolModule.sortBy(theid, istype, list);
                                }else {
                                    if (ctr % 2 == 0) {
                                        ToolModule.sortBy(this.id, 'asc', tools);
                                    }else{
                                        ToolModule.sortBy(this.id, 'desc', tools);
                                    }
                                }
                            }else {
                                if (ctr % 2 == 0) {
                                    ToolModule.sortBy(this.id, 'asc', tools);
                                }else{
                                    ToolModule.sortBy(this.id, 'desc', tools);
                                }
                            }
                        });
                    });
                });


                $(function() {
                    self.$el.find('th').addClass('text-center');
                    // require(['libs/fixed-thead/jquery.floatThead','libs/jquery-ui/jquery-ui.min'], function(){

                    //         var $table = $('#table-tools');
                    //         $table.floatThead({
                    //             scrollContainer: function($table){
                    //                 return $table.closest('#div-table-tools');
                    //             }
                    //         });

                    //         self.$el.find('#div-table-tools').resizable();

                    //     });
                });


                $(function() {
                    self.$el.find('#decommissionTool').click(function(event) {
                        var value = $('#hidden-tool').val();
                           var rs = tools.where({id: value});
                           if (rs.length) {
                               var model = tools.get(value);
                               decommission.set(model.attributes);
                               var fn = require('modules/functions');
                               fn.appendView('views/tool/decommission/view_modal_decommission_tool');
                           };
                    });
                });


                $(function() {
                    //event for admin side.
                    if (sessionStorage.getItem('usertype') == 1) {
                        setTimeout(function() {
                            self.$el.find('#display-by-warehouse-admin').change(function(event) {
                                var code = $(this).val();
                                require(['modules/tool_module','views/tool/available/view_list_of_tools'], function(tm, Subview){
                                    if (code == 0) {
                                        tm.appendListOfTools();
                                    }else{
                                        var list = tm.getToolWithLocationOf(code);
                                        var view = new Subview({collection: list});
                                        view.render();
                                    }
                                });
                            });
                        }, 1000);
                    };
                });
                    
                    
                $(function() {
                    if (sessionStorage.getItem('usertype') == 1) {
                        self.$el.find('#div-table-tools').css({
                            marginTop: '10px'
                        });
                    }else {
                        self.$el.find('#div-table-tools').css({
                            marginTop: '40px'
                        });
                    }
                });


                $(function() {

                    self.$el.find('#btnPrintTable').mouseenter(function(event) {
                         var code = 0;
                         code = $('#display-by-warehouse-admin').val();
                         require(['modules/tool_module'], function(tm){
                             tm.selectedWarehouse = code;
                         });
                    });

                    self.$el.find('#btnPrintTable').click(function(event) {
                       
                        require([
                            'views/tool/view_header_print_tool_report',
                            'modules/functions',
                            'libs/jquery.print'
                            ],
                            function(Subview, fn){  
                             
                                $('#table-tools').css({
                                    fontSize: '8px'
                                });

                                var table = $('#div-table-tools').html();

                                $('#main').html(table);

                                var view = new Subview();

                                setTimeout(function() {
                                    $('#main').print({
                                        // noPrintSelector: ".to-hide",
                                    });
                                     setTimeout(function() {
                                         router.navigate('products', true);
                                         router.navigate('availableTools', true);
                                     }, 500);
                                }, 1000)
                                
                                
                        });
                    });
                });
    
                $(function() {
                    self.$el.find('#btnExportTable').click(function(event) {
                        var el = $(this);
                        require(['libs/alertify/js/alertify.min',
                            'css!libs/alertify/css/alertify.core',
                            'css!libs/alertify/css/alertify.bootstrap'], 
                            function(alertify){
                              alertify.prompt("Enter Filename (do not include extention)", function (e, str) {
                                  if (e) {
                                      var tbl = $(this).attr('class');
                                      if (sessionStorage.getItem('usertype') == 1) {

                                          require(['modules/account_module'], function(am){
                                              am.backupDB(el.attr('class'),  str +'.sql');
                                          });

                                      }else {
                                          router.alertfify_error('Access Denied');
                                      }
                                  }
                              }, el.attr('class'));
                        });
                    });
                });

                $(function() {
                    $('#import').click(function(event) {
                       require(['modules/account_module'], function(am){
                           am.importDB();
                       });
                    });
                });

        	}
    
    });
   
    return ViewTableTools; 
});