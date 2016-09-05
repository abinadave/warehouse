<?php 
	if (isset($_POST['borrower_id']) && isset($_POST['tool_id'])) {
		// echo "<pre>", print_r($_POST) ,"</pre>";
		include_once '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "UPDATE borrower_items SET status = ? WHERE borrower_id = ? AND tool_id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array($_POST['status'], $_POST['borrower_id'], $_POST['tool_id']));
		if ($query) {
			echo json_encode(array('success' => true));
		}else {
			echo json_encode(array('success' => false));
		}
	}
?>