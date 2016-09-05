define(
	[
		'underscore',
		'backbone',
		'text!templates/customer/contact/temp_table_contact.html'
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
                   $('#modalContactTable').modal(); 
                   require(['libs/jquery-ui/jquery-ui.min'], function(){
                       $('#div-modalContactTable').draggable(); 
                   });
                });

                $(function() {
                    self.$el.find('#btnDeleteAll').click(function(event) {
                        /* Act on the event */
                       var ids = self.findCheck();
                       if (ids.length) {
                            require(
                                [
                                    'libs/load_css/loadcss',
                                    'libs/alertify/js/alertify.min',
                                    'modules/contact_module'
                                ], 
                                function(css, alertify, ContactModule){
                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                    alertify.confirm('Are you sure ?', function(e){
                                        if (e) {
                                             ids.forEach(function(model) {
                                                ContactModule.trigger('removeDB', model);
                                             });
                                           
                                        }else {
                                            console.log(e);
                                        }
                                    });
                            });
                       }
                    });

                    self.$el.find('#check-all').click(function(event) {
                        var is = $(this).is(':checked');
                        self.$el.find(':checkbox').prop('checked', is);
                    });
                });
        	},

            findCheck: function(){
                var ids = [], self = this;
                self.$el.find('tbody').find('input[type="checkbox"]:checked').each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
            }
    
    });
   
    return Subview; 
});