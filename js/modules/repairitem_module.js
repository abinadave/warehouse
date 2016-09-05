define(
	[
		'underscore',
		'backbone',
		'models/repair_item',
        'libs/backbone.obscura'
	],  function(_, Backbone, Repair_item, Obscura) {
   
    var RepairItemModule = {

        fetchData: function(){
            if (repair_items.length) {
                RepairItemModule.populateAll();
            }else {
                $.getJSON('ajax/select/select.php', {table: 'repair_items'}, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    RepairItemModule.saveModel(json, 1).populateAll();
                });
            }
            return this;
        },

    	saveDB: function(rsp_id){
            var value = repair.attributes;
            var data = { repair_id: rsp_id, tool_id: value.tool_id, name: value.model, unit: value.unit, status: '0' };
            var form = $.param(data);
      
            form += '&table=repair_items';

            $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                
            }).success(function(data){
            	var json = $.parseJSON(data);
                var newJson = _.omit(json, 'id');
                router.alertify_success('Process completed');
                $('#modalRepairForm').modal('hide');
                RepairItemModule.callbackSaveDB(value, newJson);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        saveModel: function(json, type){
            repair_items.add(json, {silent: type});
            return this;
        },

        callbackSaveDB: function(value, json){
            repair_items.add(json);
            require(['modules/repairedtool_module'], function(RepairedToolModule){
                var form = $.param(value);
                form += '&table=repaired_tools';
                RepairedToolModule.saveDB(form, value.id);
            });
        },

        populateAll: function(){
            require(['modules/repairedtool_module'], function(RepairedToolModule){
                RepairedToolModule.fetchData();
                RepairItemModule.subscribe();
            });
        },

        subscribe: function(){  
            /*
                pubnub.subscribe({
                    channel: 'repair_items',
                    message: function(m){
                        var model = m.model;

                            if (m.type == 'add' && m.user != sessionStorage.getItem('uid')) {
                                repair_items.add(model, {silent: true});
                            }
                       
                    }
                });
            */
        },

        filterItems: function(filtername, col, condition){
            var proxy = new Obscura(col);
            return proxy.filterBy(filtername, condition);
        },

        editStatus: function(res, className){
            $.post('ajax/update/update_repairitem_status.php', {status: 1, repair_id: res[1], tool_id: res[0] }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var item = repair_items.findWhere({repair_id: res[1], tool_id: res[0]});
                item.set({status: '1'});
                RepairItemModule.glyphiconCheck(className);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        glyphiconCheck: function(className){
            $('.'+className).replaceWith('<span class="glyphicon glyphicon-ok"></span>');
        },


        appendItemToBeReturn: function(item){
            require(['views/tool/repair/view_repaired_tools_tobe_return'], function(Subview){
                var view = new Subview({
                    model: item
                });
            });
        }




    }
   
    return RepairItemModule; 
});