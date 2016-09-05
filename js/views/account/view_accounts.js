define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_accounts.html'
	],  function(_, Backbone, template) {
   
    var ViewAccounts = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    $('#panel-account').find('#li-create').click(function(event) {
                        setTimeout(function(){
                            $('#form-add-account').find('#firstname').focus();
                        },500)
                    }).end().find('#li-records').click(function(event) {
                        console.log(2);
                    });

                     $('#panel-account').find('#li-records').click(function(event) {
                        $('#form-add-account')[0].reset();
                        $('#btnUpdateAccount').hide();
                    });
                });
        	}
    
    });
   
    return ViewAccounts; 
});