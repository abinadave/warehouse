define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/transfer/temp_modal_table_transfer_slip.html'
	],  function(_, Backbone, template) {
   
    var ViewModalTableTransferSlip = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#modal-placeholder, #placeholder-modals',
    
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
                var $modal = $('#modalTransferSlip'), self = this;
                var self = this;
                $(function(){
                    //jQuery
                    $modal.modal('show');
                    
                });

                $(function() {
                    $('#btnPrintTransferSlip').click(function(event) {
                        require(['libs/jquery.print'], function(){
                            $.print('#div-print-transferslip');
                        });
                    });
                });

                $(function() {
                    self.$el.find('th, td').css({
                        padding: '1px',
                        fontSize: '10px'
                    });
                });


                (function() {

                    var beforePrint = function() {
                        console.log('Functionality to run before printing.');
                    };

                    var afterPrint = function() {
                       router.navigate('historyOfTransferedTool', true);
                       setTimeout(function() {
                           router.navigate('availableTools', true);
                           nav.show();
                       }, 500);
                       
                    };

                    if (window.matchMedia) {
                        var mediaQueryList = window.matchMedia('print');
                        mediaQueryList.addListener(function(mql) {
                            if (mql.matches) {
                                beforePrint();
                            } else {
                                afterPrint();
                            }
                        });
                    }

                    window.onbeforeprint = beforePrint;
                    window.onafterprint = afterPrint;

                }());


        	}
    
    });
   
    return ViewModalTableTransferSlip; 
});