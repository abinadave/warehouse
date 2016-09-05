define(
	[
		'underscore',
		'backbone',
		'models/account',
        'modules/account_module',
	],  function(_, Backbone, Account, AccountModule) {
   
    var Accounts = Backbone.Collection.extend({

    	model: Account,
    	initialize: function(){
    		//console.log('Collection Accounts initialize');

    		this.on('add', function(model){
    			console.log('New Account was added');
                AccountModule.appendListOfAccounts();
    		});

    		this.on('remove', function(model){
    			console.log('Account successfully removed');
                AccountModule.appendListOfAccounts();
    		});

                
            require(['modules/account_module'], function(AM){
                        
                if (sessionStorage.getItem('uid') !== null) {
                    AM.getActiveUsers();
                }
                        
            });
                    
               
            
    	},

        print: function(){
            accounts.forEach(function(model) {
                console.log(model.attributes); 
            });
        },

        getSession: function() {
            $.post('ajax/others/get_session.php', function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                console.log(data);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        // checkSession: function() {
        //     if($.isNumeric(sessionStorage.getItem('usertype'))){
        //         $.post('ajax/others/check_session.php', function(data, textStatus, xhr) {
        //             /*optional stuff to do after success */
        //         }).success(function(data){
        //             var json = $.parseJSON(data);
        //             console.log(json);
        //         }).fail(function(xhr){
        //             console.log('cant check session this time: '+xhr.status);
        //         });
        //     }else {
        //         console.log('who are you ?');
        //     }
        // },

        // destroySession: function() {
        //     if($.isNumeric(sessionStorage.getItem('usertype'))){
        //         $.post('ajax/others/destroy_session.php', function(data, textStatus, xhr) {
        //             /*optional stuff to do after success */
        //         }).success(function(data){
        //             // var json = $.parseJSON(data);
        //             // console.log(json);
        //         }).fail(function(xhr){
        //             console.log('cant check session this time: '+xhr.status);
        //         });
        //     }else {
        //         console.log('who are you ?');
        //     }
        // }

    	
    });
   
    return Accounts; 
});