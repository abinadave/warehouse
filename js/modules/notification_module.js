define(['underscore','backbone'], 
	function(_, Backbone) {
   
    var Module = {
    	//Notification module
    	//submethod follows..
    	populateAll: function(){
    		this.appendList(notifications);
    	},



    	//subviews..
    	appendList: function(list){
            setTimeout(function() {
                require(['views/notification/view_list_of_notifications'], function(Subview){
                    var view = new Subview({
                        collection: list
                    });
                });
            }, 1000);
    	},

        subscribe: function(){
            /*
                pubnub.subscribe({
                    channel: 'notifications',
                    message: function(m){
                        var model = m.model;
                        if (m.sender != sessionStorage.getItem('uid')) {
                            if (m.type == 'add') {
                                var rs = notifications.where({id: model.id});
                                if (!rs.length) {
                                    if (model.warehouse_code == sessionStorage.get('code')) {
                                        notifications.add(model, {silent: true});
                                    }
                                }
                            }
                        };
                    }
                });
            */
        }



    }
   
    return Module; 
});