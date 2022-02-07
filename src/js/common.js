
$.fn.isVisible = function () {

	let elementTop = $(this).offset().top;
	let elementBottom = elementTop + $(this).outerHeight();

	let viewportTop = $(window).scrollTop();
	let viewportBottom = viewportTop + $(window).height() * 0.75;

	let flag = elementBottom > viewportTop && elementTop < viewportBottom;

	let item = $(this)

	if(flag) {

		if(item.hasClass('pfl-bg')) {
			let src = item.attr('href');
			$('<img>').attr('src', src).load(function(){
				item.css('background-image', 'url(' + src + ')');
				item.removeClass('pfl-lazy');
				item.removeClass('pfl-bg');
			});
		}
		if(item.hasClass('pfl-lazy')){
			let 
			src = item.attr('data-src');
			item.removeAttr('data-src');

			item.attr('src', src);
			item.on('load', function(){
				item.removeClass('pfl-lazy');
			})
		}
		if(item.hasClass('pfl')){

		}
	}
};

textsize = function(){
	var text = $('.form__textarea-auto');

	text.each(function(){
		$(this).attr('rows',1);
		resize($(this));
	});

	text.on('input', function(){
		resize($(this));
	});

	function resize ($text) {
		var 
		bt = parseInt($text.css('border-top-width')),
		bb = parseInt($text.css('border-bottom-width'));
		$text.css('height', 'auto');
		var h = $text[0].scrollHeight + bt + bb;
		$text.css('height', h+'px');
	}
}

winScroll = function(){


	if($(window).scrollTop() > 70) {
		$('.header').addClass('fixed');
	}else{
		$('.header').removeClass('fixed');
	}
	

}

showModal = function($href, $class="", $type=""){
	$instance = $.fancybox.getInstance();
	if($instance){$instance.close();}

	$.fancybox.open({
		src  : $href,
		type : 'inline',
		opts : {
			// baseClass: 'fancy-custom ' + $class,
			baseClass: $class,
			// animationEffect: "zoom-in-out",
			// animationEffect: false,
			touch: false,
			afterShow : function( instance, current ) {
				this.opts.animationEffect = true;
				this.opts.animationEffect = 'fade';
				$(current.src).addClass('active');
			},
			beforeClose : function( instance, current ) {
				$(current.src).removeClass('active');
			},
		}
	});
}

