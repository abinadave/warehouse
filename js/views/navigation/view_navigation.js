define(
    [
        'underscore',
        'backbone',
        'text!templates/navigation/temp_navigation.html'
    ],  function(_, Backbone, template) {
   
    var ViewNavigation = Backbone.View.extend({
    
            initialize: function(){
                //console.log('View initialized..');
            },
    
            tagName: 'div',
    
            el: '#navigation',
    
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
                $(function(){
                    //jQuery
                    
                });
            }
    
    });
   
    return ViewNavigation; 
});