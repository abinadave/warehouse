<?php 
	if (isset($_POST)) {
		# code...
		#echo "<pre>", print_r($_POST) ,"</pre>";
		$json = $_POST['values'];
		$name = $_POST['filename'];

		$oldname = '../../images/tools/' . $name;
		$rand = $json['id'] . md5(rand(1,9999));
		$newname = '../../images/tools/' . $json['id'] . '-' . $rand . '.jpg';
		
		include_once '../../class/medoo.php';
		$database = new Medoo(); 
		
		// if (file_exists($oldname)) {
			$database->update("tools", [
				"rand" => $rand,
			
			], [
				"id" => $json['id']
			]);

			if(rename($oldname, $newname)){
				$dir = '../../images/tools/' . $json['id'] . '-' . $json['rand'] . '.jpg';
				if (file_exists($dir)) {
					if(unlink($dir)){
						$rsp = array('id' => $json['id'], 'rand' => $rand);
						echo json_encode($rsp);
					}
				}else {
					$rsp = array('id' => $json['id'], 'rand' => $rand);
					echo json_encode($rsp);
				}
				
			}

		}else {
			echo "Cant find file with url of: " . $newname;
		}
		
	// }
?>