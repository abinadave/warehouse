define(
	[
		'underscore',
		'backbone',
	],  function(_, Backbone) {
   
    var RepairedToolModule = {

        fetchData: function(){
            if (repaired_tools.length) {
                RepairedToolModule.populateAll();
            }else {
                $.getJSON('ajax/select/select_where.php', {table: 'repaired_tools'}, function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    RepairedToolModule.saveModel(json, 1).populateAll();
                });
            }
        },

    	saveDB: function(form, rid){
    		$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
                var json = $.parseJSON(data);
    			RepairedToolModule.afterSaveDB(rid, json);
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

        saveModel: function(json, type){
            repaired_tools.add(json, {silent: type});
            return this;
        },

    	afterSaveDB: function(i, json){
            repaired_tools.add(repair.attributes);
            repair.clear({silent: true});
    		require(['modules/tool_module'], function(ToolModule){
    		    ToolModule.removeDB(i);
    		});
    	},

        afterRemoveModel: function(tool){
            require(['modules/tool_module'], function(ToolModule){
                var form = $.param(tool);
                form +='&table=tools';
                $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var obj = $.parseJSON(data);
                    tools.add(obj);

                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            });

            return this;
        },

        removeDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'repaired_tools', prop: 'id', id: i }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                repaired_tools.remove(i);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        populateAll: function(){
            //console.log('done fetching all repaired tool');
            this.setNumOfRepairedTool();
        },

        setNumOfRepairedTool: function(){
            var rs = repaired_tools.where({warehouse_code: sessionStorage.getItem('code')});
            var $el = $('#badge-repairedtol-nitifiation');
            if (rs.length) {
                $el.text(rs.length);
            } else{
                $el.empty();
            };
            return this;
        }




    }
   
    return RepairedToolModule; 
});