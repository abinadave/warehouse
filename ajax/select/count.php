<?php 
	include_once '../../class/medoo.php';
	$database = new medoo();
	$count = $database->count($_POST['table'], [
		$_POST['where'] => $_POST['value']
	]);
	 
	// echo "We have " . $count . " female users.";
	echo $count;
?>