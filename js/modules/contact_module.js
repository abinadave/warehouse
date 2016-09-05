define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var module = {
        sort: function(Obscura, collection){
            var proxy = new Obscura(collection);
            return proxy.setSort('date', 'desc');
        }
    }

    _.extend(module, Backbone.Events);
    
    module.dir = 'views/customer/contact/';

    //without return values ..

    module.on('showContactForm', function() {
    	require(['views/customer/contact/view_contact_form'], function(Subview){
    	    var view = new Subview();
    	});
    });

    module.on('fetchData', function(param) {
        if (sessionStorage.getItem('usertype') == 1) {
        	if (contacts.length) {
        		module.trigger('populateAll');
        	} else{
        		$.getJSON('ajax/select/select.php', {table: 'contacts'}, function(json, textStatus, xhr) {
        			/*optional stuff to do after success */
        		}).success(function(json){
        			module.trigger('saveModel', json, 1).trigger('populateAll');
        		}).fail(function(xhr){
        			alert('error type: '+xhr.status);
        		});
        	};
        }
    });

   
    module.on('saveModel', function(json, type) {
        contacts.add(json, {silent: type});
    });

    module.on('removeDB', function(param) {
        $.post('ajax/delete/delete.php', {table: 'contacts', id: param, prop: 'id' }, function(data, textStatus, xhr) {
            /*optional stuff to do after success */
        }).success(function(data){
            contacts.remove(param);
        }).fail(function(xhr){
            alert('error type: '+xhr.status);
        });
    });

    module.on('populateAll', function(param) {
        // setTimeout(function() {
        	module.trigger('appendList', contacts);
        // }, 500)
    });


    module.on('appendTable', function(param) {
        require([ module.dir +'view_table_contact'], function(Subview){
            var view = new Subview();
        });
    });

    module.on('appendList', function(list) {
        require([ module.dir +'view_list_of_contact'], function(Subview){
            var view = new Subview({collection: list});
        });
    });


    return module; 
});

    	