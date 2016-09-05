<?php 
	if (isset($_POST['name']) &&
		isset($_POST['category']) &&
		isset($_POST['area']) &&
		isset($_POST['row']) &&
		isset($_POST['shelf']) &&
		isset($_POST['reorder_point']) &&
		isset($_POST['running_bal']) &&
		isset($_POST['unit']) &&
		isset($_POST['add_desc']) &&
		isset($_POST['pid'])) {

		# code...
		#echo "<pre>", print_r($_POST) ,"</pre>";

		$prodName = stripcslashes(trim($_POST['name']));
		$prodCategory = stripcslashes(trim($_POST['category']));
		$prodArea = stripcslashes(trim($_POST['area']));
		$prodRow = stripcslashes(trim($_POST['row']));
		$prodShelf = stripcslashes(trim($_POST['shelf']));
		$reorderPoint = stripcslashes(trim($_POST['reorder_point']));
		$runningBal = stripcslashes(trim($_POST['running_bal']));
		$unit = stripcslashes(trim($_POST['unit']));
		$prodAddDesc = stripcslashes(trim($_POST['add_desc']));
		$pid = stripcslashes(trim($_POST['pid']));


		if (empty($prodName) || empty($prodCategory) || empty($prodArea) ||
			empty($prodRow) || empty($unit) || empty($pid)) {
			// echo "Incomplete fields";
			echo "<pre>", print_r($_POST) ,"</pre>";
		}else {
			include_once '../../class/class.products.php';
			$Products = new Products();
			$result = $Products->setId($pid)
			->setName($prodName)
			->setCategory($prodCategory)
			->setArea($prodArea)
			->setRow($prodRow)
			->setShelf($prodShelf)
			->setAddDesc($prodAddDesc)
			->setReOrderPoint($reorderPoint)
			->setRunningBal($runningBal)
			->setUnit($unit)
			->update();
			
			if ($result) {
				# code...
				$json = array(
					'add_desc' => $prodAddDesc,
					'area' => $prodArea,
					'category' => $prodCategory,
					'id' => $pid,
					'name' => $prodName,
					'reorder_point' => $reorderPoint,
					'row' => $prodRow,
					'shelf' => $prodShelf,
					'running_bal' => $runningBal,
					'unit' => $unit
					);

					?>
						<script type="text/javascript">
							var json = <?php echo json_encode($json) ?>;
							require(['modules/product_module','modules/userlog_module'], function(module, UserlogModule){
							    module.updateModel(json);
							    UserlogModule.saveDB('Item updated with id of: '+json.id);
							});  
						</script>
					<?php

			}
		}


	}
?>