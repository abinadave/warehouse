define(
	[
		'underscore',
		'backbone',
		'views/tool/borrow/view_list_of_tools_tobe_returned'
	],  function(_, Backbone, ViewListOfToolsToBeReturned) {
   
    var BorrowedToolModule = {
    	
    	fetchData: function(){
    		if (borrowed_tools.length) {
    			BorrowedToolModule.populateAll();
                
    		}else {
    			$.getJSON('ajax/select/select_where.php', {table: 'borrowed_tools'},function(json, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(json){
    				BorrowedToolModule.saveModel(json, 1).populateAll();
    			});
    		}
    	},

    	saveDB: function(model){

    		var form = $.param(model);
    		var name = sessionStorage.getItem('name');
    		form += '&table=borrowed_tools';

    		$.post('ajax/save/save.php', form , function(data, textStatus, xhr) {
    		
	    	}).success(function(data){
	    		model.borrower = name;
	    		borrowed_tools.add(model);
	    		pawns.remove(model.id, {silent: true});
	    		pawns.afterAddAndRemove('none', 0);
	    		require(['modules/tool_module'], function(TM){
	    		    TM.removeDB(model.id);
	    		});
	    	}).fail(function(xhr){
	    		alert('error type: '+xhr.status);
	    	});

    	},

    	saveModel: function(json, type){
    		borrowed_tools.add(json, {silent: type});
    		return this;
    	},

        removeDB: function(tool){
           $.post('ajax/delete/delete.php', { table: 'borrowed_tools', id: tool.id, prop: 'id' }, function(data, textStatus, xhr) {
               /*optional stuff to do after success */
           }).success(function(data){
                BorrowedToolModule.saveReturnedToolToAvailableTool(tool);
           }).fail(function(xhr){
               alert('error type: '+xhr.status);
           });
           
           return this;
        },

        saveReturnedToolToAvailableTool: function(tool){
            //this is a call back from jQuery $.post()
            
            var form = $.param(tool);
            form += '&table=tools';
    
            $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                tools.add(tool);
                require(['modules/returnedtool_module','modules/functions','moment','models/returned_tool'], 
                    function(ReturnedToolModule, fn, moment, Returned_tool){
                    var date = new Date()

                    var returned = new Returned_tool({
                        tool_id: tool.tool_id,
                        date: fn.getDate(),
                        time: router.getCurrectHour(),
                        warehousemen: sessionStorage.getItem('name'),
                        table: 'returned_tools'
                    });

                    var formTool = $.param(returned.attributes);
                    ReturnedToolModule.saveDB(formTool, returned.attributes);
                    
                });
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },


    	populateAll: function(){
            this.subscribe();
            this.setNumOfBorrowedTool();
    	},

        subscribe: function(){
            // pubnub.subscribe({
            //     channel: 'borrowedtools',
            //     message: function(m){

            //         var model = m.model;
                    
            //         if (m.user != sessionStorage.getItem('uid')) {
            //             if (m.type == 'add') {
            //                 var rs = borrowed_tools.where({id: model.id});
            //                 if (!rs.length) {
            //                     if (model.warehouse_code == sessionStorage.getItem('code')) {
            //                         borrowed_tools.add(model);
            //                     }
            //                 }
            //             }else if(m.type == 'remove') {
            //                 if (model.warehouse_code == sessionStorage.getItem('code')) {
            //                     borrowed_tools.remove(model.id);
            //                 }
            //             }else if(m.type == 'change') {
            //                 if (model.warehouse_code == sessionStorage.getItem('code')) {
            //                     var thismodel = borrowed_tools.get(model.id);
            //                     thismodel.set(model)
            //                 }
            //             }
            //         }    
                    
            //     }
            // });
        },

        getNumOfBorrowedTool: function(code){
            var rs = borrowed_tools.where({warehouse_code: code});
            require(['modules/functions'], function(fn){
                fn.iosBadge(rs.length, 'ios', 20, 'no-of-borrowed-tools','top-left');
            });
           
            return rs.length;
        },  

        setNumOfBorrowedTool: function(){
            var num = this.getNumOfBorrowedTool(sessionStorage.getItem('code'));
            var $el = $('#num-of-borrowed-tools');
            if (num > 0) {
                $el.text(num);
            }else {
                $el.empty();
            }
            return this;       
        },




    	//Subviews
    	appendListOfToolsToBeReturned: function(){
    		var view = new ViewListOfToolsToBeReturned({
    			collection: borrower_forms
    		});
    		view.render();
    	},

        appendModalToolsToBeReturn: function(arguments) {
            require(['views/tool/returned/view_modal_tools_tobe_return'], function(SubviewModal){
                var view = new SubviewModal();
            });
        },

        appendReturnableTools: function(list) {
            require(['views/tool/returned/view_list_of_tools_tobe_return'], function(ListOfTools){
                var view = new ListOfTools({
                    collection: list
                });
            });
        }

        
    }
   
    return BorrowedToolModule; 
});