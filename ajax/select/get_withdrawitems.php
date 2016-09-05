<?php 
	include_once '../../class/class.withdraw_items.php';
	$items = new Withdraw_items();
	echo json_encode($items::getJSON());
?>