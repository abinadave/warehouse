<?php  
	if (isset($_GET)) {
		include_once '../../../class/class.products.php';
		$products = new Products();
		$models = $products::get_products();
		
		foreach ($models as $key => $item) { ?>

				<h4 class="text-center">Stock Card</h4>
				<table class="table table-hover table-bordered table-condensed">
				    <tr>
				        <th width="130">Item</th><td width="600"><?php echo $item->name; ?></td>
				        <th width="130">Re-order Point</th><td width="600"><?php echo $item->reorder_point; ?></td>
				    </tr>
				    <tr>
				        <th width="150">Location</th><td><?php echo $item->area; ?></td>
				        <th width="150">Additional Description</th><td><?php echo $item->add_desc; ?></td>
				    </tr>
				</table>   

				  <table class="table table-hover table-bordered table-condensed tbl-w-r-report">
				     <thead>
				         <tr>
				            <th colspan="7" style="text-align: center">For Receiving</th>
				            <th colspan="6" style="text-align: center">For Issuance</th>
				         </tr>
				         <tr>
				            <th>Date</th>
				            <th>DR/Invoice</th>
				            <th>RR No.</th>
				            <th>Received by</th>
				            <th>Qty</th>
				            <th>Unit</th>
				            <th>Remarks</th>

				            <th>Date</th>
				            <th>WS No.</th>
				            <th>Issued To</th>
				            <th>Qty</th>
				            <th>Unit</th>
				            <th>Remarks</th>
				         </tr>
				     </thead>
				     <tbody>
				        <?php $reports = $products::getReceivingWithdrawal( $item->id); ?>

				        <p>total: <?php count($reports); ?></p>
				     </tbody>
				  </table>
			<?php
		}
	}
?>