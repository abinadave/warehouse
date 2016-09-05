define(
    [
      'underscore',
      'backbone'
    ], function(_, Backbone) {
   
    var Itemshelf_module = {
    	afterSave: function(json){
    		console.log(json);
    	},

    	populateAll: function(){
    		this.appendList(item_shelfs);
    	},

        callBackAutocomplete: function(value) {
            // var itemshelf = item_shelfs.findWhere({name: value});
            $('#hidden-shelf').val(value);
        },

    	appendList: function(list){
    		require(['views/product/attribute/view_list_of_item_shelfs'], function(Subview){
    		    var view = new Subview({
    		    	collection: list
    		    });
    		});
    	}
    }
   
    return Itemshelf_module; 
});