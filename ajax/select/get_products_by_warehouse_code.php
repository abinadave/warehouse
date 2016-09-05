<?php
session_start(); 
	$usertype = $_SESSION['usertype'];

	if ($usertype == 3) {
		include_once '../../class/class.products.php';
		$products = new Products();
		$json = $products::getProductsByCode($_SESSION['uid']);
		echo json_encode($json);
	}
?>