<?php 
	if (isset($_POST)) {
		$keys  = array_keys($_POST);
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', $keys);
		if ($v->validate()) {
			echo true;
		}else {
		
			?>
				    <div class="alert alert-info alert-dismissable" style="text-align: left">
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