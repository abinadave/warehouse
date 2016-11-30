<?php 
session_start();
class Withdraw
{
	private static $handler;
	function __construct()
	{
		self::$handler = Database::connect();
	}
	
	public function getAllWithdrawals($id){
		$sql = "SELECT * FROM withdraw_item WHERE item = ?";
		$query = self::$handler->prepare($sql);
		$query->execute(array($id));
		if ($query->rowCount() > 0) {
			$rows = $query->fetchAll(PDO::FETCH_OBJ);
			return $rows;
		}else {
			return [];
		}
	}

	public function saveItem($item, $model)
	{
		include 'class.product.php';
		$product = new Product();
		$item['table'] = 'withdraw_item';
		$result = $model::save($item);
		if($result){
			$remainBalance = $this->deductItem($item);
			$result['remaining_balance'] = $remainBalance;
			echo json_encode($result);
		}
	}

	public function deductItem($item){
		$sql = "SELECT * FROM products WHERE id = ?";
		$query = self::$handler->prepare($sql);
		$query->execute(array(
			$item['item']
		));
		if ($query->rowCount() > 0) {
			$stockCard = $query->fetch(PDO::FETCH_OBJ);
			$totalBalance = $stockCard->running_bal - $item['qty'];
			$sql = "UPDATE products SET running_bal = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				$totalBalance,
				$item['item']
			));
			return $totalBalance;
		}
	}

	public function getMaxId()
	{
		$sql = "SELECT MAX(id) as max_id FROM withdraw_form";
		$query = self::$handler->query($sql);
		$row = $query->fetch(PDO::FETCH_OBJ);
		echo json_encode($row);
	}

	public function getForms()
	{
		$code = $_SESSION['code'];
		if (!empty($code)) {
			$sql = "SELECT * FROM withdraw_form WHERE warehouse_code = ? ORDER BY id DESC";
			$query = self::$handler->prepare($sql);
			$query->execute(array($code));
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_ASSOC);
				return $json;
			}
		}else {
			$sql = "SELECT * FROM withdraw_form ORDER BY id DESC";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_ASSOC);
				return $json;
			}
		}
	}
}