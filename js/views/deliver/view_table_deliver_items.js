define(['underscore','backbone','text!templates/deliver/temp_table_deliver_items.html'], function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
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

                    $('#modalDeliverItems').modal('show');

                    require(['libs/jquery-ui/jquery-ui.min'], function(){
                        $('#div-modalDeliverItems').draggable({cursor: 'move'});
                    });

                    self.$el.find('#btnReceive').click(function(event) {
                        carts.isDelivered = true;
                        $('#modalDeliverItems').modal('hide');
                        //Start of event
                        var ids = self.getCheckedItems(), deliveredId = $('#modalDeliverItems').find('#hidden-id').val();
                        
                        ids.forEach(function(model) {
                            var item = deliver_items.findWhere({delivered_id: deliveredId, item: model});
                            carts.add(item.attributes, {silent: true});
                        });

                        setTimeout(function() {

                            require(
                                [
                                  'views/receiving_report/view_modal_list_of_all_carts',
                                  'views/receiving_report/view_list_of_carts_deliver_items'
                                ], 
                                function(Subview){
                                    var view = new Subview({
                                        el: '#placeholder',
                                    });

                                    //set the deliver id of form.
                                    //for later usage..
                                    view.delivered_id = self.$el.find('#hidden-id').val();
                                    carts.delivered_id = self.$el.find('#hidden-id').val();

                                    //render the table/form with list of carts..
                                    view.render();
                                    
                                    $('#modalListOfAllCarts').modal('show');
                            });

                        }, 1000);

                        var a = ids.length, b = 0;
                        ids.forEach(function(model) { 
                         
                            
                            //end of foreach
                        });

                    
                    });

                });

                

        	},

            getCheckedItems: function() {
                var self = this, ids = [];
                self.$el.find('tbody').find('input[type="checkbox"]:checked').each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
            }


    
    });
   
    return Subview; 
});