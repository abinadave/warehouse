define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_list_of_online_users.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfOnlineUsers = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-online-users',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/account_module'], function(AccountModule){
                    self.$el.off();
                    self.$el.empty();
                    var output = self.template({'library': self.collection.toJSON(), 'model1': accounts.toJSON(), 'model2': warehousemens.toJSON(), 'AM': AccountModule });
                    self.$el.append(output);
                    self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
                var self = this;
                $(function(){
                    //jQuery

                        self.$el.find('a').click(function(event) {
                            self.$el.find('a').removeClass('active');
                            $(this).addClass('active');
                            var str = this.id;
                            var res = str.split('-');
                            var id = res[1];

                            require(['modules/account_module','libs/backbone.obscura','collections/mycollection','modules/conversation_module'], 
                                function(AccountModule, Obscura, MyCollection, ConversationModule){
                                $('#current-chat').val(id);
                                var lists = new MyCollection();
                                var proxy1 = new Obscura(conversations);
                                var proxy2 = new Obscura(conversations);
                                var result = conversations.where({receiver: id});

                                proxy1.filterBy('chatmate', { receiver: id });
                                proxy2.filterBy('chatmate2', { user: id });

                                proxy1.forEach(function(model) {
                                   if (model.get('user') == sessionStorage.getItem('uid')) {
                                        lists.add(model);
                                   }
                                });

                                proxy2.forEach(function(model) {
                                    if (model.get('receiver') == sessionStorage.getItem('uid')) {
                                        lists.add(model);
                                   }
                                });

                                var proxy3 = new Obscura(lists);

                                proxy3.setSort('time','asc');

                                if (!proxy3.length) {
                                   var $el = $('#list-ofconversation');
                                   var span = '<div id="no-result-found"><i class="text-danger">No history was found</i></div>';
                                   $el.empty();
                                   $el.append(span);
                                } else{
                                    ConversationModule.appendListOfCOnversation(proxy3);
                                };

                            });

                            
                        });

                        setTimeout(function() {
                            self.$el.find('a#a-' + sessionStorage.getItem('uid')).hide();
                        }, 500)
                        
                });

                
        	}
    
    });
   
    return ViewListOfOnlineUsers; 
});