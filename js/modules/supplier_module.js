define(
	[
		'underscore',
		'backbone',
		'collections/mycollection',
	],  function(_, Backbone, MyCollection) {
   
    var Module = {

    	dir: 'views/supplier/',

    	fetchData: function(){
    		if (suppliers.length) {
    			Module.populateAll();
    		} else{
    			$.getJSON('ajax/select/select.php', {table: 'suppliers'}, function(json, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(json){
    				Module.saveModel(json, 1);
    				Module.populateAll();
    			}).fail(function(xhr){
    				alert('error type: '+xhr.status);
    			});
    		};
    		return this;
    	},

    	saveDB: function(form){
    		$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
    			var json = $.parseJSON(data);
    			Module.saveModel(json, 0);
    			var $form = $('#form-supplier');
    			require(['modules/userlog_module'], function(UM){
    			    UM.saveDB('New supplier was added: ' +$form.find('#name').val());
    			    $form[0].reset();
    				$form.focus();
    			});

    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

    	saveModel: function(json, type){
    		suppliers.add(json, {silent: type});
    	},

    	removeDB: function(i){
    		$.post('ajax/delete/delete.php', {table: 'suppliers', id: i, prop: 'id'}, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
    			suppliers.remove(i);
    			require(['modules/userlog_module'], function(UM){
    			    UM.saveDB('Supplier successfully removed');
    			});
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

    	updateDB: function(){

    	},

    	populateAll: function(){
            setTimeout(function() {
                Module.appendList();
            }, 500)
    	},

    	sort: function(collection, Obscura){
    		var proxy = new Obscura(collection);
    		return proxy.setSort('name', 'asc');
    	},

    	search: function(value){
    		var list = new MyCollection();
    		suppliers.forEach(function(model) {
    			$.each(model.attributes, function(index, val) {
    				if (model.get(index).toLowerCase().indexOf(value) !== -1) {
    					list.add(model);
    				}
    			});
    		});
    		return list;
    	},


    	appendTable: function(){
    		require([ Module.dir +'view_table_supplier'], function(Subview){
    		    var view = new Subview();
    		});
    		return this;
    	},

    	appendList: function(){
    		require([ Module.dir + 'view_list_of_suppliers'], function(Subview){
    		    var view = new Subview({
    		    	collection: suppliers
    		    });
    		});
    		return this;
    	},

        initAutocomplete: function(){
            require(['libs/jquery-ui/jquery-ui.min','css!libs/css/auto-complete-list',], function(css){
                var availableTags = suppliers.pluck('name');
                $( "#supplier" ).autocomplete({
                source: availableTags
                });
            });
            return this;
        }

    }
   
    return Module; 
});