<?php 
	if (isset($_POST['linked_to']) && isset($_POST['requested_by']) &&
		isset($_POST['position']) && isset($_POST['date'])) {
		# code...
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['linked_to','position','requested_by','date']);
		if ($v->validate()) {
			include '../../class/class.withdraw_forms.php';
			$withdraw = new Withdraw_forms();
			$json = $withdraw::save($_POST);
			echo $json['id'];
			if ($json['id']) {
				?>
					<script type="text/javascript">
						var json = <?php echo json_encode($json) ?>;
						require(['modules/withdrawform_module'], function(module){
						    module.saveModel(json, 0);
						});
					</script>
				<?php
			}
		}else {
			?>
			    <div style="width: 400px; text-align: left" >
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
				</div>    
			<?php
		}
	}
?>