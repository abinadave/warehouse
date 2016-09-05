define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Deliver_item = Backbone.Model.extend({

    	initialize: function(){
    		//console.log('Model Deliver_item initialized');
    		this.on('change', function(){
    			console.log(this.changedAttributes());
                if (this.hasChanged('status')) {
                    var model = this.attributes;
                    console.log(model);
                };
    		});
    	},

    	defaults: {
    		delivered_id: 0,
    		qty: 0,
    		remarks: 'no remarks',
    		item: 0,
            name: 'no name',
            unit: 'no unit'
    	}

    });
   
    return Deliver_item; 
});