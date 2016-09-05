<?php 
	include_once '../../class/class.warehouses.php';
	$warehouses = new Warehouses();
	$json = $warehouses::getJSON();
	echo json_encode($json);
?>