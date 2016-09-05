define(
	[
		//dependencies
		'underscore',
		'backbone',
		//main view
		'text!templates/category/temp_table_category.html'

	],  function(_, Backbone, template) {
   
    var ViewCategory = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#categories-table',
    
        	template: _.template(template),
    
            events: {
               
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
               
                    var $target = $('#tr-categories');
                    
                    self.$el.find('#btnCreateCategory').click(function(event) {
                            
                        require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                            function(css, alertify){
                                loadCSS('js/libs/alertify/css/alertify.core.css');
                                loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                alertify.prompt("Create category", function (e, str) {
                                    if (e) {
                                       var form = '&name=' + str +'&table=categories'; 
                                       categories.saveCategory(form);
                                    }else {
                                       console.log(e);
                                    }
                                }, 'Enter new category');
                        });

                    });

                    self.$el.find('#create-category-pills').click(function(event) {
                        setTimeout(function(){
                            $('#category-name').focus();
                        }, 600)
                    });

                    self.$el.find('#form-category').submit(function(event) {
                        event.preventDefault();
                        var form = $(this).serialize();
                        require(['models/category'], function(Category){
                            var category = new Category({
                                name: self.$el.find('#form-category').find('#search-category').val()
                            });

                            if (category.isValid()) {
                                var form = $.param(category.attributes);
                                form += '&table=categories';
                                categories.saveCategory(form);
                            };
                        });
                    });

                    self.$el.find('#search-category').keyup(function(event) {
                        var value = $(this).val().toLowerCase();
                        var lists = categories.search(value);
                        if (lists.length) {
                            require(['views/category/view_list_of_categories'], function(Subview){
                                var view = new Subview({
                                    collection: lists
                                });
                                view.render();
                                $('#no-rs').text(lists.length);
                            });
                        }else {
                            require(['modules/functions'], function(fn){
                                fn.noDataWasFound('#list-of-categories', 3, 'No result was found for: <b>'+value+'</b>');
                                $('#no-rs').text(lists.length);
                            });
                        }
                    });
                    
                    self.$el.find('#btnDeleteCategories').click(function(event) {
                        var ids = self.getCheckedCategories();
                            if (ids.length) {
                                
                                var items = '';
                                if (ids.length > 1) {
                                    items = 'items';
                                }else {
                                    items = 'item';
                                }

                                var msg = 'are you sure you want to delete ' + ids.length +' '+ items + ' ?';

                                require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                                     function(css, alertify){
                                         loadCSS('js/libs/alertify/css/alertify.core.css');
                                         loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                         alertify.confirm(msg, function(e){
                                             if (e) {
                                                categories.removeItems(ids)
                                             }else {
                                               // console.log(e);
                                             }
                                     });
                                });
                            }else {
                                require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                                     function(css, alertify){
                                         loadCSS('js/libs/alertify/css/alertify.core.css');
                                         loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                        alertify.error("Nothing to delete");
                                });
                            }
                    });
                });

                $(function() {
                    setTimeout(function() {
                       categories.appendListOfCategories();
                    }, 1000)
                });
        	},

        	// functions ..

          
            getCheckedCategories: function(){
                var ids = [];
                var $target = $('#list-of-categories').find('input[type="checkbox"]:checked');
                $target.each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
            }
        	
    
    });
   
    return ViewCategory; 
});