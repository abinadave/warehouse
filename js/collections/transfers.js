define(
	[
		'underscore',
		'backbone',
		'models/transfer'
	],  function(_, Backbone, Transfer) {
   
    var Transfers = Backbone.Collection.extend({
    
    	model: Transfer,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
                this.afterAddOrRemove('add', model.attributes);
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
                this.afterAddOrRemove('remove', model.attributes);
    		});
    	},
    
    	print: function(){
    		transfers.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        afterAddOrRemove: function(type, tool){
           
            require(['modules/tool_module'], function(ToolModule){
                ToolModule.appendListOfTransfers();
                if (transfers.length == 0) {
                    $('#modalTransferFormSlip').modal('hide');
                };
            });

            if (transfers.length) {
                 $('a[href="#CheckOutTransferTools"]').find('span').text(transfers.length);
             }else {
                 $('a[href="#CheckOutTransferTools"]').find('span').text('');
             }

            //second process
            if (type == 'add') {
                tools.remove(tool.id);
            }else if(type == 'remove') {
                tools.add(tool);
            }
        }
    
    });
   
    return Transfers; 
});