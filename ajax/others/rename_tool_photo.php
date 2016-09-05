<?php 
	if (isset($_POST)) {
		#echo "<pre>", print_r($_POST) ,"</pre>";

		$name = $_POST['name'];
		$json = $_POST['values'];
		
		$oldname = '../../images/tools/' . $name;
		$rand = $json['id'] . md5(rand(1,9999));
		$newname = '../../images/tools/' . $json['id'] . '-' . $rand . '.jpg';
		
		if (file_exists($oldname)) {
	
			include_once '../../class/medoo.php';
			$database = new Medoo(); 
			$database->update("tools", [
				"rand" => $rand
			], [
				"id" => $json['id']
			]);

				if(rename($oldname, $newname)){
					$arr = array('id' => $json['id'], 'rand' => $rand);
					echo json_encode($arr);
				}else {
					echo false;
				}

		}else {
			echo false;
		}
		
	}
?>