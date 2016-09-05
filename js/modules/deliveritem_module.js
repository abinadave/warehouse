define(
	[
		'underscore',
		'backbone',
        'libs/backbone.obscura',
        'views/deliver/view_modal_table_deliver_items',
        'views/deliver/view_list_of_deliver_items'
	],  function(_, Backbone, Obscura, ViewModalTableDeliverItems, ViewListOfDeliverItems) {
   
    var DeliverItemModule = {

    	saveDB: function(id){
            require(['modules/product_module','modules/collection_module'], function(ProductModule, colmod){
    		DeliverItemModule.a = extracts.length;
    		DeliverItemModule.b = 0;

    		extracts.forEach(function(model) {

                var stockCard = products.get(model.get('id'));
                var obj = _.omit(stockCard.attributes, 'id','running_bal');

                obj.delivered_id = id; obj.item = model.get('id'); obj.qty = model.get('qty');
                obj.remarks = model.get('remarks'); obj.status = '0'; obj.table = 'deliver_item';

                model.set({ name: ProductModule.getName(model.get('id')) });
                model.set({ unit: ProductModule.getUnit(model.get('id')) });
                colmod.saveDB($.param(obj), 'deliver_items', DeliverItemModule);

    		});

          });  
           
    	},

        fetchData: function(){
            if (deliver_items.length) {
                DeliverItemModule.populateAll();
                // require(['modules/functions'], function(fn){
                    // fn.getRows('deliver_items', DeliverItemModule);
                // }); 
            }else{
                $.getJSON('ajax/select/get_deliveritems.php', function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    DeliverItemModule.saveModel(json, 1);
                    DeliverItemModule.populateAll();
                });
            }
        },

        saveModel: function(json, type){
           json.forEach(function(model) {
                var obj = {delivered_id: model.delivered_id, item: model.item};
                var rs = deliver_items.where(obj);
                if (rs.length) {          
                    if (deliver_items.where(obj)) {
                        var item = deliver_items.findWhere(obj);
                        deliver_items.remove(item.cid);
                    };
                };
            });
            deliver_items.add(json, {silent: type});
            return this;
        },

        afterSave: function(json) {
            deliver_items.add(json);
            if (DeliverItemModule.a == ++DeliverItemModule.b) {
                extracts.reset();
                $('#form-deliver-receipt')[0].reset();
                $('#modalDeliveryForm').modal('hide');
            }
        },

        removeDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'deliver_item', id: i, prop: 'delivered_id'}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                console.log(data);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        populateAll: function(){
            // this.incommingItems(sessionStorage.getItem('code'));
        },

        findItemsWhereIdOf: function(id){
            var Library = Backbone.Collection.extend({});
            var library = new Library();
                deliver_items.forEach(function(model) {
                    if (model.get('delivered_id') == id) {
                        library.add(model.attributes);
                    };
                });
            return library;
        },

        incommingItems: function(code) {
            var ids = deliver_forms.pluck('id');
            var list = new Backbone.Collection();
            ids.forEach(function(id) {
                var proxy = new Obscura(deliver_items);
                proxy.filterBy('delivered_id', {delivered_id: id});
                proxy.forEach(function(model) {
                    list.add(model);
                });
            });
            var proxy2 = new Obscura(list);
            proxy2.filterBy('status', {status: '0'});
            notifications.add({
                message: proxy2.length +' incomming items',
                href: '#itemReports'
            }, {silent: true});
        },

        getItems: function(id){
            var proxy = new Obscura(deliver_items);
            return proxy.filterBy('id', {delivered_id: id});
        },




        //subviews..

        appendModalTableDeliverItems: function(){
            var view = new ViewModalTableDeliverItems();
            view.render();
        },

        appendListOfDeliverItems: function(myCollection){
            var view = new ViewListOfDeliverItems({
                collection: myCollection
            });
            view.render();
        },

        appendDeliveryReceiptHeader: function(rid){
            require(['modules/warehouse_module','moment'], function(WarehouseModule, moment){
               var form = deliver_forms.get(rid), date = moment(form.get('date')).format('dddd MMMM DD, YYYY');
               var $target = $('#modalTableDeliverItems');
               $target.find('#date-issued').text(date).end()
               .find('#time-issued').text(form.get('time')).end()
               .find('#to-person').text(form.get('to_person')).end()
               .find('#to-location').text(form.get('to_location')).end()
               .find('#from-location').text(form.get('from_location')).end()
               .find('#rr-no').text(form.get('no')).end()
               .find('#prepared-by').text(form.get('prepared_by')).end()
               .find('#delivered-by').text(form.get('delivered_by')).end()
               .find('#delivered-by-position').text(form.get('delivered_by_position'));
           });
        }


    }
   
    return DeliverItemModule; 
});