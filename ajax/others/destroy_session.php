<?php
session_start(); 
	if (isset($_POST['destroy'])) {
		session_destroy();
	}
?>