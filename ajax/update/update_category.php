<?php 
	if (isset($_POST['id']) && isset($_POST['name'])) {
		# code...
		$id = stripcslashes($_POST['id']);
		$name = stripcslashes($_POST['name']);
		$class = '../../class/class.categories.php';
		
		if (file_exists($class)) {
			include_once $class;
			$categories = new Categories();
			$result = $categories->setId($id)->setName($name)->update();
			echo $result;
		}else {
			echo "Error";
		}
	}
?>