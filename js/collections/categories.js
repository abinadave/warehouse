define(
	[
		'underscore',
		'backbone',
		'models/category',
        'modules/product_module',
        'collections/mycollection',
		//subviews
		'views/category/view_form_add_category',
        'views/category/view_list_of_categories',
        'views/category/view_list_of_categories_by_id',
        'views/category/view_list_of_categories_in_modal',
        'views/category/view_list_of_categories_in_modal_update_product',
        'views/category/view_list_of_categories_display_by_category',
        'views/category/view_list_of_categories_searchable_dropdown'

	],  function(

            _, 

            Backbone, 
            Category, 
            ProductModule,
            MyCollection,

            //subviews
            ViewFormAddCategory, 
            ViewListOfCategories, 
            ViewListOfCategoriesById,
            ViewListOfCategoriesInModal,
            ViewListOfCategoriesInModalUpdateProduct,
            ViewListOfCategoriesDisplayByCategory,
            ViewListOfCategoriesSearchableDropdown

        ) {
   
    var Categories = Backbone.Collection.extend({
        url: 'api.php/category',

    	model: Category,

    	initialize: function(){
            this.on('add', function(model){
                console.log('new category was added');
                this.appendListOfCategories();
                this.appendListOfCategoriesInModalUpdateProduct();
            });

            this.on('remove', function(model){
                console.log('category was removed');
                this.appendListOfCategories();
                this.appendListOfCategoriesInModalUpdateProduct();
            });
    	},


        // start of functions.. -----------------------------------------------------------------------------------------------------------

        fetchData: function(){
            var self = this;
            if (self.length) {
                self.populateAll();
            }else {
                $.getJSON('ajax/select/get_categories.php', function(json, textStatus) {
                        /*optional stuff to do after success */
                }).done(function(json){
                   json.forEach(function(model) {
                       self.insert(model, 1);
                   });
                   self.populateAll();
                });
            }
        },

    	saveCategory: function(form){
    		$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
              
    		}).done(function(data){
    			var json = $.parseJSON(data);
                categories.add(json);
                require(['modules/userlog_module'], function(UM){
                    UM.saveDB('New category was added: '+json.name);
                });
    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    		
    	},

        insert: function(json, type){
            var category = new Category(json);
            categories.add(category, {silent: type});
            
            if (type === 0) {
                require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                   function(css, alertify){
                       loadCSS('js/libs/alertify/css/alertify.core.css');
                       loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                       alertify.success("Process completed");
                });
            };
            
        },

        print: function(){
            this.forEach(function(model) {
                console.log(model.attributes); 
            });
        },

        populateAll: function(){
            this.appendListOfCategories();
            this.appendListOfCategoriesInModal();
            this.appendListOfCategoriesInModalUpdateProduct();
            this.appendListOfCategoriesDisplayByCategory();
            ProductModule.fetchData();
        },

        removeItems: function(ids){
            $.post('ajax/delete/delete_category.php', { values: ids }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                categories.remove(ids);
                require(['modules/userlog_module'], function(UM){
                    UM.saveDB('Category successfully removed with ids of: '+ids);
                });
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        updateCategory: function(cid, str){
            $.post('ajax/update/update_category.php', { id: cid, name: str }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){

                var category = categories.get(cid);
                category.set({
                    name: str
                });

                require(['modules/userlog_module'], function(UM){
                    UM.saveDB('Category successfully updated');
                });

            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        searchAndReturnIds: function(value){
            var ids = [];
            this.forEach(function(model) {
               if (model.get('name').toLowerCase().indexOf(value.toLowerCase()) !== -1 || model.get('id') == value) {
                    ids.push(model.get('id'));
               };
            });
            return ids;
        },

        validateCategory: function(value){
            var error = 0;
            var result = categories.where({name: value});
           
            if (result.length) {
                error++;
                require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                 function(css, alertify){
                     loadCSS('js/libs/alertify/css/alertify.core.css');
                     loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                     alertify.error('Already exist');
                });
            }else if(value.length <= 3){
                error++;
                require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                 function(css, alertify){
                     loadCSS('js/libs/alertify/css/alertify.core.css');
                     loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                     alertify.error('Incorrect category name');
                });
            }

            return error;
           
        },

        getName: function(pid){
            var result = categories.where({id: pid});
            if (result.length) {
                var category = categories.get(pid);
                return category.get('name');
            }else {
                return 'Unknown category name';
            }
            
        },

        sortBy: function(attr, type){
            require(['libs/backbone.obscura'], function(imp){
                var proxy = new imp(categories)
                proxy.setSort(attr, type);
                // var view = new ViewListOfCategoriesById();
                // view.render(ids);
                 var view = new ViewListOfCategories({
                    collection: proxy
                 });
                 view.render();
             });
        },
       
        sortTable: function(attr, type){
             require(['libs/backbone.obscura'], function(imp){
                var proxy = new imp(categories)
                proxy.setSort(attr, type);
                // var view = new ViewListOfCategoriesById();
                // view.render(ids);
                 var view = new ViewListOfCategories({
                    collection: proxy
                 });
                 view.render();
             });
        },

        sort: function(collection, Obscura){
            var proxy = new Obscura(collection);
            return proxy.setSort('name', 'asc');
        },

        search: function(value){
            var found = new MyCollection();
            categories.forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                     if (model.get(index).toLowerCase().indexOf(value) !== -1) {
                        found.add(model);
                     };
                });
            });
            return found;
        },

        findItemLength: function(cid){
            var rs = products.where({category: cid});
            return rs.length;
        },



        //subviews --------------------------------------------------------------------------------------------

        showFormAddCategory: function(){
            var view = new ViewFormAddCategory();
            view.render();
        },

        appendListOfCategories: function(){
            var view = new ViewListOfCategories({
                collection: this
            });
            view.render();
        },

        appendListOfCategoriesById: function(ids){
            var view = new ViewListOfCategoriesById();
            view.render(ids);
        },

        appendEmptyRows: function(data){
            var length = data['length'];
            var output = '';
            var limit = 15;
            var total = limit - parseInt(data['length']);
            for (var i = 0; i < total; i++) {
                output += '<tr>';
                output += '<td>-</td>';
                output += '<td>-</td>';
                output += '<td>-</td>';
                output += '<td>-</td>';
                output += '</tr>';
            };

            $(data['element']).append(output);
        },

        appendListOfCategoriesInModal: function(){

            var view = new ViewListOfCategoriesInModal({
                collection: categories
            });
            view.render();
            
        },

        appendListOfCategoriesInModalUpdateProduct: function(){
            var view = new ViewListOfCategoriesInModalUpdateProduct({
                collection: categories
            });
            view.render();
        },

        appendListOfCategoriesDisplayByCategory: function(){
            var view = new ViewListOfCategoriesDisplayByCategory({
                collection: categories
            });
            view.render();
        },


        appendListOfCategoriesSearchableDropdown: function(ids){
            var view = new ViewListOfCategoriesSearchableDropdown();
            view.render(ids);
        }



        //subviews --------------------------------------------------------------------------------------------

    });
   
    return Categories; 
});