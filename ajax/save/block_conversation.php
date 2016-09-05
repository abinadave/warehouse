<?php 
	if (isset($_POST['user']) && isset($_POST['receiver'])) {
		include_once '../../class/class.blockedconversations.php';
		$blocked = new Blocked_conversation($_POST);
		$json = $blocked::ifExist();
		echo json_encode($json);

	}
?>