define(['underscore','backbone'], function(_, Backbone) {
   
    var PlugIn = {

    	
    	editableTable: {

    		initialize: function(el) {
    			require(['libs/editable-table/mindmup-editabletable','libs/editable-table/numeric-input-example'], 
                    function(mindUp, input){
                    $(el).editableTableWidget();
                });
                return this;
    		},

    		validateSuppliers: function (el) {
    			$(el).on('validate', function(evt, newValue) {
    				var index = $(this).attr('data-index');
    				if (!newValue) {
    					return false;
    				};

    				switch(index) {
    				    case 'name':
    				        var rs = suppliers.where({name: newValue.toLowerCase()});
    				        if (rs.length) {
    				        	return false;
    				        }
    				        break;
    				    case 'contact':
    				        var rs = suppliers.where({contact: newValue});
    				        if (rs.length) {
    				        	return false;
    				        }
    				        break;    
    				   
    				}
    			});
    			return this;
    		},

    		onChangeSuppliers: function(el) {
    			$(el).on('change', function(evt, newValue) {
					// do something with the new cell value 
					var index = $(this).attr('data-index');
					var the_id = $(this).parent('tr').attr('id');
					console.log(the_id);

					var objValues = {}; objValues[index] = $.trim(newValue);
					
					$.post('ajax/update/update.php', {
						values: objValues,
						where: 'id',
						where_value: the_id,
						table: 'suppliers'
					}, function(data, textStatus, xhr) {
						/*optional stuff to do after success */
					}).success(function(data){
						var rs = suppliers.where({id: the_id});
						if (rs.length) {
							var model = suppliers.get(the_id);
							model.set(objValues, {silent: true});
						};
					}).fail(function(xhr){
						console.log('cant update suppliers. error type: '+xhr.status);
					});

				});
    		},

    		validateProducts: function(el) {
    			$(el).on('validate', function(evt, newValue) {

    				var index = $(this).attr('data-index');
    				
    				if (index == 'category') {
    					//comming soon..
    				}

    				if (!newValue) {
						return false;
					}

					if (index == 'id' || index == 'category' /*|| index == 'running_bal'*/) {
						return false;
					}		

					switch(index) {
					    case 'name':
					        var rs = products.where({name: newValue});
					        if(rs.length){
					        	return false;
					        }
					        break;
					    case 'area':
					        var rs = item_areas.where({name: newValue.toLowerCase()});
					        if (!rs.length) {
					        	return false;
					        };
					        break;
					    case 'row':
					        var rs = item_rows.where({name: newValue.toLowerCase()});
					        if (!rs.length) {
					        	return false;
					        };
					        break;
					    case 'shelf':
					        var rs = item_shelfs.where({name: newValue.toLowerCase()});
					        if (!rs.length) {
					        	return false;
					        };
					        break; 
					    case 'unit':
					        var rs = units.where({name: newValue.toLowerCase()});
					        if (!rs.length) {
					        	return false;
					        };
					        break;           
					}

				});
    		},

    		onChangeProducts: function(el) {
    			$(el).on('change', function(evt, newValue) {
					// do something with the new cell value 
					var index = $(this).attr('data-index');
					var the_id = $(this).parent('tr').attr('id');
					console.log(the_id);
					var objValues = {}; objValues[index] = $.trim(newValue);
					
					$.post('ajax/update/update.php', {
						values: objValues,
						where: 'id',
						where_value: the_id,
						table: 'products'
					}, function(data, textStatus, xhr) {
						/*optional stuff to do after success */
					}).success(function(data){
						var rs = products.where({id: the_id});
						if (rs.length) {
							var model = products.get(the_id);
							model.set(objValues, {silent: true});
						};
					}).fail(function(xhr){
						alert('error type: '+xhr.status);
					});

				});
    		},

    		validateTools: function(el) {
    			//validate the table when editing the td(table/data)
    			$(el).on('validate', function(evt, newValue) {
    				var index = $(this).attr('data-index');
    				if (!newValue) {
						return false;
					}

					if (index == 'toold_id' || index == 'classification') {
						return false;
					}

					switch(index) {
						case 'classification':
					        alert(newValue);
					        break;
					    case 'model':
					        var rs = tools.where({model: newValue});
					        if (rs.length) {
					        	return false;
					        };
					        break;
					    case 'shelf':
					        var rs = item_shelfs.where({name: newValue.toLowerCase()});
					        if (!rs.length) {
					        	return false;
					        };
					        break;
					    case 'area_located':
					        var rs = item_areas.where({name: newValue.toLowerCase()});
					        if (!rs.length) {
					        	return false;
					        };
					        break;
					    case 'row':
					        var rs = item_rows.where({name: newValue.toLowerCase()});
					        if (!rs.length) {
					        	return false;
					        };
					        break;
					    case 'unit':
					        var rs = units.where({name: newValue.toLowerCase()});
					        if (!rs.length) {
					        	return false;
					        };
					        break; 
					          
					}
				});
    		},

    		onChangeTools: function(el) {
    			$(el).on('change', function(evt, newValue) {
					// do something with the new cell value 
					var index = $(this).attr('data-index');
					var tool_id = $(this).parent('tr').attr('id');
					var objValues = {}; objValues[index] = newValue;
					
					$.post('ajax/update/update.php', {
						values: objValues,
						where: 'id',
						where_value: tool_id,
						table: 'tools'
					}, function(data, textStatus, xhr) {
						/*optional stuff to do after success */
					}).success(function(data){
						var rs = tools.where({id: tool_id});
						if (rs.length) {
							var tool = tools.get(tool_id);
							tool.set(objValues, {silent: true});
						};
					}).fail(function(xhr){
						alert('error type: '+xhr.status);
					});

				});
    		}

    	}

    }
   
    return PlugIn; 
});