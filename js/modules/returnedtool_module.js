define(
	[
		'underscore',
		'backbone',
		'models/returned_tool',
		'views/tool/returned/view_panel_returned_tools',
        'views/tool/returned/view_list_of_returned_tools'
	],  function(_, Backbone, Returned_tool, ViewPanelReturnedTool, ViewListOfReturnedTools) {
   
    var ReturnedToolModule = {

    	fetchData: function(){
            if (returned_tools.length) {
                ReturnedToolModule.appendListOfReturnedTools();
            }else {
        		$.getJSON('ajax/select/select.php', { table: 'returned_tools' }, function(json, textStatus, xhr) {
        			/*optional stuff to do after success */
        		}).success(function(json){
        			ReturnedToolModule.saveModel(json, 1);
                    ReturnedToolModule.appendListOfReturnedTools();
        		});
            }
    	},


    	saveDB: function(form, model){
            console.log(form);
            console.log('saving returned tools');
    		$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
                var json = $.parseJSON(data);
    			var rid = parseInt(json.id);
    			if ($.isNumeric(rid)) {
    				
    				var returned = new Returned_tool({
                        id: rid.toString(),
    					tool_id: model.tool_id,
    					date: model.date,
    					time: model.time,
    					warehousemen: model.warehousemen
                    });

                    returned_tools.add(returned);
                    
                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('tool: '+returned.get('tool_id') +' was returned');
                    });
    			}
    		}).fail(function(xhr){
    			console.log('error type: '+xhr.status);
    		});
    	},

    	saveModel: function(json, type){
    		returned_tools.add(json, {silent: true});
    	},



    	appendPanelReturnedTool: function(){
    		var view = new ViewPanelReturnedTool();
    		view.render();
    		return this;
    	},

        appendListOfReturnedTools: function(){
            var view = new ViewListOfReturnedTools({
                collection: returned_tools
            });
            view.render();
        }

    }
   
    return ReturnedToolModule; 
});