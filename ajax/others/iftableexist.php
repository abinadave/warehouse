<?php 
	if (isset($_POST['table'])) {
		include '../../class/class.accounts.php';
		$accounts = new Accounts();
		$rs = $accounts::tableExists($_POST['table']);
		echo json_encode($rs);
	}
?>