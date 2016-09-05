<?php 
	if (isset($_POST)) {
		# code...
		$values = $_POST['values'];
		$table = $_POST['table'];

		include_once '../../class/medoo.php';
		$database = new Medoo();
		
		foreach ($values as $key => $value) {
			$database->insert($table, $value);
		}
	}
?>