define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_modal_show_recieve_items.html',
        'views/warehouse/view_slip_footer',
        'printarea'
	],  function(_, Backbone, template, SubviewSlipFooter, printarea) {
   
    var ViewModalShowReceiveItems = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #printReceivingReport': 'printReceiving'
            },
    
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
                    let subviewSlipFooter = new SubviewSlipFooter();
                    subviewSlipFooter.render();
                });

                (function() {

                    var beforePrint = function() {
                        console.log('Functionality to run before printing.');
                    };

                    var afterPrint = function() {
                        console.log('Functionality to run after printing');
                        nav.show();
                        router.navigate('ReceivingReports', true);
                        router.navigate('products', true);
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


                $(function() {
                    self.$el.find('th, td').css({
                        padding: '2px',
                        fontSize: '12px'
                    });
                });

                $(function() {
                    self.$el.find('#printReceivingReport').click(function(event) {
                        $('#print-receivable').printArea();
                    });
                });

                $(function() {
                    require(['views/warehouse/view_slip_footer'], function(Subview){
                        var view = new Subview();
                    });
                });

        	}

            // printReceiving: function(event){
            //     var output = $('#modalShowAllReceivingItems').find('#modal-content');
            //     $('#modalShowAllReceivingItems').modal('hide');
            //     setTimeout(function() {
            //        $('#main').html(output);
            //        nav = $('#wrapper');
            //        $('#wrapper').hide()
            //        window.print();
            //     }, 400)
                
            // }
    
    });
   
    return ViewModalShowReceiveItems; 
});