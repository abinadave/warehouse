<?php 
	include_once '../../class/class.deliver_forms.php';
	$deliverforms = new Deliver_forms();
	$json = $deliverforms::getJSON();
	echo json_encode($json);
?>