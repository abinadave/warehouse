<?php 

	include_once '../../class/class.categories.php';
	$categories = new Categories();
	$json = $categories::getCategories();
	echo json_encode($json);
?>