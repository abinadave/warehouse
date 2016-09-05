<?php 
	if (isset($_POST['values'])) {
		# code...
		$values = $_POST['values'];

		include_once '../../class/class.categories.php';
		$categories = new Categories();

		foreach ($values as $key => $value) {
			# code...
			$categories->setId($value)->remove();
		}

		#echo "<pre>", print_r($_POST) ,"</pre>";
	}
?>