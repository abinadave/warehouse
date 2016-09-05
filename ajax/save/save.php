<?php 
	if (isset($_POST)) {
		$table = $_POST['table'];
		unset($_POST['table']);
		include_once '../../class/medoo.php';
		$database = new Medoo();
		$last_user_id = $database->insert($table, $_POST);
		#echo $last_user_id;
		
		if (empty($last_user_id)) {
			echo json_encode($_POST);
		}else {
			$_POST['id'] = $last_user_id;
			echo json_encode($_POST);
		}
		
	}
?>