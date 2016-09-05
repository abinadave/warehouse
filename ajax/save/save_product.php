<?php 

	if (isset($_POST['prodName']) &&
		isset($_POST['prodCategory']) &&
		isset($_POST['prodArea']) &&
		isset($_POST['prodRow']) &&
		isset($_POST['reorderPoint']) &&
		isset($_POST['prodShelf']) &&
		isset($_POST['prodAddDesc']) &&
		isset($_POST['runningBal']) &&
		isset($_POST['unit'])) {
		# code...

		// echo "<pre>", print_r($_POST) ,"</pre>";
		$name = stripcslashes(trim($_POST['prodName']));
		$prodCategory = stripcslashes(trim($_POST['prodCategory']));
		$prodArea = stripcslashes(trim($_POST['prodArea']));
		$prodRow = stripcslashes(trim($_POST['prodRow']));
		$reorderPoint = stripcslashes(trim($_POST['reorderPoint']));
		$prodShelf = stripcslashes(trim($_POST['prodShelf']));
		$prodAddDesc = stripcslashes(trim($_POST['prodAddDesc']));
		$runningBal = stripcslashes(trim($_POST['runningBal']));
		$unit = stripcslashes(trim($_POST['unit']));

		if (empty($name) || empty($prodCategory) || empty($prodArea) || 
			empty($prodRow) || empty($prodRow) || empty($prodShelf) || 
			empty($unit)) {
			?>
				<span class="text-danger">Incomplete fields</span>
			<?php
		}else {
			include_once '../../class/class.products.php';
			$products = new Products();
			$id = $products->setName($name)
				->setCategory($prodCategory)
				->setArea(strtolower($prodArea))
				->setRow(strtolower($prodRow))
				->setShelf(strtolower($prodShelf))
				->setAddDesc($prodAddDesc)
				->setReOrderPoint($reorderPoint)
				->setRunningBal($runningBal)
				->setUnit($unit)
				->save();

			$json = array('id' => $id,
						  'name' => $name,
						  'category' => $prodCategory,
						  'area' => $prodArea,
						  'row' => $prodRow,
						  'shelf' => $prodShelf,
						  'add_desc' => $prodAddDesc,
						  'reorder_point' => $reorderPoint,
						  'running_bal' => $runningBal,
						  'unit' => $unit);
			?>
				<script type="text/javascript">
					var json = <?php echo json_encode($json) ?>;
					require(['modules/product_module','modules/userlog_module'], 
						function(module, UserlogModule){
					    module.insert(json, 0);
					    UserlogModule.saveDB('New Item was added with name of: '+json.name);
					});    
				</script>
			<?php
		}
	}

?>