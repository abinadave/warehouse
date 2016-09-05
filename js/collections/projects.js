define(
	[
		'underscore',
		'backbone',
		'models/project'
	],  function(_, Backbone, Project) {
   
    var Projects = Backbone.Collection.extend({
    
    	model: Project,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new project was added');
    		});
    		this.on('remove', function(model){
    			console.log('project successfully removed');
    		});
    	},
    
    	print: function(){
    		projects.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Projects; 
});