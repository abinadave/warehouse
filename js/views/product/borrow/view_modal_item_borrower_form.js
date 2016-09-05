define(['underscore','backbone','text!templates/tool/borrow/temp_modal_form_borrower_slip.html'], function(_, Backbone, template) {
   
    var SubiewModal = Backbone.View.extend({
    
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
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#modalFormBorrowerSlip').modal('show');
                    self.$el.find('input').css({
                    	width: '240px'
                    });
                    self.$el.find('#purpose').css({
                    	width: '500px'
                    });
                });

                $(function() {
                    setTimeout(function() {
                        var purposes = borrower_pforms.pluck('purpose');
                        require(['modules/functions','modules/borrowerpform_module'], function(fn, bpfm){
                            /*
                            fn.initAutocomplete('#borrowed-by-position', 'borrowed_by_position', borrower_pforms, bpfm);
                            fn.initAutocomplete('#noted-by', 'noted_by', borrower_pforms, bpfm);
                            fn.initAutocomplete('#noted-by-position', 'noted_by_position', borrower_pforms, bpfm); */
                            self.$el.find('#purpose, #borrowed-by, #borrowed-by-position','#noted-by').css({
                                height: '33px'
                            });

                        });

                        require(['libs/jquery-ui/jquery-ui.min','css!libs/css/auto-complete-list',], function(css){
                            
                            var availableTags = _.unique(borrower_pforms.pluck('purpose'));
                            $('#purpose').autocomplete({
                                source: availableTags,
                                change: function (event, ui) { 
                                    console.log('change purpose');
                                }
                            });

                            var arrBorrowedBy = _.unique(borrower_pforms.pluck('borrowed_by'));
                            $('#borrowed-by').autocomplete({
                                source: arrBorrowedBy,
                                change: function (event, ui) { 
                                    console.log('change borrowed by name');
                                    var value = $(this).val().toLowerCase();
                                    borrower_pforms.forEach(function(model) {
                                        if (model.get('borrowed_by').toLowerCase() === value) {
                                            self.$el.find('#borrowed-by-position').val(model.get('borrowed_by_position'));
                                        };
                                    });
                                }
                            });

                            var arrBorrowedByPos = _.unique(borrower_pforms.pluck('borrowed_by_position'));
                            $('#borrowed-by-position').autocomplete({
                                source: arrBorrowedByPos,
                                change: function (event, ui) { 
                                    console.log('change borrowed by position');
                                }
                            });

                            var arrNotedBy = _.unique(borrower_pforms.pluck('noted_by'));
                            $('#noted-by').autocomplete({
                                source: arrNotedBy,
                                change: function (event, ui) { 
                                    var value = $(this).val().toLowerCase();
                                    borrower_pforms.forEach(function(model) {
                                        if (model.get('noted_by').toLowerCase() === value) {
                                            self.$el.find('#noted-by-position').val(model.get('noted_by_position'));
                                        };
                                    });
                                }
                            });

                            var arrNotedByPos = _.unique(borrower_pforms.pluck('noted_by_position'));
                            $('#noted-by-position').autocomplete({
                                source: arrNotedByPos,
                                change: function (event, ui) { 
                                    console.log('change noted by position');
                                }
                            });

                        });
                    }, 200);
                });

                self.$el.find('tbody').html('<tr><td colspan="5">Loading ...</td></tr>');

                $(function() {
                	setTimeout(function() {
                		require(['modules/itemborrow_module'], function(ibm){
                		    ibm.appendListOfItemBorrows(item_borrows);
                		});
                	}, 800);
                });

                $(function() {
                	self.$el.find('form').submit(function(event) {
                		/* Act on the event */
                		event.preventDefault();
                        var form = $(this).serialize();
                        require(['modules/functions'], function(fn){
                            form += '&time=' + router.getCurrectHour();
                            form += '&date=' + fn.getDate() + '&warehouse_code=' + sessionStorage.getItem('code') + '&table=borrower_pforms';
                    		require(
                                [
                                  'modules/collection_module',
                                  'modules/borrowerpform_module'
                                ], 
                                function(colmod, bpfm){
                                    colmod.saveDB(form, 'borrower_pforms', bpfm);
                            });
                        });
                	});
                });
        	}
    });
   
    return SubiewModal; 
});           
