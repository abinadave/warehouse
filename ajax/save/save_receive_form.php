<?php
session_start(); 

	if (isset($_POST['cart_rr_no']) && isset($_POST['hour'])) {
		# code...
		#echo "<pre>", print_r($_POST ),"</pre>";

		$location = (!empty($_POST['location_receive_from'])) ? $_POST['location_receive_from'] : '';
		$supplier = (!empty($_POST['receive_form'])) ? $_POST['receive_form'] : '';
		$crm = stripcslashes(trim($_POST['cart_rr_no']));
		$received_by = $_SESSION['uid'];
		$hour = stripcslashes($_POST['hour']);
		$today = stripcslashes($_POST['date']);
		$verified_by = stripcslashes($_POST['verified_by']);
		$position = stripcslashes($_POST['verifier_position']);
		$code = $_SESSION['code'];
		$personReceivedFrom = $_POST['person_received_from'];
		
			$receive_form_file = '../../class/class.receive_forms.php';
			$receive_form_item = '../../class/class.receive_items.php';

			if (file_exists($receive_form_file)) {
				include_once $receive_form_file;

				if (class_exists('Receive_forms')) {
					$Receive_forms = new Receive_forms();
					$Receive_forms->setPersonReceivedForm($personReceivedFrom)->setLocation($location)->setSupplier($supplier)->setCrm($crm)->setRb($received_by)->setHour($hour)->setToday($today)->setVerifiedBy($verified_by)->setPosition($position)->setCode($code);
					$data = $Receive_forms::validate();
					if (is_array($data)) {
						
						echo $data['id'];

						$json = array(
							'id' => $data['id'], 
							'location_receive' => $location,
							'person_received_from' => $personReceivedFrom,
							'supplier_name' => $supplier,
							'crm_id' => $_POST['cart_rr_no'],
							'received_by' => $data['received_by'],
							'verified_by' => $verified_by,
							'position' => $position,
							'date' => $today,
							'time' => $hour,
							'code' => $code
						);

							?>
								<script>
										var json = <?php echo json_encode($json) ?>;
										require(
											[
												'modules/receiveform_module',
												'modules/receiveitem_module'
											], function(ReceiveFormModule, ReceiveItemModule){
										    ReceiveFormModule.saveModel(json, 0);
										});
								</script>
							<?php

					}
			   }


		    }
	}
?>