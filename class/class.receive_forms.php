<?php
session_start();
	/**
	* 
	*/
	
	include_once 'validator/Validator.php';
	class Receive_forms
	{
		public static $handler, $id, $location, $supplier, $crm, $received_by, $hour, $today, $verified_by, $position, $code;
		function __construct()
		{
			include_once 'class.database.php';
			self::$handler = Database::connect();
		}

		public function getReceivedItems(){
			// $sql = "SELECT * FROM receive_"
		}

		public function setId($value){
			self::$id = $value;
			return $this;
		}

		public function setLocation($value){
			self::$location = $value;
			return $this;
		}

		public function setSupplier($value){
			self::$supplier = $value;
			return $this;
		}

		public function setCrm($value){
			self::$crm = $value;
			return $this;
		}

		public function setRb($value){
			include_once 'class.warehousemens.php';
			$warehousemens = new Warehousemens();
			self::$received_by = $warehousemens::getFullName($value);
			return $this;
		}

		public function setHour($value){
			self::$hour = $value;
			return $this;
		}

		public function setToday($value){
			self::$today = $value;
			return $this;
		}

		public function setVerifiedBy($value){
			self::$verified_by = $value;
			return $this;
		}

		public function setPosition($value){
			self::$position = $value;
			return $this;
		}

		public function setCode($value){
			self::$code = $value;
			return $this;
		}

		public static function saveForm(){
			//receive form
			$time = date("h:i:s A");  
			if (isset(self::$location) || isset(self::$supplier) || isset(self::$crm) || isset(self::$received_by)) {
				$sql = "INSERT INTO receive_form 
					SET location_receive = ?, 
					supplier_name = ?, 
					crm_id = ?, 
					received_by = ?,
					verified_by = ?,
					position = ?,
					date = ?,
					time = ?,
					warehouse_code = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array(
					self::$location,
					self::$supplier,
					self::$crm,
					self::$received_by,
					self::$verified_by,
					strtoupper(self::$position),
					self::$today,
					self::$hour,
					self::$code
				));

				if ($query) {
					$id = self::$handler->lastInsertId();
					$data['id'] = $id;
					$data['received_by'] = self::$received_by;
					return $data;
				}
			}
		}


		public static function validate(){	
			
			$validate = array(
				'location' => self::$location,
			 	'supplier' => self::$supplier,
			 	'received_by' => self::$received_by,
			 	'verified_by' => self::$verified_by,
			 	'position' => self::$position
			);

			$v = new Valitron\Validator($validate);

			$v->rule('required', ['received_by','verified_by','position']);			

			if ($v->validate()) {
				$id = self::saveForm();
				return $id;
			}else {
				foreach ($v->errors() as $key => $value) {
					$count = count($value);
					foreach ($value as $ky => $val) {
						?>
							<script type="text/javascript">
								router.alertify_error('<?php echo $val; ?>');
							</script>
						<?php
					}
				}
			}

		}


		public static function getReceivingForms(){
			$code = $_SESSION['code'];
			if (!empty($code)) {
				$sql = "SELECT * FROM receive_form WHERE warehouse_code = ? ORDER BY id DESC";
				$query = self::$handler->prepare($sql);
				$query->execute(array($code));
				if ($query) {
					$json = $query->fetchAll(PDO::FETCH_OBJ);
					return $json;
				}
			}else {
				$sql = "SELECT * FROM receive_form ORDER BY date DESC";
				$query = self::$handler->prepare($sql);
				$query->execute();
				if ($query) {
					$json = $query->fetchAll(PDO::FETCH_OBJ);
					return $json;
				}
			}
			
		}


	}
 ?>