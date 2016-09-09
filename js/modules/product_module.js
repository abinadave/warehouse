define(
	[
		'underscore',
		'backbone',
		'models/product',
        'libs/backbone.obscura',

		'views/product/view_modal_add_product',
        'views/product/view_list_of_products',
        'views/product/view_modal_update_product',
        'views/product/view_list_of_products_by_id',
        'views/product/view_list_of_products_in_cart'
	],  function(
		_, 
		Backbone, 
		Product,
        Obscura,

		ViewModalAddProduct,
        ViewListOfProducts,
        ViewModalUpdateProduct,
        ViewListOfProductsById,
        ViewListOfProductsInCart
        
        ) {
   
    var ProductModule = {
    	
            fetchData: function(){
                var self = this;
                var usertype = sessionStorage.getItem('usertype');
                var code = sessionStorage.getItem('code');
                $.when(products.fetch({silent: true,
                    url: 'application.php/product_usertype_code/' + usertype + '/' + code
                })).then( () => {
                    self.populateAll();   
                }, () => {
                    alert('failed in fetching item (Stock cards)');
                });  
            },

            callbackRows: function(value){
                if (!_.isEqual(products.length, value)) {
                    products.reset({silent: true});
                    ProductModule.fetchData();
                    console.log('product length didnot match');
                }
            },

            getItems: function(i) {
                var proxy = new Obscura(products);
                return proxy.filterBy('warehouse_code', {warehouse_code: i});
            },

            saveDB: function(form){
                console.log(form)
                $.post('ajax/save/save_product.php', form, function(data, textStatus, xhr) {
                    $('#output-save-product').hide().html(data).fadeIn('fast');
                }).success(function(data){

                    ProductModule.timeOut('#output-save-product', 1200);    
                });
            },

            removeDB: function(ids){
                $.post('ajax/delete/delete_product.php', { items: ids}, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('Item was removed with id/s of: ' +ids);
                    });
                    products.remove(ids);
                    require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                         function(css, alertify){
                             loadCSS('js/libs/alertify/css/alertify.core.css');
                             loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                             alertify.success('Successfully removed');
                    });
                });
            },

            insert: function(model, type){

                var product = new Product(model);
                products.add(model, {silent: type});

                if (type == 0) {
                    require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                     function(css, alertify){
                         loadCSS('js/libs/alertify/css/alertify.core.css');
                         loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                         alertify.success("New Item successfully added");
                    });

                    $('#form-add-product')[0].reset();
                    $('#prod-name').focus();

                };
            },

            updateDB: function(form){
                $.post('ajax/update/update_product.php', form, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    $('#output-update-product').hide().html(data).fadeIn('fast');
                }).success(function(data){
                    //console.log(data);
                });
            },

            afterUpdate: function(obj) {
                if (carts.isDelivered) {
                    var prod = products.get(obj.where_value);
                    if (obj.hasOwnProperty('values')) {
                        if (obj.values.hasOwnProperty('running_bal')) {
                            var values = obj.values;
                            var prod = products.get({id: obj.where_value});
                            prod.set({running_bal: values.running_bal});
                        };
                    };
                };
            },

            print: function(){
                products.forEach(function(model) {
                    console.log(model.attributes); 
                });
            },

            populateAll: function(){
                this.appendAllProducts();
                this.appendListOfProductsInCart();
            },

            timeOut: function(element, interval){

                setTimeout(function(){
                    $(element).fadeOut('fast');
                }, interval);

            },

            getCheckedProducts: function(){
                var ids = []; var $target = $('#list-of-products').find('input[type="checkbox"]:checked');
                $target.each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
            },

            initJQueryClick: function(){
                var $tr = $('#list-of-products tr');
                $(function() {
                    $tr.click(function(event) {
                        /* Act on the event */
                        //console.log($(this).attr('id'));
                        $tr.removeClass('text-primary');
                        $(this).addClass('text-primary');
                        $('#hidden-pid').val($(this).attr('id'))
                    });
                });

                $(function() {
                    $tr.mouseenter(function(event) {
                        $(this).css('cursor', 'pointer');
                    });
                });
                return this;
            },

            initPopoverImage: function(){
                $(function(){
                    //jQuery      

                        var popover = $('#table-products').find('[data-toggle="popover"]').popover({
                            trigger : 'hover',  
                            placement : 'right',
                            html: 'true'
                        });

                        popover.on('show.bs.popover', function() {
                            var id = this.id;
                            var $el = $(this);
                            var item = products.get(id);
                            var src = 'images/items/' + id + '-' + item.get('rand') +'.jpg';
                            var output = '';

                            if (item.get('rand') != '') {
                                output += '<img class="img-thumbnail" style="width: 170px; height: 160px" src="'+src+'">';
                            }else {
                                output += '<img class="img-thumbnail" style="width: 170px; height: 160px" src="images/default.png">';
                            }
                            
                            $(this).attr('data-content', output);
                        });
                    
                });
                return this;
            },

            updateModel: function(model){
                var product = products.get(model.id);
                product.set({
                    category: model.category,
                    name: model.name,
                    area: model.area,
                    shelf: model.shelf,
                    row: model.row,
                    add_desc: model.add_desc,
                    reorder_point: model.reorder_point,
                    running_bal: model.running_bal,
                    unit: model.unit
                });
                $('#modalUpdateProduct').modal('hide');
                router.alertify_success('Item successfully updated');

            },

            searchAndReturnIds: function(value){
                var ids = [];
                console.log(value);
                products.forEach(function(model) {
                    if (model.get('id') == value || model.get('name').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                        model.get('category').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                        model.get('area').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                        model.get('shelf').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                        model.get('reorder_point').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                        model.get('row').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                        model.get('running_bal').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                        model.get('add_desc').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                        model.get('unit').toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        ids.push(model.get('id'));
                    }
                });

                return ids;
            },

            searchAndReturnIdsWithCategoryOf: function(category){
                var ids = [];
                products.forEach(function(model) {
                    if (model.get('category') == category) {
                        ids.push(model.get('id'));
                    };
                });

                return ids;
            },

            sortBy: function(attr, type){
                 require(['libs/backbone.obscura'], function(imp){
                    var proxy = new imp(products)
                    console.log(attr)
                     if (attr == 'running_bal' || attr == 'shelf' || attr == 'reorder_point') {

                        proxy.forEach(function(model) {
                            var rb = parseInt(model.get('running_bal'));
                            var shelf = parseInt(model.get('shelf'));
                            var ro = parseInt(model.get('reorder_point'));
                            model.set('running_bal', rb, {silent: true});
                            model.set('shelf', shelf, {silent: true});
                            model.set('reorder_point', ro, {silent: true});
                        });

                        proxy.setSort(attr, type);
                        
                        var view = new ViewListOfProducts({
                             collection: proxy
                        });
                        view.render();

                     }else {
                        proxy.setSort(attr, type);
                     
                        var view = new ViewListOfProducts({
                             collection: proxy
                        });
                        view.render();
                     }


                     if (attr == 'running_bal' || attr == 'shelf' || attr == 'reorder_point') {

                        proxy.forEach(function(model) {
                            var rb = model.get('running_bal').toString();
                            var shelf = model.get('shelf').toString();
                            var ro = model.get('reorder_point').toString();
                            model.set('running_bal', rb, {silent: true});
                            model.set('shelf', shelf, {silent: true});
                            model.set('reorder_point', ro, {silent: true});
                        });

                        proxy.setSort(attr, type);
                        
                        var view = new ViewListOfProducts({
                             collection: proxy
                        });
                        view.render();

                     }

                        
                    });
            },

            findById: function(value){
                var result = products.where({id: value});
                return result.length;
            },

            getUnit: function(value){
                var result = products.where({id: value});
                var unit = '';
                if (result.length) {
                    var product = products.get(value);
                    unit = product.get('unit')
                }else {
                    unit = 'unknown unit';
                }

                return unit;
            },

            getName: function(value){
                var result = products.where({id: value});
                var name = '';
                if (result.length) {
                    var product = products.get(value);
                    name = product.get('name')
                }else {
                    name = 'unknown name';
                }
                return name;
            },

            afterRemoveCart: function(id){
                 $('#panel-stock-cards').find('#badge-receiving').hide().text(carts.length).fadeIn(700);
                var product = products.get(id);
                if(!product.get('running_bal')){
                    var data = [id];
                    this.removeDB(data);
                }
                if (!carts.length) {
                    $('#modalListOfAllCarts').modal('hide');
                    
                };
            },

            fileUploader: function(){
                $(function(){
                    require(['libs/fileuploader/fileuploader'], function(){
                         new qq.FileUploader({
                            element: $('#upload-photo')[0],
                            action: 'upload_item.php',
                            allowedExtensions: ['jpg','gif','jpeg','png'],
                            onComplete: function(id, filename, json){
                               ProductModule.fileUploader();
                               var id =  $('#form-update-item').find('#id').val();
                               var item = products.get(id);  
                               ProductModule.renameItemPhoto(filename, item);
                            }
                        });
                    });
                });
            },

            renameItemPhoto: function(a, item){
                $.post('ajax/others/rename_item_photo.php', { filename: a, values: item.attributes }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var json = $.parseJSON(data);
                    var item = products.get(json.id);
                    item.set({rand: json.rand});
                    $('#image-item').attr('src', 'images/items/'+ item.id +'-'+json.rand +'.jpg');
                    $('#modalUpdateItemPhoto').modal('hide');
                    router.alertify_success('Image Successfully uploaded');

                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('Item with id of: '+item.id +' has changed image');
                    });

                }).fail(function(xhr){
                    console.log('error type: '+xhr.status);
                });
            },

            setItemDetails: function(modal, item){
                $.each(item.attributes, function(index, val) {
                    $(modal).find('#'+index).text(val);
                });
            },

            getProd: function(i){
                var rs = products.where({id: i});
                return (rs.length > 0) ? products.get({id: i}) : false;
            },

            checkReorderPoint: function() {
                require(['modules/functions'], function(fn){        
                    products.forEach(function(model) {
                        var reorder = parseInt(model.get('reorder_point'));
                        var running = parseInt(model.get('running_bal'));
                        if (running <= reorder) {
                            // router.alertify_error('Item: '+ model.get('name') + ' is running ouf stock');
                            notifications.add({
                                id: model.get('id'),
                                message: '<span onclick="products.notify('+model.get('id')+')">Item: <b>' + model.get('name') + '</b> is running out of stock</span>',
                                time: fn.getDate()
                            }, {silent: true});
                        };
                    });
                });
            },

            initEditableTable: function() {
                $(function() {
                    require(['modules/plugin_module'], function(plugIn){
                        plugIn.editableTable.initialize('#table-products');
                        plugIn.editableTable.validateProducts('#table-products td');
                        plugIn.editableTable.onChangeProducts('#table-products td');
                    });
                });
            },



            //Subviews ..

            displayModalUpdatePhoto: function(){
                require(['views/product/view_modal_update_photo'], function(ViewModalUpdateItemPhoto){
                    var view = new ViewModalUpdateItemPhoto();
                    view.render();
                });
            },

            appendModalAddProduct: function(){
                var view = new ViewModalAddProduct();
                view.render();
            },

            appendAllProducts: function(){
                var view = new ViewListOfProducts({
                    collection: products
                });
                view.render();
                this.checkReorderPoint();
            },

            appendModalUpdateProduct: function(){
                var view = new ViewModalUpdateProduct();
                view.render();
            },

            appendListOfProductsById: function(ids){
                var view = new ViewListOfProductsById();
                view.render(ids);
            },

            appendNoResultWasFound: function(element, value){
                var output = '';
                output += '<tr>';
                output += '<td>-</td><td>-</td><td>-</td><td>' + value + '</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>';
                output += '</tr>';
                $(element).html(output);
            },

            appendListOfProductsInCart: function(){
                var view = new ViewListOfProductsInCart({
                    collection: products
                });
                view.render();
            },

            appendTr: function(length){
                var limit = 20;
                var total = limit - parseInt(length);
                var output = '';
                for (var i = 0; i < total; i++) {
                    output += '<tr>';
                    output += '<td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>';
                    output += '</tr>';
                };
                $('#list-of-products').append(output);
            },

            appendFromToForm: function(){
                require(['views/product/view_history_form_footer'], function(Subview){
                    var view = new Subview();
                    view.render();
                });
            },

            appendBorrowItem: function(val) {
                require(['views/product/borrow/view_modal_borrow_input_qty'], function(SubviewModal){
                    var view = new SubviewModal({
                        // model: new Backbone.Model({
                        //     value: products.get
                        // })
                        model: products.get(val)
                    });
                });
            },

            appendItemHistory: function() {
                require(['views/product/history/view_item_tab_history'], function(SubviewTab){
                    var view = new SubviewTab();
                });
            },

            appendReceivingItemHistory: function() {
                require(['views/product/history/view_table_receiving_history_of_item'], function(SubviewTable){
                    var view = new SubviewTable();
                });
                return this;
            },

            appendWithdrawItemHistory: function() {
                require(['views/product/history/view_table_withdraw_history_of_item'], function(SubviewWithdraw){
                    var view = new SubviewWithdraw();
                });
            }


    }
   
    return ProductModule; 
});