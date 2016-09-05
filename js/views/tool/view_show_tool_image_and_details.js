define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/temp_show_tool_image_and_details.html'

	],  function(_, Backbone, template) {
   
    var ViewToolImageDetails = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
              'change #update-classification': 'changeInClassification'  
            },

        	render: function(){
        	    var self = this;
                //self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},

            changeInClassification: function(event){
                var classification = $('#update-classification').val();
                var id = $('#id').val();
                var tool_id = classification +'-'+id;
                $('#tool_id').val(tool_id);
            },

        	init: function(){

                var $panel = $('#panel-image-details');

                
                $(function() {
                    var id = Backbone.history.fragment.split('/')[1];
                    var rs = tools.where({id: id});
                    if (rs.length) {
                        var tool = tools.get(id).toJSON();
                        
                        setTimeout(function() {
                           // $('#image-tool').attr('src', 'images/tools/'+ tool.id +'-'+tool.rand +'.jpg');
                        }, 1000);
                        
                    }else {
                        $('#image-tool').attr('src', 'images/default.png');
                    }
                });

                $(function(){
                    //jQuery
                    $panel.find('form').find('input').addClass('form-control').end()
                    .css({
                        margin: '4px'
                    });

                    $panel.find('label').addClass('text-primary')
                });

                $(function() {
                    require(['modules/classification_module'], function(CM){
                        CM.appendClassificationInModal();
                    });
                });

                $(function() {
                    $('#btnUpdateToolImage').click(function(event) {
                        /* Act on the event */
                        var str = Backbone.history.fragment;
                        var res = str.split('/');
                        require(['modules/tool_module'], function(ToolModule){
                            ToolModule.appendModalUpdateToolPhoto();
                            $('#modalUpdateToolPhoto').find('#hidden-id').val(res[1]);  
                        });
                    });
                });

                $(function() {
                    $('#form-update-tool').submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        var form = $(this).serialize();
                        var id = $('#id').val();

                            require(
                                [
                                    'libs/load_css/loadcss',
                                    'libs/alertify/js/alertify.min',
                                    'modules/tool_module',
                                    'modules/functions'
                                ], 
                                function(css, alertify, ToolModule, Functions){
                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                    alertify.confirm('Are you sure you want to update this tool ?', function(e){
                                        if (e) {
                                            var obj = Functions.clearObject(form);
                                            ToolModule.updateTool(obj, id);
                                        }else {
                                            console.log(e);
                                        }
                                    });
                            }); 

                    });
                });



        	}
    
    });
   
    return ViewToolImageDetails; 
});