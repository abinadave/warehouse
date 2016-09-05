define(
	[
		'underscore',
		'backbone',
		'text!templates/unit/temp_list_of_units.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'ul',
    
        	el: '#list-of-units',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['libs/backbone.obscura','modules/unit_module'], function(Obscura, UnitModule){
                    self.$el.off();
                    self.$el.empty();
                    var obj = UnitModule.trigger('sort', self.collection, Obscura);
                    var output = self.template({'library': obj.lists.toJSON()});
                    self.$el.append(output);
                    self.init(self.collection.length);
                });
    	        return self;
        	},
    
        	init: function(length){
                var self = this;
                $(function(){
                    //jQuery
                    $('#num-of-units').text(length);
                });

                $(function() {
                    self.$el.find('a').click(function(event) {
                        var i = this.id;
                        require(
                            [
                                'libs/load_css/loadcss',
                                'libs/alertify/js/alertify.min',
                                'modules/unit_module'
                            ], 
                            function(css, alertify, UnitModule){
                                loadCSS('js/libs/alertify/css/alertify.core.css');
                                loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                alertify.confirm('Are you sure ?', function(e){
                                    if (e) {
                                        UnitModule.trigger('removeDB', i);
                                    }else {
                                        console.log(e);
                                    }
                                });
                        });

                    });
                });
        	}
    
    });
   
    return Subview; 
});