define(
	[
		'underscore',
		'backbone',
		'models/transfer'
	],  function(_, Backbone, Transfer) {
   
    var TransferModule = {

    	saveModel: function(model){
    		transfers.add(model);
    	}
    	
    }
   
    return TransferModule; 
});