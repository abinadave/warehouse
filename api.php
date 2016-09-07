<?php

	require 'sb-admin2/Slim/Slim/Slim.php';
    require 'class/class.functions.php';
    
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();

	$app->get('/borrower_pform', function() use ($app){
		include_once 'class/class.borrower_pforms.php';
		$borrower_pforms = new Borrower_pforms();
		$forms = $borrower_pforms->getForms();
		echo json_encode($forms);
	});

	$app->get('/withdraw_form', function() use ($app){
		include_once 'class/withdraw.php';
		$withdraw = new Withdraw();
		echo json_encode($withdraw->getForms());
	});

	$app->get('/receive_form', function() use ($app){
		include_once 'class/class.receive_forms.php';
		$receive_form = new Receive_forms();
		$data = $receive_form::getReceivingForms();
		echo json_encode($data);
	});

	$app->get('/warehouse', function() use ($app){
		$model = new Model();
		echo json_encode($model::select('warehouses'));
	});

	$app->get('/category', function() use ($app){
		$model = new Model();
		echo json_encode($model::select('categories'));
	});

	$app->get('/classification', function() use ($app){
		$model = new Model();
		echo json_encode($model::select('classifications'));
	});

	$app->get('/product', function() use ($app){
		include_once 'class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM products ORDER BY id DESC";
		$query = $handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($rows);
	});

	$app->get('/receive_item', function() use ($app){
		$model = new Model();
		echo json_encode($model::select('receive_item'));
	});

	$app->get('/get/:tbl', function($tbl) use ($app){
		$model = new Model();
		echo json_encode($model::select($tbl));
	});

	$app->get('/get_order_by/:table/:index/:type', function($tbl, $index, $type) use ($app){
		$model = new Model();
		$resp = $model::fetchOrderBy(array(
			'table' => $tbl,
			'index' => $index,
			'type'  => $type
		));
		echo json_encode($resp);
	});


	$app->get('/get_withdrawals/:id', function($id){
		echo $id;
	});

	$app->run();
?>
