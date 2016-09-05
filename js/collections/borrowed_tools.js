define(
	[
		'underscore',
		'backbone',
        'models/borrowed_tool'
	],  function(_, Backbone, Borrowed_tool) {
   
    var Borrowed_tools = Backbone.Collection.extend({
    
    	model: Borrowed_tool,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
                // pubnub.publish({channel: 'borrowedtools', message: {model, type: 'add', user: sessionStorage.getItem('uid')}});
                this.afterEvent();
    		});
    		this.on('remove', function(model){
    			router.alertify_success('Successfully Returned');
                // pubnub.publish({channel: 'borrowedtools', message: {model, type: 'remove', user: sessionStorage.getItem('uid')}});
                model.unset('borrower', {silent: true});
                var attributes = model.attributes;
                require(['modules/borrowedtool_module'], function(BTM){
                    BTM.removeDB(attributes).appendListOfToolsToBeReturned();
                    if (borrowed_tools.length == 0) {
                        $('#modalToolsToBeReturned').modal('hide');
                    };
                });

    		});

            this.on('all', function(){
                require(['modules/borrowedtool_module'], function(BTM){
                    BTM.setNumOfBorrowedTool();
                });
            });
    	},
    
    	print: function(){
    		borrowed_tools.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        afterEvent: function(){
            require(['modules/borrowedtool_module'], function(BTM){
                BTM.appendListOfToolsToBeReturned();
            });
        }
    
    });
   
    return Borrowed_tools; 
});