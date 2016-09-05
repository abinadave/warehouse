define(
	[
		'underscore',
		'backbone',
		'views/tool/repair/view_modal_form_repair_tool',
        'views/tool/repair/view_history_of_repaired_tools',
        'views/tool/repair/view_list_of_repair_forms'
	],  function(_, Backbone, ViewModalFormRepairTool, ViewHistoryOfRepairedTools, ViewListOfRepairForms) {
   
    var RepairFormModule = {

    	fetchData: function(){
            if (repair_forms.length) {
                RepairFormModule.populateAll();
            }else {
                $.getJSON('ajax/select/select_where.php', {table: 'repair_forms', code: sessionStorage.getItem('code') }, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    RepairFormModule.saveModel(json, 1).populateAll();
                });
            }
            return this;
        },

    	saveDB: function(form){
    		$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
                var json = $.parseJSON(data);
                var response = parseInt(json.id);
                if ($.isNumeric(response)) {
                    require(['modules/repairitem_module','modules/userlog_module'], function(RepairItemModule, UserlogModule){
                        RepairItemModule.saveDB(response);
                        UserlogModule.saveDB('New Tool Repair was added');
                    });
                    RepairFormModule.afterSaving(json);
                };
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

        saveModel: function(json, type){
            repair_forms.add(json, {silent: type});
            return this;
        },

        removeDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'repair_forms', id: i, prop: 'id' }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                repair_forms.remove(i);
                require(['modules/userlog_module'], function(UM){
                    UM.saveDB('Repair history successfully removed');
                });
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        afterSaving: function(json){
            repair_forms.add(json);
        },

        populateAll: function(){
            require(['modules/repairitem_module'], function(RepairItemModule){
                RepairItemModule.fetchData();
                RepairFormModule.appendListOfRepairForms().subscribe();
            });
        },

        sort: function(collection, Obscura){
            var proxy = new Obscura(collection);
            return proxy.setSort('date', 'desc');
        },

        subscribe: function(){
            /*
                pubnub.subscribe({
                    channel: 'repair_forms',
                    message: function(m){
                        var model = m.model;

                            if (m.type == 'add') {
                                console.log('adding')
                                
                                if (model.warehouse_code == sessionStorage.getItem('code')) {
                                    repair_forms.add(model, {silent: true});
                                }
                               
                            }else if(m.type == 'remove') {
                                console.log('removing');
                                if (model.warehouse_code == sessionStorage.getItem('code')) {
                                    repair_forms.remove(model.id, {silent: true});
                                }
                            }
                            if (m.type  == 'add' || m.type == 'remove') {
                                RepairFormModule.appendListOfRepairForms();
                            }
                    }
                });
            */
        },

        search: function(value){
            var list = new Backbone.Collection();
            repair_forms.forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                    if (model.get(index).toLowerCase().indexOf(value) !== -1) {
                        list.add(model);
                    };
                });
            });
            return list;
        },






        //Subviews
        appendHistoryOfRepairtool: function(){
            var view = new ViewHistoryOfRepairedTools();
            view.render();
            return this;
        },

    	appendRepairForm: function(){
    		var view = new ViewModalFormRepairTool();
    		view.render();
    	},

        appendListOfRepairForms: function(){
            var view = new ViewListOfRepairForms({
                collection: repair_forms
            });
            view.render();
            return this;
        }
    }
   
    return RepairFormModule; 
});