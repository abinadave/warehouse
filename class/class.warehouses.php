<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Warehouses extends Database
	{
		public static $handler;
		
		function __construct()
		{
			# code...
			self::$handler = Database::connect();
		}

		public static function save($data){
			$sql = "INSERT INTO warehouses SET id = ?, location = ?, receipt_loc = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['code'], $data['location'], $data['receipt_loc']));
			if ($query) {
				return true;
			}else {
				return false;
			}
		}

		public static function saveWarehouseMen($data){
			include_once 'class.accounts.php';
			$accounts = new Accounts();
			//$password = $accounts::sanitize($data['password']);
			$sql = "INSERT INTO warehousemens SET firstname = ?, lastname = ?, username = ?, password = ?, code = ?, email = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['firstname'], $data['lastname'], $data['username'], $data['password'], $data['code'], $data['email']));
			if ($query) {
				$data['id'] = self::$handler->lastInsertId();
				return $data;
			}
		}

		public static function getJSON(){
			$sql = "SELECT * FROM warehouses";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function getReceiptLoc($code){
			$sql = "SELECT * FROM warehouses WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($code));
			$row = $query->fetch(PDO::FETCH_OBJ);
			return $row->receipt_loc;
		}

		public static function remove($id){
			$sql = "DELETE FROM warehouses WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				return true;
			}else {
				return false;
			}
		} 

		public static function getLocationName($code){
			$sql = "SELECT location FROM warehouses WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($code));
			$row = $query->fetch(PDO::FETCH_OBJ);
			if ($query->rowCount() > 0) {
				return $row->location;
			}else {
				return 'unknown location';
			}
		}

		
		
	}
?>