<?php 
	if (isset($_POST['items'])) {
		# code...

		$items = $_POST['items'];
		
		include_once '../../class/class.products.php';
		$products = new Products();

		foreach ($items as $key => $id) {

			$products->setId($id)->delete();

		}

	
	}
?>