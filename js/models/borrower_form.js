define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Borrower_form = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		id: 0,
    		no: 0,
    		date: 'no date',
    		time: 'no time',
    		purpose: 'none',
    		borrowed_by: 'unknown name',
    		borrowed_by_position: 'unknown position',
    		issued_by: 'unknown name',
    		issued_by_position: 'unknown position',
    		noted_by: 'unknown name',
    		noted_by_position: 'uknown position'
    	}
    
    });
   
    return Borrower_form; 
});