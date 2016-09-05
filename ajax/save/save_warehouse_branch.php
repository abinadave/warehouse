<?php 
	if (isset($_POST)) {
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['code','location']);
		if ($v->validate()) {
			include_once '../../class/class.warehouses.php';
			$warehouses = new Warehouses();
			$result = $warehouses::save($_POST);
			if ($result) {
				$id = $_POST['code'];
				unset($_POST['code']);
				$_POST['id'] = $id;
				?>
					<script>
					    var json = <?php echo json_encode($_POST) ?>;
						require(['modules/warehouse_module'], function(module){
						    module.saveModel(json, 0);
						    router.alertify_success('new warehouse branch was added');
						});
					</script>
				<?php
				
			}else {
				echo false;
			}
		}else {
			?>
				    <div class="alert alert-info alert-dismissable">
				        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
				       
					<?php
							foreach ($v->errors() as $key => $error) {
								foreach ($error as $key => $value) {
									echo $value . "<br/>";
								}
							}
					?>
				 
			   </div>
			<?php
		}
	}
?>