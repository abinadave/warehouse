define(['underscore','backbone','text!templates/tool/returned/temp_modal_tools_tobe_return.html'], 
	function(_, Backbone, template) {
   
    var ModalReturnableTols = Backbone.View.extend({
    
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
                    //jQuery
                    $('#modalToolsToBeReturn').modal('show');
                    if (borrowed_tools.length) {
                        require(['modules/borrowedtool_module'], function(btm){
                            btm.appendReturnableTools(borrowed_tools);
                        });
                    }else {
                       self.$el.find('#list-of-tools-tobe-return').html('<b class="text-danger">No borrowed tool was found in this warehouse.<b/>');
                    }
                });

                $(function() {
                    self.$el.find('#search').keyup(function(event) {
                        /* Act on the event */
                        var value = $(this).val();
                        require(['modules/collection_module'], function(cm){
                            var list = new Backbone.Collection();
                            borrowed_tools.forEach(function(model) {
                                $.each(model.attributes, function(index, val) {
                                    if (model.get(index).toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                                        list.add(model);
                                    };
                                });
                            });
                            require(['modules/borrowedtool_module'], function(btm){
                                btm.appendReturnableTools(list);
                            });
                        });
                    });
                });
        	}
    
    });
   
    return ModalReturnableTols; 
});