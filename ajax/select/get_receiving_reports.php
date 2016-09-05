<?php
session_start(); 
	include_once '../../class/class.receive_forms.php';
	$reports = new Receive_forms();
	$json = $reports::getReceivingForms($_SESSION['code']);
	echo json_encode($json);
?>