<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Deliver_items extends Database
	{
		private static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data, $item){
			$sql = "INSERT INTO deliver_item SET delivered_id = ?,
					qty = ?, remarks = ?, item = ?, name = ?, unit = ?, status = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($item, $data['qty'], $data['remarks'], $data['id'], $data['name'], $data['unit'], 0));
			if ($query) {
				return true;		
			}			
		}

		public static function getJSON(){
			$sql = "SELECT * FROM deliver_item";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function updateStatus($data){
			$sql = "UPDATE deliver_item SET status = ? WHERE delivered_id = ? AND item = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['status'],$data['delivered_id'], $data['item']));
			if ($query) {
				return true;
			}
		}

	}
?>