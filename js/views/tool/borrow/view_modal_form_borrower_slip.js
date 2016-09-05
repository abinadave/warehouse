define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_modal_form_borrower_slip.html'
	],  function(_, Backbone, template) {
   
    var ViewModalFormBorrowerSlip = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
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
                var self = this;

                /**
                    $(function() {
                        self.$el.find('#borrowed-by').change(function(event) {
                            var val = $(this).val();
                            console.log('ok');
                        });
                    });
                **/

               

                $(function() {
                    require(['modules/account_module'], function(am){
                        am.checkSession();
                    });
                });
           

                $(function(){
                    //jQuery
                    $('#modalFormBorrowerSlip').modal({
					    backdrop: 'static',
					    keyboard: true
					});


                    require(['libs/jquery-ui/jquery-ui.min','modules/tool_module','modules/borrowerform_module'], function(jQueryUI, ToolModule, BFM){
                        $('#div-modalFormBorrowerSlip').draggable({cursor: 'move'});
                        
                        if(!BFM.transfer){
                            ToolModule.appendListOfPawns(); 
                        }else {
                            ToolModule.appendListOfTransfers(); 
                        }

                    });

                });

                $(document).ready(function() {
                    $('#form-submit-borrowerslip').submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        var timeStamp = event.timeStamp;
                        var form = $(this).serialize();
                        var formTransferSlip = $('#form-save-transer-slip').serialize();
                        //form += formTransferSlip;
                
                        $.post('ajax/others/validate.php', form, function(data, textStatus, xhr) {
                            $('#output-save-borrower_form').hide().html(data).fadeIn('fast');
                        }).success(function(response){
                            if($.isNumeric(response)){

                                require(['modules/borrowerform_module','modules/transferform_module','moment'], function(BorrowerFormModule, TransferFormModule, moment){

                                    form += '&time=' + router.getCurrectHour() + '&date=' + moment().format("YYYY-MM-DD HH:mm:ss") + '&table=' + 'borrower_forms';
                                    form += '&warehouse_code=' + sessionStorage.getItem('code');
                                    BorrowerFormModule.saveBorrowerForm(form);
                                    
                                }); 
                                
                            }
                        }).fail(function(xhr){
                            alert('error type: '+xhr.status);
                        });

                        
                        
                    });
                });


                
                $(function() {

                    self.$el.find('form .autos').css({
                        height: '33px',
                        width: '240px'
                    }).end().find('#purpose').css({
                        width: '548px'
                    });



                    setTimeout(function() {
                        require(['modules/extract_module','modules/warehouse_module','modules/functions'], function(ExtractModule, WM, fn){
                            ExtractModule.appendListOfPullouts();
                            WM.initAutocomplete('#linked-to').initSystemUsersAutocomplete('#issued-by');
                            WM.initWarehouseManByCode('#borrowed-by', sessionStorage.getItem('code'));
                            WM.initWarehouseManByCode('#noted-by', sessionStorage.getItem('code'));
                            fn.initUsertypes('#borrowed-by-position');
                            fn.initUsertypes('#noted-by-position');
                        });
                    }, 100);
                });

        	}
    
    });
   
    return ViewModalFormBorrowerSlip; 
});