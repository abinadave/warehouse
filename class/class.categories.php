<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Categories extends Database
	{
		private static $id, $name, $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public function setId($value){
			self::$id = $value;
			return $this;
		}

		public function setName($value){
			self::$name = $value;
			return $this;
		}

		public function getName(){
			return self::$name;
		}

		public function saveCategory(){
			$sql = "INSERT INTO categories SET
					name = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(self::$name));
			if ($query) {
				return self::$handler->lastInsertId();
			}
		}

		public static function getCategories(){
			$sql = "SELECT * FROM categories";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public function remove(){
			if (isset(self::$id)) {
				$sql = "DELETE FROM categories WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array(self::$id));
			}
		}

		public function update(){
			if (isset(self::$id) && isset(self::$name)) {
				$sql = "UPDATE categories SET name = ? WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array(self::$name, self::$id));
			}
		}


	}
 ?>