define(
	[
		'underscore',
		'backbone',
        'views/withdraw/view_modal_input_withdraw',
        'views/withdraw/view_modal_pullout_list',
        'views/withdraw/view_list_of_pullouts'
	],  function(_, Backbone, ViewModalInputWithDraw, ViewPulloutList, ViewListOfPullouts) {
   
    var ExtractModule = {


    	saveModel: function(data){
            var result = extracts.where({id: data.id.toString()});
            if (result.length) {
                var thismodel = extracts.get(data.id.toString());
                var qty = thismodel.get('qty');
                var total = parseInt(qty) + parseInt(data.qty);
                thismodel.set({qty: total.toString(), remark: data.remark});
            }else{
                extracts.add(data);
            }

            this.deductQty(data);
    	},

    	removeModel: function(id){
            //remove a model
            extracts.remove(id);
    	},

        deductQty: function(data){
            var product = products.get(data.id);
            var prod_qty = product.get('running_bal');
            var total = parseInt(prod_qty) - parseInt(data.qty);
            
            if (total < 0) {
                router.alertify_error('Out of stocks');
            }else {
                product.set({running_bal: total.toString()});
                $('#modalInputQtypullout').modal('hide');
                $('#modalInputQtypullout').find('#form-input-withdraw')[0].reset();
            }
        },




        //subviews
        appendModalInputQtyPullout: function(){
            var view = new ViewModalInputWithDraw();
            view.render();
        },

        appendPulloutList: function(){
            var view = new ViewPulloutList();
            view.render();
        },

        appendListOfPullouts: function(){
            var view = new ViewListOfPullouts({
                collection: extracts
            });
            view.render();
        }


    }
   
    return ExtractModule; 
});