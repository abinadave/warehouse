define(
	[
		'underscore',
		'backbone',
        'libs/backbone.obscura',
        'collections/mycollection',
        'views/tool/transfer/view_transfer_slip_form',
        'views/tool/transfer/view_table_history_of_transfered_tools',
        'views/tool/transfer/view_list_of_transferforms'
	],  function(_, Backbone, Obscura, MyCollection, ViewTransferSlipForm, ViewTableHistoryTransferedTool, ViewListOfTransferForms) {
   
    var TransferFormModule = {

        lastInsertId: null,

        fetchData: function(){
            if (sessionStorage.getItem('usertype') == 1) {
                if (transfer_forms.length) {
                    TransferFormModule.populateAll();
                }else {
                    $.getJSON('ajax/select/select_admin.php', { table: 'transfer_forms'  }, function(json, textStatus, xhr) {
                    }).success(function(json){
                        TransferFormModule.saveModel(json, 1).populateAll();
                    });
                }
            }else {
                if (transfer_forms.length) {
                    TransferFormModule.populateAll();
                }else {
                    $.getJSON('ajax/select/select_transfered_tools.php', { code: sessionStorage.getItem('code')  }, function(json, textStatus, xhr) {
                    }).success(function(json){
                        TransferFormModule.saveModel(json, 1).populateAll();
                    });
                }
            }
            return this;
        },

        saveDB: function(form){
            form += '&warehouse_code='+ sessionStorage.getItem('code');
            $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var json = $.parseJSON(data);
                var id = parseInt(json.id);
                if ($.isNumeric(id)) {
                    require([
                            'modules/transferitem_module',
                            'modules/functions',
                            'modules/userlog_module',
                            'modules/collection_module',
                            'models/notification',
                            'modules/notification_module',
                            'moment'
                            ], function(TFM, Functions, UserlogModule, cm, Notification, notification_module, moment){

                                TransferFormModule.updateTransferSlipForm(id, form);
                                UserlogModule.saveDB('new transfer slip was added');

                                var obj = Functions.clearObject(form);

                                var model = new Notification({
                                    date: Functions.getDate(),
                                    message: 'New receivable tools',
                                    icon: 'glyphicon glyphicon-cog',
                                    sender_id: sessionStorage.getItem('uid'),
                                    unread: '1',
                                    usertype: sessionStorage.getItem('usertype'),
                                    warehouse_code: obj.to_warehouse_id,
                                    table: 'notifications'
                                });

                                cm.saveDB($.param(model.attributes), 'notifications', notification_module);
                                
                    });
                }
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        removeDB: function(i){
            $.post('ajax/delete/delete.php', { table: 'transfer_forms', id: i, prop: 'id' }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                transfer_forms.remove(i);
                
                require(['modules/userlog_module','modules/transferitem_module'], 
                    function(UserlogModule, TransferItemModule){
                        var trans = transfer_forms.get(i);
                        UserlogModule.saveDB('Transfer tool history was removed');
                        TransferItemModule.removeDB(i);
                });

                

            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        fetchNofitication: function(){
           $.get('ajax/select/get_notification_transferform.php', function(data) {
               /*optional stuff to do after success */
           }).success(function(response){
                var value = parseInt(response);
                if (value > 0) {
                    $('#badge-transferform-nitifiation').text(value);
                    TransferFormModule.destroyNotification();
                }
           });
           return this;
        },

        destroyNotification: function(){
            $.post('ajax/delete/delete.php', {table: 'transferform_notification', id: sessionStorage.getItem('code') , prop: 'code' }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                // console.log('hey');
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
            return this;
        },

        fetchTransferedTools: function(){

        },

        search: function(value){
            var lists = new MyCollection();
            transfer_forms.forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                    if(model.get(index).toLowerCase().indexOf(value) !== -1){
                        lists.add(model);
                    }
                });
            });
            return lists;
        },

        updateTransferSlipForm: function(id, form){
            var date = new Date();
            require(['modules/functions','modules/transferitem_module','moment'], function(Functions, TIM, moment){
                var zeropad = Functions.zeroPad(id, 5);
                var bsNo = 'TAC-' + sessionStorage.getItem('code') + '-8' + moment().format('YY') + '-' + zeropad;
                var data = {no: bsNo};

                $.post('ajax/update/update.php', { table: 'transfer_forms', where: 'id', where_value: id, values: data }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){

                        TIM.saveDB(id);
                        var obj = router.getQueryParameters(form);
                        obj.no = bsNo;
                        obj.id = id.toString();
                        console.log(obj.id);
                        
                            $.each(obj, function(key) {
                                var newValue = Functions.replaceAll(obj[key],'+',' ');
                                 obj[key] = newValue;
                            });

                        transfer_forms.add(obj);
                       
                        TransferFormModule.lastInsertId = id.toString();
                        
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            });
        },

        saveModel: function(json, type){
            transfer_forms.add(json, {silent: type});
            return this;
        },

        populateAll: function(){
            require(['modules/transferitem_module','modules/collection_module'], 
                function(TransferItemModule, colmod){
                    // TransferItemModule.fetchData();
                    colmod.fetchData('transfer_items', 'transfer_items', TransferItemModule);
            });
            this.appendListOfTransferForms();
            this.subscribe();
        },

        subscribe: function(){
            /*
            pubnub.subscribe({
                channel: 'transfer_forms',
                message: function(m){
                    var model = m.model;
                    if (m.type == 'add') {

                        var rs = transfer_forms.where({id: model.id});
                        if (!rs.length) {
                            
                            transfer_forms.add(m.model, {silent: true});
                            TransferFormModule.appendListOfTransferForms();
                        }

                    }else if(m.type == 'remove'){
                        if (model.warehouse_code == sessionStorage.getItem('code')) {
                            borrower_forms.remove(model.id, {silent: true});
                            TransferFormModule.appendListOfTransferForms();
                        }
                    }else {
                        console.log(m.model);
                    }
                }
            });
            */
        },

        searchBetween: function(from, to, moment){
            var d1 = moment(from).subtract(1,'d').format('dddd MMMM DD, YYYY');
            var d2 = moment(to).add(1,'d').format('dddd MMMM DD, YYYY');
            var lists = new MyCollection();
            transfer_forms.forEach(function(model) {
                if(moment(model.get('date')).isBetween(d1, d2)) lists.add(model);
            });
            return lists;
        },

        sort: function(collection, Obscura){
            var proxy = new Obscura(collection);
            return proxy.setSort('date', 'desc');
        },

        sortBy: function(attr, type, collection){
            var proxy = new Obscura(collection);
            return proxy.setSort(attr, type);
        },

        getIdsWithWarehouseOf: function(code, Obscura){
            var proxy = new Obscura(transfer_forms);
            return proxy.filterBy('warehouse_code', {to_warehouse_id: code, status: '0'});
        },

        getRP: function(id, stat){
            //received and pending (RP)
            var Obscura = require('libs/backbone.obscura');
            var items = new Obscura(transfer_items);
            items.filterBy('id', {transfer_id: id, status: stat});
            return items.length;
        },

        afterRefresh: function(data){
            var col = new Backbone.Collection(data), list = new Backbone.Collection(), 
            proxy = new Obscura(col), code = sessionStorage.getItem('code');

            proxy.forEach(function(model) {
                if (model.get('warehouse_code') == code || model.get('to_warehouse_id') == code) {
                    list.add(model);
                };
            });

            if (list.length != transfer_forms.length) {
                transfer_forms.reset();
                transfer_forms.add(list.toJSON());
                console.log('dont match');
            }else {
                console.log('match');
            }
          
        },

        ifBelongsHere: function(model){
            if (model.to_warehouse_id == sessionStorage.getItem('code')) {
                return true;
            }else {
                return false;
            }
        },





        // Subviews ..

        appendTransferFormlist: function(){
            var view = new ViewTransferSlipForm();
            view.render();
        },

        appendTabeHistoryOfTransferedTool: function(){
            var view = new ViewTableHistoryTransferedTool();
            view.render();
            return this;
        },

        appendListOfTransferForms: function(){
            var view = new ViewListOfTransferForms({
                collection: transfer_forms
            });
            view.render();
        },

        appendListOfTransferForms2: function(lists){
            var view = new ViewListOfTransferForms({
                collection: lists
            });
            view.render();
        },

        appendListOfSortedCollection: function(col){
            require(['views/tool/transfer/view_list_of_sorted_collection'], function(Subview){
                var view = new Subview({
                    collection: col
                });
            });
        },

        init: function(self, length){
                var $el = $('#history-of-transfered-tool');
             

                $(function() {
                    
                    if (length == 0) {
                        require(['modules/functions'], function(fn){
                            fn.noDataWasFound('#history-of-transfered-tool', 11, 'No history was found for <b>&nbsp;transfered tools</b>');
                        });
                    }

                    $el.find('tr td').css('text-align', 'center');
                });

                $(function() {
                    $('#delete-msg').click(function(event) {
                        /* Act on the event */
                        var ids = self.checkedTools();
                        if(ids.length > 0){
                            require(['modules/transferform_module','libs/load_css/loadcss',
                                'libs/alertify/js/alertify.min'], function(TFM, css, alertify){
                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                    alertify.confirm('Are you sure ?', function(e){
                                        if (e) {
                                             ids.forEach(function(id) {
                                                TFM.removeDB(id);
                                            });
                                        }
                                    });
                               
                            });
                        }else {
                            router.alertify_error('Please select atleast one record');
                        }
                    });
                });

                $(function() {
                    self.$el.find('a').click(function(event) {
                        var res = this.id.split('-');
                        if (res[0] == 'receive') {
                            //for receivables in current warehouse..

                            require(['modules/transferitem_module','collections/mycollection','libs/backbone.obscura'], 
                                function(TIM, MyCollection, Obscura){

                                    var items = TIM.getTransferItems(res[1], transfer_items);
                                    var ids = items.pluck('tool_id');
                                    var found = new MyCollection();             
                                   
                                    require(['modules/transferedtool_module'], function(TTM){
                                        TTM.appendModalReceivableTools();
                                        setTimeout(function() {
                                            TTM.appendListOfTransferedTools(items);
                                        }, 500);
                                    });    
                            });
                        }else {
                            //for printing receipt..
                            
                            if ($.isNumeric(res[1])) {
                                var rs = transfer_items.where({transfer_id: res[1]});
                                if (rs.length) {
                                    require(['modules/transferitem_module'], function(TIM){
                                        TIM.findItemsWhereIdOf(res[1]);
                                    });
                                };
                            };
                        }
                    });
                });

                 $(document).ready(function() {
                    //popover fot receivable tools ex. pending, total items and received.
                    var popover = self.$el.find('[data-toggle="popover"]').popover({
                            trigger : 'hover',  
                            placement : 'left',
                            html: 'true'
                        });

                        popover.on('show.bs.popover', function() {
                            var i = this.id;
                            var proxy = new Obscura(transfer_items);
                            proxy.filterBy('id and status', {transfer_id: i});

                            var div = '<div class="container">';
                            div += '<label>Received: </label> <span>' + proxy.where({status: '1'}).length + '</span><br/>';
                            div += '<label>Pending: </label> <span>' + proxy.where({status: '0'}).length + '</span><br/>';
                            div += '<label>Tool transferred: </label> <span>'+proxy.length+'</span><br/>';
                            div += '</div>';
                            popover.attr('data-content', div);

                        });
                });

        }



    }
   
    return TransferFormModule; 
});