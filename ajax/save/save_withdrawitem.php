<?php 
	if (isset($_POST)) {
		
		$values = $_POST['values'];
		$values['withdraw_id'] = $_POST['withdraw_id'];
		$item = $values['id'];
		include '../../class/class.withdraw_items.php';
		$withdrawItem = new Withdraw_items();
		$rs = $withdrawItem::save($values, $item);
		// echo $result;
		echo json_encode(array('success' => $rs));

	}
?>