define(
	[
		'underscore',
		'backbone',
        'collections/mycollection',
		'views/userlog/view_table_userlogs',
        'libs/backbone.obscura',
        'moment'
	],  function(_, Backbone, MyCollection, ViewTableUserlogs, Obscura, moment) {
   
    var UserlogModule = {

        fetchData: function(){
            
            if (userlogs.length) {
                UserlogModule.populateAll();
                UserlogModule.getRows();    
            }else {
                if (sessionStorage.getItem('usertype') == 1) {
                     $.getJSON('ajax/select/select.php', {table: 'userlogs'}, function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        UserlogModule.saveModel(json, 1).populateAll();
                        
                    }).fail(function(xhr){
                        alert('error type: '+xhr.status);
                    });
                } else{
                    router.alertify_error('Access Denied').navigate('availableTools', true);
                    UserlogModule.saveDB('Trying to access userlogs');
                };    
            }
        },

        getRows: function(){
            $.post('ajax/select/count_rows.php', {table: 'userlogs'}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                if (parseInt(data) != userlogs.length) {
                    userlogs.reset();
                    UserlogModule.fetchData();
                    console.log('data not match');
                };
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        saveDB: function(activity){
            require(['moment','modules/functions'], function(moment, fn){
                var now = moment().format("YYYY-MM-DD HH:mm:ss");
                var objLogs = {activity: activity,date: now,time: fn.getCurrectHour(),user: sessionStorage.getItem('name') ,usertype: sessionStorage.getItem('usertype') }
                var formLogs = $.param(objLogs);
                formLogs += '&table=userlogs';
                $.post('ajax/save/save.php', formLogs, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var json = $.parseJSON(data);
                    UserlogModule.saveModel(json, 0);
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            });
        },

        saveModel: function(json, type){
            if (typeof userlogs != "undefined") {
               userlogs.add(json, {silent: type});
            }
            return this;
        },

        deleteDB: function(i){
            $.post('ajax/delete/delete.php', {table: 'userlogs',  id: i, prop: 'id' }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                userlogs.remove(i);
               
                
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        searchWithUsertypeOf: function(value){
            var proxy = new Obscura(userlogs);
            $('input#date').val('');
            if (value == 0) {
                return proxy;
            } else{
                proxy.filterBy('get by usertype', {usertype: value});
                return proxy;
            };
        },

        getUsertype: function(index){
            var usertypes = ['','admin','manager','warehousemen'];
            return usertypes[index];
        },

        search: function(value){
            var lists = new MyCollection();
            userlogs.forEach(function(model) {
               $.each(model.attributes, function(key) {
                  if(model.get(key).toLowerCase().indexOf(value) !== -1){
                      lists.add(model);
                  }
               });
            });
            return lists;
        },

        getChecked: function(){
            var ids = [''];
            jQuery(document).ready(function($) {
                $('#list-of-userlogs').find('input[type="checkbox"]:checked').each(function(index, el) {
                   ids.push($(this).val());
                });
            });
            return ids;
        },

        populateAll: function(){
            this.appendListOfLogs();
            this.subscribe();
        },

        subscribe: function(){
            /*
            pubnub.subscribe({
                channel: 'userlogs',
                message: function(m){
                    if (sessionStorage.getItem('usertype') == 1) {
                        userlogs.add(m.model);
                        UserlogModule.appendListOfLogs();
                    }
                }
            });
            */
        },

        dataTable: function(){
            require(['libs/load_css/loadcss','DT-bootstrap','datatable'], 
                function(css, dt1, dt2){
                   var table = $('#table-logs').dataTable();
            });
        },

        sort: function(Obscura, collection){
            var proxy = new Obscura(collection);
            return proxy.setSort('date', 'desc');
        },

        filterDates: function(d1, d2) {
            var date1 = moment(d1).subtract(1, 'd').format('dddd MMMM DD, YYYY');
            var date2 = moment(d2).add(1, 'd').format('dddd MMMM DD, YYYY');
            var list = new Backbone.Collection();
            userlogs.forEach(function(model) {
                if (moment(model.get('date')).isBetween(date1, date2)) {
                    list.add(model);
                };
            });
            return list;
        },




        //Subviews..

    	appendTableUserlogs: function(){
    		var view = new ViewTableUserlogs();
            return this;
    	},

        appendListOfLogs: function(){
            require(['views/userlog/view_list_of_logs'], function(ViewListOfLogs){
                var view = new ViewListOfLogs({
                    collection: userlogs
                });
                view.render();
            });
        },

        appendList: function(list) {
            require(['views/userlog/view_list_of_logs'], function(ViewListOfLogs){
                var view = new ViewListOfLogs({
                    collection: list
                });
                view.render();
            });
        }



    }
   
    return UserlogModule; 
});