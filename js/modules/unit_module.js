define(
	[
		'underscore',
		'backbone',
        'collections/mycollection'
	],  function(_, Backbone, MyCollection) {
   
    var module = {}

    _.extend(module, Backbone.Events);

    module.on('fetchData', function(){
    	if (units.length) {
            setTimeout(function() {
               module.trigger('appendList', units);
            }, 500);
    	} else{
    		$.getJSON('ajax/select/select.php', {table: 'units'}, function(json, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(json){
    			module.trigger('saveModel', json, 1).trigger('populateAll');
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	};
    });

    module.on('saveModel', function(json, type){
    	units.add(json, {silent: type});
    });

    module.on('populateAll', function() {
    	module.trigger('appendList', units);
    });

    module.on('appendModal', function(param) {
        require(['views/unit/view_table_units'], function(Subview){
            var view = new Subview();
        });
    });

    module.on('appendList', function(param) {
        require(['views/unit/view_list_of_units'], function(Subview){
            var view = new Subview({
                collection: param
            });
        });
    });

    module.on('search', function(value) {
        var lists = new MyCollection();
        units.forEach(function(model) {
            if (model.get('name').indexOf(value) !== -1) {
                lists.add(model);
            }
        });
  
        (lists.length) ? this.trigger('appendList', lists) : $('#list-of-units').text('No data was found'); $('#num-of-units').text('0');

    });

    module.on('saveDB', function(param) {
        $.post('ajax/save/save.php', param, function(data, textStatus, xhr) {
            /*optional stuff to do after success */
        }).success(function(data){
            var json = $.parseJSON(data);
            module.trigger('saveModel', json, 0);
        }).fail(function(xhr){
            alert('error type: '+xhr.status);
        });
    });

    module.on('sort', function(collection, Obscura) {
        var proxy = new Obscura(collection);
        var lists = proxy.setSort('name', 'asc');
        return this.lists = lists;
    });

    module.on('removeDB', function(i) {
        $.post('ajax/delete/delete.php', {table: 'units', id: i, prop: 'id'}, function(data, textStatus, xhr) {
            /*optional stuff to do after success */
        }).success(function(data){
              units.remove(i);              
        }).fail(function(xhr){
            alert('error type: '+xhr.status);
        });
    });

    module.on('initAutoComplete', function(param) {
        console.log('autocomplete')
        require(['libs/jquery-ui/jquery-ui.min','css!libs/css/auto-complete-list',], function(css){
            var availableTags = units.pluck('name');
            $(param).autocomplete({
            source: availableTags
            });
        });
        return this;
    });


    return module;
});
