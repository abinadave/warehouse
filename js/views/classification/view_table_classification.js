define(
	[
		'underscore',
		'backbone',
		'text!templates/classification/temp_table_classification.html'
	],  function(_, Backbone, template) {
   
    var ViewTableClassification = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modals',
    
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
                $(function(){
                    //jQuery
                    $('#form-add-classification').submit(function(event) {
                    	/* Act on the event */
                    	event.preventDefault();
                    	var form = $(this).serialize();
                    	require(['modules/classification_module'], function(ClassificationModule){
                    	    ClassificationModule.saveDB(form);
                    	});
                    });

                    $(function() {
                        $('#form-add-classification').find('input#classification').keyup(function(event) {
                            /* Act on the event */
                            var value = $(this).val().toLowerCase();
                            require(['modules/classification_module','views/classification/view_list_of_classifications','libs/backbone.obscura'], 
                                function(ClassificationModule, ViewListOfClassifications, Emp){
                                var lists = ClassificationModule.search(value);
                                var sorted = ClassificationModule.sort(Emp, lists);
                                if (lists.length) {
                                    var view = new ViewListOfClassifications({
                                        collection: sorted
                                    });
                                    view.render();
                                }else {
                                    $('#list-of-classifications').html('No classification was found for: <b>'+value+'</b>')
                                }
                            }); 
                        });
                    });
                });
        	}
    
    });
   
    return ViewTableClassification; 
});