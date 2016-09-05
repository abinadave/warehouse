define(
    [
      'underscore',
      'backbone'
    ],function(_, Backbone) {
   
    var Itemarea_module = {
    	afterSave: function(json){
    		console.log(json);
    	},

    	populateAll: function(){
    		this.appendList(item_areas);
    	},

        callBackAutocomplete: function(value) {
            // var itemarea = item_areas.findWhere({name: value});
            $('#hidden-area').val(value);
        },


    	appendList: function(list){
    		require(['views/product/attribute/view_list_of_item_areas'], function(Subview){
    		    var view = new Subview({
    		    	collection: list
    		    });
    		});
    	}
    }
   
    return Itemarea_module; 
});