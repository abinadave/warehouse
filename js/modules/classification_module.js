define(
	[
		'underscore',
		'backbone',
        'collections/mycollection',
		'views/classification/view_table_classification',
		'views/classification/view_list_of_classifications',
        'views/classification/view_list_of_classification_in_modal'
	],  function(_, Backbone, MyCollection, ViewTableClassification, ViewListOfClassifications, ViewListOfClassificationInModal) {
   
    var ClassificationModule = {

    	fetchData: function(){
    		if (classifications.length) {
    			ClassificationModule.populateAll();
               
    		}else {
    			$.getJSON('ajax/select/get_classifications.php', function(json, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(json){
    				ClassificationModule.saveModel(json, 1).populateAll();
    			});
    		}
    	},

    	saveDB: function(form, type){
           
    		$.post('ajax/save/save_classification.php', form, function(data, textStatus, xhr) {
    			/*optional stuff to do after success */
    		}).success(function(data){
    			var json = $.parseJSON(data);
    			if (json.id > 0) {
    				ClassificationModule.saveModel(json, type);
    			};

    		}).fail(function(xhr){
    			alert('error type: '+xhr.status);
    		});
    	},

    	saveModel: function(json, type){
    		classifications.add(json, {silent: type});
    		if (type == 0) {
                if ($('#form-add-classification').length) {
                    $('#form-add-classification')[0].reset();
                    $('#form-add-classification').find('#classification').focus();
                }
    		}

    		return this;
    	},

    	removeDB: function(rid){
    			require(
					[
						'libs/load_css/loadcss',
						'libs/alertify/js/alertify.min',
					], 
					function(css, alertify, module){
						loadCSS('js/libs/alertify/css/alertify.core.css');
						loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
						alertify.confirm('Are you sure', function(e){
							if (e) {
								$.post('ajax/delete/delete_classification.php', { id: rid }, function(data, textStatus, xhr) {
					    			/*optional stuff to do after success */
					    		}).success(function(data){
					    			if (parseInt(data) == 1) {
					    				classifications.remove(rid);
					    				$('#li-class-'+rid).slideUp('fast');
					    			}
					    		}).fail(function(xhr){
					    			alert('error type: '+xhr.status);
					    		});
							}else {
								console.log(e);
							}
						});
				});	
    	},

    	populateAll: function(){
    		this.appendListOfClassification();
            this.appendClassificationInModal();
            require(['modules/tool_module'], function(ToolModule){
                ToolModule.fetchData();
            });
            return this;
    	},

        getName: function(cid){
            var rs = classifications.where({id: cid});
            if (rs.length) {
                var classification = classifications.get(cid);
                return classification.get('name');
            }else{
                return 'Not assign';
            }
        },

        searchByTool: function(value){
            
            var mycollection = new MyCollection();
            classifications.forEach(function(model) {
                if (model.get('name').toLowerCase().indexOf(value) !== -1) {
                    mycollection.add(model.attributes)
                }
            });
            var list = new MyCollection();
            mycollection.forEach(function(modelClassification) {
                var a = modelClassification.get('id');
                tools.forEach(function(modelTool) {
                    var b = modelTool.get('classification');
                    if (a == b) {
                        list.add(modelTool.attributes)
                    };
                });
            });

            return list;
        },

        search: function(value){
            var lists = new MyCollection();
            classifications.forEach(function(model) {
               if (model.get('name').toLowerCase().indexOf(value) !== -1) {
                    lists.add(model)
               };
            });
            return lists;
        },

        sort: function(Emp, collection){
            var proxy = new Emp(collection);
            return proxy.setSort('name', 'asc');
        },

        NumOfToolsWithCIdOf: function(cid){
            var rs = tools.where({classification: cid});
            return rs.length;
        },

        autocomplete: function(el) {
            require(['libs/jquery-ui/jquery-ui.min','css!libs/css/auto-complete-list',], function(css){
                var availableTags = classifications.pluck('name');
                $(el).autocomplete({
                    source: availableTags
                });
               
            });
            return this;
        },



    	//Subviews
    	appendModalTableClassification: function(){
            if ($('#tempModalAddNewTool').length) {
                var view = new ViewTableClassification({
                    el: '#placeholder-classification'
                });
                view.render();
            }else {
                var view = new ViewTableClassification();
                view.render();
            }
    		
            return this;
    	},

    	appendListOfClassification: function(){
    		var view = new ViewListOfClassifications({
    			collection: classifications
    		});
    		view.render();
            return this;
    	},

        appendClassificationInModal: function(){   
            var view = new ViewListOfClassificationInModal({
                collection: classifications
            });
            view.render();
            return this;
        },

        appendSearchDropdown: function(lists){
            //modal add new tool
            require(['views/classification/view_list_of_searched_classification'], function(Subview){
                var view = new Subview({
                    collection: lists
                });
            });

        }

    }
   
    return ClassificationModule; 
});