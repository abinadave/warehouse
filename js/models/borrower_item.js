define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Borrower_item = Backbone.Model.extend({

    	initialize: function(){
    		this.on('change', function(){

               if (this.hasChanged('status')) {
                  console.log('status has changed');
                  var bm = require('modules/borroweritem_module');
                  var btm = require('modules/borrowedtool_module');
                  bm.updateStatus(this.attributes);
                  btm.appendListOfToolsToBeReturned();
               }
               
    		});
    	}
    
    	
    });
   
    return Borrower_item; 
});