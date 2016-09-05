<?php 

	include_once '../../class/class.products.php';
	$products = new Products();
	$json = $products::get_products();
	echo json_encode($json);
?>