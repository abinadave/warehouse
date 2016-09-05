<?php 
	// include_once '../../class/medoo.php';
	// $database = new medoo();
	// $count = $database->count($_POST['table']);
	include_once '../../class/class.database.php';
	$handler = Database::connect();
	$table = $_POST['table'];
	$sql = "SELECT count(*) FROM $table";
	$query = $handler->query($sql);
	$count = $query->rowCount();

	echo $count;
?>