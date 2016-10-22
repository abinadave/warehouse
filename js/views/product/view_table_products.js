
        define(
        [
            'underscore',
            'backbone',
            'text!templates/product/temp_table_products.html',
            'modules/product_module',
            'views/withdraw/report/view_inventory_report_stock_cards',
            'views/iso/view_modal_all_stock_card_receiving_withdrawal_report',
            'views/product/view_list_of_products'
        ],  function(_, Backbone, template, ProductModule, SubviewModalReport, 
            SubviewAllStockCardReport, SubviewListOfItems) {
       
        var ViewProducts = Backbone.View.extend({
        
                initialize: function(){
                    this.spinner = "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i><span class='sr-only'>Loading...</span>";
                },
        
                tagName: 'div',
        
                el: '#main',
        
                template: _.template(template),
        
                events: {},
        
                render: function(){
                    var self = this;
                    self.$el.empty();
                    var output = self.template(template);
                    self.$el.append(output);
                    self.init();
                    self.initEvents();
                    return self;
                },

                initEvents: function(){
                    var self = this;

                    $(function() {
                        self.$el.find('#btnFilterBy').click(function(event) {
                            var $btn = $(this);
                            var index = self.$el.find('#order-by').val(),
                            type = self.$el.find('#type-by').val();
                            $btn.text('Filtering .....');
                            var url = 'api.php/product/' +index+ '/' + type;
                            $.when(products.fetch({silent: true,
                                url: url
                            })).then( (response) => {
                                ProductModule.appendAllProducts();

                                setTimeout(function() {
                                    $btn.text('Filter');
                                }, 300);
                                
                            }, (errorResp) => {

                            });
                            
                            
                        });
                    });

                    $(function() {
                        var output = '<tr><td style="font-size: 14px" colspan="12">'+self.spinner+' Loading items please wait....</td></tr>';
                        self.$el.find('tbody').html(output);
                    });

                    $(function() {
                        classifications.fetch({silent: true});
                        warehouses.fetch({silent: true});
                        accounts.fetch({silent: true,
                            url: 'api.php/get/accounts'
                        });
                        withdraw_items.fetch({silent: true});
                    });

                    $(function() {
                        if (Number(sessionStorage.getItem('usertype')) !== 1) {
                            self.$el.find('#div-admin-side').hide();
                        }
                    });
                    $(function() {
                        self.$el.find('#btnBorrowItem').click(function(event) {
                            /* Act on the event */
                            var value = $('#hidden-pid').val();
                            
                            if (value != '') {
                                require(['modules/product_module'], function(pm){
                                    pm.appendBorrowItem(value);
                                });
                            }else {
                                router.alertify_error('Please select atleast 1 item');
                            }
                            
                            require(['modules/account_module'], function(am){
                                am.checkSession();
                            });
                           
                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#btnCreateStockCards').click(function(event) {
                            router.add_loading_btn('#btnSaveItem', 2000); 
                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#btnPulloutItem').click(function(event) {
                            var value = $('#hidden-pid').val();
                            if (value != '') {
                                router.navigate('addToCart/'+value, true);
                                var cond = {
                                    id: value
                                };
                                var rs = products.where(cond);
                                if (rs.length) {
                                    var item = products.get(cond);
                                    var pm = require('modules/product_module');
                                    pm.setItemDetails('#modalInputQtypullout', item);
                                };
                                console.log(rs.length);
                            } else{
                                console.log('Select an item');
                            };
                            require(['modules/account_module'], function(am){
                                am.checkSession();
                            });
                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#btnReceiveItem').click(function(event) {
                            var value = $('#hidden-pid').val();
                            if (value != '') {
                                router.navigate('addToReceiving/'+value, true);
                                var cond = {id: value};
                                var rs = products.where(cond);
                                if (rs.length) {
                                    var item = products.get(cond);
                                    console.log(item.attributes)
                                    var pm = require('modules/product_module');
                                    pm.setItemDetails('#modalInputQtyCart', item);
                                };
                            } else{
                                console.log('Select an item');
                            };
                            require(['modules/account_module'], function(am){
                                am.checkSession();
                            });
                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#product-search-category').keyup(function(event) {
                            var value = event.currentTarget.value;
                            var ids = categories.searchAndReturnIds(value);
                            categories.appendListOfCategoriesSearchableDropdown(ids);
                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#products-display-by-category').change(function(event) {
                            require(['modules/product_module'], function(module){ 
                                var value = event.currentTarget.value;
                                if (value != 0) {
                                     var ids = module.searchAndReturnIdsWithCategoryOf(value);
                                     if (ids.length) {
                                        module.appendListOfProductsById(ids);
                                     }else {
                                        module.appendNoResultWasFound('#list-of-products', 'No result was found for category: <span class="text-primary" style="font-weight: bold">'+ categories.getName(value) +'</span>');
                                     }
                                }else {
                                    module.appendAllProducts();
                                }
                            });
                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#search-product').keyup(function(event) {
                            clearTimeout(self.timer);
                            var value = $(this).val().toLowerCase();
                            var cid = $('#products-display-by-category').val();
                            self.timer = setTimeout(function() {
                                if (Number(cid) === 0) {
                                    var view = new SubviewListOfItems({
                                        collection: new Backbone.Collection(self.searchAll(value, products.toJSON()))
                                    });
                                    view.render();
                                }else {
                                    var foundItems = new Backbone.Collection(self.getproductsWhereCid(cid));
                                    var view = new SubviewListOfItems({
                                        collection: new Backbone.Collection(
                                            self.searchAll(value, foundItems.toJSON())
                                        )
                                    });
                                    view.render();
                                }
                                
                            }, 1000);
                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#update-product').click(function(event) {

                            router.add_loading_btn('#btnUpdateItem', 1000);
                            var $target = $('#modalUpdateProduct');
                           
                            var value = $('#hidden-pid').val();
                            if (value > 0) {
                                $target.modal('show');
                                var result = products.where({id: value});

                                if (result.length) {
                                    var model = products.get(value);

                                     $target.find('#prod-name').val(model.get('name')).end()
                                            .find('#prod-shelf').val(model.get('shelf')).end()
                                            .find('#prod-row').val(model.get('row')).end()
                                            .find('#prod-area').val(model.get('area')).end()
                                            .find('#reorder-point').val(model.get('reorder_point')).end()
                                            .find('#running-bal').val(model.get('running_bal')).end()
                                            .find('#unit').val(model.get('unit')).end()
                                            .find('#add-desc').val(model.get('add_desc')).end()
                                            .find('#form-update-product #up-'+model.get('category')).prop('selected' ,true).end()
                                            .find('#form-update-product #upc-'+model.get('area')).prop('selected' ,true).end()
                                            .find('#form-update-product #uprow-'+model.get('row')).prop('selected' ,true).end();
                            
                                }else {
                                    router.alertify_error('Unable to find product with id: '+ value)
                                }
                               
                            }else {
                                router.alertify_error('Nothing to update')
                            }
                            
                            setTimeout(function(){
                               $target.find('#prod-name').focus();
                            }, 700);

                            $target.find('#default-value').html('<option>select category</option>');

                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#btnCreateProduct').click(function(event) {
                           router.add_loading_btn('#btnSaveItem', 2000);
                        });
                    });

                    jQuery(document).ready(function($) {
                        $('#check-all-products').click(function(event) {
                            var $target = $('#check-all-products');
                            if ($target.is(':checked')) {
                                $('#list-of-products').find(':checkbox').prop('checked', true);
                            }else {
                                $('#list-of-products').find(':checkbox').prop('checked', false);
                            }
                        });
                    });

                    $(function() {
                        $('#remove-product').click(function(event) {
                            require(['modules/product_module'], function(module){
                                var ids = module.getCheckedProducts();
                                if (ids.length) {
                                    require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                                         function(css, alertify){
                                             loadCSS('js/libs/alertify/css/alertify.core.css');
                                             loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                             alertify.confirm('Are you sure ?', function(e){
                                             if (e) {
                                                module.removeDB(ids);
                                             }
                                         });
                                    });
                                   
                                }else {
                                    router.alertify_error('Nothing to delete')
                                }
                            }); 
                        });
                    });

                    //sorting table stockCards.
                    var clicked = 0;
                    $(function() {
                        // self.$el.find('thead th').click(function(event) {
                        //     var id = this.id, 
                        //     type = (clicked % 2 == 1) ? 'asc' : 'desc';
                        //     ++clicked;
                        //     var library = self.stringToInt(products);
                        //     require(['modules/collection_module','libs/backbone.obscura','views/product/view_list_of_products'],
                        //      function(cm, Obscura, Subview){
                                
                        //         var list = cm.sortBy(Obscura, library, id, type);
                        //         var view = new Subview({
                        //             collection: list
                        //         });
                        //         view.render();
                        //     });
                        // });
                    });
                },

                stringToInt: function(collection) {
                    collection.forEach(function(model) {
                        var stockId = parseInt(model.get('id'));
                        var rb = parseInt(model.get('running_bal'));
                        var rp = ($.isNumeric(model.get('reorder_point')) == true) ? parseInt(model.get('reorder_point')) : model.get('reorder_point');
                        model.set({id: stockId, running_bal: rb, reorder_point: rp}, {silent: true});
                    });
                    return collection;
                },
        
                init: function(){
                   $(function() {
                       new SubviewModalReport();
                       new SubviewAllStockCardReport();
                   });

                    //#jQueries
                           
                            $(function() {

                                $('#product-search-category').click(function(event) {

                                    var has = $('#output-product-search-category').find('li');

                                    if(has.length){
                                        $('#output-product-search-category').empty();
                                    }else {
                                        var ids = categories.pluck('id');
                                        categories.appendListOfCategoriesSearchableDropdown(ids);
                                    }
                                  
                                });
                            });

                },//end of init jQuery...

                receiveItem: function(event){
                    var value = $('#hidden-pid').val();
                    if (value != '') {
                        router.navigate('addToReceiving/'+value, true);
                    } else{
                        console.log('Select an item');
                    };
                },

                pullOutItem: function(event){
                    var value = $('#hidden-pid').val();
                    if (value != '') {
                        router.navigate('addToCart/'+value, true);
                    } else{
                        console.log('Select an item');
                    };
                },

                checkAllProd: function(event){
                    var $target = $('#check-all-products');

                    if ($target.is(':checked')) {
                        $('#list-of-products').find(':checkbox').prop('checked', true);
                    }else {
                        $('#list-of-products').find(':checkbox').prop('checked', false);
                    }

                },

                removeProd: function(event){
                    require(['modules/product_module'], function(module){
                        var ids = module.getCheckedProducts();
                        if (ids.length) {
                            require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                                 function(css, alertify){
                                     loadCSS('js/libs/alertify/css/alertify.core.css');
                                     loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                     alertify.confirm('Are you sure ?', function(e){
                                     if (e) {
                                        module.removeDB(ids);
                                     }
                                 });
                            });
                           
                        }else {
                            router.alertify_error('Nothing to delete')
                        }
                    }); 
                },

                updateProd: function(event){
                    router.add_loading_btn('#btnUpdateItem', 1000);
                    var $target = $('#modalUpdateProduct');
                   
                    var value = $('#hidden-pid').val();
                    if (value > 0) {
                        $target.modal('show');
                        var result = products.where({id: value});

                        if (result.length) {
                            var model = products.get(value);

                             $target.find('#prod-name').val(model.get('name')).end()
                                    .find('#prod-shelf').val(model.get('shelf')).end()
                                    .find('#prod-shelf').val(model.get('shelf')).end()
                                    .find('#reorder-point').val(model.get('reorder_point')).end()
                                    .find('#running-bal').val(model.get('running_bal')).end()
                                    .find('#prod-unit').val(model.get('unit')).end()
                                    .find('#add-desc').val(model.get('add_desc')).end()
                                    .find('#form-update-product #up-'+model.get('category')).prop('selected' ,true).end()
                                    .find('#form-update-product #upc-'+model.get('area')).prop('selected' ,true).end()
                                    .find('#form-update-product #uprow-'+model.get('row')).prop('selected' ,true).end();
                    
                        }else {
                            router.alertify_error('Unable to find product with id: '+ value)
                        }
                       
                    }else {
                        router.alertify_error('Nothing to update')
                    }
                    
                    setTimeout(function(){
                       $target.find('#prod-name').focus();
                    }, 700);

                    $target.find('#default-value').html('<option>select category</option>');

                },

                searchProd: function(event){
                    require(['modules/product_module'], function(module){
                        
                            var cid = $('#selected-category-prodcut').val();
                            if (cid > 0) {
                                var ids = modulemodulemodule.searchAndReturnIdsWithCategoryOf(cid);
                                var value = event.currentTarget.value;
                                var found = [];
                                ids.forEach(function(model) {
                                    var product = products.get(model);
                                    if (product.get('id') == value || 
                                        product.get('name').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                                        product.get('category').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                                        product.get('area').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                                        product.get('shelf').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                                        product.get('reorder_point').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                                        product.get('row').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                                        product.get('running_bal').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                                        product.get('add_desc').toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
                                        product.get('unit').toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                                        found.push(product.get('id'));
                                    }
                                });

                               modulemodule.appendListOfProductsById(found);

                            }else {
                                var ids = module.searchAndReturnIds(event.currentTarget.value);
                                if (ids.length) {
                                     module.appendListOfProductsById(ids);
                                }else {
                                     var output = ''; output += '<tr class="text-danger">'; output += '<td>-</td>'; output += '<td>-</td>'; output += '<td>No data was found for: '+ event.currentTarget.value +'</td>';   output += '<td>-</td>';     output += '<td>-</td>';     output += '<td>-</td>';     output += '<td>-</td>';     output += '<td>-</td>';     output += '<td>-</td>';     output += '<td>-</td>';     output += '<td>-</td>';          output += '</tr>';
                                     $('#list-of-products').html(output);
                                }
                            }

                            var ids = categories.searchAndReturnIds(event.currentTarget.value);
                            var found = [];
                            ids.forEach(function(cid) {
                                products.forEach(function(prod) {
                                    if (prod.get('category') == cid) {
                                        found.push(prod.get('id'));
                                    };
                                }); 
                            });

                            if (found.length) {
                                module.appendListOfProductsById(found);
                            };
                           
                    });
                },

                changeDisplayByCat: function(event){
                    require(['modules/product_module'], function(module){ 
                        var value = event.currentTarget.value;
                        if (value != 0) {
                             var ids = module.searchAndReturnIdsWithCategoryOf(value);
                             if (ids.length) {
                                module.appendListOfProductsById(ids);
                             }else {
                                module.appendNoResultWasFound('#list-of-products', 'No result was found for category: <span class="text-primary" style="font-weight: bold">'+ categories.getName(value) +'</span>');
                             }
                        }else {
                            module.appendAllProducts();
                        }
                    });
                },

                createProduct: function(){
                   router.add_loading_btn('#btnSaveItem', 2000);
                },

                searchCategory: function(event){
                    var value = event.currentTarget.value;
                    var ids = categories.searchAndReturnIds(value);
                    categories.appendListOfCategoriesSearchableDropdown(ids);
                },

                searchAll(value, jsonProducts){
                    return jsonProducts.filter(function(index) {
                        return index.name.toLowerCase().indexOf(value) != -1 ||
                               index.area.toLowerCase().indexOf(value) != -1 ||
                               index.row.toLowerCase().indexOf(value) != -1 ||
                               index.shelf.toLowerCase().indexOf(value) != -1 ||
                               index.add_desc.toLowerCase().indexOf(value) != -1 ||
                               Number(index.runnin_bal) === Number(value) ||
                               Number(index.reorder_point) === Number(value);
                    });
                },

                getproductsWhereCid(cid){
                    return products.toJSON().filter(function(index) {
                        return Number(index.category) === Number(cid);
                    });
                }
        
        });
       
        return ViewProducts;

    });
