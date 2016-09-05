<?php 
	include_once '../../class/class.withdraw_forms.php';
	$forms = new Withdraw_forms();
	echo json_encode($forms::getJSON());
?>