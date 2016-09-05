define(['underscore','backbone'], function(_, Backbone) {
   
    var Module = {

        initAreaRowShelfAutocomplete: function(self){
                $(function() {
                    
                    //Auto completes..
                    self.$el.find('#prod-category').focus(function(event) {
                        var id = '#' + this.id;
                        require(['modules/functions','modules/tool_module'], function(fn, tm){
                            var value = fn.initAutocomplete(id, 'name','categories', tm);
                        });
                    });

                    self.$el.find('#prod-area').focus(function(event) {
                         var id = '#' + this.id;
                         require(['modules/functions','modules/itemarea_module'], function(fn, thismodule){
                            var value = fn.initAutocomplete(id, 'name','item_areas', thismodule);
                         });
                    });

                    self.$el.find('#prod-row').focus(function(event) {
                         var id = '#' + this.id;
                         require(['modules/functions','modules/itemrow_module'], function(fn, thismodule){
                            var value = fn.initAutocomplete(id, 'name','item_rows', thismodule);
                         });
                    });

                    self.$el.find('#prod-shelf').focus(function(event) {
                         var id = '#' + this.id;
                         require(['modules/functions','modules/itemshelf_module'], function(fn, thismodule){
                            var value = fn.initAutocomplete(id, 'name','item_shelfs', thismodule);
                         });
                    });                    

                });
        }
        
    }
   
    return Module; 
});