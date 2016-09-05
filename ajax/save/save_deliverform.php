de<?php 
	if (isset($_POST)) {
		# code...
		#echo "<pre>", print_r($_POST) ,"</pre>";
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['to_person','to_person','delivered_by','delivered_by_position']);
		if ($v->validate()) {
			include_once '../../class/class.deliver_forms.php';
			$deliver = new Deliver_forms();
			$model = $deliver::save($_POST);
			echo $model['id'];

			if ($model['id'] > 0) { 

				$_POST['id'] = $model['id']; $_POST['no'] = $model['no']; $from = $model['location']; unset($_POST['code']); $_POST['from_location'] = $from;
					
					?>
						<script type="text/javascript">
							var json = <?php echo json_encode($_POST) ?>;

							require(
								[
								   'modules/deliverform_module',
								   'modules/deliveritem_module',
								   'modules/userlog_module'
								], function(DeliverFormModule, DeliverItemModule, UM){

							   		DeliverFormModule.saveModel(json, 0);
							   		DeliverItemModule.saveDB(json.id);
							   		UM.saveDB('New Deliver Receipt was added');
							});

							require(['libs/load_css/loadcss','libs/alertify/js/alertify.min','modules/deliverform_module'], 
			                    function(css, alertify, DeliverFormModule){	                   
			                       DeliverFormModule.checkPrint(json.id);             	                   
			                });

						</script>
					<?php
			}
		}else {

			?><div ><div class="alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><?php
				foreach ($v->errors() as $key => $errors) {
					foreach ($errors as $key => $value) {
						echo $value . "<br/>";
					}
				}
			?></div></div><?php
		}
	}
?>