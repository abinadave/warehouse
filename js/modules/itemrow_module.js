define(
    [
      'underscore',
      'backbone'
    ],function(_, Backbone) {
   
    var Itemrow_module = {
    	afterSave: function(json){
    		console.log(json);
    	},

    	populateAll: function(){
    		this.appendList(item_rows);
    	},

        callBackAutocomplete: function(value) {
            // var itemrow = item_rows.findWhere({name: value});
            $('#hidden-row').val(value);
        },


    	appendList: function(list){
    		require(['views/product/attribute/view_list_of_item_rows'], function(Subview){
    		    var view = new Subview({
    		    	collection: list
    		    });
    		});
    	}
    }
   
    return Itemrow_module; 
});