define(['text!templates/product/attribute/temp_form_item_area.html'],
	function(template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#form-tool-area',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.hide().append(output).fadeIn('fast');
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('form').submit(function(event) {
                    	//saving process of stockcard area with date and the transactor..
                    	event.preventDefault();
                    	var form = $(this).serialize();

                    	require(['modules/functions', 'modules/collection_module', 'modules/itemarea_module','models/item_area'], 
                            function(fn, cm, thismodule, Item_area){

                        	    var model = new Item_area({
                                    name: self.$el.find('#name').val(),
                                    date: fn.getDate(),
                                    user: sessionStorage.getItem('name')
                                });

                                var isValid = model.isValid();

                                if (isValid) {

                                    var form = $.param(model.attributes);
                                    form += '&table=item_areas';

                                    require(['modules/collection_module','modules/itemarea_module'], function(cm, itemarea_module){
                                        cm.saveDB(form, 'item_areas', itemarea_module);
                                    });

                                    self.$el.find('form')[0].reset();
                                    self.$el.find('form input').focus();
                                }

                    	});

                    });
                });
        	}
    
    });
   
    return Subview; 
});