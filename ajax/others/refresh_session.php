<?php 
session_start();
   if (isset($_POST)) {
   	# code...
   	  foreach ($_POST as $key => $value) {
   	  	 $_SESSION[$key] = $value;
   	  }
   }

?>