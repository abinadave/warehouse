define(['underscore','backbone'], function(_, Backbone) {
   
    var Borrower_pitem = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	}
    
    });
   
    return Borrower_pitem; 
});