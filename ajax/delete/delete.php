<?php 
	if (isset($_POST['table']) && isset($_POST['id'])) {
		include_once '../../class/medoo.php';
		$database = new Medoo();
		$result = $database->delete($_POST['table'], [
		    "AND" => [
		      $_POST['prop'] => $_POST['id']
		    ]
		]);
		echo $result;
	}
?>