define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/available/temp_list_of_tools.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfTools = Backbone.View.extend({
    
        	initialize: function(){
        		
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-available-tools',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['modules/classification_module','libs/backbone.obscura', 'modules/tool_module','modules/functions'], 
                    function(CM, Obscura, TM, fn){
                        self.$el.off();
                        self.$el.empty();
                        var output = self.template({'library': self.collection.toJSON(), 'ClassificationModule': CM, 'fn': fn });
                        self.$el.append(output);
                        self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
                var $tbody = $('#list-of-available-tools'), $panel = $('#panel-tool');
                var self = this;


                $(function(){
                    $panel.find('b#nor').text(length);
                    $tbody.find('tr').click(function(event) {
                        $tbody.find('tr').removeClass('tr-2 text-primary');
                        $(this).addClass('tr-2 text-primary');
                        $('#hidden-tool').val($(this).attr('id'));
                    });
                });
                
                if (!length) {
                    var output = '<tr class="text-danger" style=""><td colspan="10">No tool was found for this warehouse </td></tr>';
                    $tbody.html(output);
                    $('#btnPrintTable').hide();
                }else{
                    $('#btnPrintTable').show();
                }

                $(document).ready(function() {
                    var popover = $tbody.find('[data-toggle="popover"]').popover({
                            trigger : 'hover',  
                            placement : 'right',
                            html: 'true'
                        });

                        popover.on('show.bs.popover', function() {
                            var i = this.id;
                            var rs = tools.where({id: i});
                            var default_src = "images/default_tool.png";

                            if (rs.length) {
                                
                                var tool = tools.get(i);

                                if (tool.get('rand') != '') {
                                    var src = "images/tools/" + i + '-' + tool.get('rand') +'.jpg';
                                    var img = '<img style="width: 180px; height: 160px" src="'+src+'">';
                                    popover.attr('data-content', img);
                                }else {
                                    var img = '<img style="width: 180px; height: 160px" src="'+default_src+'">';
                                    popover.attr('data-content', img);
                                };
                            }else {
                                var img = '<img style="width: 180px; height: 160px" src="'+default_src+'">';
                                popover.attr('data-content', img);
                            };
                        });
                });

                $(function() {
                    self.$el.find('td').addClass('text-center');
                    if (sessionStorage.getItem('code') == 1) {
                        setTimeout(function() {
                            self.$el.find('#nor').css({       
                                marginLeft: '-30px' 
                            });
                        }, 1000);
                    };
                });

                $(function() {
                    self.$el.find('a.tooltipster').mouseenter(function(event) {
                        var id = this.id, $a = $(this);
                        require(['modules/warehouse_module'], function(wm){
                            $a.attr('title', 'Warehouse: '+ wm.getWarehouseLocation(id));
                        });
                    });
                });


                $(function() {
                    require(['modules/plugin_module'], function(plugIn){
                        plugIn.editableTable.initialize('#table-tools');
                        plugIn.editableTable.validateTools('#table-tools td');
                        plugIn.editableTable.onChangeTools('#table-tools td');
                    });
                });

  
        	}
    
    });
   
    return ViewListOfTools; 
});
