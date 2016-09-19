define(
	[
		'underscore',
		'backbone',
        'collections/mycollection',
        'views/withdraw/view_list_of_withdrawalslips'
	],  function(_, Backbone, MyCollection, ViewListOfWithdrawalSlips) {
   
    var WithDrawFormModule = {


        fetchData: function(){
            if (withdraw_forms.length) {
                WithDrawFormModule.populateAll();
            }else {
                $.getJSON('ajax/select/select_where.php', { table: 'withdraw_form'},function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    WithDrawFormModule.saveModel(json, 1);
                    WithDrawFormModule.populateAll();
                });
            }
        },

    	saveDB: function(form, type){
            require(
                [
                   'modules/product_module',
                   'modules/withdrawitem_module',
                   'libs/load_css/loadcss',
                   'libs/alertify/js/alertify.min',
                ], function(ProductModule, WithDrawItemModule, css, alertify){   

                form += '&hour=' + router.getCurrectHour();
                form += '&warehouse_code=' + sessionStorage.getItem('code');
        		$.post('ajax/save/save_withdrawform.php',form, function(data, textStatus, xhr) {
        			/*optional stuff to do after success */
        			$('#output-save-withdraw').html(data);
        		}).success(function(data){
                    
        			var id = parseInt(data);
                    var length = extracts.length;
                    var finished = 0;

        			if (id > 0) {

        				extracts.forEach(function(model) {

                            model.set({name: ProductModule.getName(model.get('id'))});
                            model.set({unit: ProductModule.getUnit(model.get('id'))});
                            
        					$.post('ajax/save/save_withdrawitem.php',{ values: model.attributes, withdraw_id: id }, function(data, textStatus, xhr) {
        						
        					}).success(function(data){
                                var json = $.parseJSON(data);
        						if (json.success) {
                                    require(['modules/userlog_module'], function(UserlogModule){
                                        UserlogModule.saveDB('New Withdraw slip was added');
                                    });
                                    
                                    ++finished;

                                    withdraw_items.add({
                                        withdraw_id: id.toString(), 
                                        qty: model.get('qty'), 
                                        remarks: model.get('remarks'), 
                                        item: model.get('id'),
                                        name: ProductModule.getName(model.get('id')),
                                        unit: ProductModule.getUnit(model.get('id'))
                                    });

                                    if (finished == length) {
                                        WithDrawFormModule.afterSaving();
                                        if (type == 'wd') {
                                            $('#modalDeliveryForm').modal({backdrop: 'static', keyboard: false});
                                            setTimeout(function() {
                                               $('#modalDeliveryForm').find('#to-person').focus();
                                               extracts.afterAdd();
                                            }, 500);
                                        }else{

                                            loadCSS('js/libs/alertify/css/alertify.core.css');
                                            loadCSS('js/libs/alertify/css/alertify.bootstrap.css');

                                            alertify.confirm('Print receipt now ?', function(e){
                                                if (e) {
                                                    
                                                    var myCollection = WithDrawItemModule.getItemsWhereidOf(id);
                                                    WithDrawItemModule.appendListOfWithDrawItem(myCollection);
                                                    WithDrawItemModule.appendWithDrawalDetails(id);
                                                    
                                                    setTimeout(function() {
                                                        $('#modalWithDrawItemTable').modal('show');
                                                        $('#modalWithDrawItemTable').find('#btnPrintWithdrawSlip').trigger('click');
                                                    }, 1000);

                                                }else {
                                                    console.log(e);
                                                }
                                            });

                                            
                                            extracts.reset();
                                        }
                                    };
                                };
        					}).fail(function(xhr){
        						alert('error type: '+xhr.status);
        					});
        				});
        			}
        		}).fail(function(xhr){
        			alert('error type: '+xhr.status);
        		});
            });
    	},

        afterSaving: function(){
            //router.alertify_success('Process completed');
            $('#form-save-withdraw-form-items')[0].reset();
            $('#modalPullOutList').modal('hide');

            //deliver form <select> locations/ warehouse brances
            //checks if combobox has length.
            if(!$('#to-location').find('option').length){
                require(['views/warehouse/view_list_of_location_in_modal'], function(Subview){
                    var view = new Subview({
                        collection: warehouses
                    });
                    view.render();
                });
            }else {
                $('#to-location').find('#code-'+sessionStorage.getItem('code')).hide();
            }
            
        },

        saveModel: function(json, type){
            withdraw_forms.add(json, {silent: type});
        },

        removeDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'withdraw_form', id: i, prop: 'id'}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                require(['modules/userlog_module','modules/withdrawitem_module'], function(UM, WIM){
                    UM.saveDB('Withdrawslip successfully removed');
                    WIM.removeDB(i);
                    withdraw_forms.remove(i);
                });
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        populateAll: function(){
            WithDrawFormModule.appendListOfWithdrawalForm();
            require(['modules/withdrawitem_module','modules/collection_module'], 
                function(WithDrawItemModule, colmod){
                WithDrawItemModule.fetchData();
                var obj = {
                    channel: 'withdraw_forms',
                    str_collection: 'withdraw_forms',
                    thismodule: WithDrawFormModule    
                };
                colmod.subscribe(obj);
            });
        },

        afterAddRemoveSubscribe: function() {
            WithDrawFormModule.appendListOfWithdrawalForm();
        },

        sortTable: function(attr, type){
             require(['libs/backbone.obscura'], function(imp){
                var proxy = new imp(withdraw_forms);
                proxy.setSort(attr, type);
                 var view = new ViewListOfWithdrawalSlips({
                    collection: proxy
                });
                view.render();
             });
        },

        sort: function(Obscura, collection){
            var proxy = new Obscura(collection);
            return proxy.setSort('date', 'desc');
        },


        searchDate: function(date, moment){
            var lists = new MyCollection();
            withdraw_forms.forEach(function(model) {
                var dt = moment(model.get('date')).format('dddd MMMM DD, YYYY');
                if(moment(date).isSame(dt)){
                    lists.add(model);
                }
            });
            var obj = { module: WithDrawFormModule, data: lists };
            return obj;
        },

        search: function(value) {
            var lists = new MyCollection();
            withdraw_forms.forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                    if (model.get(index).indexOf(value) !== -1) {
                        lists.add(model);
                    };
                });
            });
            return lists;
        },

        searchBetween: function(from, to, moment){
            var d1 = moment(from).subtract(1,'d').format('dddd MMMM DD, YYYY');
            var d2 = moment(to).add(1,'d').format('dddd MMMM DD, YYYY');
            var lists = new MyCollection();
            withdraw_forms.forEach(function(model) {
                if(moment(model.get('date')).isBetween(d1, d2)) lists.add(model);
            });
            return lists;
        },

        sortBy: function(id, type, Obscura){
            var proxy = new Obscura(withdraw_forms);
            return proxy.setSort(id, type);
        },

        




        //Subviews
        appendListOfWithdrawalForm: function(){
            setTimeout(function() {
                // body...
                if ($('#table-withdrawalslip').length) {
                    var view = new ViewListOfWithdrawalSlips({
                        collection: withdraw_forms
                    });
                    view.render();  
                };
            }, 1000);
        },

        appendListOfWithdrawalForm2: function(lists){
            if ($('#table-withdrawalslip').length) {
                var view = new ViewListOfWithdrawalSlips({
                    collection: lists
                });
            }
            view.render();
        },

        showAllWithDrawSlipsWithIdOf: function(rid){
            //this.navigate('withdrawalSlips', true);
            var result = withdraw_items.where({withdraw_id: rid});
            var $modal = $('#modalWithDrawItemTable');

            if (result.length) {
                require(
                    [
                       'modules/withdrawitem_module',
                       'moment'
                    ], function(WithDrawItemModule, moment){
                        
                        var models = WithDrawItemModule.getItemsWhereidOf(rid);
                        console.log(models);
                        if (models.length) {
                            $modal.modal('show');
 
                            WithDrawItemModule.appendListOfWithDrawItem(models);
                            WithDrawItemModule.appendWithDrawalDetails(rid);

                        }else {
                            router.alertify_error('Nothing was found');
                        }
                });
            
            }else {
                console.log('cant find items with id of: '+rid);
            }
            
        }


    }
   
    return WithDrawFormModule; 
});