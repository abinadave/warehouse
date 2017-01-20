<?php 
session_start();
	if (isset($_GET)) {
		$uid = $_SESSION['uid'];
		include '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM warehousemens WHERE id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array($uid));
		if ($query->rowCount() > 0) {
			$row = $query->fetch(PDO::FETCH_OBJ);
			$sql = "SELECT * FROM warehouses WHERE id = ?";
			$query = $handler->prepare($sql);
			$query->execute(array($row->code));
			if ($query->rowCount() > 0) {
				$row = $query->fetch(PDO::FETCH_OBJ);
				echo json_encode(array('admin' => false, 'branch_name' => $row->location));
			}
		}else {
			echo json_encode(array('admin' => true));
		}
	}
 ?>