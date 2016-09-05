<?php 
	if (isset($_POST['id'])) {
		# code...
		$id = stripcslashes($_POST['id']);
		include_once '../../class/class.warehousemens.php';
		$men = new Warehousemens();
		if($men::delete($id)){
			echo true;
		}else {
			echo false;
		}
	}
?>