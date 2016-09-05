<?php 
	include_once '../../class/class.receive_items.php';
	$items = new Receive_items();
	$json = $items::getJSON();
	echo json_encode($json);
?>