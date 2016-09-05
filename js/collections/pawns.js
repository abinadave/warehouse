define(
	[
		'underscore',
		'backbone',
		'models/pawn'
	],  function(_, Backbone, Pawn) {
   
    var Pawns = Backbone.Collection.extend({
    
    	model: Pawn,
    		
    	initialize: function(){
    		this.on('add', function(model){			
                this.afterAddAndRemove('add', model.attributes);
    		});
    		this.on('remove', function(model){
                this.afterAddAndRemove('remove', model.attributes);
    		});
    	},
    
    	print: function(){
    		pawns.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        afterAddAndRemove: function(type, tool){
            // first process
            
            require(['modules/tool_module'], function(ToolModule){
                ToolModule.appendListOfPawns();
                if (pawns.length == 0) {
                    $('#modalFormBorrowerSlip').modal('hide');
                };
            });

            //second process
            if (type == 'add') {
                tools.remove(tool.id);
            }else if(type == 'remove') {
                tools.add(tool);
            }

            if (pawns.length != 0) {
                $('a[href="#CheckOutBorrowTools"]').find('span').text(pawns.length);
            } else{
                $('a[href="#CheckOutBorrowTools"]').find('span').text('');
            };
        }


    
    });
   
    return Pawns; 
});