<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Warehousemens extends Database
	{
		public static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function getJSON(){
			$sql = "SELECT * FROM warehousemens";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function delete($id){
			$sql = "DELETE FROM warehousemens WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				return true;
			}else {
				return false;
			}
		}

		public static function update($data){
			$sql = "UPDATE warehousemens SET firstname = ?, lastname = ?, username = ?, password = ?, code = ?, email = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['firstname'], $data['lastname'], $data['username'], $data['password'], $data['code'], $data['email'], $data['id']));
			if ($query) {
				return $data;
			}else {
				return false;
			}
		}

		public static function verify_account($data){
			$sql = "SELECT * FROM warehousemens WHERE username = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['username']));

			if ($query && $query->rowCount() > 0) {
				$row = $query->fetch(PDO::FETCH_OBJ);
				if (!strcmp($data['password'], $row->password)) {
					self::setSession($row->id, 3, $row->code);
					self::setStatus($row->id, 1);
					return true;
				}else {
					return false;
				}
			}
		}

		public static function setStatus($id, $value){
			$sql = "UPDATE warehousemens SET status = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($value, $id));
		}

		 private static function setSession($id, $usertype, $code){
			$_SESSION['uid'] = $id;
			$_SESSION['usertype'] = $usertype;
			$_SESSION['code'] = $code;
			$sql = "SELECT * FROM warehousemens WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			$row = $query->fetch(PDO::FETCH_OBJ);
			$_SESSION['name'] = $row->firstname . ' ' . $row->lastname;
			$_SESSION['rand'] = $row->rand;
			$_SESSION['email'] = $row->email;
			$_SESSION['last_active'] = $row->last_active;
	    }

	    public static function getFullName($value){
	    	$sql = "SELECT firstname, lastname FROM warehousemens WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($value));
			$row = $query->fetch(PDO::FETCH_OBJ);
			return $row->firstname . ' ' . $row->lastname;
	    }

	    public static function updatePassword($row, $post){
	    	if ($row['password'] !== $post['current']) {
				return array('result' => 'password does not match in the database.', 'success' => false);
			}else {
				$sql = "UPDATE warehousemens SET password = ? WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$rs = $query->execute(array($post['newpassword'], $post['uid']));
				return array('success' => $rs, 'result' => 'Successfully updated password.');
			}	
	    }

	}
?>