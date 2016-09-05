define([
		'jquery', 
		'backbone', 
		'underscore', 
		'views/login',
		'modules/account_module',
		'modules/product_module',
		'modules/warehouse_module',
		'modules/warehousemen_module',
		'modules/cart_module',
		'modules/receiveform_module',
		'modules/receiveitem_module'
	], 
function($, Backbone, _, mainView, AccountModule, ProductModule, WarehouseModule, WarehousemenModule, CartModule, ReceiveFormModule, ReceiveItemModule){
	var Router = Backbone.Router.extend({

		initialize: function(){
			this.mainView = mainView;
			Backbone.history.start();
		},

		routes: {
			 '': 'showDashboard',
			 'category': 'showCategory',
			 'update-category/:p': 'updateCategory',
			 'products': 'showProducts',
			 'Accounts': 'showAccounts',
			 'userlogs': 'showLogs',
			 'editAccount/:id': 'editAccount',
			 'removeAccount/:id': 'deleteAccount',
			 'ViewWarehouse': 'showWarehouse',
			 'addWarehousemen/:id': 'showFormCreateWarehousemen',
			 'DeleteWarehouseMen/:id': 'DeleteWareHouseMen',
			 'editWarehouseMen/:id': 'UpdateWarehouseMen',
			 'removeWarehouse/:id': 'DeleteWarehouse',
			 'addToReceiving/:id': 'AddNewReceiving',
			 'addToCart/:id': 'addNewCart',
			 'removeCartFormTheList/:id': 'removeCartFormlist',
			 'viewCart': 'viewAllCarts',
			 'viewPullout': 'viewAllWithDrawals',
			 'ReceivingReports': 'showReceivingReports',
			 'viewAllReceivingItems/:id': 'showAllReceivingItems',
			 'remove-pullout/:id': 'deletePullOut',
			 'withdrawalSlips': 'showWithDrawalSlips',
			 'deliveryReports': 'showAllDeliveryReports',
			 'viewDeliveredItems/:id': 'showAllDeliveredItemsWithIdOf',
			 'viewProductHistory/:id': 'showProductHistory',
			 'availableTools': 'showAvailableTools',
			 'newTool': 'addNewTool',
			 'toolClassification': 'showClassifications',
			 'removeClassification/:id': 'deleteClassification',
			 'deleteTool/:id': 'removeTool',
			 'borrowTool': 'borrowTheTool',
			 'transferTool': 'transferTheTool',
			 'repairTool': 'repairTheTool',
			 'CheckOutBorrowTools': 'showCheckOutBowworTools',
			 'CheckOutTransferTools': 'showCheckOutTransferTools',
			 'removePawn/:id': 'removeModelPawn',
			 'viewTool/:id': 'showThisTool',
			 'historyOfBorrowedTool': 'showHistoryOfBorrowedTool',
			 'historyOfTransferedTool': 'showHistoryOfTransferedTool',
			 'historyReturnedTool': 'showHistoryReturnedTool',
			 'historyOfRepairedTool': 'showHistoryOfRepairedTool',
			 'dashboard': 'showDashboard',
			 'viewProductDetails/:id': 'showProductDetails',
			 'toolHistory': 'showPanelHistoryOfTool',
			 'toolReports': 'showToolReports',
			 'itemReports': 'showItemReports',
			 'itemReports/delivery': 'showItemReportsWithParam',
			 'ToolsToBeReturn': 'showToolsToBeReturn',
			 'returnBorrowedItem/:id': 'returnPitems',
			 'showToolHistory': 'showtheToolHistory',
			 'stockCardInventoryReport': 'printItemInventoryReport',
			 'printInventoryReport': 'printStockCardReport',
			 'stockCardInventoryReportWithdrawalReceiving': 'printStockCardReportWithdrawReceiving',

			 'backupDatabase': 'generateBackupFile',
			 'borrowItem': 'showBorrowerItemForm',


			 'bulletinBoard': 'showBulletin',
			 'gallery': 'showGallery',


			 'photos': 'showPhotos',
			 'contact': 'showContact',
			 'login': 'showLogin',
			 'photos': 'showPhotos',
			 'home': 'showHome'
		},

		homePage: function(){
			view_home.render();
			AccountModule.fetchUserDetails();
		},

		showDashboard: function(){
			
			if ($.isEmptyObject(sessionStorage)) {
				this.navigate('home', true);
			}else {
				$.post('ajax/others/get_session.php', function(data, textStatus, xhr) {
					/*optional stuff to do after success */
				}).success(function(data){

					var json = $.parseJSON(data);
					if (json.usertype == 1) {
						router.navigate('products', true);
					}else if(json.usertype == 3 || json.usertype == 2){
						//router.navigate('availableTools', true);
						router.navigate('products', true);
					}else {
						router.navigate('login', true);
					}
					
					if (sessionStorage.getItem('uid') !== null) {
						
						pubnub.publish({
						    channel: 'active_users',
						    message: {type: 'add', uid: sessionStorage.getItem('uid'), name: sessionStorage.getItem('name') }
						});

						require(['modules/account_module','modules/conversation_module'], function(AccountModule, ConversationModule){
						    AccountModule.subscribeMyChannel();
						    ConversationModule.fetchData();
						});
						
					}

					router.subviewsDashBoard();
						

				});
			}
		},

		subviewsDashBoard: function(){
			require(['modules/warehousemen_module','modules/account_module','modules/functions'], function(WarehousemenModule, AccountModule, fn){
			    WarehousemenModule.fetchData();
			    AccountModule.fetchData();
			    fn.timer();
			});
		},

		showBulletin: function(){
			require(['modules/bulletin_module'], function(BulletinModule){
			    BulletinModule.trigger('appendCarousel');
			});
		},

		showGallery: function(){
			require(['modules/functions'], function(fn){
			    fn.appendView('views/project/view_admin_gallery');
			});
		},

		showCategory: function(){
			view_category.render();
			this.subviewsCategory();
		},

		subviewsCategory: function(){
			categories.showFormAddCategory();
			categories.fetchData();
			$('#manage-li #category').addClass('active');
			AccountModule.fetchUserDetails();
		},

		updateCategory: function(cid){
			var cname = '';
			
			var result = categories.where({id: cid});
			if (result.length) {
				var category = categories.get(cid);
				cname = category.get('name');
			};

			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
					alertify.prompt("This is a prompt dialog", function (e, str) {
						if (e) {
							categories.updateCategory(cid, str);
						}
					}, cname);
			});
			this.navigate('category');
		},

		showProducts: function(){
			view_product.render();
			this.subviewsProduct();
		},

		subviewsProduct: function(){
			ProductModule.appendModalAddProduct();
			ProductModule.appendModalUpdateProduct();
			CartModule.appendModalInputQtyCart();
		    CartModule.appendModalListOfAllCarts();
			categories.fetchData();

			require(
				[
				  'modules/extract_module',
				  'modules/deliverform_module',
				  'modules/receiveitem_module',
				  'modules/withdrawform_module',
				  'modules/withdrawitem_module',
				  'modules/warehouse_module',
				  'modules/warehousemen_module',
				  'modules/account_module',
				  'modules/conversation_module',
				  'modules/supplier_module'
				], 
			function(ExtractModule, DeliveryFormModule, ReceiveItemModule, WithDrawFormModule, 
				WithdrawItemModule, WarehouseModule, WarehousemenModule, AccountModule, ConversationModule, SupplierModule){
			    
			    ExtractModule.appendModalInputQtyPullout();
			    ExtractModule.appendPulloutList();
			    DeliveryFormModule.appendModalDeliveryForm();
			    ReceiveItemModule.appendModalListOfReceivingItem();
			    WithdrawItemModule.appendModalTableWithdrawItems();
			    WithdrawItemModule.appendImageWithdrawSlip();
   
			   	ReceiveFormModule.fetchData();
			    DeliveryFormModule.fetchData();
			    WithDrawFormModule.fetchData();     
			    WarehousemenModule.fetchData();	   
			    ConversationModule.fetchAll();
			    SupplierModule.fetchData();
			    
			});

			require(
				[
					'modules/collection_module',
					'modules/borrowerpform_module',
					'modules/borrowerpitem_module'
				],function(colmod, borrowerpform_module, borrowerpitem_module){

			    colmod.fetchWhere('borrower_pforms', borrowerpform_module);
			    colmod.fetchData('borrower_pitems', 'borrower_pitems', borrowerpitem_module);

			});

			this.fetchItemAreaRowShelf();
			AccountModule.fetchUserDetails();
		},


		fetchItemAreaRowShelf: function(){
			setTimeout(function() {
				//fetch item (StockCard) attributes: area, row and shelf
			    //delaying the process for 1 sec. for performance issues.
				require([
				   	'modules/collection_module',
				   	'modules/itemarea_module'
				   	], function(colmod){
					    colmod.fetchData('item_areas', 'item_areas', {});
					    colmod.fetchData('item_rows', 'item_rows', {});
					    colmod.fetchData('item_shelfs', 'item_shelfs', {});
				});
			}, 1000);
		},


		showProductDetails: function(i){
			require(['views/product/view_item_details'], function(ViewItemDetails){
			    var view = new ViewItemDetails();
			    view.render();
			    categories.appendListOfCategoriesInModal();
			    var rs = products.where({id: i});
			    if (rs.length) {
			    	var item = products.get({id: i});
			    	$.each(item.attributes, function(index, val) {
			    		if(index == 'category'){
			    			$('#up-'+val).prop('selected', true);
			    		}else{
			    			$('#'+index).val(val);
			    		}
			    	});
			    	if (_.isEmpty(item.get('rand'))) {
			    		$('#image-item').attr('src', 'images/default.png');
			    	}else {
			    		$('#image-item').attr('src', 'images/items/'+item.get('id')+'-'+item.get('rand')+'.png');
			    	}
			    } else {
					router.navigate('products', true);
				}
			});
		},

		showAccounts: function(){
			view_account.render();
			this.subviewsAccounts();
		},

		subviewsAccounts: function(){
			AccountModule.appendFormAddAccount();
			AccountModule.appendTableAccount();
			AccountModule.fetchData();
		},

		showWarehouse: function(){
			view_warehouse.render();
			this.subviewsWarehouse();
		},

		subviewsWarehouse: function(){
			WarehouseModule.appendFormCreateWarehousemen();
			WarehousemenModule.appendTableWarehouseMen();
			WarehousemenModule.appendFormEditWarehousemen();
			AccountModule.fetchUserDetails();
			WarehousemenModule.fetchData();
			if (sessionStorage.getItem('usertype') == 2) {
				WarehouseModule.appendFormCreateWarehouseBranch();
			};
		},

		showFormCreateWarehousemen: function(id){
			this.navigate('ViewWarehouse');
			$('#modalAddNewWarehouseMen').modal('show');
			$('#form-add-warehousemen').find('#code').val(id);
		},

		showReceivingReports: function(){
			view_receiving_report.render();
			this.subviewsReceivingReports();
		},

		subviewsReceivingReports: function(){
			ReceiveItemModule.appendModalListOfReceivingItem();
			WarehousemenModule.fetchData();	
			ProductModule.fetchData();
		},

		showAllReceivingItems: function(id){
			this.navigate('ReceivingReports');
			$('#modalShowAllReceivingItems').modal('show');
			require(['modules/receiveitem_module','modules/receiveform_module','libs/jquery-ui/jquery-ui.min'], 
				function(ReceiveItemModule, ReceiveFormModule, jQueryUi){

				var myCollection = ReceiveItemModule.findItemsWithIdOf(id);
					if (myCollection.length) {
						ReceiveItemModule.appendReceivingItem(myCollection);
						ReceiveFormModule.appendReceivingHeader(id);
					};
				$('#div-modalShowAllReceivingItems').draggable({ cursor: "move"});
			});
		},

		showWithDrawalSlips: function(){
			view_withdrawslips.render();
			this.subviewsWithdrawalSlips();
		},

		subviewsWithdrawalSlips: function(){
			require(
				[
				   'modules/withdrawform_module',
				   'modules/warehousemen_module',
				   'modules/withdrawitem_module',
				   'modules/product_module'
				], 
				    function(WithDrawModuleForm, WarehousemenModule, WithDrawItemModule, ProductModule){
				    WithDrawItemModule.appendModalTableWithdrawItems();	
				    WithDrawItemModule.appendImageWithdrawSlip();
				    WithDrawModuleForm.fetchData();
				    WarehousemenModule.fetchData();
				    ProductModule.fetchData();
			});
		},


		showAllDeliveryReports: function(){
			view_delivery_reports.render();
			this.subviewsDeliveryReports();
		},

		subviewsDeliveryReports: function(){
			require(
				[
				  'modules/deliverform_module',
				  'modules/deliveritem_module',
				  'modules/product_module',
				  'modules/warehouse_module'
				], function(DeliveryFormModule, DeliverItemModule, ProductModule, WarehouseModule){
				  DeliverItemModule.appendModalTableDeliverItems();
				  WarehouseModule.fetchData();
				  ProductModule.fetchData();	
				  DeliveryFormModule.fetchData();				 
			});
		},

		showAllDeliveredItemsWithIdOf: function(id){
			this.navigate('itemReports');
			var result = deliver_items.where({delivered_id: id.toString()});
			if (result.length) {
				require(['modules/deliveritem_module'], function(DeliverItemModule){
				     var library = DeliverItemModule.findItemsWhereIdOf(id);
				     $('#modalTableDeliverItems').modal('show');
				     DeliverItemModule.appendListOfDeliverItems(library);
				     // alert(library.length);
				     DeliverItemModule.appendDeliveryReceiptHeader(id);
				});
			}else {
				// console.log('cant find items.')
			}
		},

		showProductHistory: function(id){
			var result1 = receive_items.where({receive_id: id});
			var result2 = withdraw_items.where({item: id});
			if (result1.length || result2.length) {
				view_product_history.render();

				if (result1.length) {
					require(['modules/receiveitem_module'], function(ReceiveItemModule){
						var myCollection = ReceiveItemModule.findReceiving(id);			   
					    ReceiveItemModule.appendListOfReceivingByProdId(myCollection);
					});
				}else {
					$('#list-of-receiving-history-by-id').html('<tr class="text-danger" style="font-size: 14px; font-weight: bolder"><td colspan="7">No data was found</td></tr>');
				}

				if (result2.length) {
					require(['modules/withdrawitem_module'], function(WithDrawItemModule){
					    var myCollection = WithDrawItemModule.findWithdraws(id);
					    WithDrawItemModule.appendListOfWithDrawbyProdId(myCollection);
					});
				}else {
					$('#list-of-withdraw-history-by-id').html('<tr class="text-danger" style="font-size: 14px; font-weight: bolder"><td colspan="7">No data was found</td></tr>');
				}

			}

		
		},


		showLogs: function(){
			if (sessionStorage.getItem('usertype') == 1) {
				
				require(['modules/userlog_module','modules/conversation_module'], function(UserlogModule, ConversationModule){
				    UserlogModule.appendTableUserlogs().fetchData();
				    ConversationModule.fetchAll();
				});
			}else {
				this.alertify_error('Access denied');
			}
		},

		generateBackupFile: function(){
			var uid = parseInt(sessionStorage.getItem('usertype'));
			if (uid == 1) {
				require(['modules/account_module'], function(am){
				    am.exportDB();
				});
			};
		},

		showBorrowerItemForm: function() {
			/* this is used for pop up modal borrower item form. */
			router.navigate('products');
			if (item_borrows.length) {
				require(['modules/itemborrow_module'], function(ibm){
				    ibm.appendBorrowerForm();
				});
    		}else {
    			router.alertify_error('No item was selected');
    		}
			
		},

		DeleteWareHouseMen: function(id){
			this.navigate('ViewWarehouse');
			$('#hidden-warehouse-location-table').val(id);
				require(
					[
						'libs/load_css/loadcss',
						'libs/alertify/js/alertify.min',
						'modules/warehousemen_module'
					], 
					function(css, alertify, WarehousemenModule){
						loadCSS('js/libs/alertify/css/alertify.core.css');
						loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
						alertify.confirm('Are you sure ?', function(e){
							if (e) {
								WarehousemenModule.removeDB(id);
							}else {
								console.log(e);
							}
						});
				});
		},

		DeleteWarehouse: function(id){
			this.navigate('ViewWarehouse');
			var result = warehousemens.where({code: id});
			if (result.length) {
				this.alertify_error('Cannot be deleted');
			}else {
				require(
					[
						'libs/load_css/loadcss',
						'libs/alertify/js/alertify.min',
						'modules/warehouse_module'
					], 
					function(css, alertify, module){
						loadCSS('js/libs/alertify/css/alertify.core.css');
						loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
						alertify.confirm('Are you sure ?', function(e){
							if (e) {
								module.removeDB(id);
							}else {
								console.log(e);
							}
						});
				});	
			}

		},

		UpdateWarehouseMen: function(rid){
			this.navigate('ViewWarehouse');
			var result = warehousemens.where({id: rid});
			if (result.length) {
				require(['libs/jquery-ui/jquery-ui.min'], function(){
				    $('#modalUpdateWarehousemens').modal('show',{
						backdrop: 'static',
						keyboard: false
					});
					$('#div-modalUpdateWarehousemens').draggable({
						cursor: "move"
					});
				});
				var men = warehousemens.get(rid).toJSON();
				var $form = $('#form-edit-warehousemens');
				$form.find('#firstname').val(men.firstname).end().find('#code-'+men.code).prop('selected', true).end()
				$.each(men, function(index, val) {
					 $form.find('#'+index).val(val);
				});
			}
		},

		AddNewReceiving: function(id){
			this.navigate('products');
			CartModule.addToCart(id);
		},

		removeCartFormlist: function(id){
		 	this.navigate('products');
			CartModule.removeModel(id);
		},

		addNewCart: function(id) {
			var $target = $('#modalInputQtypullout');
			this.navigate('products');
			$target.modal('show');
			$target.find('#hiddenid').val(id);
			setTimeout(function() {
				$target.find('#qty').focus();
				require(['libs/jquery-ui/jquery-ui.min'], function(){
				    $('#div-modalInputQtypullout').draggable({cursor: 'move'});
				});
			}, 500)
		},

		editAccount: function(id){
			this.navigate('Accounts');
			if (sessionStorage.getItem('usertype') == 1) {
				AccountModule.editAccount(id);
			}else {
				this.alertify_error('Access Denied');
			}
		},

		deleteAccount: function(id){
			this.navigate('Accounts');
			if (sessionStorage.getItem('usertype') == 1) {
				require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
					function(css, alertify){
						loadCSS('js/libs/alertify/css/alertify.core.css');
						loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
						alertify.confirm('Are you sure ?', function(e){
							if (e) {
								AccountModule.deleteAccount(id);
							}else {
								console.log(e);
							}
						});
				});
			}else {
				this.alertify_error('Access Denied');
			}
			
		},

		viewAllCarts: function(event){
			this.navigate('products');
			carts.isDelivered = false;
			if (carts.length) {
              require(['modules/cart_module','modules/receiveform_module','modules/warehouse_module','modules/supplier_module','modules/functions'], 
              	function(CartModule, ReceiveFormModule, WM, SM, fn){
	                 $('#modalListOfAllCarts').modal('show');
	                 CartModule.appendListOfSelectedCarts();
	                 ReceiveFormModule.generateCrm();
	                 WM.initAutocomplete('#location');	
	                 SM.initAutocomplete();
	                 fn.initUsertypes('#position');
              }); 
             
              setTimeout(function() {
              	require(['libs/jquery-ui/jquery-ui.min','css!libs/css/auto-complete-list',], function(css){
                    var availableTags = _.unique(receive_forms.pluck('verified_by'));
                    console.log(availableTags)
                    $('#verified-by').autocomplete({
                        source: availableTags,
                        change: function (event, ui) {
                            var value = $(this).val().toLowerCase();
	                        receive_forms.forEach(function(model) {
	                            if (model.get('verified_by').toLowerCase() === value) {
	                                $('#position').val(model.get('position'));
	                                console.log(model.attributes)
	                            };
	                        });
                        }
                    });
                });            
              }, 1000);
            }else {
        		this.alertify_error('0 item was selected');
        	}         
         },

        viewAllWithDrawals: function(){
        	this.navigate('products');
        	$('#output-save-withdraw').empty();
        	if (extracts.length) {
        		$('#modalPullOutList').modal('show');
        		require(['modules/extract_module','modules/warehouse_module','modules/functions'], function(ExtractModule, WM, fn){
        		    ExtractModule.appendListOfPullouts();
        		    WM.initAutocomplete('#linked-to').initSystemUsersAutocomplete('#requested-by');
        		    fn.initUsertypes('#position-withdraw');
        		    
        		    var jobOrder = [];
        		    withdraw_forms.forEach(function(model) {
        		    	if ($.isNumeric(model.get('linked_to'))) {
        		    		jobOrder.push(parseInt(model.get('linked_to')));
        		    	};
        		    });
        		    
        		    if (jobOrder.length) {
        		    	$('#linked-to').val(_.max(jobOrder) + 1);
        		    }else {
        		    	$('#linked-to').val(1);
        		    }
        		    
               
        		});
        	}else {
        		this.alertify_error('0 item was selected');
        	}
        	
        },

        deletePullOut: function(id){
        	this.navigate('products');
        		require(['libs/load_css/loadcss','libs/alertify/js/alertify.min','modules/extract_module'], 
					function(css, alertify, ExtractModule){
						loadCSS('js/libs/alertify/css/alertify.core.css');
						loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
						alertify.confirm('Are you sure ?', function(e){
							if (e) {
								ExtractModule.removeModel(id);
							}else {
								console.log(e);
							}
						});
				});
        },






        //TOOLS Routes

        showAvailableTools: function(){

        	view_tool.render();
        	AccountModule.fetchUserDetails();

        	require(
        		[
	        		'modules/classification_module',
	        		'modules/product_module',
	        		'modules/borrowerform_module',
	        		'modules/transferform_module',
	        		'modules/repairform_module',
	        		'modules/warehouse_module',
	        		'modules/warehousemen_module',
	        		'modules/account_module',
	        		'modules/conversation_module',
	        		'modules/supplier_module',
	        		'modules/unit_module',
	        		'modules/transferform_module'
        		], 
        	function(
        			ClassificationModule, 
	        		ProductModule, 
		        	BorrowerFormModule, 
		        	TransferFormModule, 
		        	RepairFormModule,
		        	WarehouseModule,
		        	WarehousemenModule,
		        	AccountModule,
		        	ConversationModule,
		        	SupplierModule,
		        	UnitModule,
		        	TransferFormModule
		        ){

        		WarehouseModule.fetchData();
        	    ClassificationModule.fetchData();
        	    ProductModule.fetchData();
        	    BorrowerFormModule.fetchData();
        	    RepairFormModule.fetchData();

        	    setTimeout(function() {
        	    	
        	    	WarehousemenModule.fetchData();
        	    	ConversationModule.fetchAll();
        	    	SupplierModule.fetchData();
        	    	UnitModule.trigger('fetchData');
        	    	TransferFormModule.fetchData().fetchNofitication();
        	    	AccountModule.checkSession();

        	    }, 500);
        	    
        	    if(sessionStorage.getItem('usertype') == 1){
        	    	$('.hide-this').remove();
        	    }

        	});
			
			this.fetchItemAreaRowShelf();
        },


        addNewTool: function(){
        	this.navigate('availableTools');
        	require(['modules/tool_module','libs/jquery-ui/jquery-ui.min'], function(ToolModule){
        		var rs = $modal = $('#tempModalAddNewTool').length;
        		if (rs) {
        			//if modal is rendered.
        			$('#tempModalAddNewTool').modal('show');
        		} else{
        			//if not.
        			ToolModule.appendModalAddNewTool();
	        	    $('#tempModalAddNewTool').modal('show');
	                $('#div-tempModalAddNewTool').draggable({
	                	backdrop: 'static',
  						keyboard: true
  					});
	                router.add_loading_btn('#btnSaveTool', 2000);
        		};
        	    
        	});
        },

        showClassifications: function(){
        	this.navigate('availableTools');
        	require(['modules/classification_module'], function(ClassificationModule){
        	    ClassificationModule.appendModalTableClassification();
        	    $('#modalTableClassification').modal('show')
        	    ClassificationModule.appendListOfClassification();
        	});
        },

        deleteClassification: function(id){
        	this.navigate('availableTools');
        	var rs = tools.where({classification: id});
        	if (rs.length) {
        		this.alertify_error('This classification cant be removed with existing tool');
        	}else{
	        	require(['modules/classification_module'], function(ClassificationModule){
	        	    ClassificationModule.removeDB(id);
	        	});
        	}

        },

        removeTool: function(id){
        	this.navigate('availableTools');
        		require(
					[
						'libs/load_css/loadcss',
						'libs/alertify/js/alertify.min',
						'modules/tool_module'
					], 
					function(css, alertify, ToolModule){
						loadCSS('js/libs/alertify/css/alertify.core.css');
						loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
						alertify.confirm('Are you sure ?', function(e){
							if (e) {
								ToolModule.removeDB(id, true);
							}else {
								console.log(e);
							}
						});
				});
        },

        borrowTheTool: function(){
        	this.navigate('availableTools');
        	var value = $('#hidden-tool').val();
        	require(['modules/tool_module'], function(ToolModule){
        	    // var ids = ToolModule.getCheckedTools();
        	    var value = $('#hidden-tool').val();
        	    console.log(value);
	        	if (value != '') {
	        		require(['modules/pawn_module'], 
						function(PawnModule){
							var model = tools.get(value);
							PawnModule.saveModel(model.attributes);	
					});
					
	        	}else {
	        		router.alertify_error('Please select a tool');
	        	}
        	});
        },

        transferTheTool: function(){
        	this.navigate('availableTools');
        	var value = $('#hidden-tool').val();
        		if (value != '') {
	        		require(['modules/transfer_module'], 
						function(TransferModule){
							var model = tools.get(value);
							TransferModule.saveModel(model.attributes);			
					});	
	        	}else {
	        		router.alertify_error('Please select a tool');
	        	}
        },

        repairTheTool: function(){
        	this.navigate('availableTools');
        	var value = $('#hidden-tool').val();
        		if (value != '') {
	        		var tool = tools.get(value);
	        	    repair.set(tool.attributes);
	        	    tools.remove(tool.id);
	        	}else {
	        		router.alertify_error('Please select a tool');
	        	}
        },

        showCheckOutBowworTools: function(){
        	this.navigate('availableTools');
        	if (pawns.length) {
        		// pawns.print()
        		require(['modules/borrowerform_module'], function(BorrowerFormModule){
        		    BorrowerFormModule.appendModalBorrowerSlip();
        		    BorrowerFormModule.transfer = false;
        		});
        	}else {	
        		this.alertify_error('No pending transaction');
        	}
        },

        showCheckOutTransferTools: function(){
        	this.navigate('availableTools');
        	if (transfers.length) {
        		require(['modules/functions','modules/transferform_module','modules/tool_module'], function(fn, TransferFormModule, ToolModule){
        		    fn.appendView('views/tool/transfer/view_modal_transfer_formslip');
        		     TransferFormModule.appendTransferFormlist();  
        		});
        	}else {	
        		this.alertify_error('No pending transaction');
        	}
        },

        removeModelPawn: function(id){
        	require(['modules/borrowerform_module'], function(BFM){
	        	if (BFM.transfer) {
        	    	router.navigate('availableTools');
        	  		transfers.remove(id);
        	    }else {
        	    	router.navigate('availableTools');
        			pawns.remove(id);
        	    }
        	    
        	});
        	
        },

    

        showHistoryOfBorrowedTool: function(){
        	require(['modules/borrowerform_module'], function(BFM){
        	    BFM.appendTableBorrowedHistory().fetchData();
        	});
        },

        showHistoryOfTransferedTool: function(){
        	require(['modules/transferform_module','modules/classification_module',
        			  'modules/warehouse_module'], function(TFM, CM, WM){
        	    TFM.appendTabeHistoryOfTransferedTool().fetchData();
        	    CM.fetchData();
        	    WM.fetchData();
        	});
        },

        showHistoryReturnedTool: function(){
        	require(['modules/returnedtool_module','modules/classification_module'], function(ReturnedToolModule, CM){
        	   ReturnedToolModule.appendPanelReturnedTool().fetchData();
        	    CM.fetchData();
        	});
        },

        showHistoryOfRepairedTool: function(){
        	require(['modules/repairform_module'], function(RepairFormModule){
        	    RepairFormModule.appendHistoryOfRepairtool().fetchData();
        	});
        },

        showThisTool: function(rid){
        	//this.navigate('availableTools');
        	require(['modules/tool_module','modules/classification_module'], function(ToolModule, ClassificationModule){
        	   	ToolModule.appendToolImageAndDetails();
        	   	var result = tools.where({id: rid});
        	   	if (result.length) {
        	   		var tool = tools.get({id: rid});
        	   		ToolModule.setImageDetailsValues(tool.attributes);
        	   		ToolModule.appendRelatedTools();
        	   		if (tool.get('rand') != '') {
        	   			var thepath = 'images/tools/' + tool.get('id') +'-' +tool.get('rand') + '.jpg';
	        	    	$('#panel-image-details').find('#image-tool').attr('src', thepath);
        	   		}else {
        	   			var thepath = 'images/default.png';
	        	   		$('#panel-image-details').find('#image-tool').attr('src', thepath);
        	   		}
        	   	}else {
        	   		console.log('cant find the tool with id of: '+rid);
        	   	}
        	   	ClassificationModule.fetchData();
        	});
        },

        showPanelHistoryOfTool: function(){
        	require(['modules/tool_module'], function(ToolModule){
        	    ToolModule.appendToolHistory();
        	});
        },

        showToolReports: function(){
        	require(['modules/tool_module'], function(ToolModule){
        	    ToolModule.appendToolReports();
        	});
        },

        returnPitems: function(i) {
        	this.navigate('itemReports');
        	var str = i.split('-'), $td = $('#'+i);
        	borrower_pitems.currentTd = $td;
        	var b = str[1], 
        	s = str[0],
            borrowerItemId = str[2].toString();

        	var model = borrower_pitems.findWhere({borrower_id: b, stock_id: s});

        	if (_.has(model.attributes, 'qty')) {

        		if (parseInt(model.get('status')) == 0) {

	        		$td.html('<span class="fa fa-spinner fa-spin fa-2x"></span>');
	        		var item = products.get(s);
	        		var total = parseFloat(item.get('running_bal')) + parseFloat(model.get('qty'));

	        		$.post('ajax/update/update.php', {
	        			values: { running_bal: total },
	        			where: 'id',
	        			where_value: s,
	        			table: 'products'
	        		}, function(data, textStatus, xhr) {
	        			/*optional stuff to do after success */
	        		}).success(function(data){
	        			var item = products.get(s);
	        			item.set({running_bal: total.toString()});
	        			require(['modules/borrowerpitem_module'], function(bpim){
	        			    bpim.updateStatus(borrowerItemId, 1);
	        			});
	        		}).fail(function(xhr){
	        			console.log('cant update borrower_pitem. Connection time out. error status: '+xhr.status);
	        		});

	        	}else {
	        		router.alertify_error('This item was already returned');
	        	}
        	};

        },

        showtheToolHistory: function() {
        	var id = $('#form-update-tool').find('#id').val();
        	this.navigate('viewTool/'+id);
        	require(['modules/tool_module'], function(tm){
        	    tm.appendToolHistories();
        	});
        },

        printItemInventoryReport(){
        	$('#modal-stock-card-inventory-report').modal('show');
        },

        printStockCardReport(){
        	this.navigate('stockCardInventoryReport');
        	var $th_td = $('#div-report-stock-cards').find('th, td'); 
        	require(['printarea'], function(printArea){
        		$th_td.css({ 'font-size': '10px' });
        	    $('#div-report-stock-cards').printArea();
        	    setTimeout(function() {
        	    	$th_td.css({ 'font-size': '12px' });
        	    }, 2000);
        	});
        },

        printStockCardReportWithdrawReceiving(){
        	$('#modal-all-stock-card-r-w-report').modal('show');	
        },

        showItemReports: function(){
        	require(['views/product/report/view_tab_item_reports'], function(Reports){
        	    var view = new Reports();
        	});
        },

        showToolsToBeReturn: function() {
        	this.navigate('availableTools');
        	require(['modules/borrowedtool_module'], function(btm){
        	    btm.appendModalToolsToBeReturn();
        	});
        },

        showItemReportsDeliver: function() {
        		
        },

		alertify_error: function(str){
			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
					alertify.error(str);
			});
			return this;
		},

		alertify_success: function(str){
			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
					alertify.success(str);
			});
		},

		add_loading_btn: function(element, interval){
			require(
				[
					'libs/bootstrap/transition',
					'libs/bootstrap/button'
				], 
				function(){
					$(element).on('click', function () {
				    var btn = $(this).button('loading');
				    	setTimeout(function (){
				    	  btn.button('reset');
				    	}, interval);
				    });
			});		  
		},

		getCurrectHour: function(){
                var now = new Date();
                var hours = now.getHours() % 12 || 12;
                var minutes = now.getMinutes();
                var seconds = now.getSeconds();
                var meridiem = '';
                var zero = '';
                var hour = now.getHours();
                
                if (hour < 12) {
                   meridiem = ' am';
                } else {
                   meridiem = ' pm';
                }
                   hour = hour % 12;
                if (hour==0) {
                   hour = 12;
                }

                if (minutes <= 9) {
                	zero = '0' + minutes;
                }else {
                	zero = minutes;
                }
                hour = hour + ' ' + meridiem;
                return hours + ":" + zero + "" + meridiem;
        },

        get12HourFormat: function(){
        	var now = new Date();
			return hours;
        },

        getQueryParameters : function(str) {
		  	return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
	  	},




	  	//for customers only

	  	showPhotos: function(){
	  		console.log('showing photos');
	  	},

	  	showContact: function(){
	  		require(['modules/contact_module'], function(CustomerModule){
	  		    CustomerModule.trigger('showContactForm');
	  		});
	  	},

	  	showLogin: function(){
	  		require(['modules/customer_module'], function(CustomerModule){
	  		    CustomerModule.trigger('showLoginForm');
	  		});
	  	},

	  	showPhotos: function(){
	  		require(['modules/functions'], function(fn){
	  		    fn.appendView('views/project/view_panel_projects');
	  		});
	  	},

	  	showHome: function(){
	  		require(['modules/functions'], function(fn){
	  		    fn.appendView('views/customer/login/view_login');
	  		});
	  	}


	});

	return Router;

});
