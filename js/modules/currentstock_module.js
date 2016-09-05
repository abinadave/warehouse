define(['underscore','backbone'], function(_, Backbone) {
   
    var Module = {
    	appendList: function(list) {
    		require(['views/warehouse/view_list_of_current_stocks'], function(SubviewList){
    		    var view = new SubviewList({
    		    	collection: list
    		    });
    		});
    	}
    };
   
    return Module; 
});