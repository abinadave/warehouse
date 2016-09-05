<?php 
		include_once '../../class/medoo.php';
		$database = new Medoo();
		$datas = $database->select($_POST['table'], "*", [$_POST['where'] => $_POST['value']]);
		echo json_encode($datas);    	
		
?>