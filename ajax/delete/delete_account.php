<?php
	if (isset($_POST['id'])) {
		$id = stripcslashes($_POST['id']);
		include_once '../../class/class.accounts.php';
		$accounts = new Accounts();
		$result = $accounts::remove($id);
		echo $result;
	}
?>