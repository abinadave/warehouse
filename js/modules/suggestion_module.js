define(['underscore','backbone'], function(_, Backbone) {
   
    var Module = {
    	getAllPosition: function() {
            return _.unique(
            	$.merge(
            		withdraw_forms.pluck('requested_by_position'), 
            		withdraw_forms.pluck('issued_by_position'))
            	);
    	},

    	getAllNames: function() {
    		return _.unique(
            	$.merge(
            		withdraw_forms.pluck('requested_by'), 
            		withdraw_forms.pluck('issued_by'))
            	);
    	}
    }
   
    return Module; 
});