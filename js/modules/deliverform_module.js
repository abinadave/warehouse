define(
	[
		'underscore',
		'backbone',
        'collections/mycollection',
		'views/deliver/view_modal_delivery_form',
        'views/deliver/view_list_of_deliver_form'
	],  function(_, Backbone, MyCollection, ViewModalDeliveryForm, ViewListOfDeliverForm) {
   
    var DeliverFormModule = {

        isDelivered: false,

    	saveDB: function(form){
            form += '&warehouse_code=' + sessionStorage.getItem('code');
    		$.post('ajax/save/save_deliverform.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    			$('#output-save-deliver-form').hide().html(data).fadeIn('fast');
    		}).success(function(data){});
    	},

    	fetchData: function(){
            if (deliver_forms.length) {
                 DeliverFormModule.populateAll();

            }else {
                $.getJSON('ajax/select/select_deliver_forms.php', { code: sessionStorage.getItem('code') }, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    DeliverFormModule.saveModel(json, 1);
                    DeliverFormModule.populateAll();
                });
            }
    	},

    	saveModel: function(json, type){
    		deliver_forms.add(json, {silent: type});
    	},

        removeDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'deliver_form', id: i, prop: 'id'}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                deliver_forms.remove(i);
                require(['modules/deliveritem_module'], function(DIM){
                    DIM.removeDB(i);
                });
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        populateAll: function(){
            
            this.appendListOfDeliverForms();
            require(['modules/deliveritem_module'], function(DeliverItemModule){
                DeliverItemModule.fetchData();
            });
            
        },

        checkPrint: function(id){
            require([
                'modules/deliverform_module',
                'modules/deliveritem_module',
                'libs/load_css/loadcss',
                'libs/alertify/js/alertify.min'], 
                function(DeliverFormModule, DeliverItemModule, css, alertify){
                    loadCSS('js/libs/alertify/css/alertify.core.css');
                        loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                        alertify.confirm('Do you want to print Delivery Receipt ?', function(e){
                            if (e) {
                                if(DeliverFormModule.isDelivered){
                                    DeliverItemModule.appendModalTableDeliverItems();
                                    setTimeout(function() {
                                        router.navigate('viewDeliveredItems/'+id, true);
                                    }, 500);
                                }
                            }else {
                                console.log(e);
                            }
                        });
            });
        },

        searchDate: function(date, moment){
            var lists = new MyCollection();
            deliver_forms.forEach(function(model) {
                var dt = moment(model.get('date')).format('dddd MMMM DD, YYYY');
                if(moment(date).isSame(dt)){
                    lists.add(model);
                }
            });
            return lists;
        },

        searchModels: function(value){
            var lists = new MyCollection();
            deliver_forms.forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                    if (model.get(index).toLowerCase().indexOf(value) !== -1) {
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
            deliver_forms.forEach(function(model) {
                if(moment(model.get('date')).isBetween(d1, d2)) lists.add(model);
            });
            return lists;
        },

        sortByDate: function(collection, Obscura){
            var proxy = new Obscura(collection);
            return proxy.setSort('date', 'desc');       
        },

        sortBy: function(attr, type, Obscura){
            var proxy = new Obscura(deliver_forms);
            return proxy.setSort(attr, type); 
        },

        ifBelongsHere: function(model){
            return (model.to_location_id == sessionStorage.getItem('code')) ? true : false;
        },




    	//subviews
    	appendModalDeliveryForm: function(){
    		var view = new ViewModalDeliveryForm();
    		view.render();
    	},

        appendListOfDeliverForms: function(){
            var view = new ViewListOfDeliverForm({
                collection: deliver_forms
            });
            view.render();
        },

        appendListOfDeliverForms2: function(list){
            var view = new ViewListOfDeliverForm({
                collection: list
            });
            view.render();
        },

        formInit: function(self, length){
          
            $(function(){
                //jQuery

                if (length == 0) {
                    $('#list-of-deliverforms').html('<tr class="text-danger" style="font-size: 13px; font-weight: bolder"><td colspan="10">No data was found</td></tr>');
                }

                self.$el.find('a').click(function(event) {
                    var res = this.id.split('-');
                    console.log(this.id);
                    if (res[0] == 'print') {
                        console.log('print this');
                        router.showAllDeliveredItemsWithIdOf(res[1]);
                    };
                });


                self.$el.find('a').click(function(event) {
                    var res = this.id.split('-');
                    console.log(this.id);
                    if (res[0] == 'receive') {
                        var form = deliver_forms.get(res[1]);
                        require(['modules/deliveritem_module'], function(dim){
                            var items = dim.getItems(res[1]);
                            if (items.length) {
                                require(['views/deliver/view_table_deliver_items','views/deliver/view_list_of_incomming_items'], 
                                    function(SubTable, SubList){
                                        
                                        var view = new SubTable({
                                            model: form
                                        });                

                                        setTimeout(function() {
                                            var sublist = new SubList({
                                                collection: items
                                            });
                                            $('#modalDeliverItems').find('#hidden-id').val(res[1]);
                                        }, 700);
                                        
                                });
                            };
                        });
                    };
                });

             });
            
        }



    }
   
    return DeliverFormModule; 
});