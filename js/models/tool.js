define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Model = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                var model = this.attributes;
                var prev = this.changedAttributes();
                pubnub.publish({channel: 'tools', message: {model, type: 'change', sender: sessionStorage.getItem('uid') }});
                require(['modules/tool_module'], function(ToolModule){
                    ToolModule.appendListOfTools();  
                });
                if (this.hasChanged('model')) {
                    var older = this.previous('model');
                    var newer = this.get('model');
                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('tool has changed model from: '+ older + ' to: ' + newer);
                    });
                };
                if (this.hasChanged('size')) {
                    var older = this.previous('size');
                    var newer = this.get('size');
                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('tool has changed size from: '+ older + ' to: ' + newer);
                    });
                };
                if (this.hasChanged('rand')) {
                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('tool has changed image');
                    });
                };
                if (this.hasChanged('remarks')) {
                    var older = this.previous('remarks');
                    var newer = this.get('remarks');
                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('tool has changed remarks from: '+ older + ' to: ' + newer);
                    });
                };
                if (this.hasChanged('serial_no')) {
                    var older = this.previous('serial_no');
                    var newer = this.get('serial_no');
                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('tool has changed serial no. from: '+ older + ' to: ' + newer);
                    });
                };
                if (this.hasChanged('unit')) {
                    var older = this.previous('unit');
                    var newer = this.get('unit');
                    require(['modules/userlog_module'], function(UserlogModule){
                        UserlogModule.saveDB('tool has changed unit from: '+ older + ' to: ' + newer);
                    });
                };
    		});

            this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
    	defaults: {
    		classification: 'none',
    		model: 'none',
    		size: 'unknown',
    		unit: 'unkown',
    		serial_no: 'unknown',
    		remarks: 'none',
    		area_located: 'unknown'
    	},

        validate: function(attrs, options) {
            if (!attrs.model) {
                return 'Model name is required.';
            };

            if (!attrs.size) {
                return 'size is required.';
            };

            if (!attrs.classification) {
                return 'classification is required.';
            };

            // var rsClassification = classifications.where({name: attrs.classification});
            // if (!rsClassification.length) {
            //     return 'Invalid tool classification';
            // };

            if (!attrs.serial_no) {
                return 'serial_no is required.';
            };

            if (!attrs.remarks) {
                return 'remarks is required.';
            };

            if (!attrs.area_located) {
                return 'area is required.';
            };

            // if (item_shelfs.where({name: attrs.area_located}).length == 0) {
            //     return 'Cant find the particular area you specified.';
            // };

            if (!attrs.shelf) {
                return 'shelf is required.';
            };

            if (!attrs.row) {
                return 'row is required.';
            };

            if (!attrs.unit) {
                return 'unit is required.';
            };
        }
    
    });
   
    return Model; 
});
