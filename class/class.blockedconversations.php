<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Blocked_conversation
	{

		private static $handler, $user, $receiver;

		function __construct($data)
		{
			self::$handler = Database::connect();
			self::$user = $data['user'];
			self::$receiver = $data['receiver'];
		}

		public static function ifExist(){
			$sql = "SELECT * FROM blocked_conversations WHERE user = ? AND receiver = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(self::$user, self::$receiver));

			if ($query->rowCount() > 0) {
				$json = self::update();
				return $json;
			}else {
				$row = $query->fetch(PDO::FETCH_BOTH);
				$json = self::save($row);
				return $json;
			}
		}

		public static function getMinMax(){
			$sql = "select min(id), max(id) from conversations where user = ? || user = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(self::$user, self::$receiver));
			$row = $query->fetch(PDO::FETCH_BOTH);
			return $row;
		}

		public static function save($row){
			$row = self::getMinMax();
			if (isset($row[0]) && isset($row[1])) {
				$sql = "INSERT INTO blocked_conversations SET user = ?, receiver = ?, start = ?, end = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array(self::$user, self::$receiver, $row[0], $row[1]));
				$json = array('user' => self::$user,
							   'receiver' => self::$receiver,
							   'start' => $row[0],
							   'end' => $row[1],
							   'type' => 'save');
				return $json;
			}
		}

		public static function update(){
			$row = self::getMinMax();
			if (isset($row[0]) && isset($row[1])) {
				$sql = "UPDATE blocked_conversations SET start = ?, end = ? WHERE user = ? AND receiver = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($row[0], $row[1], self::$user, self::$receiver));
				$json = array('user' => self::$user, 
							  'receiver' => self::$receiver,
							  'start' => $row[0],
							  'end' => $row[1],
							  'type' => 'update');
				return $json;
			}
		}


	}

?>