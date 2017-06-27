$(document).ready(function() {  
	$(".sub-menu").hide();	
	$(".sub-menu__icon").hide();
	$(".main-menu__icon").show();

	$( ".main-menu__icon" ).click(function() {
		$( ".sub-menu" ).slideToggle(function() {
			$( ".main-menu__icon" ).hide();
			$( ".sub-menu__icon" ).show();
			});
		});
	$( ".sub-menu__icon" ).click(function() {
		$( ".sub-menu" ).slideToggle(function() {
			$( ".sub-menu__icon" ).hide();
			$( ".main-menu__icon" ).show();
			});
		});

	$(".scroll-up").hide();
	$(function(f){
    var element = f('.scroll-up');
    f(window).scroll(function(){
       element['fade'+ (f(this).scrollTop() > 300 ? 'In': 'Out')](500);           
    });
	});

	var $page = $("html, body");
	$('a[href="#scroll"]').click(function() {
   	$page.animate({
     scrollTop: $($.attr(this, "href")).offset().top
    }, 1000);
    return false;
	});
});


