define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Repair_item = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());

                if (this.hasChanged('status')) {
                    var rs = repaired_tools.where({tool_id: this.get('tool_id')});
                    if (rs.length) {
                        var tool = repaired_tools.findWhere({tool_id: this.get('tool_id')});
                        require(['modules/repairedtool_module'], function(rtm){
                            rtm.removeDB(tool.get('id'));
                        });
                    }else{
                        //if repaired tool not found.
                    }
                }
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Repair_item; 
});