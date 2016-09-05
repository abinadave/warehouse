<?php
	if (isset($_POST['table']) && isset($_POST['file'])) {	
		include '../../class/class.accounts.php';
		$accounts = new Accounts();

		$backupFile = '../../db/backup/'.$_POST['file'];
		if (!is_file($_POST['file'])) {
			fopen($backupFile, "w");
		}
	
		$rs = $accounts::backupDB($_POST['table'], $backupFile);
		
	}
?>