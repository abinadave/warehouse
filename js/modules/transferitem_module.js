define(
	[
		'underscore',
		'backbone',
        'libs/backbone.obscura',
		'models/transfer_form',
        'views/tool/transfer/view_modal_table_transfer_slip',
        'views/tool/transfer/view_list_of_transfer_items'
	],  function(_, Backbone, Obscura, Transfer_form, ViewModalTableTransferSlip, ViewListOfTransferItems) {
   
    var TransferItemModule = {
        
        fetchData: function(){
            if (transfer_items.length) {
                 TransferItemModule.populateAll();
            }else {
                $.getJSON('ajax/select/select.php', {table: 'transfer_items'}, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    TransferItemModule.saveModel(json, 1).populateAll();
                });
            }
        },

    	saveDB: function(rsp){
            var a = 0, b = transfers.length;

    		transfers.forEach(function(model) {
                
    			var item = TransferItemModule.getItems(rsp, model.attributes);

    			var form = $.param(item);

    			form += '&table=transfer_items&status=0';
    			$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
    				
    			}).success(function(data){

                    var json = $.parseJSON(data);
                    transfer_items.add(_.omit(json, 'id'));

                            require(['modules/transferedtool_module'], function(TTM){
                                 model.unset('qty');
                                 model.unset('borrower_id');
                                 model.set({warehouse_code: $('#to-warehouse-location').val()}, {silent: true})
                                 TTM.saveDB(model.attributes);
                                 ++a;

                                 if (a == b) {

                                    $('#modalTransferFormSlip').modal('hide');
                                    $('#form-submit-transferslip')[0].reset();
                            
                                    var TransferFormModule = require('modules/transferform_module');
                                    var id = TransferFormModule.lastInsertId;
                                    
                                    setTimeout(function() {
                                        var fn = require('modules/functions');
                                        
                                        require(
                                                [
                                                    'libs/load_css/loadcss',
                                                    'libs/alertify/js/alertify.min'
                                                ], 
                                                function(css, alertify){
                                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                                    alertify.confirm('print transfer equipment slip ?', function(e){
                                                        if (e) {
                                                            TransferItemModule.findItemsWhereIdOf(id);
                                                            setTimeout(function() {
                                                                $('#btnPrintTransferSlip').trigger('click');
                                                            }, 500)
                                                            
                                                        }
                                                    });
                                        });
                                    }, 1700);
 
                                 }

                            });

    			});
    		});
    	},

        saveModel: function(json, type){
            json.forEach(function(model) {
                var obj = {transfer_id: model.transfer_id, tool_id: model.tool_id};
                var rs = transfer_items.where(obj);
                if (rs.length) {          
                    if (transfer_items.where(obj)) {
                        var item = transfer_items.findWhere(obj);
                        transfer_items.remove(item.cid);
                    };
                };
            });
            transfer_items.add(json, {silent: type});
            return this;
        },

        removeDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'transfer_items', id: i, prop: 'transfer_id' }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
               
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

    	getItems: function(rsp, model){
    		var item = new Transfer_form({ transfer_id: rsp.toString(), qty: 1, unit: model.unit, name: model.model, tool_id: model.tool_id });
    		return item.attributes;
    	},

        findItemsWhereIdOf: function(rid){
               require(['libs/backbone.obscura'], function(imp){
                   var proxy = new imp(transfer_items)
                   proxy.filterBy('transfer_id', {transfer_id: rid});
                   if (proxy.length) {
                       TransferItemModule.appendTableModalTransferSlip();
                       TransferItemModule.appendListOfTransferItems(proxy);
                       TransferItemModule.setRecieptDetails(rid);
                   }else {
                       console.log('no data was found for id of: '+ rid);
                   }
               });
        },

        setRecieptDetails: function(rid){
            var form = transfer_forms.get(rid);
            var $modal = $('#modalTransferSlip');
            var moment = require('moment');
            $modal.find('#th-date').text(moment(form.get('date')).format('dddd MMMM DD, YYYY')).end().find('#th-time').text(form.get('time')).end().find('#th-to-warehouse').text(form.get('to_warehouse')).end().find('#sender-name').text(form.get('sender_name')).end().find('#sender-position').text(form.get('sender_position')).end().find('#recipient-name').text(form.get('recipient_name')).end().find('#recipient-position').text(form.get('recipient_position')).end().find('#noted-by').text(form.get('noter_name')).end().find('#noted-by-position').text(form.get('noter_position')).end()
            .find('#ets-no').text(form.get('no'))
        },

        subscribe: function(){ 
            /*
                pubnub.subscribe({
                    channel: 'transfer_items',
                    message: function(m){
                        var model = m.model;
                            if (m.type == 'add' && m.user != sessionStorage.getItem('uid')) {
                                if (model.hasOwnProperty('id')) {
                                    var newmodel = _.omit(model, 'id');
                                    transfer_items.add(newmodel, {silent: true});
                                } else{
                                    transfer_items.add(model, {silent: true});
                                }
                            }
                    }
                });
            */
        },

        populateAll: function(){
            require(['modules/transferedtool_module'], function(TTM){
                TTM.fetchData();
                TransferItemModule.dashboardTransferedToollength();
            });
            this.subscribe();
            return this;
        },

        dashboardTransferedToollength: function(){
            if (Backbone.history.fragment == 'dashboard') {
                require(['moment','collections/mycollection','libs/backbone.obscura'], function(moment, MyCollection, emp){
                    var now = moment().format('dddd MMMM DD, YYYY');
                    var items = new MyCollection();

                    transfer_forms.forEach(function(model) {
                       var result = moment(now).isSame(model.get('date'));
                       if (result) {
                            var proxy = new emp(transfer_items);
                            proxy.filterBy('transfer id', {transfer_id: model.get('id')});
                            if (proxy.length) {
                                proxy.forEach(function(model) {
                                    items.add(model.attributes);
                                });
                            };
                       }
                    });
                    $('#transfered-tool-length').text(items.length);
                });
            };
        },

        getTransferItems: function(id, list){
            var proxy = new Obscura(list);
            return proxy.filterBy('transfer id', {transfer_id: id});
        },

        editStatus: function(res, thisid){
            $.post('ajax/update/update_item_status.php', {status: 1, transfer_id: res[1], tool_id: res[0] }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var item = transfer_items.findWhere({transfer_id: res[1], tool_id: res[0]});
                console.log(res);
                item.set({status: '1'});
                TransferItemModule.glyphiconCheck(thisid);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        glyphiconCheck: function(thisid){
            $('.'+thisid).replaceWith('<span class="glyphicon glyphicon-ok"></span>');
        },




        //Subviews ..

        appendTableModalTransferSlip: function(){
            var view = new ViewModalTableTransferSlip();
            view.render();
        },

        appendListOfTransferItems: function(proxy){
            var view = new ViewListOfTransferItems({
                collection: proxy
            });
            view.render();
        }

    }
   
    return TransferItemModule; 
});