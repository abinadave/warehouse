<?php 
class Dr_invoice
{
	private static $handler;
	public $value, $type, $rid;
	function __construct()
	{
		require_once 'class.database.php';
		self::$handler = Database::connect();
	}

	public function save(){
		$sql = "INSERT INTO dr_invoice_others SET value = ?, type = ?, receiving_id = ?";
		$query = self::$handler->prepare($sql);
		$rs = $query->execute(array(
			$this->value,
			$this->type,
			$this->rid
		));
		return $rs;
	}

}