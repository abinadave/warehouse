define(['text!templates/product/attribute/temp_modal_item_setting.html'], 
	function(template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function(){
                    //jQuery..

                    self.$el.find('#modalItemSetting').modal('show');

                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        self.$el.find('#div-modalItemSetting').draggable({cursor: 'move'});
                    });

                    require(['modules/collection_module','modules/itemarea_module',
                              'modules/itemrow_module','modules/itemshelf_module'], 
                        function(cm, itemarea_module, itemrow_module, itemshelf_module){
                            cm.fetchData('item_areas', 'item_areas', itemarea_module);
                            cm.fetchData('item_rows', 'item_rows', itemrow_module);
                            cm.fetchData('item_shelfs', 'item_shelfs', itemshelf_module);
                    });

                    setTimeout(function() {
                    	require([
                            'views/product/attribute/view_form_item_area',
                            'views/product/attribute/view_form_item_row',
                            'views/product/attribute/view_form_item_shelf',
                            'views/category/view_table_category'
                            ], 
                            function(Subview1, Subview2, Subview3, SubCategory){
                        	    var view = new Subview1();
                                var view = new Subview2();
                                var view = new Subview3();
                                var subCat = new SubCategory();
                    	});
                    }, 500);

                });
        	}
    
    });
   
    return Subview; 
});