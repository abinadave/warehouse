<?php 
	if (isset($_POST)) {
		// $model = $_POST['values'];
		// $delivered_id = $_POST['delivered_id'];
		// include_once '../../class/class.deliver_items.php';
		// $deliveritem = new Deliver_items();
		// $result = $deliveritem::save($model, $delivered_id);
		// if ($result) {
		// 	echo $result;
		// }
		echo "<pre>", print_r($_POST) ,"</pre>";
	}
?>