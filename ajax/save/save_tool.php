<?php 
	if (isset($_POST)) {
		# code...
		#echo "<pre>", print_r($_POST) ,"</pre>";
		$dir = '../../class/';
		include_once $dir . 'validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['model','size','unit','area_located','classification','shelf','row']);
		if ($v->validate()) {
			include_once $dir . 'medoo.php';
			$database = new Medoo();

			$last_user_id = $database->insert("tools", $_POST);

			if (is_numeric($last_user_id)) {

				//old format of tool-id
				// -- >$tool_id = $_POST['classification'] . '-' . $last_user_id;

				//new format of tool_id
				$formatted_value = sprintf("%05d", $last_user_id);
				$tool_id = 'TL-8' . $formatted_value;
				
					$database->update("tools", [
						"tool_id" => $tool_id,
						"rand" => ''
					], [
						"id" => $last_user_id
					]);

					
						$_POST['id'] = $last_user_id;
						$_POST['tool_id'] = $tool_id;
						$_POST['rand'] = '';
						
						?>
							<script type="text/javascript">
								var json = <?php echo json_encode($_POST) ?>;
								require(['modules/tool_module'], function(ToolModule){
								    ToolModule.saveModel(json, 0);
								});
							</script>
						<?php
				
			}


		}else {

			?><div class="alert alert-danger alert-dismissable" style="width: 400px; text-align: left; margin-top: 80px"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <?php

					foreach ($v->errors() as $key => $errors) {
						foreach ($errors as $key => $error) {
							echo $error . "<br/>";
						}
					}

			?></div> <?php

		}
	}
?>