define(
	[
		'underscore',
		'backbone',
		'models/withdraw_form'
	],  function(_, Backbone, Withdraw_form) {
   
    var Withdraw_forms = Backbone.Collection.extend({

    	model: Withdraw_form,

    	initialize: function(){
    		this.on('all', function(model){
                this.refresh();
                console.log('all event triggered')
            });
    		this.on('add', function(model){
    			console.log('New Withdraw_forms was added');
                // pubnub.publish({channel: 'withdraw_forms', message: {model, type: 'add', m: sessionStorage.getItem('uid')}});
    		});
    		this.on('remove', function(model){
    			console.log('Withdraw_form successfully removed');
                // pubnub.publish({channel: 'withdraw_forms', message: {model, type: 'remove', m: sessionStorage.getItem('uid')}});
    		});
    	},

    	print: function(){
            withdraw_forms.forEach(function(model) {
                console.log(model.attributes); 
            });
    	},

        refresh: function(){
            require(['modules/withdrawform_module'], function(WFM){
                WFM.appendListOfWithdrawalForm();
            });
        }

    });
   
    return Withdraw_forms; 
});