function reset()
{
	var group = $('#group');
	group.siblings().addClass('hidden');  // help-inline text
	group.parent().parent().removeClass('error');  // control-group

	var password = $('#password');
	password.siblings().addClass('hidden');  // help-inline text
	password.parent().parent().removeClass('error');  // control-group
}

function generator()
{
	var username = $('#group').val();
	var password = $('#password').val();
	
	if(username.length != 0 && password.length != 0)
	{
		/*
		 * Generate bookmarklet based on exposed API
		 */
		var bookmarklet = "javascript:(function(){_my_script=document.createElement('SCRIPT');_my_script.type='text/javascript';_my_script.src='http://sendtab.com/bookmarklet?auth=%AUTH_MD5_HASH%&amp;x='+(Math.random());document.getElementsByTagName('head')[0].appendChild(_my_script);})();"

		var authstring = $.md5($('#group').val().toLowerCase() + $('#password').val());
		var generated = bookmarklet.replace('%AUTH_MD5_HASH%', authstring);

		/*
		 * Make SendTab bookmarklet link button in the middle horizontally and vertically
		 */
		$('#output').show();
		$('#code').text(generated);
		$('#wrap').css('height', Math.floor($('#code').outerHeight()) + 'px');
		$('#link').attr('href', generated);

		reset();
	}
	else
	{
		reset();

		if(username.length == 0)
		{
			var group = $('#group');
			group.siblings().removeClass('hidden');
			group.parent().parent().addClass('error')
		}
		if(password.length == 0)
		{
			var password = $('#password');
			password.siblings().removeClass('hidden');
			password.parent().parent().addClass('error');
		}
	}
};

/*
 * Do event binding when document is ready
 */
$(function() {
	$('#reset').click(function() {
		$('#output').hide();

		reset();
	});
});
