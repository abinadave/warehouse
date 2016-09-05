<?php
session_start(); 
	if (isset($_GET)) {
		
		include '../../class/medoo.php';
		$database = new medoo();
		$session = $_GET['session'];
		if ($_SESSION['code'] == 0) {
			$datas = $database->select("tools", "*");
			echo json_encode($datas);
		}else {
			$datas = $database->select("tools", "*", [
				"warehouse_code" => $_SESSION['code']
			]);
			echo json_encode($datas);
		}	

	}	
?>