<?php 
	include_once '../../class/class.warehousemens.php';
	$warehousemens = new Warehousemens();
	$json = $warehousemens::getJSON();
	echo json_encode($json);
?>