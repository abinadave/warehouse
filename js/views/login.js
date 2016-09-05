define([
		'jquery', 
		'backbone',
		'underscore', 
		'models/model',
		'text!templates/login.html'], 
function($, Backbone, _, model, template){

	var View = Backbone.View.extend({
		el: '#main',

		initialize: function(){
			this.model = new model({
				message: 'Hello World'
			});
			this.template = _.template( template, { model: this.model.toJSON() } );
		},

		events: {
			'submit #form-login': 'signing'
		},

		render: function(){
			$(this.el).append( this.template );
		},

		signing: function(event){
			event.preventDefault();
			var form = $('#form-login').serialize();
			var self = this;
			$.post('ajax/select/verify_account.php', form , function(data, textStatus, xhr) {
				/*optional stuff to do after success */
				$('#output-login').hide().html(data).fadeIn('fast');
			}).success(function(data){
				if (data > 0) {
					self.setSession(data);
				}
			}).fail(function(xhr){
				alert('error type: '+xhr.status);
			});
		},

		setSession: function(value){
			var self = this;
			$.post('ajax/others/set_session.php', { uid: value }, function(data, textStatus, xhr) {
				
			}).success(function(data){
				self.getUid();
			}).fail(function(xhr){
				alert('error type: '+xhr.status);
			});
		},

		getUid: function(){
			$.get('ajax/others/get_session.php', function(data) {
				
			}).success(function(data){
				window.location = 'ajax/others/refresher.php';
			});
		}

	});
	
	return new View();
});
