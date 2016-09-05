define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_modal_tools_tobe_returned.html'
	],  function(_, Backbone, template) {
   
    var ViewModalToolsToBeReturned = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
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
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#modalToolsToBeReturned').modal('show');
                    require(['libs/jquery-ui/jquery-ui.min','modules/borrowedtool_module'], function(jqueryui, BTM){
                        $('#div-modalToolsToBeReturned').draggable({cursor: "move"});
                        BTM.appendListOfToolsToBeReturned();
                    });
                });

                $(function() {
                    var $tbody = $('#list-of-tools-tobe-returned');
                    $('#btnReturnTool').click(function(event) {
                        /* Act on the event */
                        var found = '';
                        $tbody.find('tr').each(function(index, el) {
                            if ($(this).hasClass('text-primary')) {
                                found = this.id;
                            };
                        });
                        if ($.isNumeric(parseInt(found))) {
                            require(
                                [
                                    'libs/load_css/loadcss',
                                    'libs/alertify/js/alertify.min',
                                    'modules/warehousemen_module'
                                ], 
                                function(css, alertify, WarehousemenModule){
                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                    alertify.confirm('Are you sure', function(e){
                                        if (e) {
                                            var rs = borrowed_tools.where({id: found});
                                            if (rs.length) {
                                                var model = borrowed_tools.get(found);
                                                borrowed_tools.remove(model.get('id'));
                                            };
                                        }else {
                                            console.log(e);
                                        }
                                    });
                            });
                        };
                    });
                });


                $(function() {
                    self.$el.find('th').addClass('text-center');
                });
        	}
    
    });
   
    return ViewModalToolsToBeReturned; 
});