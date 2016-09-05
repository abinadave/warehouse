define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/repair/temp_list_of_tools_under_repair.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfToolsUnderRepair = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-tools-under-repair',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['modules/classification_module'], function(CM){
	                self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(), 'ClassificationModule': CM });
	                self.$el.append(output);
	                self.init(self.collection.length);
            	});
    	        return self;
        	},
    
        	init: function(length){

        		var $el = $('#list-of-tools-under-repair');
        		$el.find('tr').css('cursor', 'pointer');
                $(function(){
                    //jQuery
                    $el.find('tr').click(function(event) {
                    	$el.find('tr').removeClass('tr-2');
                    	$(this).addClass('tr-2');
                    });

                     if (length == 0) {
                        require(['modules/functions'], function(fn){
                            fn.noDataWasFound('#list-of-tools-under-repair', 8, '<b>No History was found.</b>');
                            $('#btnReturnRepairedTool').hide();
                        });
                    }
                });


        	}
    
    });
   
    return ViewListOfToolsUnderRepair; 
});