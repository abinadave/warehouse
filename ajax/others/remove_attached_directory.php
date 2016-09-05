<?php 
	if (isset($_POST['uid'])) {
		$files = glob('../../db/temp/' . $_POST['uid'] . '/*'); // get all file names
		foreach($files as $file){ // iterate files
		  if(is_file($file))
		    unlink($file); // delete file
		}
	}
?>