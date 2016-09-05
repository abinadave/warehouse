<?php 
	include '../../class/medoo.php';
	$database = new medoo();
	$datas = $database->select("classifications", [
		"id",
		"name"
	]);
	echo json_encode($datas);
?>