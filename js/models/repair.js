define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Repair = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                var attributes = this.attributes;
                var previous = this.previousAttributes();

                if (!$.isEmptyObject(previous)) {
                    tools.add(previous);
                    
                }else {
                    console.log('empty')
                }

               require(['modules/repair_module'], function(RepairModule){
                   RepairModule.afterAdding(attributes);
               });

    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Repair; 
});