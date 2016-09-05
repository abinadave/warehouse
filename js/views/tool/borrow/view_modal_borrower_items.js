define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/borrow/temp_modal_borrower_items.html',
        'modules/functions','printarea'
	],  function(_, Backbone, template, fn) {
   
    var ViewModalBorrowerItems = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-history-borrow, #placeholder-modals, #placeholder',
    
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
                var $modal = $('#modalBorrowerItems');
                var self = this;

                $(function(){
                    //jQuery..
                    $modal.modal('show');
                    require(['libs/jquery-ui/jquery-ui.min'], function(jQueryUI){
                        $('#div-modalBorrowerItems').draggable({cursor: 'move'});
                    });
                });

                $(function() {
                    $modal.find('#btnPrint').click(function(event) {

                       setTimeout(function() {
                            
                            $('#borrower-slip-resibo').printArea();
                            
                            require(['modules/borrowerform_module','modules/transferform_module','modules/transferitem_module','libs/load_css/loadcss','libs/alertify/js/alertify.min'],
                               function(BorroweFormModule, TransferFormModule, TransferItemModule, css, alertify){
                               if(BorroweFormModule.transfer){ 
                                    alertify.confirm('Do want to print Transfer Slip ?', function(e){
                                        if (e) {
                                            var id = TransferFormModule.lastInsertId;
                                            TransferItemModule.findItemsWhereIdOf(id);
                                            loadCSS('js/libs/alertify/css/alertify.core.css');
                                            loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                        }
                                     });   
                               }
                            });

                       }, 1000);
                    });
                });

                 (function() {

                    var beforePrint = function() {
                        console.log('Functionality to run before printing.');
                    };

                    var afterPrint = function() {
                       router.navigate('', true);
                       router.navigate('availableTools', true);
                       nav.show();
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
                    /* executed for borrower_pforms */
                     if (borrower_pforms.stock_card) {
                        var json = borrower_pforms.json;
                        var form = borrower_pforms.get(json.id);
                        require(['libs/backbone.obscura','modules/borroweritem_module'], function(Obscura, bim){
                            var proxy = new Obscura(borrower_pitems), $box = $('#modalBorrowerItems'), arr = ['no','date','time','purpose','borrowed_by','noted_by','issued_by'];
                            var list = proxy.filterBy('borrower_id', {borrower_id: json.id.toString()});
                            bim.appendListOfBorrowerItem(list);
                            $box.find('#th-tool-id').text('Stock ID');
                            arr.forEach(function(index) {
                                $('#'+index).text(json[index]);
                            });
                            borrower_pforms.stock_card = false;
                        });
                     };
                 });
        	}
    
    });
   
    return ViewModalBorrowerItems; 
});