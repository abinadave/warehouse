define(
	[
		'underscore',
		'backbone',
		'text!templates/supplier/temp_list_of_suppliers.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-supplier',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['modules/supplier_module','libs/backbone.obscura'], function(SM, Obscura){
	                self.$el.off();
	                self.$el.empty();
	                var list = SM.sort(self.collection, Obscura);
	                var output = self.template({library: list.toJSON()});
	                self.$el.append(output);
	                self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
        		var self = this;
                $(function(){
                    //jQuery
                    $('#num-of-supplier').text(length);
                    if (length == 0) {
                    	self.$el.text('No data was found');
                    }
                });

                $(function() {
                	self.$el.find('td a').click(function(event) {
                		var str = this.id;
                		var res = str.split('-');
                		require(
							[
								'libs/load_css/loadcss',
								'libs/alertify/js/alertify.min',
								'modules/supplier_module'
							], 
							function(css, alertify, module){
								loadCSS('js/libs/alertify/css/alertify.core.css');
								loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
								alertify.confirm('Are you sure ?', function(e){
									if (e) {
										module.removeDB(res[1]);
									}else {
										console.log(e);
									}
								});
						});	
                	});
                });

                $(function() {
                    $(function(){
                   
                        require(['modules/plugin_module'], function(PlugIn){
                            setTimeout(function() {
                                PlugIn
                                    .editableTable.initialize('#table-supplier')
                                    .validateSuppliers('#table-supplier td')
                                    .onChangeSuppliers('#table-supplier td');
                            }, 500);
                        });
                    });
                    
                });
        	}
    
    });
   
    return Subview; 
});