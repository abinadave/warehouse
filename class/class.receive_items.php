<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Receive_items extends Database
	{
		public static $handler, $id, $qty, $remarks, $item, $name, $unit;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public function getAllReceiving($id){
			$sql = "SELECT * FROM receive_item WHERE receive_id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query->rowCount() > 0) {
				$rows = $query->fetchAll(PDO::FETCH_OBJ);
				return $rows;
			}else {
				return [];
			}
		}

		public function setId($value){
			self::$id = $value;
			return $this;
		}

		public function setQty($value){
			self::$qty = $value;
			return $this;
		}

		public function setRemarks($value){
			self::$remarks = $value;
			return $this;
		}

		public function setItem($value){
			self::$item = $value;
			return $this;
		}

		public function setName($value){
			self::$name = $value;
			return $this;
		}

		public function setUnit($value){
			self::$unit = $value;
			return $this;
		}

		public static function save(){
			$sql = "INSERT INTO receive_item SET receive_id = ?, qty = ?, remarks = ?, item = ?, name = ?, unit = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(self::$item, self::$qty, self::$remarks, self::$id, self::$name, self::$unit));
			$result = self::deductProduct(self::$item);
			if ($result) {
				return true;
			}
		}

		public static function getJSON(){
			$sql = "SELECT * FROM receive_item";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function deductProduct($stock_id){
			$total = 0;

			$sql = "SELECT * FROM products WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($stock_id));
			$row = $query->fetch();
			
			$total = $row['running_bal'] + self::$qty;
			$sql = "UPDATE products SET running_bal = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($total, $stock_id));
			if ($query) {
				return true;
			}
		}


	}
?>