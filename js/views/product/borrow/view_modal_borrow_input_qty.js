define(['underscore','backbone','text!templates/product/borrow/temp_modal_borrow_input_qty.html'], function(_, Backbone, template) {
   
    var SubviwModal = Backbone.View.extend({
    
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
                var output = self.template({'model': self.model.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function(){
                    //jQuery
                    $('#modalBorroweItemInputQty').modal('show');
                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#div-modalBorroweItemInputQty').draggable({
                        	cursor: 'move'
                        });
                    });
                });

                $(function() {
                	self.$el.find('form').submit(function(event) {
                		event.preventDefault();

                		var model = new Backbone.Model({
                			id: self.$el.find('#hidden-id').val(),
                			qty: self.$el.find('#qty').val(),
                			remarks: self.$el.find('#remarks').val()
                		});

                		var item = products.get(model.get('id'));

                		if (parseInt(model.get('qty')) <= parseInt(item.get('running_bal'))) {

                            
                            var rs = item_borrows.where({id: model.get('id')});

                            if (rs.length) {
                                var item_borrow = item_borrows.get(model.get('id'));
                                var total = parseInt(item_borrow.get('qty')) + parseInt(model.get('qty'));
                                item_borrow.set({qty: total.toString()});
                                item.set({
                                    running_bal: parseInt(item.get('running_bal')) - parseInt(model.get('qty'))
                                });
                            }else {
                                var total = parseInt(item.get('running_bal')) - parseInt(model.get('qty'));
                                item.set({running_bal: total.toString()});
                                model.set({
                                    name: item.get('name'),
                                    unit: item.get('unit')
                                });
                                item_borrows.add(model);
                            }
                            
                			$('#modalBorroweItemInputQty').modal('hide');

                		}else {
                			router.alertify_error('Insufficient stock.');
                		}

                	});
                });

                $(function() {
                	setTimeout(function() {
                		self.$el.find('#qty').focus();
                	}, 700);
                });

                jQuery(document).ready(function($) {
                    self.$el.find('#qty').keyup(function(event) {
                        var value = Number($(this).val());
                        var remaining_bal = Number(self.model.get('running_bal')) - value;
                        self.$el.find('td#running_bal').text(remaining_bal);
                        if (remaining_bal < 0) {
                            router.alertify_error('Insufficient Stock for: '+ self.model.get('name'));
                            self.$el.find('#btnSubmitBorrowerItem').prop('disabled', true);
                        }else {
                            self.$el.find('#btnSubmitBorrowerItem').prop('disabled', false);
                        }
                    });
                });

        	}
    
    });
   
    return SubviwModal; 
});