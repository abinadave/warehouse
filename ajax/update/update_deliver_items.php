<?php 
	if (isset($_POST['item']) && isset($_POST['status']) && isset($_POST['delivered_id'])) {
		include '../../class/class.deliver_items.php';
		$items = new Deliver_items();
		$rs = $items::updateStatus($_POST);
		echo $rs;
		// echo "<pre>", print_r($_POST) ,"</pre>";
	}
?>