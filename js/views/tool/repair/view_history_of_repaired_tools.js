define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/repair/temp_history_of_repaired_tools.html'
	],  function(_, Backbone, template) {
   
    var ViewHistoryOfRepairedTools = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main-repaired',
    
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
                   $('#check-all-repair').click(function(event){
                        $('tbody tr').find(':checkbox').prop('checked', $(this).is(':checked'));
                   });  

                   self.$el.find('#delete-repair-forms').click(function(event) {
                       /* Act on the event */
                      var ids = self.getCheckedForm();
                   });

                   self.$el.find('#delete-repair-forms').click(function(event) {
                       /* Act on the event */
                      var ids = self.getCheckedForm();
                      console.log(ids)
                       if(ids.length){
                             require(
                                [
                                    'libs/load_css/loadcss',
                                    'libs/alertify/js/alertify.min',
                                    'modules/repairform_module'
                                ], 
                                function(css, alertify, RFM){
                                    loadCSS('js/libs/alertify/css/alertify.core.css');
                                    loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                    alertify.confirm('Are you sure ?', function(e){
                                        if (e) {
                                            ids.forEach(function(model) {
                                                RFM.removeDB(model);
                                            });
                                        }else {
                                            console.log(e);
                                        }
                                    });
                            });
                       }
                      
                   });
                });
              
                $(function() {
                    var rfm = require('modules/repairform_module');
                    self.$el.find('input#search').keyup(function(event) {
                         var value = $(this).val().toLowerCase();
                         var list = rfm.search(value);
                         require(['views/tool/repair/view_list_of_repair_forms'], function(Subview){
                              var view = new Subview({
                                  collection: list
                              });
                              view.render();
                         });
                    });
                });
        	},

            getCheckedForm: function(){
                var self = this;
                var ids = [];
                self.$el.find('tbody tr').find('input[type="checkbox"]:checked').each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
            }
    
    });
   
    return ViewHistoryOfRepairedTools; 
});