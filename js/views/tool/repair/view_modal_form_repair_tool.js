define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/repair/temp_modal_form_repair_tool.html'
	],  function(_, Backbone, template) {
   
    var ViewModalFormRepairTool = Backbone.View.extend({
    
        	initialize: function(){
        		
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modals',
    
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

                $(function(){
                    //jQuery
                    $('#modalRepairForm').modal({
					    backdrop: 'static',
					    keyboard: true
					});
                });

                $(function() {
                	$('#form-submit-repair-job').submit(function(event) {
                		/* Act on the event */
                		event.preventDefault();
                		var form = $(this).serialize();

                        //validation process...
                        $.post('ajax/others/validate.php', form, function(data, textStatus, xhr) {
                            /*optional stuff to do after success */
                            $('#output-save-repair-tool').hide().html(data).slideDown('fast');
                        }).success(function(response){
                            if ($.isNumeric(response)) {
                                require(['modules/repairform_module','moment'], function(RepairFormModule, moment){
                                    form += '&table=repair_forms';
                                    form += '&date=' +moment().format("YYYY-MM-DD HH:mm:ss");
                                    form += '&warehouse_code=' + sessionStorage.getItem('code');
                                    RepairFormModule.saveDB(form);
                                });
                            }else {
                                $('#form-submit-repair-job').find('input[name="repair_no"]').focus();
                            }
                        }).fail(function(xhr){
                            alert('error type: '+xhr.status);
                        });
                		
                	});
                });

                $(function() {
                	require(['libs/jquery-ui/jquery-ui.min'], function(jQueryUI){
                	    $('#date-needed').datepicker({ dateFormat: 'yy-mm-dd' });
                	    $('#date-requested').datepicker({ dateFormat: 'yy-mm-dd' }); 
                	});
                });

                $(function() {
                	$('#date-needed, #date-requested').on('change', function(){
                		var $el = $(this);
                		require(['moment'], function(moment){
                		    var date = moment($el.val()).format('dddd MMMM DD, YYYY');
                		    $el.val(date);
                		});
                	});
                });

                $(document).ready(function() {
                    $('#btnClose').click(function(event) {
                        tools.add(repair.attributes);
                        repair.clear({silent: true})
                        $('#hidden-tool').val('');
                    });
                });
               
        	}
    
    });
   
    return ViewModalFormRepairTool; 
});