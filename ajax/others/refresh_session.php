<?php 
session_start();
   if (isset($_SESSION['uid'])) {
   	  if (isset($_POST)) {
	   	  foreach ($_POST as $key => $value) {
	   	  	 $_SESSION[$key] = $value;
	   	  }
	   }
   }
?>