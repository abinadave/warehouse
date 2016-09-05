define(['underscore','backbone','libs/backbone.obscura','modules/functions'], function(_, Backbone, Obscura, fn) {
   
    var Module = {

    	afterSave: function(json) {
            Module.deductItem(json);
    	},

        deductItem: function(json) {
            var model = products.get(json.stock_id);
            var newBal = parseFloat(model.get('running_bal'));
            $.post('ajax/update/update.php', {
                values: { running_bal: newBal },
                where: 'id',
                where_value: json.stock_id,
                table: 'products'                
            }, function(data, textStatus, xhr) {
                
            }).success(function(data){
                console.log(data);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            }); 
        },

    	populateAll: function(colmod) {
    		 // alert('borrower item')
    	},

    	getItems: function(i) {
    		var proxy = new Obscura(borrower_pitems);
    		return proxy.filterBy('borrower_id', {borrower_id: i});
    	},

        updateStatus: function(i, newVal) {
           var dateAndTime = fn.getDate();
           $.post('ajax/update/update.php', {
                values: { status: newVal, date_return: dateAndTime, time_return: router.getCurrectHour() },
                where: 'id',
                where_value: i,
                table: 'borrower_pitems'
           }, function(data, textStatus, xhr) {
               var borrower_pitem = borrower_pitems.get(i);
               borrower_pitem.set({status: newVal.toString(), date_return: dateAndTime });
               var $td = borrower_pitems.currentTd;
               $td.html('<i class="fa fa-check-circle fa-2x"></i>');
           }).success(function(data){
               console.log(data);
           }).fail(function(xhr){
               alert('error type: '+xhr.status);
           });
        },

    	appendDetailsReceipt: function(list, i) {
    		require(['modules/borroweritem_module'], function(BIM){
	    		BIM.appendListOfBorrowerItem(list);
	            var model = borrower_pforms.get(i);
	            var $modal = $('#modalBorrowerItems');

	            $.each(model.attributes, function(index, val) {  
	                 if (index == 'date') { 
	                    require(['moment'], function(moment){
	                        var dt = moment(val).format('dddd MMMM DD, YYYY');
	                        $modal.find('#'+index).text(dt);
	                    });
	                 }else {
	                    $modal.find('#'+index).text(val);
	                 }
	            });
            });
    	},

        appendModalReturnables: function(list) {
            require(['views/product/borrow/view_modal_returnable_item'], function(SubviewModal){
                var view = new SubviewModal();
            });
        },

        appendItems: function(list) {
            require(['views/product/borrow/view_list_of_borrower_pitems'], function(SubviewPitems){
                var view = new SubviewPitems({
                    collection: list
                });
            });
        }

    }
   
    return Module; 
});