define(
	[
		'underscore',
		'backbone',
        'moment',
        'collections/mycollection',
        'views/withdraw/view_modal_table_withdrawitems',
        'views/withdraw/view_list_of_withdrawitem',
        'views/withdraw/view_image_withdrawitems',
        'views/withdraw/view_list_of_withdraw_by_prod_id',
        'modules/functions'
	],  function(_, Backbone, moment, Mycollection, ViewTableWithDrawItems, 
        ViewListOfWithdrawItems, ViewImageWithdrawItems, ViewListOfWithdrawById, FN) {
   
    var WithDrawItemModule = {
        
    	fetchData: function(){
    		if (withdraw_items.length) {
    			WithDrawItemModule.populateAll();
    		}else {
    			$.getJSON('ajax/select/get_withdrawitems.php', function(json, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(json){
    				WithDrawItemModule.saveModel(json, 1);
    				WithDrawItemModule.populateAll();
    			});
    		}
    	},

    	saveModel: function(json, type){
    		withdraw_items.add(json, {silent: type});
    	},

        removeDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'withdraw_item', id: i, prop: 'withdraw_id'}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                
            }).fail(function(xhr){
                console.log('error type: '+xhr.status);
            });
        },

        getItemsWhereidOf: function(withdraw_id){
            var Library = Backbone.Collection.extend({});
            var library = new Library();
            withdraw_items.forEach(function(model) {
                var rs = library.where({withdraw_id: withdraw_id.toString(), item: model.get('item').toString()});
                if (model.get('withdraw_id').toString() == withdraw_id.toString()) {
                    if (!rs.length) {
                       library.add(model.attributes); 
                    };
                };
            });
            return library;
        },

        findWithdraws: function(id){
            var myCollection = new Mycollection();
            withdraw_items.forEach(function(model) {
                if (model.get('item') == id) {
                    var form = withdraw_forms.get(model.get('withdraw_id'));
                    var obj = $.extend({}, form.attributes, model.attributes);
                    myCollection.add(obj);
                };
            });
            return myCollection;
        },

    	populateAll: function(){
            WithDrawItemModule.subscribe();
    	},

        subscribe: function(){
            /*
            pubnub.subscribe({
                channel: 'withdraw_items',
                message: function(m){
                    console.log('channel withdrawitems receive request');
                    var model = m.model;
                    
                        if (m.type == 'add' && m.user != sessionStorage.getItem('uid')) {
                            withdraw_items.add(model, {silent: true});
                        }
                   
                }
            });
            */
        },




        //subviews..
        
        appendModalTableWithdrawItems: function(){
            var view = new ViewTableWithDrawItems();
            view.render()
        },

        appendListOfWithDrawItem: function(models){
            var view = new ViewListOfWithdrawItems({
                collection: models
            });
            view.render();
        },
        getGetNo(model){
            var year = moment(model.date).format('YY');
            var id = FN.zeroPad(Number(model.id), 5); 
            var code = sessionStorage.getItem('code');
            var rs = warehouses.where({id: code});
            if (rs.length) {
                return rs[0].get('receipt_loc') + '-'+code+'-8'+year+'-'+id;
            }else {
                return '-';
            }
        },
        appendWithDrawalDetails: function(rid, self_view_withdrawslip){
            var $modal = $('#modalWithDrawItemTable');
            var rsItem = withdraw_forms.where({id: rid.toString()});
            if (rsItem.length) {
                var item = withdraw_forms.get(rid.toString());
                var ws_no = this.getGetNo(rsItem[0]);
                require(['modules/warehousemen_module'], function(WarehousemenModule){ 
                    $modal.find('#date-issued').text(moment(item.get('date')).format('dddd MMMM DD, YYYY')).end()
                    .find('#time-issued').text(item.get('time')).end()
                    .find('#no').text(ws_no).end()
                    .find('#linked-to').text(item.get('linked_to')).end()
                    .find('#requested-by').text(item.get('requested_by')).end()
                    .find('#requested-by-position').text(item.get('requested_by_position')).end()
                    .find('#issued-by').text(item.get('issued_by')).end()
                    .find('#issued-by-position').text(item.get('issued_by_position')).end()
                });
            }else {
                console.log('cant find id with: '+rid+' in withdrawforms')
            }
        },



        appendImageWithdrawSlip: function(){
            var view = new ViewImageWithdrawItems();
            view.render();
        },

        appendListOfWithDrawbyProdId: function(myCollection){
           var view = new ViewListOfWithdrawById({
            collection: myCollection
           });
           view.render();
        },

        appendHistoryOfItem: function(list) {
            require(['views/withdraw/view_list_of_withdraw_history'], function(SubviewHistories){
                var view = new SubviewHistories({
                    collection: list
                });
            });
        }

    }
   
    return WithDrawItemModule; 
});