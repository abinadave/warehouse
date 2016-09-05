<?php 

	$path = 'images/tools/'. $_GET['qqfile'];

	$input = fopen("php://input", "r");
	$temp = tmpfile();
	$realSize = stream_copy_to_stream($input, $temp);
	fclose($input);

	$target = fopen($path, "w");
	fseek($temp, 0, SEEK_SET);
	stream_copy_to_stream($temp, $target);
	fclose($target);

	echo json_encode(array('success' => true));
	
?>
