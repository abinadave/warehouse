define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_modal_table_withdrawitems.html',
        'printarea'
	],  function(_, Backbone, template) {
   
    var ViewTableWithDrawItems = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-withdrawitems',
    
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

               $(function() {
                   setTimeout(function() {
                      require(['views/withdraw/view_image_withdrawitems'], 
                        function(SubviewImageWithdrawalItem){
                          var view = new SubviewImageWithdrawalItem();
                          view.render();
                      });
                   }, 700);
               });

                jQuery(document).ready(function($) {
                    $('#btnPrintWithdrawSlip').click(function(event) {
                        $('#myDivToPrint').printArea();
                    });    
                });

                $(function() {
                    self.$el.find('th, td').css({
                        padding: '2px',
                        fontSize: '12px'
                    });

                    require(['libs/jquery-ui/jquery-ui.min'], function(jQueryUi){
                        $('#div-modalWithDrawItemTable').draggable({cursor: 'move'});
                    });
                });

                $(function() {
                    setTimeout(function() {
                        require(['views/warehouse/view_slip_footer'], function(Subview){
                            var view = new Subview();
                        });
                    }, 300)
                });
                
                (function() {

                    var beforePrint = function() {
                        console.log('Functionality to run before printing.');
                    };

                    var afterPrint = function() {
                        console.log('Functionality to run after printing');
                        $('#alertify').show();
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
   
    return ViewTableWithDrawItems; 
});