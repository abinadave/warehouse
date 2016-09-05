define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_list_of_warehouse_branches.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfWarehouseBranches = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-warehouse-branches',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
                require(['modules/warehousemen_module'], function(myModule){
                    self.$el.empty();
                    var output = self.template({'library': self.collection.toJSON(), 'module': myModule});
                    self.$el.append(output);
                    self.init();
                });
        	    var self = this;
    	        return self;
        	},
    
        	init: function(){


                $(function() {
                    $('tbody#list-of-warehouse-branches').find('tr').click(function(event) {
                        $('tbody#list-of-warehouse-branches').find('tr').removeClass('text-primary');
                        $(this).addClass('text-primary');
                        $('#hidden-warehouse-location-table').val(this.id);
                    });

                    // require(['datatable'], function(){
                    //     $('#table-warehouses').dataTable();
                    // });
                });


        	}
    
    });
   
    return ViewListOfWarehouseBranches; 
});