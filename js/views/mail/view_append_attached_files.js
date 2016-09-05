define(
	[
		'underscore',
		'backbone',
		'text!templates/mail/temp_append_attached_files.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-attached-files',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                var output = self.template({'filename': self.model});
                self.$el.append(output).fadeIn('slow');
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('button').click(function(event) {
                    	/* Act on the event */
                    	var id = this.id;
                    	$.get('ajax/others/delete_file.php', {dir: id}, function(data, textStatus, xhr) {
                    		/*optional stuff to do after success */
                    	}).success(function(data){
                    		console.log(data);
                    	});
                    });

                    
                });
        	}
    
    });
   
    return Subview; 
});