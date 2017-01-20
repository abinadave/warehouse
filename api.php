<?php
	require 'sb-admin2/Slim/Slim/Slim.php';
    require 'class/class.functions.php';
    
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();

	$app->get('/fetch/user/details', function() use($_SESSION){
		print_r($_SESSION);
	});

	$app->get('/dr_invoice', function () use ($app){
		$model = new Model();
		$data = $model::select('dr_invoice_others');
		echo json_encode($data);
	});

	$app->get('/withdraw_item', function() use ($app){
		$model = new Model();
		$data = $model::select('withdraw_item');
		echo json_encode($data);
	});

	$app->post('/product', function() use ($app){
		$data = json_decode($app->request->getBody());
		$product =  (array) $data;
		$model = new Model();
		echo json_encode($model::save($product));
	});

	$app->delete('/product/:id', function($id) use ($app){
		require_once 'class/class.product.php';
		$product = new Product();
		$rs = $product->destroy($id);
		echo json_encode(array('success' => $rs));
	});

	$app->get('/product/:index/:type', function($index, $type) use ($app){
		/* some code here */
		include 'class/class.product.php';
		$product = new Product();
		$model = new Model();
		$items = $product->getByIndexType($index, $type, $model);
		echo json_encode($items);
	});

	$app->put('/product/:id', function($id) use ($app){
		$data = json_decode($app->request->getBody());
		$product =  (array) $data;
		unset($product['id']);
		unset($product['table']);
		$model = new Model();
		$rs = $model::update(array(
			'table'  => 'products',
			'values' => $product,
			'prop'   => 'id',
			'value'  => $data->id
		));
		echo json_encode(array('updated' => $rs));
	});

	$app->post('/withdraw_item', function() use ($app){
		$data = json_decode($app->request->getBody());
		include 'class/withdraw.php';
		$item =  (array) $data;
		$withdraw = new Withdraw();
		$model = new Model();
		$withdraw->saveItem($item, $model);
	});

	$app->post('/withdraw_form', function() use ($app){
		$data = json_decode($app->request->getBody());
		$form =  (array) $data;
		$form['table'] = 'withdraw_form';
		$model = new Model();
		$response = $model::save($form);
		echo json_encode($response);
	});

	$app->get('/withdraw_form/get_max_id', function() use ($app){
		include 'class/withdraw.php';
		$withdraw = new Withdraw();
		$withdraw->getMaxId();
	});

	$app->get('/borrower_pform', function() use ($app){
		include_once 'class/class.borrower_pforms.php';
		$borrower_pforms = new Borrower_pforms();
		$forms = $borrower_pforms->getForms();
		echo json_encode($forms);
	});

	$app->get('/withdraw_form', function() use ($app){
		include_once 'class/withdraw.php';
		$model = new Model();
		$withdraw = new Withdraw();
		$data = $withdraw->getForms();
		echo json_encode($model->utf8_encode_all($data));
		// echo json_encode($data);
		// print_r($data);
	});

	$app->get('/receive_form/:usertype/:code', function($usertype, $code) use ($app){
		include_once 'class/class.receive_forms.php';
		$receive_form = new Receive_forms();
		$data = '';
		if ($usertype == 3) {
			$data = $receive_form->getFormsIncharge($code);
		}else {
			$data = $receive_form->getAllForms();
		}
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
		include 'class/class.products.php';
		$products = new Products();
		$model = new Model();
		$data = $products::get_products();
		echo json_encode($model->utf8_encode_all($data));
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
		$data = $model::fetchOrderBy(array(
			'table' => $tbl,
			'index' => $index,
			'type'  => $type
		));
		echo json_encode($model->utf8_encode_all($data));
	});


	$app->get('/get_withdrawals/:id', function($id){
		echo $id;
	});

	$app->run();
?>
