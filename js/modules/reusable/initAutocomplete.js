define([
        'underscore',
        'backbone',
        'libs/jquery-ui/jquery-ui.min',
        'css!libs/css/auto-complete-list'
        ], function(_, Backbone, css1, css2){
    return {
    	initAutocomplete: function(el, attr, collection){
    		 var availableTags = window[collection].pluck(attr);
                $(el).autocomplete({
                    source: availableTags,
                    change: function (event, ui) { 
                        return $(this).val();
                    }
                });
    	}
    }; 
});