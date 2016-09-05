<?php
	if (isset($_POST['username']) && isset($_POST['password'])) {
		# code...
		$username = stripcslashes(trim($_POST['username']));
		$password = stripcslashes(trim($_POST['password']));

		if (empty($username) || empty($password)) {
			# code...
			?>
				<div class="alert alert-warning">
					<a class="close" data-dismiss="alert">&times;</a>
					<strong>Incomplete</strong> Username or Password.
				</div>
				<script>
					$('#form-login')[0].reset();
					$('#form-login').find('input:eq(0)').focus();
				</script>
			<?php
		}else {
			include_once '../../class/class.accounts.php';
			$accounts = new Accounts();
			$result = $accounts::vefiry_password($username, $password);
			if ($result) {
				# code...
				?>
					<script type="text/javascript">
					var json = <?php echo json_encode($_SESSION) ?>;
						 sessionStorage.setItem('usertype', json.usertype);	
						 sessionStorage.setItem('uid', json.uid);	
						 sessionStorage.setItem('code', json.code);
						 sessionStorage.setItem('name', json.name);	
						 sessionStorage.setItem('rand', json.rand);	
						 sessionStorage.setItem('email', json.email);
						 sessionStorage.setItem('last_active', json.last_active);
						 
						 require(['modules/userlog_module'], function(UserlogModule){
						     UserlogModule.saveDB('System logged in..');
						 });

						 if(Number(json.usertype) === 1){
						 	router.alertify_success('Authentication complete. Welcome Back ADMINISTRATOR. <b>Please wait.</b>');
						 }else {
						 	router.alertify_success('Authentication complete. Welcome Back MANAGER. <b>Please wait.</b>');
						 }

						 setTimeout(function() {
							  window.location = '.';
						 }, 1000);
						 
					</script>
				<?php
			}else {
				include_once '../../class/class.warehousemens.php';
				$warehousemens = new Warehousemens();
				$result = $warehousemens::verify_account($_POST);
				if ($result) {
					?>
						<script type="text/javascript">
						var json = <?php echo json_encode($_SESSION) ?>;
						
							 sessionStorage.setItem('usertype', json.usertype);	
							 sessionStorage.setItem('uid', json.uid);	
							 sessionStorage.setItem('code', json.code);
							 sessionStorage.setItem('name', json.name);	
							 sessionStorage.setItem('rand', json.rand);
							 sessionStorage.setItem('email', json.email);
							 sessionStorage.setItem('last_active', json.last_active);

							 router.alertify_success('Authentication complete, Welcome back '+ json.name +',<br/> <b>Please wait.</b>');
							 require(['modules/userlog_module'], function(UserlogModule){
							     UserlogModule.saveDB('System logged in..');
							 });
							 setTimeout(function() {
							 	 window.location = '.';
							 }, 1000);
							 
						</script>
					<?php
				}else {	
					?>
						<div class="alert alert-danger">
							<a class="close" data-dismiss="alert">&times;</a>
							<strong>Incorrect</strong> Username or Password.
						</div>
					<?php
				}
				
			}
			
		}
	}
?>