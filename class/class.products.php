<?php
session_start(); 
	/**
	* 
	*/
	include_once 'class.database.php';

	class Products extends Database
	{
		public static $id, $name, $category, $area, $shelf, $row, $add_desc, $reorder_point, $running_bal, $unit, $handler;
		private static $fn;
		function __construct()
		{
			include_once 'class.functions.php';
			self::$fn = new Model();
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

		public function setCategory($value){
			self::$category = $value;
			return $this;
		}

		public function setArea($value){
			self::$area = $value;
			return $this;
		}

		public function setShelf($value){
			self::$shelf = $value;
			return $this;
		}

		public function setRow($value){
			self::$row = $value;
			return $this;
		}

		public function setAddDesc($value){
			self::$add_desc = $value;
			return $this;
		}

		public function setReOrderPoint($value){
			self::$reorder_point = $value;
			return $this;
		}

		public function setRunningBal($value){
			self::$running_bal = $value;
			return $this;
		}

		public function setUnit($value){
			self::$unit = $value;
			return $this;
		}

		public function save(){
			$sql = "INSERT INTO products SET 
				category = ?, 
				name = ?, 
				area =?, 
				shelf = ?, 
				row = ?, 
				add_desc = ?, 
				reorder_point = ?,
				running_bal = ?,
				unit = ?,
				warehouse_code = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				self::$category, 
				self::$name, 
				self::$area, 
				self::$shelf, 
				self::$row, 
				self::$add_desc, 
				self::$reorder_point,
				self::$running_bal,
				self::$unit,
				$_SESSION['code']));

			if ($query) {
				# code...
				return self::$handler->lastInsertId();
			}else {
				return false;
			}
		}

		public static function get_products(){
			if ($_SESSION['code'] == 0) {
				$sql = "SELECT * FROM products";
				$query = self::$handler->prepare($sql);
				$query->execute();
				if ($query) {
					$json = $query->fetchAll(PDO::FETCH_OBJ);
					return $json;
				}
			}else {
				$sql = "SELECT * FROM products WHERE warehouse_code = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($_SESSION['code']));
				if ($query) {
					$json = $query->fetchAll(PDO::FETCH_OBJ);
					return $json;
				}
			}
			
		}

		public static function getProductsByCode($code){
			$sql = "SELECT * FROM products WHERE warehouse_code = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($code));
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function delete(){
			if (isset(self::$id)) {
				$sql = "DELETE FROM products WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array(self::$id));
				if ($query) {
					return true;
				}else {
					return false;
				}
			}
		}

		public function update(){
			
			if (isset(self::$id)) {
				$sql = "UPDATE products SET 
					category = ?, 
					name = ?, 
					area =?, 
					shelf = ?, 
					row = ?, 
					add_desc = ?, 
					reorder_point = ?,
					running_bal = ?,
					unit = ?
					WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array(
						self::$category,
						self::$name,
						self::$area,
						self::$shelf,
						self::$row,
						self::$add_desc,
						self::$reorder_point,
						self::$running_bal,
						self::$unit,
						self::$id
					));

				if ($query) {
					return true;
				}else {
					return false;
				}

			}
		}

		public static function deduct($model){
			$sql = "SELECT * FROM products WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($model['id']));
			if ($query) {
				$row = $query->fetch(PDO::FETCH_OBJ);
				$running_bal = $row->running_bal;
				$total = $running_bal - $model['qty'];
				return self::updateRunningBal($total, $model['id']);
			}
		}

		public static function updateRunningBal($total, $id){
			$sql = "UPDATE products SET running_bal = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($total, $id));
			if ($query) {
				return true;
			}else {
				return false;
			}

		}

		public static function getReceivingWithdrawal($id){
			$sql = "SELECT * FROM receive_item WHERE receive_id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				$id
			));
			$received_rows = $query->fetchAll(PDO::FETCH_OBJ);

			$sql = "SELECT * FROM withdraw_item WHERE withdraw_id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				$id
			));
			$withdraw_rows = $query->fetchAll(PDO::FETCH_OBJ);
			return array_merge($received_rows, $withdraw_rows);
		}



	}

?>