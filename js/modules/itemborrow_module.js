define(['underscore','backbone'], function(_, Backbone) {
   
    var Module = {

    	afterAddRemove: function() {
    		$('#badge-borrower').text(item_borrows.length);
    	},

        saveItems: function(json, uniqueId) {
            var a = item_borrows.length; b = 0;
            borrower_pforms.stock_card = true;
            borrower_pforms.json = json;
            require(['modules/collection_module','modules/borrowerpitem_module','modules/borroweritem_module'], function(colmod, bpim, bim){
                item_borrows.forEach(function(model) {
                    var obj = _.omit(model.toJSON(), 'id');
                    obj.name = $.trim(model.get('name')),
                    obj.borrower_id = json.id;
                    obj.status = 0;
                    obj.stock_id = model.get('id');
                    obj.table = 'borrower_pitems';
                    colmod.saveDB($.param(obj), 'borrower_pitems', bpim);
                    ++b;
                    if (a == b) {
                          setTimeout(function() {
                             bim.appendModalBorrowerItem();
                        }, 1000);
                    };
                });
            });
        },

    	appendBorrowerForm: function() {
    		require(['views/product/borrow/view_modal_item_borrower_form'], function(SubviewModal){
    		    var view = new SubviewModal();
    		});
    	},

    	appendListOfItemBorrows: function(list) {
    		require(['views/product/borrow/view_list_of_item_borrows'], function(SubviewItemBorrow){
    		    var view = new SubviewItemBorrow({
    		    	collection: list
    		    });
    		});
    	}

    }
   
    return Module; 
});