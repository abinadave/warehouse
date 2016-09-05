<?php
session_start(); 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Deliver_forms extends Database
	{
		private static $handler, $location;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data){
			self::getLocation($data['code']);	
			$sql = "INSERT INTO deliver_form SET
			date = ?, time = ?, from_location = ?,
			to_person = ?, to_location = ?,
			prepared_by = ?, prepared_by_position = ?,
			delivered_by = ?, delivered_by_position = ?, warehouse_code = ?, to_location_id = ?";
			$query = self::$handler->prepare($sql);
			
			$query->execute(array(
				$data['date'],
				$data['time'],
				self::$location,
				$data['to_person'],
				$data['to_location'],
				$data['prepared_by'],
				$data['prepared_by_position'],
				$data['delivered_by'],
				$data['delivered_by_position'],
				$data['warehouse_code'],
				$data['to_location_id']
			));

			if ($query) {
				$id = self::$handler->lastInsertId();
				$no = self::generateCrmNo($id);
				$sql = "UPDATE deliver_form SET no = ? WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($no, $id));
				if ($query) {
					$model = array('no' => $no, 'id' => $id, 'location' => self::$location);
					return $model;
				}
			}
		}

		public static function getJSON(){
			$sql = "SELECT * FROM deliver_form";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		private static function generateCrmNo($id){
			$year = date('Y') - 2000;
			$crm = 'TAC-' . $_SESSION['code'] . '-8' . $year . '-' . sprintf('%05d', $id);;
			return $crm;
		}

		public static function getLocation($code){
			include_once 'class.warehouses.php';
			$warehouses = new Warehouses();
			self::$location = $warehouses::getLocationName($code);
		}


	}
?>