define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Transfer_item = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
                if (this.hasChanged('status')) {

                    var rs = transfered_tools.where({tool_id: this.get('tool_id')});

                    if (rs.length) {
                        var tool = transfered_tools.findWhere({tool_id: this.get('tool_id')});
                        var cm = require('modules/collection_module'),
                        ttm = require('modules/transferedtool_module');
                        ttm.removeDB(tool.get('id'), false);
                    }

                };
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Transfer_item; 
});