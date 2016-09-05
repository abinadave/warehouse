define(
	[
		'underscore',
		'backbone',
        'collections/mycollection'
	],  function(_, Backbone, MyCollection) {
   
    var Module = {

        fetch: function(){
            if (blocked_conversations.length) {

            } else{
                $.getJSON('ajax/select/select.php', {table: 'blocked_conversations'}, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    blocked_conversations.add(json, {silent: true});
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            };      
        },

    	saveDB: function(form){
    		$.post('ajax/save/block_conversation.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
    			var json = $.parseJSON(data);
                $('#list-ofconversation').empty();
                Module.afterSaving(json);
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

        afterSaving: function(json){
            console.log(json.type)
           if (json.type == 'save') {
              blocked_conversations.add(json);
           } else{
              var thismodel = blocked_conversations.findWhere({user: json.user, receiver: json.receiver});
              thismodel.set({start: json.start, end: json.end});
           };
        },

        filterBlockedChat: function(collection){
                var chatmate = $('#current-chat').val();
                var me = sessionStorage.getItem('uid');
                collection.forEach(function(model) {
                    console.log(model.attributes); 
                });
                var rs = blocked_conversations.where({user: me, receiver: chatmate});
                if (rs.length) {
                
                    var blocked = blocked_conversations.findWhere({user: me, receiver: chatmate});
                    var range = _.range( parseInt( blocked.get('start') ), parseInt( blocked.get('end') ) + 1);
                    var lists = new MyCollection();

                    collection.forEach(function(model) {
                       var rs = $.inArray(parseInt(model.id), range);
                       if(rs == -1) {
                          lists.add(model);
                       }
                    });

                    return lists;
                    
                }else {
                    return collection;
                }
         }

    }
   
    return Module; 
});