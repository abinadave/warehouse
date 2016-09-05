define(
	[
		'underscore',
		'backbone',
        'css!libs/css/portfolio-item',
		'text!templates/tool/temp_list_of_related_tools.html'
		
	],  function(_, Backbone, css, template, ts, popo) {
   
    var View = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-related-tools',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['modules/tool_module'], function(TM){
	                self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(), 'ToolModule': TM });
	                self.$el.append(output);
	                self.init();
                });
    	        return self;
        	},
    
        	init: function(){
                var self = this;
        		$(function() {
        			 self.$el.find('.my-popovers').mouseenter(function(event) {
                    	var id = this.id;
                    	var $el = $(this);
                    	// $(this).attr('data-content', 'bungaw')
                    	var tool = tools.get(id);
                    	var output = '';
                    	output += '<label>Model: &nbsp;</label>'+ tool.get('model')+'<br/>';
                    	output += '<label>Size: &nbsp;</label>'+ tool.get('size')+'<br/>';
                    	output += '<label>Unit: &nbsp;</label>'+ tool.get('unit')+'<br/>';
                    	output += '<label>Serial-no: &nbsp;</label>'+ tool.get('serial_no')+'<br/>';
                    	output += '<label>Located: &nbsp;</label>'+ tool.get('area_located')+'<br/>';
                    	output += '<label>Remarks: &nbsp;</label>'+ tool.get('remarks')+'<br/>';
                    	$(this).attr('data-content', output);
                    });
        		});

                $(function(){
                    //jQuery

                   

                    // require(['../bootstrap/js/transition','../bootstrap/js/popover'], function(){
                        

	                    var popover = self.$el.find('[data-toggle="popover"]').popover({
						    trigger : 'hover',  
						    placement : 'left',
						    html: 'true'
						});

						popover.on('show.bs.popover', function() {
							var i = this.id;
						    $.ajax({
						        //url to dynamic content, eg the PHP script that return an image
						        url : 'ajax/select/get_data_of_tools.php', 
						        data: { id: i },
						        success : function(html) {
						            popover.attr('data-content', html);
						        }
						    });
						});


					// });
                });
        	}
    
    });
   
    return View; 
});