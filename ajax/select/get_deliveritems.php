<?php 
	include_once '../../class/class.deliver_items.php';
	$deliveritems = new Deliver_items();
	$json = $deliveritems::getJSON();
	echo json_encode($json);
?>