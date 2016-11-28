<?php  
	if (isset($_POST['value']) && isset($_POST['type'])) {
		include '../../class/class.dr_invoice.php';
		if (class_exists('Dr_invoice')) {
			$dr_invoice = new Dr_invoice;
			$dr_invoice->value = $_POST['value'];
			$dr_invoice->type = $_POST['type'];
			$dr_invoice->rid = $_POST['rid'];
			$resp = $dr_invoice->save();
			echo json_encode(array('succes' => $resp, 'id' => $dr_invoice->id()));
		}else {
			echo "Not found class";
		}
	}
?>