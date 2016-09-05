<?php 
	/**
	* 
	*/
	require 'class.database.php';
	class Classifications extends Database
	{
		private static $handler;

		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($name){
			$sql = "INSERT INTO classifications SET name = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($name));
			if ($query) {
				return self::$handler->lastInsertId();
			}
		}

		public static function getJSON(){
			$sql = "SELECT * FROM classifications";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

	}
?>