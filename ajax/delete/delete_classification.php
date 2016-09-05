<?php 
	if (isset($_POST['id'])) {
		# code...
		$id = stripcslashes($_POST['id']);
		include_once '../../class/medoo.php';
		$database = new Medoo();
		$rs = $database->delete("classifications", [
			"AND" => [
				"id" => $id
			]
		]);

		echo $rs;
	}
?>