<?php 
	if (isset($_GET['code'])) {
		include_once '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM transfer_forms WHERE warehouse_code = ? OR to_warehouse_id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array($_GET['code'], $_GET['code']));
		echo json_encode($query->fetchAll(PDO::FETCH_OBJ));
	}
?>