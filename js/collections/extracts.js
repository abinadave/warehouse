define(
	[
		'underscore',
		'backbone',
		'models/extract'
	],  function(_, Backbone, Extract) {
   
    var Extracts = Backbone.Collection.extend({

    	model: Extract,

    	initialize: function(){
    		//console.log('Collection Extracts initialized');
    		this.on('add', function(model){
                this.afterAdd(model.attributes);
    		});

    		this.on('remove', function(model){
                console.log(model.attributes)
                this.afterRemove(model.attributes);
                require(['modules/extract_module'], function(ExtractModule){
                    ExtractModule.appendListOfPullouts();
                    if (extracts.length == 0) {
                        $('#modalPullOutList').modal('hide');
                    }
                });
    		});

            this.on('reset', function(model) {
                this.afterAdd(model);
            });
            
    	},

    	print: function(){
    		extracts.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},

        afterRemove: function(thismodel){
            var prod = products.get(thismodel.id);
            var prod_qty = prod.get('running_bal');
            var total = parseInt(prod_qty) + parseInt(thismodel.qty);
            prod.set({running_bal: total.toString()});
            $('#badge-withdraw').hide().text(extracts.length).fadeIn('400');
        },

        afterAdd: function(model){
            $('#badge-withdraw').hide().text(extracts.length).fadeIn('400');
        }


    });
   
    return Extracts; 
});