<?php 
	if (isset($_POST['file'])) {
		# code...
		if (is_file($_POST['file'])) {
			$json = array('found' => true, 'file' => $_POST['file']);
			echo json_encode($json);
		}else {
			$json = array('found' => false, 'file' => $_POST['file']);
			echo json_encode($json);
		}
	}
?>