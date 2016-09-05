define(
	[
		'underscore',
		'backbone',
		'text!templates/withdraw/temp_modal_input_withdraw.html'
	],  function(_, Backbone, template) {
   
    var ViewModalInputWithDraw = Backbone.View.extend({
    
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-input-qty-pull-out',
    
        	template: _.template(template),
    
          events: {
              // bound events
              'click #btnPulloutItem': 'pullout'
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
                $(function(){
                    //jQuery
                    self.$el.find('#qty').keyup(function(event) {
                       var value = $(this).val();
                       if (value != '') {
                           if (value > 0) {
                                $('#output-qty').text('');
                           }else {
                                $('#output-qty').text('Invalid input')
                           }
                       }else {
                           $('#output-qty').text('');
                       }

                       var cond = {id: $('#hiddenid').val()};
                       var rs = products.where(cond);
                       if (rs.length) {

                          var item = products.get(cond);
                          var balance = parseInt(item.get('running_bal'));

                          var total = balance - parseInt(value);

                          if (!isNaN(total)) {
                            
                              if (total >= 0) {
                                 self.$el.find('#btnPulloutItem').prop('disabled', false);
                                 self.$el.find('#running_bal').text(total);
                              }else {
                                  self.$el.find('#btnPulloutItem').prop('disabled', true);
                                  $('#output-qty').html('<span class="text-danger">insufficient stock</span>');
                                  self.$el.find('#running_bal').text(balance);
                              }
                              
                          }else {
                             self.$el.find('#btnPulloutItem').prop('disabled', false);
                             self.$el.find('#running_bal').text(balance);
                          }

                       }else {
                          router.alertify_error('Connection timeout.');
                       }
                       

                    });
                });
        	},

        	pullout: function(event){
            event.preventDefault();
        		var data = this.getFormFields();
        		require(['modules/extract_module'], function(ExtractModule){

                    if ($.isNumeric(data.qty)) {
                         ExtractModule.saveModel(data);
                    }else {
                        router.alertify_error('Invalid input');
                    }

        		});
        	},

        	getFormFields: function(){
        		var $target = $('#form-input-withdraw');
        		var data = {};
        		data.id = $target.find('#hiddenid').val();
        		data.qty = $target.find('#qty').val();
        		data.remarks = $target.find('#remark').val();
        		return data;
        	}

    
    });
   
    return ViewModalInputWithDraw;
});