define(
	[
		'underscore',
		'backbone',
        'views/warehouse/view_table_warehousemens',
        'views/warehouse/view_list_of_warehousemens',
        'views/warehouse/view_form_edit_warehousemens'
	],  function(_, Backbone, ViewTableWarehouseMens, ViewListOfWarehouseMens, ViewFormEditWarehousemens) {
   
    var WarehousemenModule = {

    	fetchData: function(){
            if (warehousemens.length) {
                 WarehousemenModule.populateAll();
            }else {
                $.getJSON('ajax/select/get_warehousemens.php', function(json, textStatus, xhr) {
                /*optional stuff to do after success */
                   
                }).success(function(json){
                    WarehousemenModule.saveModel(json, 1);
                    WarehousemenModule.populateAll();
                });
            }
    		
    	},

    	saveDB: function(form){
            $.post('ajax/save/save_warehousemen.php', form, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
                $('#output-save-warehousemen').hide().html(data).fadeIn('fast');
            }).success(function(data){
               
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

    	saveModel: function(json, type){
    		warehousemens.add(json, {silent: type});
            if (type == 0) {
                $('#form-add-warehousemen')[0].reset();
                $('#form-add-warehousemen').find('#firstname').focus();
                router.alertify_success('Successfully added');
            }
    	},

        removeDB: function(value){
            $.post('ajax/delete/delete_warehousemen.php', { id: value }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                   warehousemens.remove(value);
                
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        updateDB: function(form){
            $.post('ajax/update/update_warehousemen.php', form, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
                $('#output-edit-warehousemen').hide().html(data).fadeIn('fast');
            }).success(function(data){
                //console.log(data);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        populateAll: function(){
           // console.log('warehousemen ok')
            require(['modules/warehouse_module','modules/withdrawform_module'], function(module, WithDrawFormModule){
                module.fetchData();
                WithDrawFormModule.appendListOfWithdrawalForm();
            });
        },

        updateModel: function(json){
            var men = warehousemens.get(json.id);
            men.set(json);
            router.alertify_success('Successfully updated');
        },

        getAllWarehousemenWithCodeOf: function(value){
                var MyCollection = Backbone.Collection.extend({});
                var myCollection = new MyCollection();

                warehousemens.forEach(function(model) {
                    if (model.get('code') == value) {
                        myCollection.add(model.attributes);
                    };
                });
               
                return myCollection;
        },

        afterRemoved: function(value){
            var myCollection = this.getAllWarehousemenWithCodeOf(value);
            this.appendListOfWarehouseMens(myCollection);                   
        },

        afterChangedCode: function(prevcode){
            var myCollection = this.getAllWarehousemenWithCodeOf(prevcode);
             this.appendListOfWarehouseMens(myCollection);     
        },

        getNumOfWorkers: function(loc_code){
            var result = warehousemens.where({code: loc_code.toString()});
            return result.length;
        },

        getWarehousemenName: function(rid){
            var result = warehousemens.where({id: rid});
            if (result.length) {
                var thismodel = warehousemens.get(rid);
                return thismodel.get('firstname') + ' ' + thismodel.get('lastname');
            }else {
                return 'unknown name';
            }
        },

        getUsertype: function(value){
            if (value == 3) {
                return 'warehousemen';
            }else if(value == 2){
                return 'manager';
            }else if(value == 1){
                return 'administrator';
            }
        },




        //SUBVIEWS =================================================================================

        appendTableWarehouseMen: function(){
            var view = new ViewTableWarehouseMens();
            view.render();
        },

        appendListOfWarehouseMens: function(myCollection){
            var view = new ViewListOfWarehouseMens({
                collection: myCollection
            });
            view.render();
        },

        appendFormEditWarehousemen: function(){
            var view = new ViewFormEditWarehousemens();
            view.render();
        }

    }
   
    return WarehousemenModule; 
});