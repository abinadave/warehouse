define(
    [
        'underscore',
        'backbone',
        'models/model',
        'moment',
        'libs/backbone.obscura',
        'collections/mycollection',
    ],  function(_, Backbone, Model, moment, Obscura, MyCollection) {
   
    var Functions = {

        loadData(arrOfCols, fn){
            var length = arrOfCols.length;
            var fetched = 0;
            arrOfCols.forEach(function(collection) {
                $.when(window[collection].fetch({
                    url: '/get/'+collection,
                    silent: true
                })).then(function(arguments) {
                    ++fetched;
                    if (fetched === length) {
                        fn();
                    }
                }, function(arguments) {
                    console.log('error');
                })
            });
        },
        
        //Reusable codes..
        sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        },

        printPart: function(divId) {
            var prtContent = document.getElementById(divId);
            var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
            WinPrint.document.write(prtContent.innerHTML);
            // WinPrint.document.write('<link rel="stylesheet" type="text/css" href="bootstrap/flat-ui/bootstrap/css/bootstrap.css">');
            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
        },

        getUsertype: function(type){
            if (type == 3) {
                return 'Warehousemen';
            } else if(type == 2){
                return 'Manager';
            }else if(type == 1) {
                return 'Administrator';
            }
        },

        tableResponsive: function(table) {
              var h = $(window).height();
              var w = $(window).width();
              if (w < 1500 && h < 1000) {
                 $(table).css({
                    'width': '1700px'
                 });
                
              }else{
                
              }
        },

        appendView: function(path){
            require([path], function(Subview){
                var view = new Subview();
            });
        },

        initAutocomplete: function(el, attr, collection, module){
            require(['libs/jquery-ui/jquery-ui.min','css!libs/css/auto-complete-list',], function(css){
                var availableTags = window[collection].pluck(attr);
                $(el).autocomplete({
                    source: availableTags,
                    change: function (event, ui) { 
                        if (module.hasOwnProperty('callBackAutocomplete')) {
                            module.callBackAutocomplete($(this).val());
                        }
                    }
                });
                console.log(availableTags);
            });
            return this;
        },

        iosBadge: function(proxy, ownTheme, ownSize, el, displacement){
            require(['libs/ios-badge/iosbadge.min','css!libs/ios-badge/iosbadge'], function(){
                var length = proxy;
                    setTimeout(function() {
                       $('#'+el).iosbadge({ position: displacement, theme: ownTheme, size: ownSize, content: length.toString()});
                    }, 300);
            });
        },

        backboneCollection: function(name, name2, thismodule){
            var Obj = Backbone.Collection.extend({
            
                model: Model,
                    
                initialize: function(){
                    this.on('add', function(model){
                        console.log('new '+ name +' was added');
                        thismodule.trigger('callbackAdd', model.attributes);
                    });
                    this.on('remove', function(model){
                        console.log(name +'successfully removed');
                        thismodule.trigger('callbackRemove', model.attributes);
                    });
                },
            
                print: function(){
                    window[name2].forEach(function(model) {
                        console.log(model.attributes); 
                    });
                }
            
            });

            window[name2] = new Obj();
        },

        getRows: function(tbl, thismodule){
            console.log('from: '+ tbl);
            $.post('ajax/select/count_rows.php', {table: tbl}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                if (thismodule.hasOwnProperty('callbackRows')) {
                    thismodule.callbackRows(parseInt(data));
                }
            });
        },

        refreshData: function(tbl, module, str_collection){
            $.getJSON('ajax/select/select.php', { table: tbl }, function(json, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(json){

                if (sessionStorage.getItem('usertype') == 1 && sessionStorage.getItem('usertype') == 2) {
                    //admin side.
                    if (json.length != window[str_collection].length) {
                        window[str_collection].reset();
                        window[str_collection].add(json);
                        console.log('not the same data, admin side');
                    }else{
                        console.log('has the same data, admin side');
                    }
                }else {
                        
                        var list = new Backbone.Collection(json);
                        var proxy = new Obscura(list);

                        //gets the first model from the collection..
                        var first = proxy.first();

                        //check if it has attr of warehouse_code..
                        if (proxy.length > 0 && first.hasOwnProperty('warehouse_code')) {
                            //filter out by warehouse code.
                            proxy.filterBy('warehouse code', {warehouse_code: sessionStorage.getItem('code')});
                            
                            if (window[str_collection].length != proxy.length) {
                                window[str_collection].reset()
                                window[str_collection].add(proxy.toJSON(), {silent: true});
                                console.log('not the same data: '+str_collection);
                            }else {
                                console.log('the same data: '+str_collection);
                            }

                        }else { 
                            //checks if the data from the server and models are the equal.
                            proxy.filterBy('warehouse code', {warehouse_code: sessionStorage.getItem('code')});
                            
                            if (proxy.length > 0 && proxy.length != window[str_collection].length) {
                                //not equal then, refresh the models.
                                window[str_collection].reset();
                                window[str_collection].add(json, {silent: true});
                                console.log('not the same attr with no warehouse_code attr: '+str_collection);
                            }else{
                                //the same.
                                console.log('the same data with no warehouse_code attr: '+str_collection);
                            }

                        }
                }

            }).fail(function(xhr){
                console.log('error type: '+xhr.status);
            });
        },

        initUsertypes: function(el){
            require(['modules/suggestion_module',
                'libs/jquery-ui/jquery-ui.min',
                'css!libs/css/auto-complete-list'], function(sm, jqueryUi, jqueryCss){
                var availableTags = ['Administrator','Manager','Warehousemen'];
                $(el).autocomplete({
                    source: sm.getAllPosition()
                });
            });
            return this;
        },


        escapeRegExp: function(string) {
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        },

        replaceAll: function(string, find, replace) {
            return string.replace(new RegExp(Functions.escapeRegExp(find), 'g'), replace);
        },

        zeroPad: function(num, places){
            var zero = places - num.toString().length + 1;
            return Array(+(zero > 0 && zero)).join("0") + num;
        },

        clearObject: function(form){
            var obj = router.getQueryParameters(form);
            $.each(obj, function(key) {
               var newValue = Functions.replaceAll(obj[key],'+',' ');
               obj[key] = newValue;
            });
            return obj;
        },

        datatablePlugin: function(table){
            $(function() {
                require(['libs/load_css/loadcss','DT-bootstrap','datatable'], 
                    function(css, dt1, dt2){
                      loadCSS('sb-admin2/css/plugins/dataTables.bootstrap.css');
                      $(table).dataTable();
                });
            });
        },

        datepickerPlugin: function(id){
            require(['libs/jquery-ui/jquery-ui.min'], function(){
                $(id).datepicker();
            });
        },

        floatedTheadPlugin: function(table, closest){
            require(['libs/fixed-thead/jquery.floatThead-slim'], function(){
               var $table = $(table);
                $table.floatThead({
                    scrollContainer: function ($table) {
                        return $table.closest(closest);
                    }
                });
            });
        },

        noDataWasFound: function(id, cs, msg){
            var output = '<tr><td colspan=\''+cs+'\'>'+msg+'</td></tr>';
            $(id).html(output);
        },

        playSound: function(dir){
            require(['libs/sound-player/jquery.playSound'], function(playSound){
                $.playSound(dir);
            });
        },

        validateEmail: function(email){
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        },

        getCurrectHour: function(){
            var now = new Date();
            var hours = now.getHours() % 12 || 12;
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            var meridiem = '';
            var zero = '';
            var hour = now.getHours();
                
            if (hour < 12) {
                meridiem = ' am';
            } else {
                meridiem = ' pm';
            }
                hour = hour % 12;
            if (hour==0) {
                hour = 12;
            }

            if (minutes <= 9) {
                zero = '0' + minutes;
            }else {
                zero = minutes;
            }
            hour = hour + ' ' + meridiem;
            return hours + ":" + zero + "" + meridiem;
        },

        getDate: function(){
           return moment().format("YYYY-MM-DD HH:mm:ss");
        },

        trueDate: function(arguments) {
            return moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        },

        timer: function(){
            window.setInterval(function(){
                var now = moment().format("dddd MMMM DD, YYYY h:mm:ss A");
                $('.footer').find('#current-time').text(now);
            }, 1000);
        },

        ifEmpty: function(value){
            if (value == '') {
                return '-';
            }else {
                return value;
            }
        },

        add_loading_btn: function(element, interval){
            require(
                [
                    'libs/bootstrap/transition',
                    'libs/bootstrap/button'
                ], 
                function(){
                    $(element).on('click', function () {
                    var btn = $(this).button('loading');
                        setTimeout(function (){
                          btn.button('reset');
                        }, interval);
                    });
            });       
        }


    }
   
    return Functions; 
});