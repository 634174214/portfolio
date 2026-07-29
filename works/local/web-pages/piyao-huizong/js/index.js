var phoneMenu = function() {
	var $menuCl = $('#menuClose'),
		$menuPop = $('#menuPid'),
		$sousCs = $('#souYinHq'),
		$black = $('#black'),
		btnSwith = 'closed';
	var menuClickFn = function() {
		if(btnSwith === 'closed') {
			$black.attr('class', 'black');
			$menuPop.attr('class', 'menuPop movedown Mdown');
			$sousCs.attr('class','anmaiClose');
			$menuCl.attr('class','nav-hamburger opened');
			btnSwith = 'opened';
		} else {
			setTimeout(function(){ $black.attr('class', 'disnone'); },300);
			$menuPop.attr('class', 'menuPop moveup Mup');
			$sousCs.attr('class','wadd-search');
			$menuCl.attr('class','nav-hamburger');
			btnSwith = 'closed';
		}
	}
	$menuCl.on('click', menuClickFn);
}();
	
AOS.init({
	easing: 'ease-out-back',
	duration: 800
});

var qrurl = 'https://ssl.qdxin.cn/api.tech/qrxin.php?data=' + window.location.href;
$('#wx-qr-img').attr('src', qrurl);