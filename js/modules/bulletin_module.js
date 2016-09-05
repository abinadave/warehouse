define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var module = {};

    _.extend(module, Backbone.Events);

    module.on('callbackAdd', function(json){
    	console.log(json);
    	console.log('add');
    });

    module.on('callbackRemove', function(json){
    	console.log(json);
    	console.log('remove');
    });

    module.on('appendCarousel', function(){
    	require(['views/bulletin/view_bulletin'], function(Bulletin){
    	    var view = new Bulletin();
    	});
    });
   
    return module; 
});