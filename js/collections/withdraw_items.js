define(
	[
		'underscore',
		'backbone',
		'models/withdraw_item'
	],  function(_, Backbone, Withdraw_item) {
   
    var Withdraw_items = Backbone.Collection.extend({

    	model: Withdraw_item,

    	initialize: function(){
    		//console.log('Collection Withdraw_items initialized');
    		this.on('add', function(model){
    			// pubnub.publish({channel: 'withdraw_items', message: {model, type: 'add', m: sessionStorage.getItem('uid')}});
    		});
            
    		this.on('remove', function(model){
    			console.log('Withdraw_item removed');
    		});
    	},

    	print: function() {
    		withdraw_items.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}

    });
   
    return Withdraw_items; 
});