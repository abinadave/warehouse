define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Decommission_item = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
                if (this.hasChanged('status')) {
                   
                    var rs = decommission_tools.where({tool_id: this.get('tool_id')});
                    if (rs.length) {
                        var tool = decommission_tools.findWhere({tool_id: this.get('tool_id')});
                        require(['modules/collection_module','modules/decommissiontool_module'], function(cm, thismodule){
                            thismodule.removeDB(tool.get('id'), 'id');
                        });
                    }else{
                        //if repaired tool not found.
                    }
                };
    		});
    	}
    
    });
   
    return Decommission_item; 
});