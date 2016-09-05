<?php
session_start(); 
		if (isset($_SESSION['code']) && $_SESSION['code'] !== 0) {
			include_once '../../class/medoo.php';
			$database = new Medoo();
			$datas = $database->select($_POST['table'], "*", ["warehouse_code" => $_SESSION['code']]);
			echo json_encode($datas);    	
		}else {
			include_once '../../class/medoo.php';
			$database = new Medoo();
			$datas = $database->select($_POST['table'], "*");
			echo json_encode($datas);
		}
?>