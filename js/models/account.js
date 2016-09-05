define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Account = Backbone.Model.extend({
    	initialize: function(){
    		//console.log('Model account initialized');
            this.on('change', function(){
                console.log('Module Account changed');
                console.log(this.changedAttributes());
                require(['modules/account_module'], function(AccountModule){
                    AccountModule.appendListOfAccounts();
                });
            });
    	},

    	defaults: {
    		id: 0,
    		firstname: 'no firstname',
    		lastname: 'no lastname',
    		username: 'no username',
    		password: 'no password',
    		usertype: 0
    	}
    });
   
    return Account; 
});