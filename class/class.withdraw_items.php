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
			$rs = '';
			$sql = "INSERT INTO withdraw_item SET withdraw_id = ?, qty = ?, remarks = ?, item = ?, name = ?, unit = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['withdraw_id'], $data['qty'], $data['remarks'], $data['id'], $data['name'], $data['unit']));
			if ($query) {
				$total = self::getProduct($data);
				self::performDeduction($total, $data);
				$rs = true;
			}else {
				$rs = false;
			}
			return $rs;
		}

		public static function getProduct($data){
			$sql = "SELECT * FROM products WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['id']));
			$prod = $query->fetch();
			$total = $prod['running_bal'] - $data['qty'];
			return $total;
		}

		public static function performDeduction($total, $data){
			$sql = "UPDATE products SET running_bal = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($total, $data['id']));
		}

		public static function getJSON(){
			$sql = "SELECT * FROM withdraw_item";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}
	}

?>