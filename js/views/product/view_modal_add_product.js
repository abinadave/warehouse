define(
    [
        'underscore',
        'backbone',
        'text!templates/product/temp_modal_add_product.html'
    ],  function(_, Backbone, template) {
   
    var ViewModalAddProduct = Backbone.View.extend({
    
            initialize: function(){
                //console.log('View initialized..');
            },
    
            tagName: 'div',
    
            el: '#modal-add-product',
    
            template: _.template(template),
    
            events: {
                // bound events 
            },
    
            render: function(){
                var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
                return self;
            },
    
            init: function(){
                var self = this;

                $(function() {
                    self.$el.find('#item-setting').click(function(event) {
                        require(['views/product/attribute/view_modal_item_setting'], function(Subview){
                            var view = new Subview();
                        });
                    });
                });
                
                $(function(){
                
                    //jQuery
                    $('#form-add-product').find('input[type="text"], select').css({
                        width: '300px',
                        margin: '5px'
                    }).end().find('label').addClass('text-info');

                    setTimeout(function(){
                        $('#prod-name').focus();
                    },1500);
                });
                

                $(function() {

                    $('#form-add-product').submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        
                        var form = $(this).serialize();
                        require(['modules/product_module'], function(module){
                            module.saveDB(form);
                            //  
                        });
                        var ids = products.pluck
                    });
                });

                $(function() {
                    require(['modules/initialization_module'], function(im){
                        im.initAreaRowShelfAutocomplete(self);
                    });
                });

                $(function() {
                    $('#chk-running-bal').change(function(event) {
                        var checked = $(this).is(':checked');
                        if (checked) {
                            $('#div-running-bal').fadeIn();
                        }else {
                            $('#div-running-bal').slideUp();
                        }
                    });
                });
                

                
            }
    
    });
   
    return ViewModalAddProduct; 
});