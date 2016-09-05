define(
	[
		'underscore',
		'backbone',
        'libs/backbone.obscura'
	],  function(_, Backbone, Obscura) {
   
    var Decommissiontool_module = {

    	afterSave: function(json){
    		json.id = decommission.get('id');
    		decommission.clear({silent: true});
    	},

        afterRefresh: function(data){
            var list = new Backbone.Collection(data);
            var proxy = new Obscura(list);
            proxy.filterBy('warehouse code', {warehouse_code: sessionStorage.getItem('code')});
            if (decommission_tools.length != proxy.length) {
                decommission_tools.reset()
                decommission_tools.add(proxy.toJSON(), {silent: true});
                console.log('not the same data');
            }else {
                console.log('the same data');
            }
        },

        removeDB: function(i, property){
            $.post('ajax/delete/delete.php', {table: 'decommission_tools', id: i, prop: property }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                decommission_tools.remove(i);
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        }
    }
   
    return Decommissiontool_module; 
});