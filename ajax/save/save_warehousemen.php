<?php 
	if (isset($_POST['code']) && isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['confirm'])) {

		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required',['firstname','lastname','username','password','confirm','email']);
		$v->rule('equals','password','confirm');
		$v->rule('email', 'email');
		if ($v->validate()) {
			# code...
			include_once '../../class/class.warehouses.php';
			$warehouses = new Warehouses();
			unset($_POST['confirm']);
			$data = $warehouses::saveWarehouseMen($_POST);
			if (is_array($data)) {
				# code...
				?>
					<script type="text/javascript">
						require(['modules/warehousemen_module','modules/userlog_module'], function(module, UM){
							var json = <?php echo json_encode($data) ?>;
						     module.saveModel(json, 0);
						     UM.saveDB('New Warehousemen was added with id of: '+json.id + ' Name: ' +json.firstname +' ' +json.lastname);
						});
					</script>
				<?php
			}
		}else {
			

			?>
				    <div class="alert alert-info alert-dismissable" style="text-align: left; margin-top: 60px">
				        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
				        <?php 
				        		foreach ($v->errors() as $key => $errors) {
									foreach ($errors as $key => $value) {
										echo $value . "<br/>";
									}
								}
				        ?>
				    </div>
			<?php
		}

	}
?>