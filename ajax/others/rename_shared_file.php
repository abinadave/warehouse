<?php 
	if (isset($_POST)) {
		#echo "<pre>", print_r($_POST) ,"</pre>";

		$oldname = '../../filesharing/' . $_POST['chat'];
		$ext = pathinfo($_POST['chat'], PATHINFO_EXTENSION);
		$newname = '../../filesharing/download' . $_POST['id'] . '.' . $ext;
		
		if (file_exists($oldname)) {
			
			if(rename($oldname, $newname)){
				echo true;
			}else {
				echo false;
			}

		}else {
			echo false;
		}
		
	}
?>