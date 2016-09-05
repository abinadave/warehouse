<?php
session_start(); 
		include_once '../../class/medoo.php';
		$database = new Medoo();
		if (isset($_SESSION['code']) && $_SESSION['code'] !== 0) {
			$datas = $database->select($_GET['table'], "*", ["warehouse_code" => $_SESSION['code']]);
			echo json_encode($datas);    	
		}else {
			$datas = $database->select($_GET['table'], "*");
			echo json_encode($datas);
		}
?>