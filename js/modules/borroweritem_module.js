define(
	[
		'underscore',
		'backbone',
		'models/borrower_item',
		'collections/mycollection',
		'views/tool/borrow/view_modal_borrower_items',
		'views/tool/borrow/view_list_of_borrower_item'
	],  function(_, Backbone, Borrower_item, MyCollection, ViewModalBorrowerItems, ViewListOfBorrowerItem) {
   
    var BorrowerItemModule = {

    	fetchData: function(){
    		if (borrower_items.length) {
               
    		}else {
    			$.getJSON('ajax/select/select.php', {table: 'borrower_items'}, function(json, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(json){
    				BorrowerItemModule.saveModel(json, 1).populateAll();
    			});
    		}
    	},


    	saveModel: function(json, type){
    		json.forEach(function(model) {
                var obj = {borrower_id: model.borrower_id, tool_id: model.tool_id};
                var rs = borrower_items.where(obj);
                if (rs.length) {          
                    if (borrower_items.where(obj)) {
                        var item = borrower_items.findWhere(obj);
                        borrower_items.remove(item.cid);
                    };
                };
            });
            borrower_items.add(json, {silent: type});
            return this;
    	},

    	saveDB: function(DB_id){
            
    		require(['modules/tool_module', 'modules/borrowerform_module', 'libs/load_css/loadcss', 'libs/alertify/js/alertify.min'], function(ToolModule, BFM, css, alertify){
    			
                var myCollection = new MyCollection();
                console.log(BFM.transfer)
                if (!BFM.transfer) {    
	    			pawns.forEach(function(model) {
	    				var model_id = model.get('id');
	    				model.set({ borrower_id: DB_id.toString(), 
	    					// tool_id: model_id 
	    				});
                       
		    			myCollection.add({ 
		    				tool_id: model.get('tool_id'), 
			    			qty: 1, 
			    			unit: model.get('unit'), 
			    			name: model.get('model'), 
			    			borrower_id: DB_id.toString(),
                            status: '0'
			    		});
		    		});

                    var json = myCollection.toJSON();
                    var lengthA = json.length, lengthB = 0;

                    $.post('ajax/save/save_borrower_items.php', { values: json, table: 'borrower_items' }, function(data, textStatus, xhr) {
                        /*optional stuff to do after success */
                        $('#output-save-borrower-items').html(data);
                    }).success(function(data){
                        pawns.forEach(function(model) {

                            borrower_items.add({
                                borrower_id: DB_id.toString(),
                                qty: '1',
                                unit: model.get('unit'),
                                name: model.get('model'),
                                tool_id: model.get('tool_id'),
                                status: '0'
                            });

                            require(['modules/borrowedtool_module'], function(BTM){
                                 model.unset('qty');
                                 model.unset('borrower_id');
                                 BTM.saveDB(model.attributes);
                            });
                        
                        });

                        ++lengthB;
                        if (lengthA = lengthB) {
                            setTimeout(function() {

                                loadCSS('js/libs/alertify/css/alertify.core.css');
                                loadCSS('js/libs/alertify/css/alertify.bootstrap.css');

                                alertify.confirm('Print borrower slip ?', function(e){
                                    $('#alertify-ok').val('print')
                                            if (e) {
                                                BorrowerItemModule.printableModalItems(DB_id);
                                                $('#btnPrint').trigger('click')
                                            }
                                });
                              
                            }, 1000);
                            
                        };
                        
                    }).fail(function(xhr){
                        alert('error type: '+xhr.status);
                    });
                
                }else {

                    transfers.forEach(function(model) {
                        var model_id = model.get('id');
                        model.set({ borrower_id: DB_id.toString(), 
                            // tool_id: model_id 
                        });
                       
                        myCollection.add({ 
                            tool_id: model.get('id'), 
                            qty: 1, 
                            unit: model.get('unit'), 
                            name: model.get('model'), 
                            borrower_id: DB_id.toString() 
                        });
                    });

                    var json = myCollection.toJSON();
                    var lengthA = json.length, lengthB = 0;
                    
                    $.post('ajax/save/save_borrower_items.php', { values: json, table: 'borrower_items' }, function(data, textStatus, xhr) {
                        /*optional stuff to do after success */
                        $('#output-save-borrower-items').html(data);
                    }).success(function(data){
                        transfers.forEach(function(model) {

                            borrower_items.add({
                                borrower_id: DB_id.toString(),
                                qty: '1',
                                unit: model.get('unit'),
                                name: model.get('model'),
                                tool_id: model.get('id')
                            });

                            require(['modules/transferedtool_module'], function(TTM){
                                 model.unset('qty');
                                 model.unset('borrower_id');
                                 model.set({warehouse_code: $('#to-warehouse-location').val()}, {silent: true})
                                 TTM.saveDB(model.attributes);
                            });
                        
                        });

                        ++lengthB;
                        if (lengthA = lengthB) {
                            setTimeout(function() {

                                loadCSS('js/libs/alertify/css/alertify.core.css');
                                loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                alertify.confirm('Do you want to print Borrower slip ?', function(e){
                                    if (e) {
                                        BorrowerItemModule.printableModalItems(DB_id);
                                        $('#btnPrint').trigger('click')
                                    }else {
                                         require(
                                          [
                                           'modules/borrowerform_module',
                                           'modules/transferform_module',
                                           'modules/transferitem_module'
                                          ], 
                                        function(BorroweFormModule, TransferFormModule, TransferItemModule){
                                           if(BorroweFormModule.transfer){
                                                alertify.confirm('Do you want to print Transfer slip ?', function(e){
                                                    if (e) {
                                                        var id = TransferFormModule.lastInsertId;
                                                        TransferItemModule.findItemsWhereIdOf(id);
                                                    }
                                               });
                                           }
                                        });
                                    }
                                });

                            }, 1000);
                            
                        };
                        
                    }).fail(function(xhr){
                        alert('error type: '+xhr.status);
                    });

                }
	    		
    		});
    	},

        removeDB: function(i){
            $.post('ajax/delete/delete.php', { table: 'borrower_items', id: i, prop: 'borrower_id'}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                console.log(data);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        updateStatus: function(model){
            var obj = _.pick(model, 'borrower_id','tool_id','status');
            $.post('ajax/update/update_borrower_item_status.php', obj, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                // alert('Success')
                var json = $.parseJSON(data);
                if (json.success) {
                    $('#'+borrower_items.current_return).replaceWith('<i class="fa fa-check fa-2x text-info"></i>');
                    var id = model.tool_id.slice(-1);
                    var borrowed_tool = borrowed_tools.findWhere({tool_id: model.tool_id});
                    borrowed_tools.remove(borrowed_tool.get('id'));
                }
            }).fail(function(xhr){
                console.log('error type: '+xhr.status);
            });
        },

        printableModalItems: function(DB_id){
            BorrowerItemModule.appendModalBorrowerItem();
            var myCollection = BorrowerItemModule.getItems(DB_id);
            myCollection.length && BorrowerItemModule.appendListOfBorrowerItem(myCollection);
            if (myCollection.length) {
                
                var model = borrower_forms.get(DB_id);
                var $modal = $('#modalBorrowerItems');

                $.each(model.attributes, function(index, val) {  
                     if (index == 'date') { 
                        require(['moment'], function(moment){
                            var dt = moment(val).format('dddd MMMM DD, YYYY');
                            $modal.find('#'+index).text(dt);
                        });
                     }else {
                        $modal.find('#'+index).text(val);
                     }
                });
            };
        },

    	getItems: function(id){
    		var myCollection = new MyCollection();
    		borrower_items.forEach(function(model) {
    			model.unset('id', {silent: true});
    			model.get('borrower_id') == id && myCollection.add(model.attributes);
    		});
    		return myCollection;
    	},

    	populateAll: function(){
    		require(['modules/borrowedtool_module','modules/collection_module'], function(BTM, colmod){
                colmod.fetchData('borrowed_tools','borrowed_tools', BTM);
                BorrowerItemModule.subscribe();
    		});
            return this;
    	},

        subscribe: function(){  
            /*
            pubnub.subscribe({
                channel: 'borrower_items',
                message: function(m){
                    console.log('channel borrower_items receive request');
                    var model = m.model;
                    
                        if (m.type == 'add' && m.user != sessionStorage.getItem('uid')) {
                            borrower_items.add(model, {silent: true});
                        }
                   
                }
            });
            */
        },

        getItemsWhereIdOf: function(items, id){
            var Obscura = require('libs/backbone.obscura');
            var proxy = new Obscura(items);
            return proxy.filterBy('id', {borrower_id: id});
        },

        getBorrowToolsTotal: function(model){
            var rs = borrower_items.where({borrower_id: model.id});
            return rs.length;
        },

        getByStatus: function(model, stat){
            var Obscura = require('libs/backbone.obscura');
            var proxy = new Obscura(borrower_items);
            proxy.filterBy('items', {borrower_id: model.id});
            
            var rs = proxy.where({status: stat});
            return rs.length;

        },





    	appendModalBorrowerItem: function(){
    		var view = new ViewModalBorrowerItems();
    		view.render();
    	},

    	appendListOfBorrowerItem: function(myCollection){
    		var view = new ViewListOfBorrowerItem({
    			collection: myCollection
    		});
    		view.render()
    	},

        appendReturnTools: function(list){
            setTimeout(function() {
                require(['views/tool/borrow/view_list_of_return_tools'], function(Subview){
                    var view = new Subview({
                        collection: list
                    });
                });
            }, 500);
        }
        

    }
   
    return BorrowerItemModule; 
});