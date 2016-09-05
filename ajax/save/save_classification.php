<?php 
	if (isset($_POST['name'])) {
		# code...
		$name = stripcslashes($_POST['name']);
		if (empty($name)) {
			echo "Please provide classification name";
		}else {
			include_once '../../class/class.classification.php';
			$classification = new Classifications();
			$id = $classification::save($name);
			if ($id) {
				$_POST['id'] = $id;
				echo json_encode($_POST);
			}
		}
		
	}
?>