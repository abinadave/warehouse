<?php 

	if (isset($_POST)) {
		# code...
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);

		$v->rule('required', ['firstname','lastname','username','password','usertype','email']);
		$v->rule('equals', 'password','confirm_password');
		$v->rule('email', 'email');
		if ($v->validate()) {
			include_once '../../class/class.accounts.php';
			$accounts = new Accounts();
			$values = $accounts::save($_POST);
			if ($values) {
				unset($_POST['confirm_password']);
				$_POST['id'] = $values['id'];
				$_POST['password'] = $values['password'];
				?>
					<script>
						var json = <?php echo json_encode($_POST) ?>;
						require(
							[
								'modules/account_module'
							],  function(module) {
						   
						   	module.saveModel(json, 0);
						});
						
					</script>
				<?php
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