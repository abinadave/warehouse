<?php

	if ($_POST) {
		// echo "<pre>", print_r($_POST) ,"</pre>";
		include_once '../../class/class.database.php';
		$handler = Database::connect();

		$sql = "UPDATE decommission_items SET status = ? WHERE decommission_id = ? AND tool_id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array($_POST['status'], $_POST['decommission_id'], $_POST['tool_id']));
		if ($query) {
			echo true;
		}else {
			echo false;
		}
	}
?>