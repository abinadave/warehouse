define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_modal_pullout_list.html',
        'moment',
        'modules/withdrawform_module'
	],  function(_, Backbone, template, moment, WFM) {
   
    var ViewPulloutList = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-list-of-all-pullouts',
    
        	template: _.template(template),
    
            events: {},
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#modalPullOutList').draggable({cursor: "move"});
                    });
                });


                jQuery(document).ready(function($) {
                    self.$el.find('#btnWithdrawOnly').click(function(event) {
                        event.preventDefault();
                        var date = moment().format("YYYY-MM-DD HH:mm:ss");
                        var form = $('#form-save-withdraw-form-items').serialize();
                        form += '&date='+ date;
                        WFM.saveDB(form, 'w');                    
                    });

                    self.$el.find('#btnWithdrawAndDeliver').click(function(event) {
                        event.preventDefault();
                        require(['modules/withdrawform_module','moment','modules/warehouse_module','modules/functions'], function(module, moment, WM, fn){
                            var date = moment().format("YYYY-MM-DD HH:mm:ss");
                            var form = $('#form-save-withdraw-form-items').serialize();
                            form += '&date='+ date;
                            module.saveDB(form, 'wd');
                            
                            WM.initSystemUsersAutocomplete('#to-person');
                            WM.initSystemUsersAutocomplete('#delivered-by');
                            fn.initUsertypes('#delivered-by-position');
                                               
                        });
                    });
                });
        	}
    
    });
   
    return ViewPulloutList; 
});