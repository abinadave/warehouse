define(
	[
		'underscore',
		'backbone',
		'text!templates/warehouse/temp_list_of_warehousemens.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfWarehouseMens = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-warehousemens',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                     var popover = $('[data-toggle="popover"]').popover({
                            trigger : 'hover',  
                            placement : 'left',
                            html: 'true'
                     });

                        popover.on('show.bs.popover', function() {
                            
                            var str = this.id;
                            var res = str.split('tr');

                            if(warehousemens.where({id: res[1]}).length){
                                var person = warehousemens.get(res[1]);
                                var output = '';
                                if (person.get('rand') != '') {
                                    var dir = 'images/account/' + person.get('id') + '-' + person.get('rand') + '.jpg';
                                    output +='<img src="'+dir+'"  alt="..." class="img-thumbnail" style="width: 106px; height: 80px">';
                                } else{
                                    output +='<img src="images/user.jpeg"  class="img-thumbnail" style="width: 106px; height: 80px">';
                                }
                                popover.attr('data-content', output)
                                
                            }

                            
                        });
                });
        	}
    
    });
   
    return ViewListOfWarehouseMens; 
});