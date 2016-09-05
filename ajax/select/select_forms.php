<?php 
	if (isset($_GET['table']) && isset($_GET['code'])) {
		include '../../class/class.database.php';
		$sql = "SELECT * FROM '$table' WHERE warehouse_code = ?";
		$query = self::$handler->prepare($sql);
		$query->execute(array($_GET['code']));
		$Object = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($Object);
	}
?>