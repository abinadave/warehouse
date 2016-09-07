define(['underscore','backbone','text!templates/product/borrow/temp_table_borrow_stock_cards.html','modules/collection_module','modules/borrowerpform_module'], 
    function(_, Backbone, template, colmod, bpfm) {
   
    var SubviewTable = Backbone.View.extend({
    
        	initialize: function(){
                // this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main-borrowed',
    
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
                    
                    $.when(borrower_pitems.fetch({
                        silent: true,
                        url: 'api.php/get/borrower_pitems'
                    })).then(function(arguments) {
                        $.when(borrower_pforms.fetch({
                            silent: true,
                            url: 'api.php/borrower_pform'
                        })).then(function(arguments) {
                            require(['views/tool/borrow/view_list_of_borrower_pforms'], function(Subview){
                                var view = new Subview({
                                    collection: borrower_pforms
                                });
                            });
                        });
                    });
                    
                });

                $(function() {
                    var width = $(window).width();
                    var height = $(window).height();
                    self.$el.find('#table-history-borrow').css({
                        width: width + 400 + 'px'
                    });
                    self.$el.find('#div-table-history-borrow').css({
                        height: height - 200 + 'px'
                    });
                    console.log(height)
                });

                $(function() {
                    self.$el.find('#search-borrower-pform').keyup(function(event) {
                        var value = $(this).val();
                        var list = colmod.search('borrower_pforms', value);
                        bpfm.appendList(list);
                    });
                });
        	}
    
    });
   
    return SubviewTable; 
});