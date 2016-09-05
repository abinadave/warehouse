<?php 
	if (isset($_POST)) {
		# code...
		$tool = $_POST['values'];
		$dir = '../../images/tools/' . $tool['id'] . '-'. $tool['rand'] . '.jpg';
		if (file_exists($dir)) {
			if(unlink($dir)){
				echo true;
			}else {
				echo false;
			}
		}else {
			echo true;
		}
	}
?>