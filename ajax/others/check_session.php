<?php
session_start(); 
	// $session = JFactory::getSession();
	// echo json_encode(array('active' => $session->isActive()));
	if(isset($_COOKIE['PHPSESSID'])) {
	    echo json_encode(array('redirect' => false));
	} else {
		session_destroy();
		$_SESSION = [];
		echo json_encode(array('redirect' => true));
	}
?>