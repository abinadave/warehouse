<?php
session_start(); 
	if (isset($_GET)) {
		if ($_SESSION['uid'] == 1) {
			echo "Admin";
		}elseif($_SESSION['uid'] == 2) {
			echo "Manager";
		}else {
			include_once '../../class/medoo.php';
			$database = new Medoo();
			$result = $database->get("transferform_notification", "value", [
				"code" => $_SESSION['code']
			]);
			echo $result;
		}
	}
?>