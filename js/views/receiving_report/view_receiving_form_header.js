define(
	[
		'underscore',
		'backbone',
		'text!templates/receiving_report/temp_receiving_form_header.html',
        'moment'
	],  function(_, Backbone, template, moment) {
   
    var ViewReceivingFormHeader = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#modalShowAllReceivingItems-header',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(id){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init(id);
    	        return self;
        	},
    
        	init: function(id){
                var self = this;
                $(function(){
                    //jQuery
                    var form = receive_forms.get(id);
                    //console.log(form.attributes)
                    let date_received = moment(form.get('date')).format('MMMM DD, YYYY, ddd');
                    var $target = $('#modalShowAllReceivingItems');
                    $target.find('#rr-no').text(form.get('crm_id')).end()	
                    .find('#location-receive').text(form.get('location_receive')).end()
                    .find('#supplier-name').text(form.get('supplier_name')).end()
                    .find('#date-receive').text(date_received).end()
                    .find('#time-receive').text(form.get('time')).end()
                    .find('#no').text(form.get('crm_id')).end()
                    .find('#received-by').text(form.get('received_by')).end()
                    .find('#verifier').text(form.get('verified_by')).end()
                    .find('#position').text(form.get('position')).end()
                    .find('#person-received-from').text(form.get('person_received_from')).end();
                    
                    if (form.get('location_receive') == '') {
                        $('#location-receive').text('-');
                        // var supplier = suppliers.where({name:})
                    };
                    
                });

                $(function() {
                    self.$el.find('th, td').css({
                        padding: '2px',
                        fontSize: '12px'
                    });
                });
        	}
    
    });
   
    return ViewReceivingFormHeader; 
});