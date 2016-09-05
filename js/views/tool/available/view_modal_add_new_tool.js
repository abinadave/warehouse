define(
	[
		'underscore',
		'backbone',
		'text!templates/tool/available/temp_modal_add_new_tool.html'
	],  function(_, Backbone, template) {
   
    var ViewModalAddNewTool = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modals',
    
        	template: _.template(template),
    
            events: {
               
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var $form = $('#form-add-new-tool'), self = this;
                $(function(){
                    $form.find('input, select').css({
                        width: '250px'
                    }).end()
                    .find('label').css({
                        margin: '5px'
                    });
                });

                $(function() {
                    require(['modules/initialization_module'], function(im){
                        im.initAreaRowShelfAutocomplete(self);
                    });
                });

                $(function() {
                    self.$el.find('#item-setting').click(function(event) {
                        require(['views/product/attribute/view_modal_item_setting'], function(Subview){
                            var view = new Subview();
                        });
                    });
                });

                $(function() {
                    setTimeout(function() {
                        $(function() {
                            require(['modules/unit_module'], function(UnitModule){
                                UnitModule.trigger('initAutoComplete', '.unit-autocomplete');
                                $('.unit-autocomplete').css('height', '33px');
                            });
                        });
                    }, 500)
                });

                $(function() {
                    $form.submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        var form = $(this).serialize();
                        require(['modules/tool_module'], function(ToolModule){
                            // var fn = require('modules/functions');
                            // var obj = fn.clearObject(form);
                            ToolModule.saveDB(form);
                        });
                    });
                });

                $(document).ready(function() {
                    require(['modules/classification_module'], function(ClassificationModule){
                        ClassificationModule.appendClassificationInModal();
                    });
                }); 

                $(function() {
                    var i = 0;
                    self.$el.find('#addClassificationOnTheFly').click(function(event) {
                       router.navigate('toolClassification', true);
                    });
                });

                $(function() {
                    self.$el.find('#btnSaveClassification').click(function(event) {
                        event.preventDefault();
                        var value = $('#classification-onthefly').val();
                        var form = 'name=' + value;
                        var CM = require('modules/classification_module');
                        CM.saveDB(form, false);
                        self.$el.find('#addClassificationOnTheFly').trigger('click');
                        $('#classification-onthefly').val('');
                    });
                });

                $(function() {
                    var i = 0, cm = require('modules/classification_module');
                    self.$el.find('#search-classification').on('click', function(event) {
                        if ($(this).val() != '') {

                        } else{
                            cm.appendSearchDropdown(classifications);
                        };
                       
                    }).keyup(function(event) {
                        var value = $(this).val();
                        console.log('appended A')
                        var list = cm.search(value.toLowerCase());
                        cm.appendSearchDropdown(list);
                    });
                });

                $(function() {
                    self.$el.click(function(event) {
                        var target = event.target.nodeName;
                        if (target == 'DIV') {
                            self.emptySearchList();
                        }
                    });
                });

                $(function() {
                    self.$el.find('#model').keyup(function(event) {
                        var value = $(this).val();
                        var rs = tools.where({model: value.toLowerCase()});
                        if (rs.length) {
                           router.alertify_error('model name: <b style="text-primary">' + value + '</b> already exist');
                        };
                    });
                });


        	},

            emptySearchList: function(){
                var self = this;
                self.$el.find('#list-searched-classification').empty();
            }
    
    });
   
    return ViewModalAddNewTool; 
});