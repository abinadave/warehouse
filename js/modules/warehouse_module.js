define(
	[
		'underscore',
		'backbone',
		'models/warehouse',
        'modules/warehousemen_module',
        'collections/mycollection',

		'views/warehouse/view_form_create_warehouse',
        'views/warehouse/view_list_of_warehouse_branches',
        'views/warehouse/view_list_of_location_in_modal',
        'views/warehouse/view_form_add_warehousemen'
	],  function(
        _, 
        Backbone, 
        Warehouse,
        WarehousemenModule,
        MyCollection,

        ViewFormCreateWarehouse,
        ViewListOfWarehouseBranches,
        ViewListOfLocationInModal,
        ViewFormAddWarehouseMen
        ){
   
    var WarehouseModule = {

        fetchData: function(){
            if (warehouses.length) {
                WarehouseModule.populateAll();
            }else {
                $.getJSON('ajax/select/get_warehouse_branches.php', function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                   WarehouseModule.saveModel(json, 1).populateAll();
                });
            }
             return this;
        },

    	saveDB: function(form){
    		$.post('ajax/save/save_warehouse_branch.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    			$('#output-save-warehouse-branch').hide().html(data).fadeIn('fast');
    		}).success(function(data){
    			if (data) {
    				console.log('New warehouse branch was added');
                    require(['modules/userlog_module','modules/functions'], function(UserlogModule, Functions){
                        var obj = Functions.clearObject(form);
                        UserlogModule.saveDB('new warehouse was added --> ' +obj.location +' ('+obj.code+')');
                    });
    			}
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
            return this;
    	},

    	saveModel: function(json, type){
    		warehouses.add(json, {silent: type});
    		if (type == 0) {
    			$('#form-create-warehouse-branch')[0].reset();
    			$('#form-create-warehouse-branch').find('#code').focus();
    		};
            return this;
    	},

        saveWarehouseMen: function(form){
            $.post('ajax/save/save_warehousemen.php', form, function(data, textStatus, xhr) {
                $('#output-save-warehousemen').hide().html(data).fadeIn('fast');
            }).success(function(data){
                
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        saveWarehousemenModel: function(json, type){
            warehousemens.add(json, {silent: type});
        },

        removeDB: function(value){
            if (sessionStorage.getItem('usertype') == 3) {
                router.alertify_error('Access Denied');
            }else {
                $.post('ajax/delete/delete_warehouse.php', { id: value }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
                }).success(function(data){
                    if (data) {
                        var wh = warehouses.get(value);
                        require(['modules/userlog_module'], function(UserlogModule){
                            UserlogModule.saveDB('Warehouse with code of: '+ wh.get('id') +' was removed');
                        });
                        warehouses.remove(value);
                    }
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            }
        },

        populateAll: function(){
            this.appendListOfWareHouseBranches();
            this.appendListOfLocationsInModal();
            require(['modules/receiveform_module'], function(ReceiveFormModule){
                 ReceiveFormModule.fetchData();
                 if (Backbone.history.fragment == 'availableTools' || Backbone.history.fragment == 'products' && $('#display-by-warehouse-admin').length) {
                    //if the user is admin. and router has value of: availableTools/
                    //will append list of warehouse location in modal
                    require(['views/warehouse/view_list_of_warehouse_admin'], function(Subview){
                        var view = new Subview({collection: warehouses});
                    });
                 };
            });
            return this;
        },

        getWarehouseLocation: function(code){
            var result = warehouses.where({id: code});
            if (result.length) {
                var thismodel = warehouses.get(code);
                return thismodel.get('location');
            }else {
                return code;
            }
        },

        searchAndReturnModels: function(value){
           var lists = new MyCollection();
           warehouses.forEach(function(model) {
               $.each(model.attributes, function(index, val) {
                    if (model.get(index).toLowerCase().indexOf(value) !== -1) {
                        lists.add(model);
                    }
               });
           });
           return lists;
        },


        



        //SUBVIEWS ===============================================================================================

    	appendFormAddWareHouse: function(){
    		
    	},

    	appendFormCreateWarehouseBranch: function(){
    		var view = new ViewFormCreateWarehouse();
    		view.render();
            return this;
    	},

        appendListOfWareHouseBranches: function(){
            var view = new ViewListOfWarehouseBranches({
                collection: warehouses
            });
            view.render();
            return this;
        },

        appendListOfLocationsInModal: function(){
            var view = new ViewListOfLocationInModal({
                collection: warehouses
            });
            view.render();
            return this;
        },

        appendFormCreateWarehousemen: function(){
            var view = new ViewFormAddWarehouseMen();
            view.render();
        },

        initAutocomplete: function(el){
            require(['libs/jquery-ui/jquery-ui.min','css!libs/css/auto-complete-list',], function(css){
                var availableTags = warehouses.pluck('location');
                $(el).autocomplete({
                source: availableTags
                });
            });
            return this;
        },

        initSystemUsersAutocomplete: function(element){
            
            require(['modules/suggestion_module',
                'libs/jquery-ui/jquery-ui.min',
                'css!libs/css/auto-complete-list',], function(sm, jqueryUi, jQueryCss){
                var tags = warehouses.pluck('location');
                var arr1 = [], arr2 = [];

                accounts.forEach(function(model) {
                    arr1.push(model.get('lastname') + ' ' + model.get('firstname'));
                });
                
                warehousemens.forEach(function(model) {
                    if (model.get('id') != sessionStorage.getItem('uid')) {
                        arr2.push(model.get('lastname') + ' ' + model.get('firstname'));
                    };
                });

                var arr = $.merge(arr1, arr2);
                
                $(element).autocomplete({
                    source: sm.getAllNames()
                });

            });
            return this;
        },

        initWarehouseManByCode: function(element, i){
            
            require(['libs/backbone.obscura','libs/jquery-ui/jquery-ui.min','css!libs/css/auto-complete-list'], function(Obscura, jqueryUi, jqueryUicss){
               var proxy = new Obscura(warehousemens);
                proxy.filterBy('warehouse_code', {code: i});
           
                var arr = [];
                proxy.forEach(function(model) {
                    arr.push(model.get('lastname') + ' ' + model.get('firstname'));
                });
                
                $(element).autocomplete({
                    source: arr
                });

            });
            return this;
        },

        appendWarehouseStockList: function(warehouse) {
            require(['views/warehouse/view_modal_warehouse_stock_list'], function(SubviewStockModal){
                var view = new SubviewStockModal({
                    model: warehouse
                });
            });
        }

        
    }
   
    return WarehouseModule; 
});