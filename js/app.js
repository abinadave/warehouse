// This is the main entry point for the App
define(
	[
		'models/session',
		'models/repair',
		'models/presence',
		'models/decommission',

		//collection
		'collections/categories',
		'collections/products',
		'collections/carts',
		'collections/extracts',
		'collections/accounts',
		'collections/warehouses',
		'collections/warehousemens',
		'collections/receive_forms',
		'collections/receive_items',
		'collections/withdraw_forms',
		'collections/withdraw_items',
		'collections/deliver_forms',
		'collections/deliver_items',
		'collections/tools',
		'collections/classifications',
		'collections/pawns',
		'collections/borrower_forms',
		'collections/borrower_items',
		'collections/borrowed_tools',
		'collections/transfers',
		'collections/transfer_forms',
		'collections/transfer_items',
		'collections/transfered_tools',
		'collections/returned_tools',
		'collections/repair_forms',
		'collections/repair_items',
		'collections/repaired_tools',
		'collections/userlogs',
		'collections/onlines',
		'collections/conversations',
		'collections/blocked_conversations',
		'collections/suppliers',
		'collections/units',
		'collections/contacts',
		'collections/projects',
		'collections/decommission_tools',
		'collections/decommission_forms',
		'collections/decommission_items',
		'collections/item_areas',
		'collections/item_rows',
		'collections/item_shelfs',
		'collections/notifications',
		'collections/item_borrows',
		'collections/borrower_pforms',
		'collections/borrower_pitems',
		'collections/current_stocks',

		//view items...
		'views/view_home',
		'views/category/view_table_category',
		'views/product/view_table_products',
		'views/account/view_accounts',
		'views/warehouse/view_warehouse',
		'views/receiving_report/view_table_receiving_reports',
		'views/withdraw/view_table_withdrawslips',
		'views/deliver/view_table_deliver_reports',
		'views/navigation/view_navigation',
		'views/product/view_product_history',
		//view tools...
		'views/tool/available/view_table_tools',


		//router
		'routers/router'
	], 

	function(
		Session,
		Repair,
		Presence,
		Decommission,

		Categories,
		Products,
		Carts,
		Extracts,
		Accounts,
		Warehouses,
		Warehousemens,
		Receive_forms,
		Receive_items,
		Withdraw_forms,
		Withdraw_items,
		Deliver_forms,
		Deliver_items,
		Tools,
		Classifications,
		Pawns,
		Borrower_forms,
		Borrower_items,
		Borrowed_tools,
		Transfers,
		Transfer_forms,
		Transfer_items,
		Transfered_tools,
		Returned_tools,
		Repair_forms,
		Repair_items,
		Repaired_tools,
		Userlogs,
		Onlines,
		Conversations,
		Blocked_conversations,
		Suppliers,
		Units,
		Contacts,
		Projects,
		Decommission_tools,
		Decommission_forms,
		Decommission_items,
		Item_areas,
		Item_rows,
		Item_shelfs,
		Notifications,
		Item_borrows,
		Borrower_pforms,
		Borrower_pitems,
		Current_stocks,

		ViewHome,
		ViewCategory,
		ViewProducts,
		ViewAccounts,
		ViewWarehouse,
		ViewReceivingReport,
		ViewWithDrawSlips,
		ViewDeliverReports,
		ViewNavigation,
		ViewProductHistory,
		ViewTableTools,

		Router

	){

	var init = function(){

		//model
		session = new Session();
		repair = new Repair();
		presence = new Presence();
		decommission = new Decommission();

		//collection
		categories = new Categories();
		products = new Products();
		carts = new Carts();
		extracts = new Extracts();
		receive_forms = new Receive_forms();
		receive_items = new Receive_items();
		accounts = new Accounts();
		warehouses = new Warehouses();
		warehousemens = new Warehousemens();
		withdraw_forms = new Withdraw_forms();
		withdraw_items = new Withdraw_items();
		deliver_forms = new Deliver_forms();
		deliver_items = new Deliver_items();
		tools = new Tools();
		classifications = new Classifications();
		pawns = new Pawns();
		borrower_forms = new Borrower_forms();
		borrower_items = new Borrower_items();
		borrowed_tools = new Borrowed_tools();
		transfers = new Transfers();
		transfer_forms = new Transfer_forms();
		transfer_items = new Transfer_items();
		transfered_tools = new Transfered_tools();
		returned_tools = new Returned_tools();
		repair_forms = new Repair_forms();
		repair_items = new Repair_items();
		repaired_tools = new Repaired_tools();
		userlogs = new Userlogs();
		onlines = new Onlines();
		conversations = new Conversations();
		blocked_conversations = new Blocked_conversations();
		suppliers = new Suppliers();
		units = new Units();
		contacts = new Contacts();
		projects = new Projects();
		decommission_tools = new Decommission_tools();
		decommission_forms = new Decommission_forms();
		decommission_items = new Decommission_items();
		item_areas = new Item_areas();
		item_rows = new Item_rows();
		item_shelfs = new Item_shelfs();
		notifications = new Notifications();
		item_borrows = new Item_borrows();
		borrower_pforms = new Borrower_pforms();
		borrower_pitems = new Borrower_pitems();
		current_stocks = new Current_stocks();

		require(['modules/functions','modules/bulletin_module'], function(fn, BulletinModule){
		    var obj = fn.backboneCollection('Bulletins','bulletins', BulletinModule);
		});

		//view
		view_home = new ViewHome();
		view_category = new ViewCategory();
		view_product = new ViewProducts();
		view_account = new ViewAccounts();
		view_warehouse = new ViewWarehouse();
		view_receiving_report = new ViewReceivingReport();
		view_withdrawslips = new ViewWithDrawSlips();
		view_delivery_reports = new ViewDeliverReports();
		view_navigation = new ViewNavigation();
		view_product_history = new ViewProductHistory();
		view_tool = new ViewTableTools();

		//router
		router = new Router();

		nav = '';

		// pubnub = PUBNUB.init({
		//     publish_key: 'pub-c-55fe2b01-bf74-4b01-8dc6-3e22519de9af',
		//     subscribe_key: 'sub-c-70072c82-fdd2-11e4-aa11-02ee2ddab7fe'
		// });
		

	};
	
	return { init: init };
	
});
