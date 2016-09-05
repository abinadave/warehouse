$(function() {
	$('#logout').click(function(event) {

		// require(['modules/account_module'], function(AM){
		// 	pubnub.publish({
		// 		 channel: 'active_users',
		// 		 message: {type: 'remove', uid: sessionStorage.getItem('uid'), name: sessionStorage.getItem('name') }
		// 	});     
		// });

		$.post('ajax/others/destroy_session.php', { destroy: 'true' }, function(data, textStatus, xhr) {
	
		}).success(function(data){
			
			require(['modules/userlog_module','modules/account_module',
				'modules/functions'], function(UserlogModule, AccountModule, fn){
				UserlogModule.saveDB('System logged out..');
				AccountModule.setStatus(sessionStorage.getItem('uid'), 0);
				if (Number(sessionStorage.getItem('usertype')) === 3) {
					$.post('ajax/update/update.php', {
						table: 'warehousemens',
						values: { last_active: fn.trueDate() },
						where: 'id',
						where_value: sessionStorage.getItem('uid')
					}, function(data, textStatus, xhr) {
						/*optional stuff to do after success */
					}).success(function(data){
						console.log(data);
					}).fail(function(xhr){
						alert('error type: '+xhr.status);
					});
				}else {
					$.post('ajax/update/update.php', {
						table: 'accounts',
						values: { last_active: fn.trueDate() },
						where: 'id',
						where_value: sessionStorage.getItem('uid')
					}, function(data, textStatus, xhr) {
						/*optional stuff to do after success */
					}).success(function(data){
						console.log(data);
					}).fail(function(xhr){
						alert('error type: '+xhr.status);
					});
				}
			});

			setTimeout(function() {
				sessionStorage.clear();
				window.location = '.';
			}, 1000);

		}).fail(function(xhr){
			alert('error type: '+xhr.status);
		});
	});
});

$(function() {
	$('#side-menu').find('a').hover(function() {
		$(this).find('i').animate({
			fontSize: '+=10px'
		}, 80);
		$(this).addClass('text-info');	
	}, function() {
		$(this).find('i').animate({
			fontSize: '-=10px'
		}, 80);
		$(this).removeClass('text-info');		
	});
});

$(function() {
	var ctr = 0;
	$('#bell-notifications').click(function(event) {
		++ctr;
		var is = (ctr % 2 == 1) ? true : false;
		if (is) {
			require(['modules/collection_module','modules/notification_module'], 
        	    function(colmod, notification_module){
        	    	// setTimeout(function() {
        	    		colmod.fetchWhere('notifications', notification_module);
        	    	// }, 4000);
        	});
		}
	});
});

$(function() {
	$('#li-messages').click(function(event) {
		require(['modules/contact_module'], 
			function(ContactModule){
		    	ContactModule.trigger('appendTable').trigger('fetchData');
		});
	});
});

jQuery(document).ready(function($) {
	$('#manage-li li a').click(function(event) {
		/* Act on the event */
		$('#manage-li li a').removeClass('active');
		$(this).addClass('active');
	});
});

jQuery(document).ready(function($) {
	$('a#chat-li').click(function(event) {
		require(['views/account/view_panel_chat'], function(ViewPanelChat){
			  var view = new ViewPanelChat();
			  view.render(); 
		});
	});
});

jQuery(document).ready(function($) {
	$('#navigation #image-user').click(function(event) {
		if (!_.isEmpty(sessionStorage.getItem('uid'))) {
			require(['modules/account_module'], function(AccountModule){
			    AccountModule.appendModalUpdateAccountImage();
			});
		}
	});
});

jQuery(document).ready(function($) {
	require(['modules/functions'], function(fn){
	    fn.timer();
	});
});

$(function() {
	
	$('#supplier-li').click(function(event) {
		require(['modules/supplier_module'], function(SM){
			SM.appendTable().fetchData();
		});
	});

	$('#unit-li').click(function(event) {
		require(['modules/unit_module'], function(UnitModule){
		    UnitModule.trigger('fetchData').trigger('appendModal');

		});
	});

});

jQuery(document).ready(function($) {

	// tooltip demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    // popover demo
    $("[data-toggle=popover]").popover();

});


jQuery(document).ready(function($) {
	$(window).on('load', function(){
   		if (sessionStorage.getItem('rand')) {
   			var dir = 'images/account/' + sessionStorage.getItem('uid') + '-' + sessionStorage.getItem('rand') + '.jpg';
   			$('#image-user').attr('src', dir);
   		}
   		require(['modules/functions'], function(fn){
   		    var usertype = sessionStorage.getItem('name');
   		    $('span#nav-users-name').html(usertype);
   		});
	});
});

$(function() {
	$('#send-mail').click(function(event) {
		require(['modules/account_module'], function(AccountModule){
			AccountModule.appendModalMailForm();
		});
	});
});

$(function () {
  $('.js-loading-button').on('click', function () {
    var btn = $(this).button('loading')
    setTimeout(function (){
      btn.button('reset')
    }, 3000)
  });
});


$(function() {
	var refreshTime = 600000; // every 10 minutes in milliseconds
	// var refreshTime = 5000;
	window.setInterval( function() {
	    $.post('ajax/others/refresh_session.php', sessionStorage , function(data, textStatus, xhr) {
	    	/*optional stuff to do after success */
	    }).success(function(data){
	    	console.log('refreshed the session');
	    }).fail(function(xhr){
	    	alert('cant refresh you session right now.: '+xhr.status);
	    });
	}, refreshTime );
});

$(function() {
	$('#setting-li').click(function(event) {
		/* Act on the event */
		require(['modules/account_module'], function(am){
		    am.appendModalEditSetting();
		});
	});
});