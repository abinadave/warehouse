<?php 

	if (isset($_POST['max'])) {
		# code...
		$max = stripcslashes($_POST['max']);

		if (!strcmp($max, 'ezjones')) {
			include_once '../../class/class.database.php';
			$handler = Database::connect();
			$sql = "SELECT max(id) FROM receive_form";
			$query = $handler->prepare($sql);
			$query->execute();
			$row = $query->fetch(PDO::FETCH_BOTH); 
			if (empty($row[0])) { 
				$row[0] = 1; 
			}else {
			 $row[0]++; 
			} 
			echo sprintf('%05d',$row[0]);
		}
	}
	
?>