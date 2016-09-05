<?php 
	include_once '../../class/medoo.php';
	$database = new Medoo();
	$result = $database->get($_POST['table'], $_POST['column'], [
		$_POST['where'] => $_POST['value']
	]);
	echo json_encode($result);
?>