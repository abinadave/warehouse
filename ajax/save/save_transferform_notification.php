<?php 
	if (isset($_POST['code']) && isset($_POST['value'])) {
		# code...
		$code = stripcslashes($_POST['code']);
		$value = stripcslashes($_POST['value']);

		include '../../class/class.database.php';
		$handler = Database::connect();

		$sql = "SELECT * FROM transferform_notification WHERE code = ?";
		$query = $handler->prepare($sql);
		$query->execute(array($code));

		if ($query->rowCount() > 0) {
			$sql = "SELECT * FROM transferform_notification WHERE code = ?";
			$query = $handler->prepare($sql);
			$query->execute(array($code));
			$row = $query->fetch(PDO::FETCH_OBJ);
			$total = 0;
			$total = $row->value + 1;

			$sql = "UPDATE transferform_notification SET value = ? WHERE code = ?";
			$query = $handler->prepare($sql);
			$query->execute(array($total, $code));

		}else {
			$sql = "INSERT INTO transferform_notification SET code = ?, value = ?";
			$query = $handler->prepare($sql);
			$query->execute(array($code, $value));
		}

	}
?>