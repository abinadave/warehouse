<?php 
class Product
{
	private static $handler;
	function __construct()
	{
		require_once 'class.database.php';
		self::$handler = Database::connect();
	}

	public function destroy($id)
	{
		$sql = "DELETE FROM products WHERE id = ?";
		$query = self::$handler->prepare($sql);
		$rs = $query->execute(array($id));
		return $rs;
	}

	public function getByIndexType($index, $type, $model)
	{
		$sql = "SELECT * FROM products ORDER BY $index $type";
		$query = self::$handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
		return $model->utf8_encode_all($rows);
	}

	public function fetch($usertype, $code)
	{
		if ($usertype == 3) {
			return $this->getIncharge($code);
		}else {
			echo "FETCH ALL";
		}
	}

	public function fetchAll()
	{
		require_once 'class.functions.php';
		$model = new Model();
		$sql = "SELECT * FROM products ORDER BY id DESC";
		$query = self::$handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
		return $model->utf8_encode_all($rows);
	}

	public function getIncharge($code)
	{
		require_once 'class.functions.php';
		$model = new Model();
		$sql = "SELECT * FROM products WHERE warehouse_code = ?";
		$query = self::$handler->prepare($sql);
		$query->execute(array($code));
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
		return $model->utf8_encode_all($rows);
	}

	

}