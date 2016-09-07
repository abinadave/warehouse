<?php 
class Product
{
	private static $handler;
	function __construct()
	{
		self::$handler = Database::connect();
	}

}