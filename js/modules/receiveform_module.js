define(
	[
		'underscore',
		'backbone',
        'models/receive_item',
        'collections/mycollection',
        'views/receiving_report/view_list_of_receiving_forms',
        'views/receiving_report/view_receiving_form_header'
	],  function(_, Backbone, Receive_item, MyCollection, ViewListOfReceivingForm, ViewReceivingFormHeader) {
   
    var ReceiveFormModule = {
    	   
            fetchData: function(){
                if (receive_forms.length) {
                    ReceiveFormModule.populateAll();
                }else {
                    $.getJSON('ajax/select/get_receiving_reports.php', function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        ReceiveFormModule.saveModel(json, 1);
                        ReceiveFormModule.populateAll();
                    });
                }
            },

            saveDrInvoiceOthers(obj){
                $.post('ajax/save/save_dr_invoice.php', obj, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    console.log(data);
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            },

    	    saveDB: function(form, dr_invoice_others_obj){
                form += '&hour=' + router.getCurrectHour();
                $.post('ajax/save/save_receive_form.php', form , function(data, textStatus, xhr) {
                    $('#output-modal-list-of-all-carts').hide().html(data).fadeIn('fast');
                }).success(function(data){
                    // alert(data);
                    $('#form-receive-item')[0].reset();
                    var id = parseInt(data);
                    var id_tomodel = parseInt(data);
                    var a = carts.length;
                    var b = 0;
                    if (id > 0) {
                        dr_invoice_others_obj.rid = id_tomodel;
                        ReceiveFormModule.saveDrInvoiceOthers(dr_invoice_others_obj);
                        //router.alertify_success('Process completed');
                        $('#modalListOfAllCarts').modal('hide');

                        require(['modules/product_module'], function(ProductModule){  

                            carts.forEach(function(model) {

                                model.set({
                                    name: ProductModule.getName(model.get('id')),
                                    unit: ProductModule.getUnit(model.get('id'))
                                });

                                $.post('ajax/save/save_receive_items.php',  { values: model.attributes, receive_form_id: id } , function(data, textStatus, xhr) {
                                    /*optional stuff to do after success */
                                    $('#output-modal-list-of-all-carts').hide().html(data).fadeIn('fast');
                                }).success(function(data){
                                    if (data) {
                                        require(['modules/userlog_module'], function(UserlogModule){
                                            UserlogModule.saveDB('New Receiving Report was added');
                                        });
                                        ++b;
                                        if (a == b) {
                                            carts.reset();
                                            require(
                                                [
                                                 'modules/receiveform_module',
                                                 'modules/receiveitem_module',
                                                 'libs/load_css/loadcss',
                                                 'libs/alertify/js/alertify.min'
                                                ], function(ReceiveFormModule, ReceiveItemModule, css, alertify){

                                                var myCollection = ReceiveItemModule.findItemsWithIdOf(id);
                                                
                                                if (myCollection.length) {

                                                    ReceiveItemModule.appendModalListOfReceivingItem();

                                                    setTimeout(function() {
                                                        ReceiveItemModule.appendReceivingItem(myCollection);
                                                        ReceiveFormModule.appendReceivingHeader(id);
                                                    }, 500);
                                                    

                                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');

                                                    alertify.confirm('print Receiving report?', function(e){
                                                        if (e) {
                                                            setTimeout(function() {
                                                                $('#modalShowAllReceivingItems').find('#printReceivingReport').trigger('click');
                                                            }, 700);
                                                        }else {
                                                            console.log(e);
                                                        }
                                                    });
                                                    
                                                }else {
                                                    console.log('no collection was found');
                                                }
                                            });
                                        };

                                       
                                    };
                                }).fail(function(xhr){
                                    alert('error type: '+xhr.status);
                                });
                                
                            });
                        }); 

                    };

                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            },

            saveModel: function(json, type){
                receive_forms.add(json, {silent: type});
            },

            removeDB: function(i){
                $.post('ajax/delete/delete.php', {table: 'receive_form', id: i, prop: 'id' }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    require(['modules/userlog_module','modules/receiveitem_module'], function(UserlogModule, ReceiveItemModule){
                        UserlogModule.saveDB('Receiving report successfully removed');
                        ReceiveItemModule.removeDB(i);
                        receive_forms.remove(i);
                    });
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            },

            populateAll: function(){
                require(['modules/receiveitem_module'], function(module){
                    module.fetchData();
                });
                this.appendListOfReceivingForm().subscribe();
            },

            zeroPad: function(num, places){
                var zero = places - num.toString().length + 1;
                return Array(+(zero > 0 && zero)).join("0") + num;
            },

            generateCrm: function(){
                $('#cart-rr-no').append('<i class="fa fa-refresh fa-spin fa-2x  "></i>')
                $.post('ajax/select/request_max_receive_form_id.php',  { max: 'ezjones' }, function(data, textStatus, xhr) { 

                }).success(function(data){
                    
                    var zeroPad = ReceiveFormModule.zeroPad(parseInt(data), 5); 
                    var middle = 800; 
                    var date = new Date(); 
                    var middle = date.getFullYear() - 2000; 
                    var warehouse_loc = sessionStorage.getItem('code');
                    var warehouse = warehouses.get(sessionStorage.getItem('code'));
                    var id = warehouse.get('receipt_loc') + '-' +warehouse_loc + '-8'+ middle + '-' + zeroPad;
                    
                    setTimeout(function() {
                        $('span#cart-rr-no').text(id);
                        $('#hidden-cart-rr-no').val(id);
                    }, 2000);
                    
                 }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            },

            sortTable: function(attr, type){
                 require(['libs/backbone.obscura'], function(imp){
                    var proxy = new imp(receive_forms)
                    proxy.setSort(attr, type);
                     var view = new ViewListOfReceivingForm({
                        collection: proxy
                     });
                     view.render();
                 });
            },

            sortByDate: function(collection, Obscura){
                var proxy = new Obscura(collection);
                return proxy.setSort('date', 'desc');
            },

            sortBy: function(attr, type, Obscura){
                var proxy = new Obscura(receive_forms);
                return proxy.setSort(attr, type);
            },

            search: function(value){
                var lists = new MyCollection();
                receive_forms.forEach(function(model) {
                    $.each(model.attributes, function(index, val) {
                         if (model.get(index).toLowerCase().indexOf(value) !== -1) {
                            lists.add(model);
                         }
                    });
                });
                return lists;
            },

            searchDate: function(date, moment){
                var lists = new MyCollection();
                receive_forms.forEach(function(model) {
                   var rs = moment(date).isSame(model.get('date'));
                   if(rs){
                       lists.add(model);
                   }
                });
                return lists;
            },

            searchBetween: function(from, to, moment){
                var d1 = moment(from).subtract(1,'d').format('dddd MMMM DD, YYYY');
                var d2 = moment(to).add(1,'d').format('dddd MMMM DD, YYYY');
                var lists = new MyCollection();
                receive_forms.forEach(function(model) {
                    if(moment(model.get('date')).isBetween(d1, d2)) lists.add(model);
                });
                return lists;
            },

            subscribe: function(){
                /*
                pubnub.subscribe({
                    channel: 'receive_forms',
                    message: function(m){
                        var model = m.model;
                        console.log(m)
                          if(m.user != sessionStorage.getItem('uid')){
                            
                            if (m.type == 'add') {
                                console.log('adding')
                                
                                if (model.warehouse_code == sessionStorage.getItem('code')) {
                                    repair_forms.add(model, {silent: true});
                                }
                               
                            }else if(m.type == 'remove') {
                                console.log('removing')
                                if (model.warehouse_code == sessionStorage.getItem('code')) {
                                    repair_forms.remove(model.id, {silent: true});
                                }
                            }

                            //redisplay the table.
                            if (m.type  == 'add' || m.type == 'remove') {
                                RepairFormModule.appendListOfRepairForms();
                            }

                          }  

                        
                    }
                });
                */
        },


            //Subviews..

            appendListOfReceivingForm: function(){
                setTimeout(function() {
                    var view = new ViewListOfReceivingForm({
                        collection: receive_forms
                    });
                    view.render();
                }, 500);    
                return this;
            },

            appendListOfReceivingForm2: function(list){
                setTimeout(function() {
                   var view = new ViewListOfReceivingForm({
                        collection: list
                    });
                    view.render();
                }, 500);
                return this;
            },

            appendReceivingHeader: function(id){
                var view = new ViewReceivingFormHeader();
                view.render(id);
                return this;
            },

            formInit: function(self, length){
 
                 var $panel = $('#panel-receiving-reports');

                 $(function() {

                    if (length == 0) {
                        require(['modules/functions'], function(fn){
                            fn.noDataWasFound('#list-of-receiving-reports', 9, 'No data was found');
                        });
                    };

                });

                 $(function() {
                     $panel.find('tr').dblclick(function(event) {
                         router.navigate('viewAllReceivingItems/'+this.id, true);
                     });
                 });

                 $(function() {
                     self.$el.find('a.print').click(function(event) {
                        var id = this.id;

                             require([
                                    'modules/receiveform_module',
                                    'modules/receiveitem_module',
                                    'libs/jquery-ui/jquery-ui.min'
                                ], function(ReceiveFormModule, ReceiveItemModule, jQueryui){

                                var myCollection = ReceiveItemModule.findItemsWithIdOf(id);
                                ReceiveItemModule.appendModalListOfReceivingItem();
                                setTimeout(function() {
                                    ReceiveItemModule.appendReceivingItem(myCollection);
                                    ReceiveFormModule.appendReceivingHeader(id);

                                    $('#modalShowAllReceivingItems').modal('show');
                                    $('#div-modalShowAllReceivingItems').draggable({cursor: 'move'});
                                }, 500);

                            });
                     });
                 });

                $(function() {
                    require(['libs/bootstrap/transition','libs/bootstrap/tooltip'], function(){
                        $('[data-toggle="tooltip"]').tooltip();
                    });
                });  
                
            }
            
    }
   
    return ReceiveFormModule; 
});