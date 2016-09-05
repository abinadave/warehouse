<?php 

	include_once '../../class/class.accounts.php';
	$accounts = new Accounts();
	$json = $accounts::getUserDetails();
	echo json_encode($json);
?>