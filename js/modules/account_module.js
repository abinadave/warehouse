define(
	[
		'underscore',
		'backbone',
		'models/account',
		'views/account/view_form_add_account',
    'views/account/view_table_account',
    'views/account/view_list_of_accounts'
	],  function(_, Backbone, Account, ViewFormAddAccount, ViewTableAccount, ViewListOfAccounts) {
   
    var AccountModule = {

            dir: 'views/account/',

    		    fetchData: function(){

                if (accounts.length) {
                   AccountModule.appendListOfAccounts();
                }else {
                    $.getJSON('ajax/select/get_accounts.php', function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                       AccountModule.saveModel(json, 1);
                       AccountModule.appendListOfAccounts();
                       AccountModule.populateAll();
                    });
                }
                return this;
            },

            fetchUserDetails: function(){
                if (sessionStorage.getItem('uid') > 0) {
                    
                }else {
                     $.getJSON('ajax/select/get_userdetails.php', function(json, textStatus, xhr) {
                     /*optional stuff to do after success */
                     }).success(function(json){
                        // alert(json)
                         if(json.usertype === undefined)
                         {
                            json.usertype = "3";
                         }
                         session.set(json);
                    });
                }

            },

            saveDB: function(form){
                $.post('ajax/save/save_account.php', form, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    $('#output-save-account').html(data);
                }).success(function(data){
                    //console.log(data);
                });
            },

            saveModel: function(json, type){
                var account = new Account(json);
                accounts.add(json, {silent: type});

                if (type == 0) {
                    router.alertify_success('successfully added');
                    $('#form-add-account')[0].reset();
                    $('#form-add-account').find('#firstname').focus();
                }
            },

            updateDB: function(form){
                $.post('ajax/update/update_account.php', form, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    $('#output-update-account').html(data);
                }).success(function(data){
                    console.log(data);
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            },

            print: function(){
                if (accounts.length) {
                    accounts.forEach(function(model) {
                        console.log(model.attributes); 
                    });
                };
            },

            editAccount: function(id){
               var account = accounts.get(id).toJSON();
               var $form = $('#form-add-account');
               $('#panel-account').find('#li-create').trigger('click');
               $.each(account, function(index, val) {
                    if(index == 'id') {
                       $('#hidden-id').val(val);
                    }else {
                       $('#'+index).val(val);
                    }
               });
               $('#password').val('');
               $form.find('#btnUpdateAccount').show(); 
            },

            deleteAccount: function(value){
                $.post('ajax/delete/delete_account.php',{ id: value }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    if (data) {
                        accounts.remove(value);
                    };
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            },

            getUsertypeName: function(type){
               if (type == 1) {
                 return 'admin';
               }else if(type == 2){
                 return 'manager';
               }else {
                 return 'warehousemen';
               }
            },

            getUsertype: function(type){
                if(type == 1){
                    return 'administrator';
                }else if(type == 2){
                    return 'manager';
                }else {
                    return 'warehousemen';
                }
            },

            populateAll: function(){
               this.fetchUserDetails();
            },

            subscribeChat: function(){
               /*
                pubnub.subscribe({
                    channel: "active_users",
                    message: function(m){
                      console.log(m)
                        if (m.uid !== sessionStorage.getItem('uid')) {
                           // AccountModule.getActiveUsers();
                           if (m.type == 'add') {
                               onlines.add({id: m.uid, name: m.name})
                           } else if(m.type == 'remove'){
                               onlines.remove(m.uid);
                           };
                        }
                    },
                   
                });
                */
            },

            setStatus: function(id, value){

                var obj = {status: 0};

                $.post('ajax/update/update.php', { table: 'accounts', values: obj , where: 'id', where_value: id }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    console.log(data);
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });

                $.post('ajax/update/update.php', { table: 'warehousemens', values: obj , where: 'id', where_value: id }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    console.log(data);
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
                
            },

            getActiveUsers: function(){
               $.post('ajax/select/select_all_where.php', {table: 'accounts', where: 'status', value: '1'}, function(data, textStatus, xhr) {
                 /*optional stuff to do after success */
               }).success(function(data){

                  var obj1 = $.parseJSON(data);
                  onlines.addId(obj1);

                   $.post('ajax/select/select_all_where.php', {table: 'warehousemens', where: 'status', value: '1'}, function(data, textStatus, xhr) {
                   /*optional stuff to do after success */
                   }).success(function(data){
                     var obj2 = $.parseJSON(data);
                     onlines.addId(obj2);
                   }).fail(function(xhr){
                     alert('error type: '+xhr.status);
                   });

               }).fail(function(xhr){
                 alert('error type: '+xhr.status);
               });
            },

            isOnline: function(i){
               var rs = onlines.where({id: i});
               if (rs.length) {
                   return true;
               }else {
                  return false;
               }
            },

            subscribeOneonOneChat: function(id){
                //  pubnub.subscribe({
                //     channel: "chat-"+id,
                //     message: function(m){
                //       console.log(m);
                //     },
                // });
            },

            subscribeMyChannel: function(){
                var thechannel = 'one_on_one_chat_'+sessionStorage.getItem('uid');
                // pubnub.subscribe({
                //     channel: thechannel,
                //     message: function(m){
                       
                //       conversations.add(m);
                //       if (m.user == $("#current-chat").val()) {
                //          require(['modules/conversation_module'], function(ConversationModule){
                //              ConversationModule.appendReceivedMessage(m);
                //          });
                //       }

                //       require(['modules/functions'], function(fn){
                //           fn.playSound('sb-admin2/less/sound');
                //       });

                //     }
                // }); 
            },

            sendChatToChatMate: function(value, chatmate, thetimestamp, response, file_type){
                require(['moment'], function(moment){
                    var now = moment().format("YYYY-MM-DD HH:mm:ss");
                      pubnub.publish({
                          channel: 'one_on_one_chat_'+chatmate,
                          message: {id: response, user: sessionStorage.getItem('uid'), receiver: chatmate, name: sessionStorage.getItem('name'), chat: value, time: now, file: file_type }
                      });
                });
            },

            ifTableExistSave: function(tb1, tb2){
               $.post('ajax/others/iftableexist.php', {table: tb1}, function(data, textStatus, xhr) {
                 /*optional stuff to do after success */
               }).success(function(data){
                var response = $.parseJSON(data);
                  if (response == "true") {
                    console.log('found');
                  } else{
                       $.post('ajax/others/iftableexist.php', {table: tb1}, function(data, textStatus, xhr) {
                         /*optional stuff to do after success */
                       }).success(function(data){
                        var response = $.parseJSON(data);
                          if (response == "true") {
                            console.log('found')
                          } else{
                            console.log('not found')
                          };
                       }).fail(function(xhr){
                         alert('error type: '+xhr.status);
                       });
                  };
               }).fail(function(xhr){
                 alert('error type: '+xhr.status);
               });
            },

            initFileUploaderAccountPhoto: function(){

                $(function(){
                    require(['libs/fileuploader/fileuploader'], function(){
                        new qq.FileUploader({
                            element: $('#account-photo')[0],
                            action: 'upload_account.php',
                            allowedExtensions: ['jpg','gif','jpeg','png'],
                            onComplete: function(id, filename, json){
                               $('#modalAccountImage').modal('hide');
                               AccountModule.initFileUploaderAccountPhoto();
                               AccountModule.renamePhoto(filename);
                               router.alertify_success('Image Successfully Uploaded');
                            }
                        });
                    });
                });

            },

            renamePhoto: function(a){
                if (sessionStorage.getItem('usertype') == 1 || sessionStorage.getItem('usertype') == 2) {
                   var person = accounts.get(sessionStorage.getItem('uid'));
                   $.post('ajax/others/rename_account_photo.php', { table: 'accounts', filename: a, values: person.attributes }, function(data, textStatus, xhr) {
                    }).success(function(data){
                        var json = $.parseJSON(data);
                        var person = accounts.get(json.id);
                        person.set({rand: json.rand});
                        sessionStorage.setItem('rand', json.rand);
                        $('#image-user').attr('src', 'images/account/'+ person.id +'-'+json.rand +'.jpg');
                       
                        require(['modules/userlog_module'], function(UserlogModule){
                            UserlogModule.saveDB('Administrator updated his/her profile picture');
                        });

                    }).fail(function(xhr){
                        alert('error type: '+xhr.status);
                    });
                } else if(sessionStorage.getItem('usertype') == 3){
                   var person = warehousemens.get(sessionStorage.getItem('uid'));
                   $.post('ajax/others/rename_account_photo.php', { table: 'warehousemens', filename: a, values: person.attributes }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    }).success(function(data){
                        var json = $.parseJSON(data);
                        var person = warehousemens.get(json.id);
                        person.set({rand: json.rand});
                        sessionStorage.setItem('rand', json.rand);
                        
                        $('#image-user').attr('src', 'images/account/'+ person.id +'-'+json.rand +'.jpg');
                        require(['modules/userlog_module'], function(UserlogModule){
                            UserlogModule.saveDB('user updated his/her profile picture');
                        });

                    }).fail(function(xhr){
                        alert('error type: '+xhr.status);
                    }); 
                }
            },

            accountDetails: function(i){
                var rs1 = accounts.where({id: i});
                if (rs1.length) {
                   var person = accounts.get(i);
                   return person.toJSON();
                } else{
                   var rs2 = warehousemens.where({id: i});
                   var person = warehousemens.get(i);
                   return person.toJSON();
                };
            },

            removeAttachedFiles: function(){
                $.post('ajax/others/remove_attached_directory.php', { uid: sessionStorage.getItem('uid') }, function(data, textStatus, xhr) {
                  /*optional stuff to do after success */
                }).success(function(data){
                  console.log(data);
                }).fail(function(xhr){
                  alert('error type: '+xhr.status);
                });
            },

            backupDB: function(tbl, filename){
                $.post('ajax/others/exportdb.php', { table: tbl, file: filename },function(data, textStatus, xhr) {
                  /*optional stuff to do after success */
                }).success(function(data){
                  console.log(data);
                }).fail(function(xhr){
                  alert('error type: '+xhr.status);
                });
            },

            importDB: function(){
                $.post('ajax/others/exportdb.php', { table: 'tools', file: 'tools123.sql' },function(data, textStatus, xhr) {
                  /*optional stuff to do after success */
                }).success(function(data){
                  console.log(data);
                }).fail(function(xhr){
                  alert('error type: '+xhr.status);
                });
            },

            checkSession: function() {
                if ($.isEmptyObject(sessionStorage)) {
                    AccountModule.reloadSessionStorage();
                };
            },

            reloadSessionStorage: function(arguments) {
                $.post('ajax/others/getSessions.php', function(data, textStatus, xhr) {
                  /*optional stuff to do after success */
                }).success(function(data){
                    var json = $.parseJSON(data);
                    $.each(json, function(index, val) {
                       sessionStorage.setItem(index, val);
                    });
                }).fail(function(xhr){
                  console.log('error type: '+xhr.status);
                });
            },



            //===================================
            //SUBVIEWS--

            appendFormAddAccount: function(){
        			var view = new ViewFormAddAccount();
        			view.render();
    		    },

            appendTableAccount: function(){
               var view = new ViewTableAccount();
               view.render();
            },

            appendListOfAccounts: function(){
                var view = new ViewListOfAccounts({
                    collection: accounts
                });
                view.render();
            },

            appendListOfOnlineUsers: function(){
               require(['views/account/view_list_of_online_users'], function(thisview){
                   var view = new thisview({
                      collection: onlines
                   });
                   view.render();
               });
            },

            appendModalUpdateAccountImage: function(){
                require([this.dir +'view_modal_upload_account_image'], function(thisview){
                    var view = new thisview();
                });
            },

            appendModalMailForm: function(){
                require(['views/mail/view_mail_form'], function(Subview){
                    var view = new Subview();
                });
            },

            appendModalEditSetting: function() {
                require(['views/account/setting/view_modal_account_setting'], function(SubviewModal){
                    var view = new SubviewModal();
                });
            }



    }
   
    return AccountModule; 
});