
define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
	   (function (factory) {
	     if (typeof define === 'function' && define.amd) {
	       define(['jquery'], factory);
	       define(['jquery','datatables'], factory);
	     }
	     else {
	         factory(jQuery);
	     }
	 }


	 (function(){

	 });	
});