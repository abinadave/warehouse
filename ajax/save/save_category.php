<?php 

	if (isset($_POST['catname'])) {

		$cname = stripcslashes(trim($_POST['catname']));
		if (empty($cname)) {
			# code...
			echo "Please enter category name";
			exit();
		}else {
			include_once '../../class/class.categories.php';
			$categories = new Categories();
			$result = $categories->setName($cname)->saveCategory();
			$json = array('id' => $result, 'name' => $cname);
			?>
				<script>
					var json = <?php echo json_encode($json) ?>;
					categories.insert(json, 0);
					$('#category-name').val('').end().focus();
				</script>
			<?php
		}

	}

?>