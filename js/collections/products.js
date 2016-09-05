define(
    [
        'underscore',
        'backbone',
        'models/product',
        'modules/product_module'
        //subviews --------
        

    ],  function(

        _, 
        Backbone, 
        Product, 
        ProductModule,
        
        ViewModalAddProduct,
        ViewListOfProducts,
        ViewModalUpdateProduct,
        ViewListOfProductsById,
        ViewListOfProductsInCart

    ){
   
    var Products = Backbone.Collection.extend({
        url: 'api.php/product',
        model: Product,

        initialize: function(){
            //console.log('model collection initialized');

            this.on('add', function(){
                console.log('new item was added');
                ProductModule.appendAllProducts();
            });

            this.on('remove', function(){
                console.log('item removed');
                ProductModule.appendAllProducts();
            });

        },

        print: function(){
            products.forEach(function(model) {
                console.log(model.attributes); 
            });
        },

        notify: function(id){
            router.navigate('products', true);
            setTimeout(function() {
                router.navigate('viewProductDetails/'+id, true);
            }, 300)
            
        }

    });
   
    return Products; 
});