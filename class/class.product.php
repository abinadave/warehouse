<?php 
class Product
{
	private static $handler;
	function __construct()
	{
		self::$handler = Database::connect();
	}

	public function getItem($id)
	{
		$sql = "SELECT * FROM products WHERE id = ?";
		$query = self::$handler->prepare($sql);
		$query->execute(array($id));
		return $query->fetch(PDO::FETCH_OBJ);
	}

}