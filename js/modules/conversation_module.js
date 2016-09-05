define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Module = {

    	saveDB: function(form){
    		$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
    			var json = $.parseJSON(data);

                require(['modules/account_module','modules/conversation_module'], function(AM, CM){
                    AM.sendChatToChatMate(json.chat, json.receiver, json.time, json.id, json.file); 
                    CM.appendMyChat(json);     
                });          

                Module.saveModel(json, 0);

                if (json.file == 1) {
                    Module.renameFileShared(json);
                }

    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

        saveModel: function(json, type){
            conversations.add(json, {silent: type});
        },

    	fetchData: function(){
    		if (conversations.length) {
                // Module.fetchAll();
            } else{
                $.getJSON('ajax/select/select.php', {table: 'conversations'}, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    Module.saveModel(json, 1);
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            };
    	},

        fetchAll: function(){
            require([
                'modules/account_module',
                'modules/conversation_module',
                'modules/warehousemen_module',
                'modules/blockedconversation_module'
                ], 
                function(

                    AccountModule, 
                    ConversationModule, 
                    WarehousemenModule,
                    BCM
                    ){

                AccountModule.fetchData().subscribeMyChannel();
                ConversationModule.fetchData();
                WarehousemenModule.fetchData();
                BCM.fetch();
            });
        },

        scrollChatBox: function(){
            $('#div-chat-conversation').animate({ scrollTop: $('#div-chat-conversation')[0].scrollHeight}, 500);
            $('#input-chat').focus();
            return this;
        },

        fileSharing: function(){
            $(function(){
                    require(['libs/fileuploader/fileuploader','moment'], function(qqfile, moment){
                         new qq.FileUploader({
                            element: $('#attach-file')[0],
                            action: 'ajax/others/upload_file_sharing.php',
                            allowedExtensions: [],
                            sizeLimit: 100000000,
                            onComplete: function(id, filename, json){
                                Module.fileSharing();
                                var now = moment().format("YYYY-MM-DD HH:mm:ss");
                                var chatmate = $('#current-chat').val();
                                var obj = { table: 'conversations', user: sessionStorage.getItem('uid'), receiver: chatmate, name: sessionStorage.getItem('name'), chat: filename, time: now, file: 1 };
                                Module.saveDB(obj);
                               
                            },
                            onProgress: function(id, fileName, loaded, total){
                                console.log(loaded);
                                console.log(total);
                                console.log(fileName);
                            },
                        });
                    });
            });
        },

        afterAddChat: function(json) {
            $modal = $('#modalPanelChat');
            if (!$modal.length && json.receiver == sessionStorage.getItem('uid')) {
                var name = this.getSenderName(json.user);
                router.alertify_success(name.toUpperCase() + ' send you a message');
            };
        },

        getSenderName: function(i) {
            var rsWarehousemen = warehousemens.where({id: i});
            if (rsWarehousemen.length) {
                var model = warehousemens.get(i);
                return model.get('firstname');
            }else {
                var rsManager = accounts.where({id: i});
                if (rsManager.length) {
                    var model = accuonts.get(i);
                    return model.get('firstname');
                };
            }

        },

        renameFileShared: function(json2){
            $.post('ajax/others/rename_shared_file.php', json2 , function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                console.log(data);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        getExt: function(filename){
            var ext = filename.split('.').pop();
            if(ext == filename) return "";
            return ext;
        },




        //Subviews..

        appendListOfCOnversation: function(library){
            require(['views/conversation/view_list_of_conversation'], function(MainView){
                var view = new MainView({
                    collection: library
                });
                view.render();
            });
        },

        appendMyChat: function(model){
               
            require(['views/conversation/view_append_chat_left'], function(thisview){
                var view = new thisview({
                    collection: model 
                });
                view.render();
            });
        },

        appendReceivedMessage: function(model){
            require(['views/conversation/view_append_received_message'], function(thisvivew){
                var view = new thisvivew({
                    collection: model
                });
                view.render();
            });
        },


        //initialization of events

        initDownloadFile: function(){
            jQuery(document).ready(function($) {
                    $('#list-ofconversation').find('a').click(function(event) {
                        var str = this.id;
                        var res = str.split("-");
                        var ext = Module.getExt($(this).text());
                        var args = res[2] + '.' +ext;
                   
                        //var name = '../../' + 'fileSharing/download'+args;

                        var name = '../../filesharing/download'+args;

                        $.get("ajax/others/download.php", { filename : name }, function(data, textStatus, xhr) {
                            /*optional stuff to do after success */
                        }).success(function(data){
                            location.href = "ajax/others/download.php?filename="+name;
                        }).fail(function(xhr){
                            router.alertify_error('Connection error: '+xhr.status);
                        });

                        $.post('ajax/others/is_file.php', {file: name}, function(data, textStatus, xhr) {
                            /*optional stuff to do after success */
                        }).success(function(data){
                           var json = $.parseJSON(data);
                           if (!json.found) {
                                $.post('ajax/others/is_file.php', {file: 'filesharing/download'+args}, function(data, textStatus, xhr) {
                                    /*optional stuff to do after success */
                                }).success(function(data){
                                     var json = $.parseJSON(data);
                                     console.log(json);
                                }).fail(function(xhr){
                                    alert('error type: '+xhr.status);
                                });
                           }else {
                              console.log(json);
                           }
                        }).fail(function(xhr){
                            alert('error type: '+xhr.status);
                        });
                                    

                    });     
            });
        }

    }
   
    return Module; 
});