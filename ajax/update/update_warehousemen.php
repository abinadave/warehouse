<?php 
	if (isset($_POST)) {
		//echo "<pre>", print_r($_POST), "</pre>";
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['firstname','lastname','username','password','confirm','id','code','email']);
		$v->rule('equals','password','confirm');
		$v->rule('email','email');
		if ($v->validate()) {
			include_once '../../class/class.warehousemens.php';
			$instance = new Warehousemens();
			unset($_POST['confirm']);
			$data = $instance::update($_POST);
			if (is_array($data)) {
				?>
					<script>
						var json = <?php echo json_encode($data) ?>;
						require(['modules/warehousemen_module','modules/userlog_module'], function(module, UM){
						    module.updateModel(json);
						    UM.saveDB('Warehousemen was updated with an id of: '+json.id +' Name: '+json.firstname +' ' +json.lastname);
						});
					</script>
				<?php
			}
		}else {
			foreach ($v->errors() as $key => $error) {
				foreach ($error as $key => $value) {
				   echo $value . "<br>";
				}
			}
		}
	}
?>