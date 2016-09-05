define(['underscore','backbone','moment','modules/functions'], function(_, Backbone, moment, fn) {
   
    var Module = {

    	afterSave: function(json) {
    		var loc = this.genereateId(json);
    		var zp = fn.zeroPad(json.id,5);
    		var id = loc + '-8' + moment().format('YY') + '-' + sessionStorage.getItem('code') + '-' + zp;
    		this.updateUniqueId(id, json);
            $('#badge-borrower').text('0');
    	},

    	updateUniqueId: function(uniqueId, json) {
    		$.post('ajax/update/update.php', { 
    			table: 'borrower_pforms',
    			values: { no: uniqueId },
    			where: 'id',
    			where_value: json.id
    		}, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
                json.no = uniqueId;
    			Module.afterUpdateNo(json, uniqueId);
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

    	afterUpdateNo: function(json, uniqueId) {
            var $modal = $('#modalFormBorrowerSlip');
            $modal.find('form')[0].reset();
            $modal.find('form').find('#purpose').val('').focus();
            $modal.modal('hide');
            router.alertify_success('Process completed');

            require(['modules/itemborrow_module','modules/borroweritem_module'], function(ibm, bim){
                ibm.saveItems(json, uniqueId);     
            });
    	},

    	genereateId: function(json) {
    		var code = sessionStorage.getItem('code');
    		return (warehouses.where({id: code}).length > 0) ? warehouses.get(code).get('receipt_loc') : 'unknown location';
    	},

    	populateAll: function(str_collection) {
    		Module.appendList(borrower_pforms);
    	},

        init: function(self) {
            $(function(){
                //jQuery
               self.$el.find('a').click(function(event) {
                   var res = this.id.split('-');
                   if (res[0] == 'print') {
                       var rs = borrower_pitems.where({borrower_id: res['1']});
                       if (rs.length) {
                            require(['modules/borroweritem_module','modules/borrowerpitem_module'], function(BIM, bpim){
                                var list = bpim.getItems(res[1]);
                                BIM.printableModalItems(res['1']);
                                bpim.appendDetailsReceipt(list, res[1]);
                            });
                       }else {
                            console.log(res['1']);
                       }
                   }else {
                        require(['modules/borrowerpitem_module',
                            'modules/borroweritem_module',
                            'modules/functions'], 
                            function(bpim, bim, fn){
                            var items = bpim.getItems(res[1]);
                            // /fn.appendView('views/tool/borrow/view_modal_return_tools');
                            // bim.appendReturnTools(items);
                            bpim.appendModalReturnables();
                            bpim.appendItems(items);

                        });
                   }
                   
               });
            });
        },

        appendList: function(list) {
            require(['views/tool/borrow/view_list_of_borrower_pforms'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        }



    }
   
    return Module; 
});