<?php 
	if (isset($_POST)) {
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['subject','message']);
		
		
		if ($v->validate()) {
			
			if (empty($_POST['recipient'])) {
				?>
					    <div class="alert alert-info alert-dismissable">
					        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
					        Please enter atleast one recipient.
					    </div>
				<?php
			}else {
				
				$email = split(",", $_POST['recipient']);
				$error = [];
				foreach ($email as $key => $value) {
					if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
					    array_push($error, "This ($value) email address is considered invalid.");
					}
				}

				if(count($error)){
					foreach ($error as $key => $value) {
						?>
						    <div class="alert alert-info alert-dismissable">
						        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							       <?php echo $value. "<br/>"; ?>
							    </div>
						<?php
					}
				}else {
					include_once '../../class/class.mailer.php';
					$mailer = new MailerClass();
					$rs = $mailer::send($email, $_POST['subject'], $_POST['message']);
					if ($rs) {
						?>
							<script type="text/javascript">
								router.alertify_success('Message has been sent!');
								$('#form-mail')[0].reset();
								$('#form-mail').find('input[name="recipient"]').focus();
								require(['modules/userlog_module'], function(UserlogModule){
								    UserlogModule.saveDB('New email has been sent');
								});
							</script>
						<?php
					}else {
						?>
							<script type="text/javascript">
								router.alertify_error('Message not sent, Try again later.');
							</script>
						<?php
					}
				}

				
			}
		}else {

			echo "<div class='alert alert-info alert-dismissable'>";
			echo '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
			
			foreach ($v->errors() as $key => $errors) {				
				foreach ($errors as $key => $error) {
					echo $error ."<br/>";
				}					
			}

			echo "</div>";

		}
		
	}
?>
