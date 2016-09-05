define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/decommission/temp_modal_decommission_tool.html'
	],  function(_, Backbone, template) {
   
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
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    $('#modalDecommissionTool').modal('show');
                    require(['libs/jquery-ui/jquery-ui.min','moment'], function(jQueryUi, moment){
                        $('#div-modalDecommissionTool').draggable({cursor: 'move'});
                        self.$el.find('#date').val(moment().format('dddd MMM DD, YYYY'));
                    });
                    setTimeout(function() {
                    	self.$el.find('#reason').focus();
                    }, 500)
                });

                $(function() {
                	self.$el.find('#form-decommission-tools').submit(function(event) {
                		event.preventDefault();
                		var form = $(this).serialize(), fn = require('modules/functions');

                		form += '&date=' + fn.getDate(); 
                		form += '&transactor=' + sessionStorage.getItem('name');
                		form += '&warehouse_code=' + sessionStorage.getItem('code');
                		form += '&table=decommission_forms';

                		require(['modules/collection_module','modules/decommissionform_module'], 
                			function(collectionModule, dfm){
	                		    collectionModule.saveDB(form, 'decommission_forms', dfm);
	                		    self.$el.find('#modalDecommissionTool').modal('hide');
                		});

                	});
                });

                $(function() {
                    self.$el.find('button#btnClose').click(function(event) {
                        decommission.clear();
                    });
                });
        	}
    
    });
   
    return Subview; 
});