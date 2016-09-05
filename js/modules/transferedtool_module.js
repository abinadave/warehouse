define(
	[
		'underscore',
		'backbone',
        'views/tool/transfer/view_list_of_receive_transfer_tools',
        'libs/backbone.obscura'
	],  function(_, Backbone, ViewListOfTransferTools, Obscura) {
   
    var TransferedToolModule = {

        fetchData: function(){
            if (transfered_tools.length) {
                require(['modules/functions'], function(fn){
                    _.once(fn.getRows('transfered_tools', TransferedToolModule));
                });
            }else {
                $.getJSON('ajax/select/select.php', {table: 'transfered_tools'}, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    TransferedToolModule.saveModel(json, 1).populateAll();
                });
            }
        },

    	saveDB: function(model){
    		var form = $.param(model);
            console.log(form)
    		form += '&table=transfered_tools';
    		$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
    			transfered_tools.add(model);
	    		transfers.remove(model.id, {silent: true});
	    		transfers.afterAddOrRemove('none', 0);
	    		require(['modules/tool_module'], function(TM){
	    		    TM.removeDB(model.id);
                    TransferedToolModule.getNumberOfReceivableTools();
	    		});
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

        saveModel: function(json, type){
            transfered_tools.add(json, {silent: type});
            return this;
        },

        removeDB: function(found, type){
            $.post('ajax/delete/delete.php', { table: 'transfered_tools', prop: 'id', id: found }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                transfered_tools.remove(found, {silent: type});
                TransferedToolModule.getNumberOfReceivableTools();
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        search: function(id){
            transfered_tools.forEach(function(model) {
                console.log(model.attributes); 
            });
        },

        subscribe: function(){
            /*
            pubnub.subscribe({
                channel: 'transfered_tools',
                message: function(m){
                    var model = m.model;
                    if (m.type == 'add') {
                        var rs = transfered_tools.where({id: model.id});
                        if (!rs.length) {
                            transfered_tools.add(model);
                            TransferedToolModule.getNumberOfReceivableTools();
                            TransferedToolModule.afterReceive(model);
                        }
                    }else {
                        console.log(m.model);
                    }
                }
            });
            */
        },

        afterReceive: function(model){
            router.alertify_success('New pending tool');
        },

        sortReceivableTools: function(collection){
            var proxy = new Obscura(collection);
            return proxy.setSort('date', 'desc');
        },

        getNumberOfReceivableTools: function(warehouse){
            var proxy = new Obscura(transfered_tools);
            proxy.filterBy('warehouse_code', {warehouse_code: sessionStorage.getItem('code')});
            this.receivable_tools = proxy.length;
            require(['modules/functions'], function(fn){
                fn.iosBadge(proxy.length, 'ios', 20, 'num-of-receivable-tools','top-left');
                if (proxy.length) {
                    var ctr = 0;

                    notifications.forEach(function(model) {
                        if (model.get('message').indexOf('receivable items') !== -1) {
                            ++ctr;
                        };
                    });

                    if (ctr == 0) {
                        notifications.add({
                            message: 'receivable items: ' + proxy.length,
                            date: fn.getDate()
                        }, {silent: true});
                    };
                    
                };
                
            });
        },

        populateAll: function(){
            this.subscribe();
            this.displayTransferedTool();
            this.getNumberOfReceivableTools();
        },

        displayTransferedTool: function(){
            require(['libs/backbone.obscura','collections/mycollection'], function(emp, MyCollection){

                var rs = transfered_tools.where({warehouse_code: sessionStorage.getItem('code')});
               
                if (rs.length) {
                    var proxy = new emp(transfered_tools);
                    proxy.filterBy('warehouse code', {warehouse_code: sessionStorage.getItem('code')});
                    TransferedToolModule.appendListOfTransferedTools(proxy);
                 }else { 
                      $('#btnReceiveTool').hide();
                     $('#list-of-receive-transfered-tools').html('<tr class="text-danger" style="font-weight: bolder"><td colspan="8">No receiving tool was found.</td></tr>');
                }
                                
            });
            return this;
        },


        appendListOfTransferedTools: function(myCollection){
            var view = new ViewListOfTransferTools({
                collection: myCollection
            });
            view.render();
        },
    

        appendModalReceivableTools: function(){
            require(['views/tool/transfer/view_modal_receivable_tools'], function(Subview){
                var view = new Subview();
            });
            return this;
        }


   	}
   
    return TransferedToolModule; 
});