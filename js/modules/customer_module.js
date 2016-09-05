define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var module = {}

    _.extend(module, Backbone.Events);



    //photos ..




    //login..

    module.on('showLoginForm', function(param) {
       require(['views/customer/login/view_login'], function(Subview){
            var view = new Subview(); 
       });
    });


    return module; 
});

    	