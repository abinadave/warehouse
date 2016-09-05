<?php
session_start();

	if (isset($_POST['uid'])) {
		# code...
		$uid = stripcslashes($_POST['uid']);
		$_SESSION['uid'] = $uid;
		
	}
?>