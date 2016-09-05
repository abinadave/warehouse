<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Withdraw_items extends Database
	{
		private static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data){
			$sql = "INSERT INTO withdraw_item SET withdraw_id = ?, qty = ?, remarks = ?, stock_id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['withdraw_id'], $data['qty'], $data['remarks'], $data['id']));
			if ($query) {
				return true;
			}
		}
	}
?>