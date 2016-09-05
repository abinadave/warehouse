define(
	[
		'underscore',
		'backbone',
        'models/tool',
        'collections/mycollection',
		'views/tool/available/view_modal_add_new_tool',
        'views/tool/available/view_list_of_tools',
        'views/tool/borrow/view_list_of_pawns',
        'views/tool/transfer/view_list_of_transfers',
        'views/tool/view_modal_upload_tool_photo',
        'views/tool/view_show_tool_image_and_details',
        'views/tool/view_update_tool_photo'
	],  function(
        _, 
        Backbone, 
        Tool,
        MyCollection, 
        ViewModalAddNewTool, 
        ViewListOfTools, 
        ViewListOfPawns,
        ViewListOfTransfers,
        ViewUploadToolPhoto,
        ViewToolImageDetails,
        ViewUpdateToolPhoto
    ) {
   
    var ToolModule = {

        lastInsertId: null,

        selectedWarehouse: 0,
        
    	fetchData: function(){
            
            if (tools.length) {
                ToolModule.populateAll();
            }else {
                $.getJSON('ajax/select/get_tools.php', { session: session.attributes }, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    ToolModule.saveModel(json, 1).populateAll();
                });
            }
    	},

    	saveDB: function(form){
            
            form +='&warehouse_code=' +sessionStorage.getItem('code');
            $.post('ajax/save/save_tool.php', form, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
                $('#output-save-tool').hide().html(data).fadeIn('fast');
            }).success(function(data){

                require(['modules/functions','modules/userlog_module'], function(Functions, UserlogModule){
                    var thetool = Functions.clearObject(form);
                    var activity = 'new tool was added --> ' + thetool.model;
                    UserlogModule.saveDB(activity);
                });
                
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
            
    	},

    	saveModel: function(json, type){
            tools.add(json, {silent: type});
            if (type == 0) {
                router.alertify_success('New tool was added.');
                $('#form-add-new-tool')[0].reset();
                $('#tempModalAddNewTool').modal('hide');

                setTimeout(function() {
                   ToolModule.appendModalUploadToolPhoto();
                }, 500);

                this.lastInsertId = json;
            }
            return this;
    	},

        searchModels: function(value){
            var myCollection = new MyCollection();
            tools.forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                     if (model.get(index).toLowerCase().indexOf(value) !== -1) {
                        myCollection.add(model);
                     }
                });
            });
            return myCollection;
        },

    	removeDB: function(i, type){
            $.post('ajax/delete/delete.php', { table: 'tools', id: i, prop: 'id' }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                if (parseInt(data) == 1) {
                    
                    if (type == true) {
                        ToolModule.removePic(i);
                        require(['modules/functions','modules/userlog_module'], function(Functions, UserlogModule){
                            var activity = 'tool was removed with an ID of: ' + i;
                            UserlogModule.saveDB(activity);
                        });
                    };
                    
                }       
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
    	},

        removePic: function(i){
            var tool = tools.get(i);
            var attr = tool.attributes;
            $.post('ajax/others/remove_image_tool.php', {values: attr}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(rsp){
                if ($.isNumeric(rsp)) {
                    ToolModule.removeModel(i);
                };
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

    	removeModel: function(id){
            tools.remove(id)
    	},

        updateTool: function(model, rid){
            $.post('ajax/update/update.php', { values: model, where: 'id', where_value: rid, table: 'tools' }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var tool = tools.get(rid);
                tool.set(model);
                router.alertify_success('Successfully updated');
                
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        subscribe: function(){
            /*
            pubnub.subscribe({
                channel: 'tools',
                message: function(m){
                    var model = m.model;
                    if (m.sender != sessionStorage.getItem('uid')) {
                        if (m.type == 'add') {
                            var rs = tools.where({id: model.id});
                            if (!rs.length) {
                                if (model.warehouse_code == sessionStorage.getItem('code')) {
                                    tools.add(model, {silent: true});
                                    ToolModule.appendListOfTools();
                                }
                            }
                        }else if(m.type == 'remove') {
                            if (model.warehouse_code == sessionStorage.getItem('code')) {
                                tools.remove(model.id, {silent: true});
                                ToolModule.appendListOfTools();
                            }
                        }else if(m.type == 'change') {
                            if (model.warehouse_code == sessionStorage.getItem('code')) {
                                console.log('model changed')
                                var tool = tools.get(model.id);
                                tool.set(model, {silent: true})
                                ToolModule.appendListOfTools();
                            }
                        }
                    };
                }
            });
            */
        },

        populateAll: function(){
           this.appendListOfTools();
           this.subscribe();
        },

        sortBy: function(attr, type, cols){
            require(['libs/backbone.obscura'], function(imp){
            var proxy = new imp(cols)

                proxy.setSort(attr, type);
                     
                var view = new ViewListOfTools({
                    collection: proxy
                });

                view.render();

                
            });
        },

        sortLists: function(Obscura, collection){
            var proxy = new Obscura(collection);
            proxy.setSort('model', 'asc');
            return proxy;
        },

        getTool: function(toolID){
            var result = tools.where({id: toolID});
            if (result.length) {
                var tool = tools.get(toolID);
                return tool.attributes;
            }else {
                return 'unknown unit';
            }
        },

        renameToolPhoto: function(filename){
            var json = this.lastInsertId;
            $.post('ajax/others/rename_tool_photo.php', { name: filename, values: json }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                if (data != '') {

                    var json = $.parseJSON(data);
                    var tool = tools.get(json.id);
                    tool.set({rand: json.rand});

                    router.alertify_success('Image successfully uploaded!');
                    $('#modalAddToolPhoto').modal('hide');
                };
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        renameAndDeleteToolPhoto: function(model, name){
            $.post('ajax/others/rename_and_delete_tool_photo.php', { values: model, filename: name }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                if (data != '') {   
                    var json = $.parseJSON(data);
                    var tool = tools.get(json.id);
                    tool.set({rand: json.rand});
                    $('#image-tool').attr('src', 'images/tools/'+ tool.id +'-'+json.rand +'.jpg')
                    $('#modalUpdateToolPhoto').modal('hide');
                    router.alertify_success('Photo successfully updated');
                };
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        setImageDetailsValues: function(tool){
            require(['modules/classification_module'], function(ClassificationModule){   
                $.each(tool, function(index, val) {
                    if (_.isEqual('classification',index)) {            
                        require(['modules/classification_module'], function(CM){
                            $('#update-classification').find('#'+tool.classification).prop('selected', true);
                        });
                    }else {
                        $('#'+index).val(val);
                    }    
                });
            });
        },

        getCurrentImageId: function(){
            var str = $('#tool_id').val();
            var res = str.split("-");
            return res[1];
        },

        getContents: function(){
            console.log('getting contents')
        },

        getToolWithLocationOf: function(code){
            //get tool with location(Warehouse code).
            var list = new Backbone.Collection();
            tools.forEach(function(model) {
                if (model.get('warehouse_code') == code) {
                    list.add(model);
                };
            });
            return list;
        },

        callBackAutocomplete: function(value){
            //this is a callback for creating a stock card.
            //autocompletion on category field..
            var cond = {name: value};
            var rs = categories.where(cond);
            if (rs.length) {
                var cat = categories.findWhere(cond);
                $('#modalAddProduct').find('input[name="prodCategory"]').val(cat.get('id'));
            };
        },

        initialSave: function(form) {
            var self = this;
            $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                  /*optional stuff to do after success */
              }).success(function(data){
                  var json = $.parseJSON(data);
                  tools.add(json);
                  self.afterInitialSave();
              }).fail(function(xhr){
                  alert('error type: '+xhr.status);
              });  
        },

        afterInitialSave: function() {
            $('#modalAddInitialTool').find('form')[0].reset();  
        },

        initReportPrintEvent: function(self, btnPrint, table, div_table, report_tite, header){
             self.$el.find(btnPrint).click(function(event) {
                        /* Act on the event */
                        $(table +' .remove-this').hide();

                         var $table = $(table);
                         $table.css({
                            fontSize: '8px'
                         });
                      
                    require(['libs/jquery.print','views/tool/view_header_print_tool_report'],
                         function(jqueryPrint, Subview){
                            // $('#header-report-placeholder').empty();

                            var view = new Subview({
                               el: header
                            });

                            $(header).append('<h4>'+report_tite+'</h4>');

                            setTimeout(function() {
                               $.print(div_table);
                               $(table +' .remove-this').show();
                               $(header).empty();
                               $(table).css({
                                   fontSize: '11px'
                               });
                            }, 1000);

                    });
            });
        },


    	//subviews
    	appendModalAddNewTool: function(){
    		var view = new ViewModalAddNewTool();
    		view.render();
    	},

        appendListOfTools: function(){
            var view = new ViewListOfTools({
                collection: tools
            });
            view.render();
        },

        appendListOfPawns: function(){
            var view = new ViewListOfPawns({
                collection: pawns
            });
            view.render();
        },

        appendListOfTransfers: function(){
            var view = new ViewListOfTransfers({
                collection: transfers
            });
            view.render();
        },

        appendModalUploadToolPhoto: function(){
            var view = new ViewUploadToolPhoto();
            view.render();
        },

        appendToolImageAndDetails: function(){
            var view = new ViewToolImageDetails();
            view.render();
        },

        appendModalUpdateToolPhoto: function(){
            var view = new ViewUpdateToolPhoto();
            view.render();
            return this;
        },

        appendToolHistory: function(){
            require(['views/tool/view_tool_history'], function(Subview){
                var view = new Subview();
            });
        },

        appendRelatedTools: function(){
            require(['views/tool/view_list_of_related_tools'], function(Subview){
                var view = new Subview({
                    collection: tools
                });
            });
        },

        appendToolReports: function(){
            require(['views/tool/view_tab_tool_reports'], function(Subview){
                var view = new Subview();
            });
        },

        appendModalInitialTool: function() {
            require(['views/tool/view_modal_add_initial_tool'], function(Subview){
                var view = new Subview();
            });
        },

        appendToolHistories: function() {
            require(['views/tool/history/view_modal_history_of_tool'], function(subviewTool){
                var view = new subviewTool();
            });
        },

        initFileUploaderToolPhoto: function(){
            $(function(){
                require(['libs/fileuploader/fileuploader'], function(){
                     new qq.FileUploader({
                        element: $('#upload-photo')[0],
                        action: 'upload.php',
                        allowedExtensions: ['jpg','gif','jpeg','png'],
                        onComplete: function(id, filename, json){
                            //employees.function.renamePhoto(filename, employees.empId, 'create');
                           ToolModule.initFileUploaderToolPhoto();
                           ToolModule.renameToolPhoto(filename);
                           console.log('uploaded !')
                        }
                    });
                });
            });
        },

        initFileUploaderUpdateToolPhoto: function(){

                $(function(){
                    require(['libs/fileuploader/fileuploader'], function(){
                         new qq.FileUploader({
                            element: $('#update-tool-photo')[0],
                            action: 'upload.php',
                            allowedExtensions: ['jpg','gif','jpeg','png'],
                            onComplete: function(id, filename, json){
                                ToolModule.initFileUploaderUpdateToolPhoto();
                                var id =  $('#modalUpdateToolPhoto').find('#hidden-id').val();
                                var tool = tools.get(id);  
                                ToolModule.renameAndDeleteToolPhoto(tool.attributes, filename);
                            }
                        });
                    });
                });

        }



    }
   
    return ToolModule; 
});

