<?php 
class Product
{
	private static $handler;
	function __construct()
	{
		self::$handler = Database::connect();
	}

	public function getByIndexType($index, $type)
	{
		$sql = "SELECT * FROM products ORDER BY $index $type";
		$query = self::$handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($rows);
	}

}