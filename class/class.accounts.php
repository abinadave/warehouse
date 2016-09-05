<?php
session_start();

	include_once 'class.database.php';
	
	if (!function_exists('password_hash')) { include_once 'password_compat/lib/password.php'; }

	class Accounts extends Database
	{
		public static $handler;
		
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data){
			$id = self::generateRandomId();
			$password = self::sanitize($data['password']);
			$sql = "INSERT INTO accounts SET id = ?, firstname = ?, lastname = ?, username = ?, password = ?, usertype = ?, email = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id, $data['firstname'], $data['lastname'], $data['username'], $password, $data['usertype'], $data['email']));
			if ($query) {
				$values = array('password' => $password, 'id' => $id);
				return $values;
			}
		}

		public static function update($data){
			$password = self::sanitize($data['password']);
			$sql = "UPDATE accounts SET firstname = ?, lastname = ?, username = ?, password = ?, usertype = ?, email = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['firstname'], $data['lastname'], $data['username'], $password, $data['usertype'], $data['email'], $data['hiddenid']));
			if ($query) {
				return $password;
			}else {
				return false;
			}
		}

		public static function remove($id){
			$sql = "DELETE FROM accounts WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				return true;
			}
		}

		public static function generateRandomId(){
			$done = 1;
			$rand = 0;
			while ($done) {
				$rand = rand(10000,99999);
				$sql = "SELECT * FROM accounts WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($rand));
				if ($query->rowCount() > 0) {
					# code...
					$done = 1;
				}else {
					$done = 0;
				}
			}

			return $rand;
		}

		public static function sanitize($password){
			$options = [
			    'cost' => 11,
			    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
			];
			return password_hash($password, PASSWORD_BCRYPT, $options);
	    }

	    public static function vefiry_password($username, $password){
	    	$sql = "SELECT * FROM accounts WHERE username = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($username));
	    	$match = false;
	    	if ($query->rowCount() > 0) {
	    		while ($row = $query->fetch(PDO::FETCH_OBJ)) {
	    			if (password_verify($password, $row->password)) {
	    				$match = true;
	    				self::setSession($row->id, $row->usertype);
	    				self::setStatus($row->id, 1);
	    			}
	    		}
	    	}
	    	return $match;
	    }

	    private static function setSession($id, $usertype){
			$_SESSION['uid'] = $id;
			$_SESSION['usertype'] = $usertype;
			$_SESSION['code'] = 0;
			$sql = "SELECT * FROM accounts WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			$row = $query->fetch(PDO::FETCH_OBJ);
			$_SESSION['name'] = $row->firstname . ' ' . $row->lastname;
			$_SESSION['rand'] = $row->rand;
			$_SESSION['email'] = $row->email;
			$_SESSION['last_active'] = $row->last_active;
	    }

	    public static function setStatus($id, $value){
	    	$sql = "UPDATE accounts SET status = ? WHERE id = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($value, $id));
	    }

		public static function getJSON(){
			$sql = "SELECT * FROM accounts ORDER BY lastname DESC";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function getUserDetails(){
			$id = $_SESSION['uid'];
			
				$sql = "SELECT * FROM accounts WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($id));
				if ($query->rowCount() > 0) {
					$json = $query->fetch(PDO::FETCH_OBJ);
					return $json;
				}else {
					$sql = "SELECT * FROM warehousemens WHERE id = ?";
					$query = self::$handler->prepare($sql);
					$query->execute(array($id));
					if ($query) {
						$json = $query->fetch(PDO::FETCH_OBJ);
						return $json;
					}
				}
		}

		public static function tableExists($table) {
		    // Try a select statement against the table
		    // Run it in try/catch in case PDO is in ERRMODE_EXCEPTION.
		    global $result;
		    try {
		        $sql = "SELECT 1 FROM $table LIMIT 1";
		    	$result = $query = self::$handler->query($sql);
		    	$result = "true";
		    } catch (Exception $e) {
		        // We got an exception == table not found
		        return "false";
		    }

		    // Result is either boolean FALSE (no table found) or PDOStatement Object (table found)
		    return $result;
		}

		//back up sql table..
		public static function backupDB($tbl, $filename){
			$myfile = fopen($filename, "w");
			$sql = "SELECT * FROM $tbl";
			$query = self::$handler->query($sql);
			$row = $query->fetchAll(PDO::FETCH_OBJ);

			foreach ($row as $key => $value) {
				foreach ($value as $k => $val) {
					fwrite($myfile, $val . " ");
				}
				fwrite($myfile, "\n");
			}	
		}

		public static function exportDB($tbl, $filename){
			echo $tbl;
			echo $filename;
			$tableName  = $tbl;
			$backupFile = $filename;
			$query  = "LOAD DATA INFILE '$backupFile' INTO TABLE $tableName";
			$result = self::$handler->query($query);
		}

		public static function updatePassword($row, $post){
	    	if (!password_verify($post['current'], $row['password'])) {
				return array('result' => 'password does not match in the database.', 'success' => false);
			}else {
				$sql = "UPDATE accounts SET password = ? WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$rs = $query->execute(array(self::sanitize($post['newpassword']), $post['uid']));
				return array('success' => $rs, 'result' => 'Successfully updated password.');
			}	
	    }

	}
?>