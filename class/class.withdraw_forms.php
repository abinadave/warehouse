<?php
session_start(); 
	/**
		* 
		*/
		include 'class.database.php';
		class Withdraw_forms extends Database
		{
			private static $handler, $no, $issued_by;
			function __construct()
			{	
				include_once 'class.warehousemens.php';
				$warehousemens = new Warehousemens();
				self::$handler = Database::connect();
				self::$issued_by = $warehousemens::getFullName($_SESSION['uid']);
			}

			public static function save($data){

				$sql = "INSERT INTO withdraw_form SET linked_to = ?, requested_by = ?, requested_by_position = ?, issued_by = ?, issued_by_position = ?, date = ?, time = ?, warehouse_code = ?";
				$query = self::$handler->prepare($sql);

				$query->execute(
					array($data['linked_to'], 
					$data['requested_by'],
					strtoupper($data['position']),
					self::$issued_by,
					'WAREHOUSEMEN',
					$data['date'],
					$data['hour'],
					$data['warehouse_code']
				));

				if ($query) {
					$id = self::$handler->lastInsertId();
					$no = self::generateCrmNo($id);
					$sql = "UPDATE withdraw_form SET no = ? WHERE id = ?";
					$query = self::$handler->prepare($sql);
					$query->execute(array($no, $id));
					if ($query) {
						$json = array('id' => $id, 
							'linked_to' => $data['linked_to'],
							'no' => $no, 
							'requested_by' => $data['requested_by'],
							'requested_by_position' => $data['position'],
							'issued_by' => self::$issued_by,
							'issued_by_position' => 'warehousemen',
							'date' => $data['date'],
							'time' => $data['hour'],
							'warehouse_code' => $data['warehouse_code']);
						return $json;
					}
				}
			}

			private static function generateCrmNo($id){
				$year = date('Y') - 2000;
				include 'class.warehouses.php';
				$instance = new Warehouses();
				$receiptLoc = $instance::getReceiptLoc($_SESSION['code']);
				$crm = $receiptLoc . '-' . $_SESSION['code'] . '-8' . $year . '-' . sprintf('%05d', $id);;
				return $crm;
			}

			public static function getJSON(){
				$sql = "SELECT * FROM withdraw_form";
				$query = self::$handler->prepare($sql);
				$query->execute();
				if ($query) {
					$json = $query->fetchAll(PDO::FETCH_OBJ);
					return $json;
				}
			}

			

		}	
?>