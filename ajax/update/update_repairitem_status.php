<?php

	if (isset($_POST['status']) && isset($_POST['repair_id']) && isset($_POST['tool_id'])) {
		// echo "<pre>", print_r($_POST) ,"</pre>";
		include_once '../../class/class.database.php';
		$handler = Database::connect();

		$sql = "UPDATE repair_items SET status = ? WHERE repair_id = ? AND tool_id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array($_POST['status'], $_POST['repair_id'], $_POST['tool_id']));
		if ($query) {
			echo true;
		}else {
			echo false;
		}
	}
?>