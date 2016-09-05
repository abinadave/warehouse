define(['text!templates/product/attribute/temp_form_item_area.html'],
	function(template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#form-tool-shelf',
    
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

                    	require(['modules/functions', 'modules/collection_module', 'modules/itemshelf_module','models/item_shelf'], 
                            function(fn, cm, thismodule, Model){

                        	    var model = new Model({
                                    name: self.$el.find('#name').val(),
                                    date: fn.getDate(),
                                    user: sessionStorage.getItem('name')
                                });

                                var isValid = model.isValid();

                                if (isValid) {

                                    var form = $.param(model.attributes);
                                    form += '&table=item_shelfs';

                                    require(['modules/collection_module','modules/itemshelf_module'], function(cm, itemshelf_module){
                                        cm.saveDB(form, 'item_shelfs', itemshelf_module);
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