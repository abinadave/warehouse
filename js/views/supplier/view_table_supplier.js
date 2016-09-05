define(
	[
		'underscore',
		'backbone',
		'text!templates/supplier/temp_table_supplier.html'
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
                    $('#modalSupplier').modal('show');
                    self.$el.find('.modal-header').hover(function() {
                        require(['libs/jquery-ui/jquery-ui.min'], function(){
                            $('#div-modalSupplier').draggable();
                        });
                    }, function() {
                        require(['libs/jquery-ui/jquery-ui.min'], function(){
                            $('#div-modalSupplier').draggable('destroy');
                        });
                    });
                    

                    setTimeout(function() {
                    	self.$el.find('#name').focus();
                    }, 700);

                });

                $(function() {
                	$('#form-supplier').submit(function(event) {
                		event.preventDefault();
                		var form = $(this).serialize();
                		require(['modules/supplier_module','modules/functions','models/supplier'], function(SM, fn, Supplier){
                			form += '&table=suppliers';
                		  
                            var obj = _.omit(fn.clearObject(form), 'table');
                            console.log(obj);
                            var supplier = new Supplier(obj);
                            var isValid = supplier.isValid();
                            if (isValid) {
                               SM.saveDB(form);
                            };
                		});
                	});

                	self.$el.find('#name').keyup(function(event) {
                		var value = $(this).val().toLowerCase();
                			require(['modules/supplier_module','views/supplier/view_list_of_suppliers'], function(SM, Subview){
                			    var list = SM.search(value);
                                
                			    if (list.length) {
                			    	var view = new Subview({
                			    		collection: list
                			    	});
                			    } else{
                			    	self.$el.find('#list-of-suppliers').text('No result was found for: ' + value);
                			    };

                                if (value == '' && suppliers.length == 0) {
                                    $('#list-of-suppliers').html('<b>No data was found</b>')
                                }

                			});
                	});
                });
        	}
    
    });

    return Subview; 
});