define(
	[
		'underscore',
		'backbone',
		'models/classification',
        'modules/classification_module'
	],  function(_, Backbone, Classification, ClassificationModule) {
   
    var Classifications = Backbone.Collection.extend({
        url: 'api.php/classification',
    	model: Classification,
    		
    	initialize: function(){
    		this.on('add', function(model){
                console.log('new classification was added');
    			ClassificationModule.appendListOfClassification().appendClassificationInModal();
                require(['libs/choosenJS/chosen.jquery.min'], function(){
                    $("#classificationmodal").trigger("chosen:updated");
                });
    		});
    		this.on('removed', function(model){
                console.log('new classification was added');
    			ClassificationModule.appendListOfClassification().appendClassificationInModal();
    		});

    	},
    
    	print: function(){
    		classifications.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Classifications; 
});