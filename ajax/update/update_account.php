<?php 
	if (isset($_POST)) {
		
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['firstname','lastname','username','password','confirm_password','usertype','email']);
		$v->rule('equals', 'password','confirm_password');
		$v->rule('email','email');
		if ($v->validate()) {
			# code...
			include_once '../../class/class.accounts.php';
			$accounts = new Accounts();
			$password = $accounts::update($_POST);
			if ($password) {
				unset($_POST['password']);
				unset($_POST['confirm_password']);
				$id = $_POST['hiddenid'];
				unset($_POST['hiddenid']);
				$_POST['password'] = $password;
				?>
					<script>
						var json = <?php echo json_encode($_POST) ?>;
						var id = <?php echo $id ?>;
						var account = accounts.get(id);
						account.set(json);
						$('#li-records').trigger('click');
						$('#btnUpdateAccount').hide();
						$('#form-add-account').find('#hidden-id').val('');
						$('#form-add-account')[0].reset();
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