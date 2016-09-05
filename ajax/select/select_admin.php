<?php
session_start(); 
	if (isset($_GET['table'])) {
		if ($_SESSION['usertype'] == 1) {
			include_once '../../class/medoo.php';
			$database = new Medoo();
			$datas = $database->select($_GET['table'], "*");
			echo json_encode($datas);
		}
	} 	
?>