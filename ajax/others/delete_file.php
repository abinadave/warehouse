<?php 
	if (isset($_GET['dir'])) {
		if (file_exists($_GET['dir'])) {
			unlink($_GET['dir']);
		}else {
			echo "file does not exist " . $_GET['dir'];
		}
	}
?>