$(function(){

	$(window).on('load scroll resize', winScroll);

	if($('.to_catalog').length) {
		var tclg = [];
		tclg.catalog_top = 0;
		tclg.cont = $('.topcat__cont');
		tclg.data = $('.topcat__data_in');
		tclg.btn = $('.to_catalog');
		$(window).on('load scroll resize', function(e) {
			if(e.type === 'load' || e.type === 'resize') {
				tclg.catalog_top = $('.section_catalog').offset().top;
				tclg.height = tclg.btn.outerHeight();
				tclg.margin = 15;
				if($(window).width() >= 992) {tclg.margin = 40;}

				tclg.offset = tclg.cont.offset().top + tclg.cont.outerHeight();
				tclg.start = tclg.data.offset().top + tclg.data.outerHeight() + tclg.margin;
				tclg.position = $(window).height() - tclg.height - 30;
			}

			if(tclg.start + tclg.height / 2 + $(window).scrollTop() > tclg.offset) {
				tclg.btn.addClass('active').css({
					'top' : tclg.position + 'px',
					'left' : tclg.cont.offset().left + 'px'
				});
			}else{
				tclg.btn.removeClass('active').css({
					'top' : tclg.start + 'px',
					'left' : tclg.cont.offset().left + 'px'
				});
			}

			if(tclg.btn.offset().top + tclg.height >= tclg.catalog_top) {
				tclg.btn.addClass('bottom');
			}else{
				tclg.btn.removeClass('bottom');
			}

		});
	}

	if($('.form__textarea-auto').length) {textsize();}

	// ANIMATION
	var controller = new ScrollMagic.Controller();

	if($('.anim-item').length) {
		$('.anim-item').each(function(){
			new ScrollMagic.Scene({
				triggerElement: this, 
				triggerHook: "onEnter",
				offset: window.innerHeight * 0.25 
			})
			.reverse(false)
			.setClassToggle(this, "animated")
			.addTo(controller);
		});
	}
	// # ANIMATION

	$('[data-fancybox-video]').fancybox({
		baseClass: 'fancy-custom-video'
	});

	// $('input[name="phone"]').inputmask("+375 (99) 999-99-99");

	$('.wish').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		if($(this).hasClass('wish-add')) {
			showModal('#modal_wish', 'fancy-wish');
		}
	})

	$(document).on('click','.modalshow', function(e){
		e.preventDefault();
		var 
		$href = $(this).attr('href'),
		$class = $(this).attr('data-class');

		if($href === '#modal_search') {
			showModal('#modal_search', 'fancy-from-top fancy-under');
		}else{
			showModal($href, 'fancy-from-top ' + $class);
		}

		
	})

	$(document).on('click', '.search__clear', function(e){
		e.preventDefault();
		$(this).siblings('input').val('');
	})
	$('.search__form input[name="search"]').on('change', function(){
		if($(this).val().length) {
			$(this).siblings('.search__clear').addClass('active');
		}else{
			$(this).siblings('.search__clear').removeClass('active');
		}
	})

	$(document).on('click', '.catnav__item-more', function(e){
		e.preventDefault();
		$(this).closest('.catnav__outer').addClass('active');
		$(this).hide();
	})

	/* FILTER */
	$(document).on('click', '.drop__btn', function(){
		$(this).closest('.drop__item').toggleClass('show');
	})
	window.onclick = function(e) {
		if (!$('.show').is(e.target) && $('.drop__item.show').has(e.target).length === 0) {
			$('.drop__item.show').removeClass('show');
		}
	}
	$('.filter__select-list input').on('change', function(){
		var
		$self = $(this).closest('.filter__select'),
		$qty = $self.find('.filter__select-option input:checked').length;

		if($qty) {
			$self.find('.filter__select-count').text($qty + 'x');
		}else{
			$self.find('.filter__select-count').text('');
		}


	})
	/* # FILTER */

	/* MENU */
	splitMenu = function(){
		$('.mmenu__split').each(function(key,value) {
			var w = $(value).find('span').eq(0).outerWidth();
			$(value).css('margin-left', '-' + w + 'px');
		})
	}
	changeMenuClosePos = function(){
		var $close = $('.mmenu__close');
		if($('.head__menu .mmenu__show_icon').is(':visible')) {
			var $btn = $('.head__menu .mmenu__show_icon');
		}else{
			var $btn = $('.head__mmenu .mmenu__show_icon');
		}
		$close.css({
			"top"	: $btn.offset().top - $(window).scrollTop(),
			"left"	: $btn.offset().left,
			"margin-left"	: -($close.outerWidth() - $btn.outerWidth()) / 2,
			"margin-top"	: -($close.outerHeight() - $btn.outerHeight()) / 2,
		})
	}
	$(window).on('load resize', function(){
		splitMenu();
		changeMenuClosePos();
	})
	$('.mmenu__tab').on('click', function(e){
		e.preventDefault();
		var 
		$self = $(this),
		$href = $self.attr('href');

		if($('.head__menu .mmenu__show_icon').is(':visible')) {
			if(!$self.hasClass('active')) {
				$('.mmenu__tab.active').removeClass('active');
				$('.mmenu__pane.active').addClass('closing');
				$self.addClass('active');

				setTimeout(function(){
					$('.mmenu__pane.active').removeClass('opening closing active');
					$($href).addClass('active');
					splitMenu();
					setTimeout(function(){$($href).addClass('opening');}, 100);
				}, 300);
			}
		}else{
			$('.mmenu__left').addClass('passive');
			$('.mmenu__pane.active_mob').removeClass('active_mob');
			$($href).addClass('active_mob');
		}

	})
	$('.mmenu__name').on('click', function(e){
		e.preventDefault();
		$('.mmenu__left').removeClass('passive');
		$('.mmenu__pane.active_mob').removeClass('active_mob');
	})
	$('.mmenu__show').on('click', function(e){
		e.preventDefault();
		changeMenuClosePos();

		$.fancybox.open({
			src  : '#modal_menu',
			type : 'inline',
			opts : {
				baseClass: 'mmenu__fancy',
				animationEffect: false,
				touch: false,
				afterShow : function( instance, current ) {
					$('#modal_menu').addClass('mmenu__vis');
					setTimeout(function(){
						$('#modal_menu').addClass('active');
					}, 550);
				},
				beforeClose : function( instance, current ) {
					this.opts.animationEffect = true;
					this.opts.animationEffect = "fade";
						// $('#modal_menu').removeClass('active');
					},
					afterClose : function( instance, current ) {
						$('#modal_menu').removeClass('active mmenu__vis');
					},
				}
			});
	})
	/* # MENU */


	// FORM SUBMIT
	$('.form__order').on('submit', function(){
		var
		$form = $(this),
		$data = $form.serialize(),
		$name = $form.find('input[name="name"]'),
		$phone = $form.find('input[name="phone"]'),
		$email = $form.find('input[name="email"]'),
		$agree = $form.find('input[name="agree"]:checked'),
		$rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
		$error = false;


		if($form.find('input[name="agree"]').length && !$agree.length){
			$form.find('.agree__cont').addClass('invalid');
			$error = true;
		}else{
			$form.find('.agree__cont').removeClass('invalid');
		}

		if($name.length){
			if($name.val().length < 3){
				$name.addClass('invalid'); 
				$error = true;
			}else{
				$name.removeClass('invalid');
			}
		}
		if($phone.length){
			if(!$phone.inputmask('isComplete')){
				$phone.addClass('invalid'); 
				$error = true;
			}else{
				$phone.removeClass('invalid');
			}
		}
		if($email.length){
			if($email.val().length < 1 || !$rv_email.test($email.val())){
				$email.addClass('invalid');
				$error = true;		
			}else{
				$email.removeClass('invalid');
			}
		}

		if($error){
			return false;
		}else{
			$.ajax({
				type: "POST", 
				url: "./send.php", 
				dataType: "json", 
				data: $data,
				beforeSend: function($json) {

				},
				success: function($json){
					if($json['success']){

						$instance = $.fancybox.getInstance();
						if($instance){$instance.close();}
						$.fancybox.open({
							src  : $('#modal_success'),
							type : 'inline'
						});
					}
				},
				error: function(json){
					console.log(json);
				}
			});
		}
		return false;
	})
	// # FORM SUBMIT

	/// to top
	var topScroll = $(window).scrollTop();
	$(window).on('load scroll resize', function(){
		if($(window).scrollTop() <= topScroll && $(window).scrollTop() > $('.header').outerHeight()) {
			$('.to_top').addClass('active');
		}else{
			$('.to_top').removeClass('active');
		}
		topScroll = $(window).scrollTop();
	})
	$('.to_top').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 800);
		return false;
	})

	// GO TO 
	$('.goTo').click(function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top - 20 - $('.header').outerHeight()}, 800);
		return false;
	});


})
