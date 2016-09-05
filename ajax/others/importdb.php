<?php
	if (isset($_POST['table']) && isset($_POST['file'])) {	
		include '../../class/class.accounts.php';
		$accounts = new Accounts();

		$backupFile = '../../db/backup/'.$_POST['file'];
	
		$rs = $accounts::restoreDB($_POST['table'], $backupFile);
		
	}
?>