define(
    [
        'underscore',
        'backbone',
        'text!templates/category/temp_list_of_categories_in_modal.html'
    ],  function(_, Backbone, template) {
   
    var ViewListOfCategoriesInModal = Backbone.View.extend({
    
            initialize: function(){
               
            },
    
            tagName: 'select',
    
            el: '#prod-category',
    
            template: _.template(template),
    
            events: {
                // bound events
            },
    
            render: function(){
                var self = this;
                require(['libs/backbone.obscura'], function(Obscura){
                    self.$el.empty();
                    var sortedCollection = categories.sort(self.collection, Obscura);
                    var output = self.template({'library': sortedCollection.toJSON()});
                    self.$el.append(output);
                    self.init();
                    $('#default-value').text('select category').val('0');
                });
                return self;
            },
    
            init: function(){
                $(function(){
                    //jQuery
                    
                });
            }
    
    });
   
    return ViewListOfCategoriesInModal; 
});