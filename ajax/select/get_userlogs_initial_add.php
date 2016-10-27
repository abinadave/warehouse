<?php 
	if (isset($_GET['id'])) {
		include_once '../../class/class.database.php';
		include_once '../../class/withdraw.php';
		include_once '../../class/class.receive_items.php';
		include_once '../../class/class.product.php';

		$withdraw = new Withdraw();
		$receive = new Receive_items();
		$product = new Product();

		$handler = Database::connect();

		$name = "New Item was added with name of: ".$_GET['name'];
		$sql = "SELECT * FROM userlogs WHERE activity = ?";
		$query = $handler->prepare($sql);
		$query->execute(array(
			$name
		));

		if ($query->rowCount() > 0) {
			$row = $query->fetch(PDO::FETCH_OBJ);
			$withdrawalRows = $withdraw->getAllWithdrawals($_GET['id']);
			$receivingRows = $receive->getAllReceiving($_GET['id']);
			$array = array(
				'found' => true, 
				'log' => $row,
				'withdrawals' => $withdrawalRows,
				'receivings'  => $receivingRows,
				'item'        => $product->getCurrentProduct($_GET['id'])
			);
			echo json_encode($array);
		}else {
			echo json_encode(array('found' => false));
		}
	}
 ?>