<?php 
session_start();
class Withdraw
{
	private static $handler;
	function __construct()
	{
		self::$handler = Database::connect();
	}

	public function getForms()
	{
		$code = $_SESSION['code'];
		if (!empty($code)) {
			$sql = "SELECT * FROM withdraw_form WHERE warehouse_code = ? ORDER BY id DESC";
			$query = self::$handler->prepare($sql);
			$query->execute(array($code));
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}else {
			$sql = "SELECT * FROM withdraw_form ORDER BY date DESC";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}
	}
}