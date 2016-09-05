define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Decommission = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                var prev = this.previousAttributes();
                var current = this.changedAttributes();
                tools.remove(this.get('id'));
                if (!$.isEmptyObject(prev)) {
                    tools.add(this.previousAttributes());
                }
    		});

            this.on('clear', function(model){
                tools.add(model.attributes);
            });
    	}
    
    });
   
    return Decommission; 
});