define(['underscore','backbone','text!templates/tool/temp_modal_add_initial_tool.html'], 
	function(_, Backbone, template) {
   
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
                    //jQuery
                    $('#modalAddInitialTool').modal('show');

                    self.$el.find('#search-classification').focus(function(event) {
                    	require(['modules/classification_module'], function(cm){
	                        cm.autocomplete('#search-classification');
	                    });
	                });

	                var ids = tools.pluck('id');
	                var max = (ids.length > 0) ? parseInt(_.max(ids)) + 1 : 1;
	                require(['modules/functions'], function(fn){
	                    var num = fn.zeroPad(max, 5);
	                    self.$el.find('#tool-id').val('TL-'+num);
	                });

                });

                 $(function() {
                    require(['modules/initialization_module'], function(im){
                        im.initAreaRowShelfAutocomplete(self);
                    });
                 });

                 $(function() {
                    setTimeout(function() {
                        $(function() {
                            require(['modules/unit_module'], function(UnitModule){
                                UnitModule.trigger('initAutoComplete', '.unit-autocomplete');
                                $('.unit-autocomplete').css('height', '33px');
                            });
                        });
                    }, 500)
                });

                 $(function() {
                 	self.$el.find('#form-add-initial-tool').submit(function(event) {
                 		event.preventDefault();
                 		var form = $(this).serialize();
                 		form +='&table=tools';
                 		require(['modules/functions','models/tool','modules/tool_module'], function(fn, Tool, tm){
                 		    
                 		    var obj = fn.clearObject(form);
                 		    var classVal = $('#search-classification').val().toUpperCase();
                 		    
                 		    var rsClassification = classifications.where({name: classVal});
                 		    if(rsClassification.length){

                 		    	var classification = classifications.findWhere({name: classVal});
                 		    	obj.classification = parseInt(classification.get('id'));
                 		    	obj.warehouse_code = sessionStorage.getItem('code');
                 		    	var tool = new Tool(obj);
                 		        
	                 		    if (tool.isValid()) {
	                 		    	// form+='&warehouse_code='+sessionStorage.getItem('code');
	                 		    	tm.initialSave($.param(tool.attributes));
	                 		    	// console.log(tool.attributes);
	                 		    };
                 		    }
                 		    
                 		});
                 	});
                 });
				
				 // $(document).ready(function() {
				 // 	 self.$el.find('#search-classification').keyup(function(event) {
				 // 	 	console.log(1);
				 // 	 });
				 // });

                 $(function() {
                 	self.$el.find('#tool-id').change(function(event) {
                 		var value = $(this).val();
                 		console.log(value);
                 		var rs = tools.where({tool_id: value});
                 		if(rs.length){
                 			router.alertify_error('Tool ID: '+value+' already exist');
                 		}
                 	});
                 });

        	}
    
    });
   
    return Subview; 
});