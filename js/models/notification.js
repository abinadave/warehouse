define(['underscore','backbone'], function(_, Backbone) {
   
    var Notification = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	}
    
    
    });
   
    return Notification; 
});