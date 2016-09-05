<?php 
session_start();
	if (isset($_POST)) {
		echo json_encode($_SESSION);
	}
?>