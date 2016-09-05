<?php 
	if (isset($_POST)) {
		#echo "<pre>", print_r($_POST) ,"</pre>";
		$model = $_POST['values'];
		$receive_form_id = $_POST['receive_form_id'];

		include_once '../../class/class.receive_items.php';
		$Receive_items = new Receive_items();
		$Receive_items->setId($receive_form_id)->setQty($model['qty'])->setRemarks($model['remarks'])->setItem($model['id'])->setName($model['name'])->setUnit($model['unit']);
		$result = $Receive_items::save();

		if ($result) {
			echo true;
		}
		
		$json = array(
				'receive_id' => $model['id'], 
			    'qty' => $model['qty'], 
			    'item' => $receive_form_id, 
			    'remarks' => $model['remarks'],
			    'name' => $model['name'],
			    'unit' => $model['unit']
		    );
		?>
			<script>
					var json = <?php echo json_encode($json) ?>;
					receive_items.add(json);
					var id = json.receive_id;
										
			</script>
		<?php
	}
?>