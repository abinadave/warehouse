define(
	[
		'underscore',
		'backbone',
        'collections/mycollection',
        'libs/backbone.obscura',
		'views/tool/borrow/view_modal_form_borrower_slip',
        'views/tool/borrow/view_table_history_borrowed',
        'views/tool/borrow/view_list_of_borrower_forms'
	],  function(_, Backbone, MyCollection, Obscura, ViewModalFormBorrowerSlip, ViewTableHistoryBorrowed, ViewListOfBorrowerForms) {
   
    var BorrowerFormModule = {

        transfer: false,
        
        fetchData: function(){
            if (sessionStorage.getItem('usertype') == '1') {
                if (borrower_forms.length) {
                    BorrowerFormModule.populateAll();  
                }else {
                    $.getJSON('ajax/select/select_admin.php', { table: 'borrower_forms' }, function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        BorrowerFormModule.saveModel(json, 1).populateAll();
                    });
                }
            }else {
                if (borrower_forms.length) {
                    BorrowerFormModule.populateAll();  
                }else {
                    $.getJSON('ajax/select/select_where.php', {table: 'borrower_forms', code: sessionStorage.getItem('code') }, function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        BorrowerFormModule.saveModel(json, 1).populateAll();
                    });
                }
            }

        },

        saveModel: function(json, type){
            borrower_forms.add(json, {silent: type});
            return this;
        },

    	saveBorrowerForm: function(form){
            
           $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
               /*optional stuff to do after success */
           }).success(function(data){

                var json = $.parseJSON(data);
                var id = parseInt(json.id);
                
                if ($.isNumeric(id)) {
                   BorrowerFormModule.updateBorrowerBSNo(id, form);
                }

                require(['modules/userlog_module'], function(UserlogModule){
                    UserlogModule.saveDB('new borrower slip was added');
                    //real time models..
                });

           }).fail(function(xhr){
               alert('error type: '+xhr.status);
           });
        },

        updateBorrowerBSNo: function(id, form){
            var date = new Date();
            require(['modules/receiveform_module','modules/borroweritem_module','modules/functions','moment'], 
                function(ReceiveFormModule, BorrowerItemModule, Functions, moment){
                    
                    var zeropad = ReceiveFormModule.zeroPad(id, 5);
                    var bsNo = 'TAC-' + sessionStorage.getItem('code') + '-8' + moment().format('YY') + '-' + zeropad;
                    var data = {no: bsNo};
                    
                        $.post('ajax/update/update.php', { table: 'borrower_forms', where: 'id', where_value: id, values: data }, function(data, textStatus, xhr) {
                            /*optional stuff to do after success */
                        }).success(function(data){

                            var obj = router.getQueryParameters(form);
                            obj.id = id.toString(), obj.no = bsNo;
                           
                            $.each(obj, function(key) {
                                var newValue = Functions.replaceAll(obj[key],'+',' ');
                                obj[key] = newValue;
                            });
                            
                            borrower_forms.add(obj);

                            $('#form-submit-borrowerslip')[0].reset();
                            $('#form-submit-borrowerslip').find('#purpose').focus();
                            BorrowerItemModule.saveDB(id);

                        }).fail(function(xhr){
                            alert('error type: '+xhr.status);
                        });

            });
        },

        searchTool: function(value){
            var myCollection = new MyCollection();
            borrower_forms.forEach(function(model) {
                if (model.get('no').toLowerCase().indexOf(value) !== -1 ||  model.get('date').toLowerCase().indexOf(value) !== -1 ||  model.get('time').indexOf(value) !== -1 ||  model.get('purpose').toLowerCase().indexOf(value) !== -1 ||  model.get('issued_by').toLowerCase().indexOf(value) !== -1 ||  model.get('issued_by_position').toLowerCase().indexOf(value) !== -1 ||  model.get('borrowed_by').toLowerCase().indexOf(value) !== -1 || model.get('borrowed_by_position').toLowerCase().indexOf(value) !== -1 || model.get('noted_by').toLowerCase().indexOf(value) !== -1 || model.get('noted_by_position').toLowerCase().indexOf(value) !== -1) { 
                    myCollection.add(model.attributes) 
                };
            });
            return myCollection;
        },

        search: function(value){
            var lists = new MyCollection();
            borrower_forms.forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                    if(model.get(index).toLowerCase().indexOf(value) !== -1) lists.add(model);
                });
            });
            return lists;
        },

        delete: function(ids){
                require(
                    [
                        'libs/load_css/loadcss',
                        'libs/alertify/js/alertify.min',
                        'modules/warehousemen_module',
                        'modules/userlog_module',
                        'modules/borroweritem_module'
                    ], 
                    function(css, alertify, WarehousemenModule, UserlogModule, BorrowerItemModule){
                        loadCSS('js/libs/alertify/css/alertify.core.css');
                        loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                        alertify.confirm('Are you sure ?', function(e){
                            if (e) {
                                ids.forEach(function(model) {
                                    $.post('ajax/delete/delete.php', {table: 'borrower_forms', id: model, prop: 'id' }, function(data, textStatus, xhr) {
                                    /*optional stuff to do after success */
                                    }).success(function(data){
                                        var attrs = borrower_forms.get(model);
                                        borrower_forms.remove(model);
                                        UserlogModule.saveDB('Borrower Slip was removed with id of: '+attrs.get('no'));
                                        BorrowerItemModule.removeDB(model);
                                    }).fail(function(xhr){
                                        alert('error type: '+xhr.status);
                                    });
                                });
                            }else {
                                console.log(e);
                            }
                        });
                });

        },

        sortBy: function(attr, type, collection){
           var proxy = new Obscura(collection);
           return proxy.setSort(attr, type);
        },
        
        populateAll: function(){
            require(['modules/borroweritem_module','modules/collection_module'], function(BorrowerItemModule, colmod){
                // BorrowerItemModule.fetchData();
                colmod.fetchData('borrower_items','borrower_items', BorrowerItemModule);
                BorrowerFormModule.appendListOfBorrowerForms();
                BorrowerFormModule.subscribe();
            });
            return this;
        },

        searchBetween: function(from, to, moment){
            var d1 = moment(from).subtract(1,'d').format('dddd MMMM DD, YYYY');
            var d2 = moment(to).add(1,'d').format('dddd MMMM DD, YYYY');
            var lists = new MyCollection();
            borrower_forms.forEach(function(model) {
                if(moment(model.get('date')).isBetween(d1, d2)) lists.add(model);
            });
            return lists;
        },

        filterMyWarehouse: function(){
            var proxy = new Obscura(borrower_forms);
            if (parseInt(sessionStorage.getItem('code')) > 0) {
                return proxy.filterBy('warehouse', {code: sessionStorage.getItem('code')});
            }else {
                return borrower_forms;
            }
        },

        sort: function(collection, Obscura){
            var proxy = new Obscura(collection);
            return proxy.setSort('date','desc');
        },

        subscribe: function(){
            /*
            pubnub.subscribe({
                channel: 'borrower_forms',
                message: function(m){
                    var model = m.model;
                    if (m.user != sessionStorage.getItem('uid')) {
                        if (m.type == 'add') {
                            var rs = borrower_forms.where({id: model.id});
                            if (!rs.length) {
                                if (model.warehouse_code == sessionStorage.getItem('code')) {
                                    borrower_forms.add(model, {silent: true});
                                    BorrowerFormModule.appendListOfBorrowerForms();
                                };
                            }
                        }else if(m.type == 'remove') {
                            if (model.warehouse_code == sessionStorage.getItem('code')) {
                                borrower_forms.remove(model.id, {silent: true});
                                BorrowerFormModule.appendListOfBorrowerForms();
                            };
                        }
                    } 
                }
            });
            */
        },

        afterRefresh: function(data){
            var list = new Backbone.Collection(data);
            var proxy = new Obscura(list);
            proxy.filterBy('warehouse code', {warehouse_code: sessionStorage.getItem('code')});
            if (borrower_forms.length != proxy.length) {
                borrower_forms.reset()
                borrower_forms.add(proxy.toJSON(), {silent: true});
            };
        },




        //Subviews...
        
        appendTableBorrowedHistory: function(){
            var view = new ViewTableHistoryBorrowed();
            view.render();
            return this;
        },

        appendModalBorrowerSlip: function(){
            var view = new ViewModalFormBorrowerSlip();
            view.render();
        },

        appendListOfBorrowerForms: function(){
            var view = new ViewListOfBorrowerForms({
                collection: borrower_forms
            });
            view.render();
        },

        init: function(self, length){
            
                var $panel = $('#panel-history-borrow');
                $(function(){
                    //jQuery
                   self.$el.find('a').click(function(event) {
                       var res = this.id.split('-');
                       if (res[0] == 'print') {
                           var rs = borrower_items.where({borrower_id: res['1']});
                           if (rs.length) {
                                require(['modules/borroweritem_module'], function(BIM){
                                    BIM.printableModalItems(res['1']);
                                });
                           }else {
                                console.log(res['1']);
                           }
                       }else {
                            
                            var bm = require('modules/borroweritem_module');
                            var fn = require('modules/functions');
                            var items = bm.getItemsWhereIdOf(borrower_items, res[1]);
                            fn.appendView('views/tool/borrow/view_modal_return_tools');
                            bm.appendReturnTools(items);
                       }
                       
                   });
                });

                         

                $(function() {

                    if (!length) {
                        $('#list-of-borrower-forms').html('<tr><td colspan="11">no data was found</td></tr>');
                    }  

                    self.$el.find('td').addClass('text-center');
                });

                $(function() {
                    
                });

                $(document).ready(function() {
                    var popover = self.$el.find('.tooltip-bottom').popover({
                            trigger : 'hover',  
                            placement : 'left',
                            html: 'true'
                        });

                        popover.on('show.bs.popover', function() {
                            var i = this.id;
                            var proxy = new Obscura(borrower_items);
                            proxy.filterBy('id and status', {borrower_id: i});
                            var div = '<div class="container">';
                            div += '<label>Returned: </label> <span>' + proxy.where({status: '1'}).length + '</span><br/>';
                            div += '<label>Pending: </label> <span>' + proxy.where({status: '0'}).length + '</span><br/>';
                            div += '<label>Tool borrowed: </label> <span>'+proxy.length+'</span><br/>';
                            div += '</div>';
                            popover.attr('data-content', div);
                        });
                });
        }
        

    }
   
    return BorrowerFormModule; 
});