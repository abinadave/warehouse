define(
    [
        'underscore',
        'backbone',
        'text!templates/product/temp_list_of_products.html'
    ],  function(_, Backbone, template) {
   
    var ViewListOfProducts = Backbone.View.extend({
    
            initialize: function(){
                //console.log('View initialized..');
            },
    
            tagName: 'tbody',
    
            el: '#list-of-products',
    
            template: _.template(template),
    
            events: {
                // bound events
            },
    
            render: function(){
                var self = this;
                require(['modules/cart_module'], function(module){
                    self.$el.empty();
                    var output = self.template({
                        'library': self.collection.toJSON(),
                        'CartModule': module
                    });
                    self.$el.append(output);
                    var length = self.collection.length;
                    self.init(length);
                });
                
                return self;
            },
    
            init: function(length){
                var self = this, $panel = $('#panel-stock-cards');
                $(function() {
                  
                    $panel.find('#num-of-stocks').text(length);
                    
                    require(['modules/product_module'], function(module){
                        module.initJQueryClick().initPopoverImage();
                        if (Number(sessionStorage.getItem('usertype')) === 3) {
                            module.initEditableTable();
                        }
                    });
                   
                   if (length == 0) { 

                       if (sessionStorage.getItem('usertype') == 1) {
                          self.$el.html('<tr><td colspan="10">No item was found for all warehouse. </td></tr>');
                          // router.alertify_error('No Item/Stock card was found in all warehouse branches');
                       }else{
                          self.$el.html('<tr><td colspan="10">No item was found for this warehouse. </td></tr>');
                          // router.alertify_error('No Stock card was found for this warehouse');
                       }

                   }

                });

                

            }
    
    });
   
    return ViewListOfProducts; 
});