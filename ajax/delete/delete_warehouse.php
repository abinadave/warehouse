<?php 
	if (isset($_POST['id'])) {
		# code...
		$id = stripcslashes($_POST['id']);
		include_once '../../class/class.warehouses.php';
		$warehouses = new Warehouses();
		$result = $warehouses::remove($id);
		if ($result) {
			echo true;
		}
	}
?>