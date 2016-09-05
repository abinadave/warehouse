define(
	[
		'underscore',
		'backbone',
		'text!templates/unit/temp_table_units.html'
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
                    self.$el.find('#modalUnits').modal('show');
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#div-modalUnits').draggable({});
                    });
                });



                $(function() {
                    self.$el.find('#name').keyup(function(event) {
                        var value = $(this).val().toLowerCase();
                        require(['modules/unit_module'], function(UnitModule){
                            UnitModule.trigger('search', value); 
                        });
                    });
                });

                $(function() {
                    self.$el.find('#form-units').submit(function(event) {
                        event.preventDefault();
                        var form = $(this).serialize();
                        form +='&table=units';
                        require(['modules/unit_module','models/unit'], function(UnitModule, Unit){
                            var unit = new Unit({
                                name: $('#name').val()
                            });

                            if (unit.isValid()) {
                                UnitModule.trigger('saveDB', form);
                                    self.$el.find('#name').val('');
                            }
                            
                        });
                    });
                });
        	}
    
    });
   
    return Subview; 
});