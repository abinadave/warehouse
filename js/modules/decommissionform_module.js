define(
	[
		'underscore',
		'backbone',
        'libs/backbone.obscura'
	],  function(_, Backbone, Obscura) {
   
    var Module = {

    	afterSave: function(json){
    		var obj = _.pick(decommission.attributes, 'tool_id','model','unit');
    		obj.decommission_id = json.id;
    		obj.status = 0;
    		obj.table = 'decommission_items';
    		require(['modules/collection_module','modules/decommissionitem_module'], function(cm, dim){
	    		var form = $.param(obj);
	    		cm.saveDB(form, 'decommission_items', dim);
    		});	
    	},

        populateAll: function(){
            Module.appendForms();
        },

        sortBy: function(attr, type, col){
            var proxy = new Obscura(col);
            return proxy.setSort(attr, type);
        },



        //Subviews..

        appendTableDecommissionReport: function(){
            require(['views/tool/decommission/view_table_decommissiontool_reports'], function(Subview){
                var view = new Subview();
            });
        },

        appendForms: function(){
            require(['views/tool/decommission/view_list_of_decommission_forms'], function(Subview){
                var view = new Subview({
                    collection: decommission_forms
                });
            });
        }



    }
   
    return Module; 
});