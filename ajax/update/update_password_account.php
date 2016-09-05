<?php 
	if (isset($_POST)) {

		include_once '../../class/class.functions.php';

		if ($_POST['usertype'] == 3) {
			# warehouse incharge
			include_once '../../class/class.warehousemens.php';
			$incharge = new Warehousemens();
			$row = Fn::get(array(
	    		'table' => 'warehousemens',
	    		'column' => '*',
	    		'where' => 'id',
	    		'value' => $_POST['uid']
	    	));
			$result = $incharge::updatePassword($row, $_POST);
			echo json_encode($result);
		}else {
			include_once '../../class/class.accounts.php';
			$accounts = new Accounts();
			$row = Fn::get(array(
	    		'table' => 'accounts',
	    		'column' => '*',
	    		'where' => 'id',
	    		'value' => $_POST['uid']
	    	));
			$result = $accounts::updatePassword($row, $_POST);
			echo json_encode($result);
		}
	}
?>