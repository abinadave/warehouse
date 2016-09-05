define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_list_of_selected_carts.html',
        'modules/product_module'
	],  function(_, Backbone, template, ProdModule) {
   
    var ViewListOfSelectedCarts = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-selected-carts',
    
        	template: _.template(template),
    
            events: {
                // bound events
               
            },
    
        	render: function(){
                var self = this;
                self.$el.empty();
                var output = self.template({
                    'library': self.collection.toJSON(), 
                    'ProductModule': ProdModule
                });
                self.$el.append(output);
                self.init();
    	        return self;
        	},

        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('.edit-qty').dblclick(function(event) {
                        /* Act on the event */
                        var thistr = $(this);
                        var id = this.id;

                        var thiscart = carts.get(id);
                        var thisprod = products.get(id);

                        var total = parseInt(thisprod.get('running_bal')) - parseInt(thiscart.get('qty'));
                        thiscart.set('qty','0', {silent: true});
                        thisprod.set({running_bal: total});

                        var input = '<input id="input-qty" type="text" class="form-control" style="width: 100px; height:24px; text-align: center">';
                        
                        $(this).html(input);

                         $('#input-qty').mouseleave(function(event) {
                            /* Act on the event */
                            var value = $(this).val();
                            if ($.isNumeric(value) && value > 0) {
                                var cart = carts.get(id);
                                cart.set({qty: value.toString()})
                                $(this).hide().replaceWith(value).fadeIn('fast');
                            }else {
                                router.alertify_error('Invalid input')
                            }     
                         });

                    });
                });

              
        	}

           
    
    });
   
    return ViewListOfSelectedCarts; 
});