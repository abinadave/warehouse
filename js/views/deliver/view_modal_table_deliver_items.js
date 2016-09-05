define(
	[
		'underscore',
		'backbone',
		'text!templates/deliver/temp_modal_table_deliver_items.html'
	],  function(_, Backbone, template) {
   
    var ViewModalTableDeliverItems = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},

            navigation: '',
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-table-deliver-items',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #btnPrintDeliveryReceipt': 'printDelivery'
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
                    self.$el.find('th, td').css({
                        padding: '2px',
                        fontSize: '12px'
                    });

                    setTimeout(function() {
                        require(['views/warehouse/view_slip_footer'], function(Subview){
                            var view = new Subview();
                        });
                    }, 300)
                });
              
                 (function() {

                    var beforePrint = function() {
                        console.log('Functionality to run before printing deliver');
                    };

                    var afterPrint = function() {
                       //router.navigate('products', true)
                       console.log('Functionality to run after printing deliver');
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
        	},

            printDelivery: function(event){
               var $modal = $('#modalTableDeliverItems');
        
               $modal.modal('hide');
               setTimeout(function() {
                   var array = ['Guard Copy','Warehouse Copy','Return Copy','Recipient Copy'];
                   $('#main').empty();
                     array.forEach(function(model) {
                         $modal.find('#specific-name').text(model);
                         var output = $modal.find('#division-modal').html();
                         $('#main').prepend(output);
                     });
                   // window.print();
                   require(['libs/jquery.print'], function(){
                       $.print('#main');
                   });
               }, 500);
               
            }
    
    });
   
    return ViewModalTableDeliverItems; 
});