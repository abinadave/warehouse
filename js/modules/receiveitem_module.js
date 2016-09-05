define(
	[
		'underscore',
		'backbone',
        'views/receiving_report/view_modal_show_receive_items',
        'views/receiving_report/view_list_of_receiving_items',
        'views/receiving_report/view_list_of_receiving_by_prod_id',
        'libs/backbone.obscura'
	],  function(_, Backbone, ViewModalShowReceiveItems, ViewListOfReceivingItems, ViewListOfReceivingByProdId, Obscura) {
   
    var ReceiveItemModule = {

        createList(r_obj, w_obj){
            var list = new Backbone.Collection();
            r_obj.forEach(function(model) {
                var receive_id = model.get('item');
                var rs = receive_forms.where({id: receive_id});
                if (rs.length) {
                    var receive_form = receive_forms.get(receive_id);
                    var newObj = _.extend(model.attributes, receive_form.attributes);
                    newObj.type = 'receive';
                    list.add(newObj);
                }
            });
            w_obj.forEach(function(model) {
                var rs = withdraw_forms.where({id: model.get('withdraw_id')});
                if (rs.length) {
                    var withdraw_form = withdraw_forms.get(model.get('withdraw_id'));
                    var newObj = _.extend(model.attributes, withdraw_form.attributes);
                    newObj.type = 'withdraw';
                    list.add(newObj);
                }
            });
            var proxy = new Obscura(list);
            return proxy.setSort('date','asc');
        },
    
    	fetchData: function(){
    		if (receive_items.length) {
    			ReceiveItemModule.populateAll();
    		}else {
    			$.getJSON('ajax/select/get_receiveitems.php', function(json, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(json){
    				ReceiveItemModule.saveModel(json, 1);
    			});
    		}
    	},

    	saveDB: function(){

    	},

    	saveModel: function(json, type){
            receive_items.add(json, {silent: true});
    	},

    	populateAll: function(){

    	},

        findItemsWithIdOf: function(id){
            var MyCollection = Backbone.Collection.extend({});
            var myCollection = new MyCollection();

            receive_items.forEach(function(model) {
                if (model.get('item') == id) {
                    myCollection.add(model.attributes);
                };
            });

            return myCollection;
        },

        findReceiving: function(id){
            var MyCollection = Backbone.Collection.extend({});
            var myCollection = new MyCollection();
            var rid = id.toString();
            receive_items.forEach(function(model) {
                if (model.get('receive_id') == id) {
                    var form = receive_forms.get(model.get('item'));
                    var obj = $.extend({}, form.attributes, model.attributes);
                    myCollection.add(obj);
                };
            });
            return myCollection;
        },

        removeDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'receive_item', id: i, prop: 'item'}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                console.log(data);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        getItems: function(i) {
            var proxy = new Obscura(receive_items);
            return proxy.filterBy('item', {item: i.toString()});
        },





        //Subviews
        appendModalListOfReceivingItem: function(){
            var view = new ViewModalShowReceiveItems();
            view.render();
        },

        appendReceivingItem: function(myCollection){
            var view = new ViewListOfReceivingItems({
                collection: myCollection
            });
            view.render();
        },

        appendListOfReceivingByProdId: function(myCollection){
            var views = new ViewListOfReceivingByProdId({
                collection: myCollection
            });
            views.render();
        },

        appendReceiveHistoryItems: function(list) {
            require(['views/receiving_report/view_list_of_receiving_history_items'], function(SubviewItems){
                var view = new SubviewItems({
                    collection: list
                });
            });
        }


    }
   
    return ReceiveItemModule; 
});