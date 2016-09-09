<?php  

	if (isset($_GET['code']) && isset($_GET['usertype'])) {
		header('Content-Type: application/json');
		$usertype = $_GET['usertype'];
		$code = $_GET['code'];
		include_once '../../class/class.functions.php';
		include_once '../../class/class.database.php';
		$handler = Database::connect();
		$model = new Model();
		$sql = "SELECT * FROM products";
		$query = $handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
		$data = $model->utf8_encode_all($rows);
		echo json_encode($data);
	}
?>