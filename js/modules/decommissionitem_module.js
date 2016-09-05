define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Decommissionitem_module = {

    	afterSave: function(json){
    		var form = $.param(decommission.attributes);
            form += '&table=decommission_tools';
    		require(['modules/collection_module','modules/decommissiontool_module'], function(cm, dtm){
    		    cm.saveDB(form, 'decommission_tools', dtm);
    		});
    	},

        editStatus: function(res, thisid){
            $.post('ajax/update/update_status_item.php', {status: 1, decommission_id: res[1], tool_id: res[0] }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var item = decommission_items.findWhere({decommission_id: res[1], tool_id: res[0]});
                console.log(res);
                item.set({status: '1'});
                Decommissionitem_module.glyphiconCheck(thisid);
                console.log(data)
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        glyphiconCheck: function(thisid){
           $('#'+thisid).replaceWith('<i class="fa fa-check-circle fa-3x"></i>')
        },


        appendTableDecommissionItem: function(json){
            require(['views/tool/decommission/view_table_decommission_items'], function(Subview){
                var view = new Subview({model: json});
            });
        }

    }
   
    return Decommissionitem_module; 
});