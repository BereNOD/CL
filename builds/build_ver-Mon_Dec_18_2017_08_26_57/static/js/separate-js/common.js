'use strict';

(function () {
	$("img, a").on("dragstart", function(e) { e.preventDefault(); });

	$('input[name=phone]').inputmask("+99(999)-99-99-999");  //static mask

	$('.sign-in__btn').magnificPopup({
		type:'inline',
		callbacks: {
			open: function () {
				$('body').css('overflow', 'hidden');
			},
			close: function () {
				$('body').css('overflow', '');
			}
		}
	});


	// sign-in enter list
	(function () {
		var btn = document.querySelector('.js-enter-list'),
		list = document.querySelector('.sign-in__list');

		if(btn) {
			btn.addEventListener('click', toggleEnterList);
		}

		function toggleEnterList() {
			this.classList.toggle('is-active');
			if($(list).is(':visible')) {
				list.style.display = 'none';
			} else {
				list.style.display = 'block';
			}
		}

	})();

	// top slider
	if (document.querySelector('.top-slider') !== null) {
		$('.top-slider__inner').slick({
			infinite: true,
			dots: true,
			speed: 400,
			prevArrow: '.top-slider .slider-arrow-prev',
			nextArrow: '.top-slider .slider-arrow-next'
			// adaptiveHeight: true
		});
	}

	// top slider catalog
	if (document.querySelector('.c-slider') !== null) {
		$('.c-slider__inner').slick({
			infinite: true,
			dots: true,
			speed: 400,
			appendDots: '.c-block',
			prevArrow: '.c-slider .slider-arrow-prev',
			nextArrow: '.c-slider .slider-arrow-next',
			adaptiveHeight: true
		});
	}

	// reviews slider
	if (document.querySelector('.r-slider') !== null) {
		$('.r-slider').slick({
			infinite: true,
			dots: true,
			slidesToShow: 2,
			verticalSwiping: true,
			slidesToScroll: 1,
			vertical: true,
			speed: 400,
			prevArrow: '.r-block__slider .slider-arrow-prev',
			nextArrow: '.r-block__slider .slider-arrow-next',
			appendDots: '.r-block__controls',
			responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					vertical: false,
					verticalSwiping: false,
				}
			}
			]
		});
	}

	if (document.querySelector('[data-fancybox]') !== null) {
		$("[data-fancybox]").fancybox({

		});
	}

	// search
	(function () {
		var searchBtn = document.querySelector('.search__btn'),
		searchInput = document.querySelector('.search__input'),
		searchClose = document.querySelector('.search__close'),
		headerMenu = document.querySelector('.header__menu'),
		searchBlock = document.querySelector('.header__search');

		searchBlock.style.position = 'relative';

		function sVisible() {
			searchClose.classList.add('search__close--active');
			searchInput.classList.add('search__input--active');
			searchBtn.classList.add('search__btn--active');
			if(window.innerWidth > 992) {
				searchBtn.setAttribute('disabled', 'disabled');
			}
			headerMenu.style.position = 'relative';
			searchBlock.style.position = 'static';

		}

		function sClose() {
			searchClose.classList.remove('search__close--active');
			searchInput.classList.remove('search__input--active');
			searchInput.value = '';
			searchBtn.classList.remove('search__btn--active');
			searchBtn.removeAttribute('disabled');
			setTimeout(function () {
				headerMenu.style.position = 'static';
				searchBlock.style.position = 'relative';
			},300)
		}

		function sCloseIfEmpty() {
			searchInput.onblur = function() {
				if (this.value === '') {
					sClose();
				}
			};
		}



		searchBtn.addEventListener('click', sVisible);
		searchClose.addEventListener('click', sClose);
		window.addEventListener('click', sCloseIfEmpty);

	})();

	// slider-product
	$(".pr-slider__inner").each(function(index, elem) {
		var $this = $(elem);
		$this.addClass("instance-" + index);
		$this.parent().find(".slider-arrow-prev").addClass("btn-prev-" + index);
		$this.parent().find(".slider-arrow-next").addClass("btn-next-" + index);
		$('.instance-' + index).slick({
			infinite: true,
			speed: 400,
			slidesToShow: 4,
			slidesToScroll: 1,
			prevArrow: ".btn-prev-" + index,
			nextArrow: ".btn-next-" + index,
			responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			]
		});
	});

	// toggle like
	(function () {
		var like = $('.pr-item__content-likes-links');
		like.on('click', function () {
			$(this).toggleClass('in-liked');
		});
	})();



	// scroll header
	(function () {
		function scrollHeader() {
			var header = document.querySelector('.header'),
			topLine = document.querySelector('.top-line'),
			headerTop = Number(getComputedStyle(topLine).top.slice(0, -2));

			if (window.pageYOffset > (topLine.clientHeight + headerTop)) {
				header.classList.add('fixed');
			} else {
				header.classList.remove('fixed');
			}
		}

		window.addEventListener('scroll', scrollHeader);
		window.addEventListener('resize', scrollHeader);

	})();

	// header resize
	(function () {
		var menu = document.querySelector('.nav-list'),
		headerMenu = document.querySelector('.header__menu'),
		topLineItem = document.querySelectorAll('.top-line__list-item'),
		menuItem = document.querySelectorAll('.nav-list__item'),
		search = document.querySelector('.search'),
		headerOrder = document.querySelector('.custom-order'),
		gNavList = document.createElement('ul');

		gNavList.className = 'g-nav-list';
		document.body.appendChild(gNavList);

		if(matchMedia) {
			var screen992 = window.matchMedia('(max-width:992px)'),
			screen768 = window.matchMedia('(max-width:768px)'),
			screen480 = window.matchMedia('(max-width:480px)');
			screen768.addListener(changes);
			screen992.addListener(changes);
			screen480.addListener(changes);
			changes(screen);
		}

		function changes(screen) {
			if(screen992.matches) {

				$.each(menuItem,function (index, elem) {
					$(gNavList).append($(elem));
				});


				$('.nav-list__item').removeClass('nav-list__item').addClass('g-nav-list__item g-nav-list__main');
				$('.nav-list__link').removeClass('nav-list__link').addClass('g-nav-list__link');

				$('.nav-list__drop').each(function (index,elem) {
					if(!$(elem).prev('.g-nav-list__arrow').length) {
						$(elem).parent().prepend('<span class="g-nav-list__arrow"></span>');
					}
				});
				$('.catalog__aside').removeClass('is-active');

			} else {

				$(headerMenu).prepend(menu);
				$('.g-overlay').removeClass('is-active');
				$('.g-overlay-side').removeClass('is-active');
				$('.nav-list').removeClass('is-active');
				$('.g-nav-list').removeClass('is-active');
				$('.page').removeClass('is-hidden');

				$.each($('.g-nav-list__main'),function (index, elem) {
					$(menu).append($(elem));
				});
				$('.g-nav-list__item').removeClass('g-nav-list__item g-nav-list__main').addClass('nav-list__item');
				$('.g-nav-list__link').removeClass('g-nav-list__link').addClass('nav-list__link');
			}

			if(screen768.matches) {

				$.each(topLineItem,function (index, elem) {
					$(gNavList).append($(elem));
					$(elem).removeClass('top-line__list-item').addClass('g-nav-list__item g-nav-list__top-nav');
					$(elem).children().removeClass('top-line__list-link').addClass('g-nav-list__link');
				});

				$(gNavList).prepend(search);
			} else {

				$.each($('.g-nav-list__top-nav'),function (index, elem) {
					$('.top-line__list').append($(elem));
					$(elem).removeClass('g-nav-list__top-nav g-nav-list__item').addClass('top-line__list-item');
					$(elem).children().removeClass('g-nav-list__link').addClass('top-line__list-link');
				});

				$('.header__search').prepend(search);
			}

			if(screen480.matches) {
				$(gNavList).append(headerOrder);
			} else {
				$('.header__order').append(headerOrder);
			}
		}

		var sideNav = {
			navTrigger:     jQuery('.hamburger, .g-overlay'),
			navContainer:   jQuery('.g-nav-list'),
			body:           jQuery('body')
		};

		function toggleMenu() {
			sideNav.navTrigger.on('click', function(e) {
				sideNav.navTrigger.toggleClass('is-active');
				sideNav.navContainer.toggleClass('is-active');
				sideNav.body.toggleClass('is-hidden');
				e.preventDefault();
			});
		}

		function mobileAccordion() {

			var nav             = sideNav.navContainer,
			clickableItems  = nav.find('.g-nav-list__link');

			if(clickableItems.next('.main-nav').length > 0) {
				clickableItems.next('.g-nav-list__item').addClass('open');
			} else {
				clickableItems.next('.g-nav-list__item').removeClass('open');
			}
			clickableItems.parent('.g-nav-list__item.open').children('.main-nav').slideDown();

			nav.on('click', '.g-nav-list__arrow', function (e) {
				e.stopPropagation();
				var element = jQuery(this).parent(),
				is_open = element.hasClass('open'),
				exclude = element.parentsUntil('.main-nav', '.main-nav');
				nav.find('.main-nav').not(exclude).slideUp();
				nav.find('.open').not(exclude.parent().parent().find('.open')).removeClass('open');

				if (!is_open) {
					element.addClass('open').children('.main-nav').slideDown();
				}
				return false;
			});
		}
		toggleMenu();
		mobileAccordion();
	})();

	// rating stars
	(function() {
		if(document.querySelector('.rating-clickable') !== null) {
			var container = document.querySelector('.rating-clickable');
			container.onclick = function(e) {
				if(!e.target.classList.contains('active')) {
					var items = container.querySelectorAll('.rating__item');
					items.forEach(function(item){
						item.classList.remove('active');
					});
					e.target.classList.add('active');
				}
			}
		}
	})();

	// photo-block
	(function () {
		var photos = [],
		currPhotos = document.querySelectorAll('.photo-block__inner img'),
		hidePhotos = document.querySelectorAll('.photo-block__hidden img'),
		btn = document.querySelector('.circle'),
		currSrc,
		hideSrc,
		startTime,
		newPhoto,
		randPhoto,
		circleBtn = document.querySelector('.circleFill');

		function unique(photos) {
			var obj = {};

			for (var i = 0; i < photos.length; i++) {
				var str = photos[i];
				obj[str] = true;
			}
			return Object.keys(obj);
		}

		for(var i = 0; i < currPhotos.length; i++) {
			currSrc = currPhotos[i].getAttribute('src');
			photos.push(currSrc);
		}
		for(var i = 0; i < hidePhotos.length; i++) {
			hideSrc = hidePhotos[i].getAttribute('src');
			photos.push(hideSrc);
		}

		if (btn) {
			btn.addEventListener('click', repeatPhotos);
		}

		function startInfinite() {
			startTime = setInterval(startRandom, 4500);
		}
		startInfinite();

		function startRandom() {
			new Promise(function (resolve) {
				setTimeout(function () {
					resolve();
					if(circleBtn) {
						circleBtn.classList.remove('filled');
					}
				}, 4500);

			}).then(function () {
				randomPhotos();
			});
		}

		function randomPhotos() {
			if (circleBtn) {
				setTimeout(function () {
					circleBtn.classList.add('filled');
				},100);
			}
			newPhoto = unique(photos);

			for(var i = 0; i < currPhotos.length; i++) {
				randPhoto = Math.floor(Math.random() * newPhoto.length);
				currPhotos[i].setAttribute('src', newPhoto[randPhoto]);
				currPhotos[i].parentElement.parentElement.setAttribute('href', newPhoto[randPhoto]);
				newPhoto.splice(randPhoto, 1);
			}
		}

		function repeatPhotos() {
			newPhoto = unique(photos);
			for(var i = 0; i < currPhotos.length; i++) {
				randPhoto = Math.floor(Math.random() * newPhoto.length);
				currPhotos[i].setAttribute('src', newPhoto[randPhoto]);
				currPhotos[i].parentElement.parentElement.setAttribute('href', newPhoto[randPhoto]);
				newPhoto.splice(randPhoto, 1);
			}
		}

		function stopRandom() {
			clearInterval(startTime);
			setTimeout(function () {
				circleBtn.classList.remove('filled');
			}, 100);
			circleBtn.classList.add('filled');
		}

		if (btn) {
			btn.onmouseover = stopRandom;
			btn.onmouseout = startInfinite;
		}

	})();

	// catalog aside
	(function () {
		var aside = {
			title:  jQuery('.aside__option-name'),
			content: jQuery('.aside__option-values'),
			arrow: jQuery('.aside__option-name-arrow')
		};
		aside.title.on('click', asideContent);

		function asideContent() {
			$(this).parent().find(aside.content).slideToggle();
			$(this).find(aside.arrow).toggleClass('rotate-active');
		}
	})();

	// body offset for position absolute header
	function bodyOffset() {
		var page = document.querySelector('.page__wrapper'),
		headerHeight = document.querySelector('.header').clientHeight;

		if(!document.body.classList.contains('page--main')) {
			page.style.paddingTop = headerHeight + 'px';
		}
	}
	bodyOffset();
	window.addEventListener('resize',bodyOffset);

	$('.toggle').on('click', function() {
		var $this = $(this);

		if ($this.data("active") === true) {
			$this.text("Switch on").data("active", false);

		} else {
			$this.text("Switch off").data("active", true);
			api2._init();
		}
	});

	// select 2
	$(".m-select2").select2({
		placeholder: "Model search...",
		allowClear: true
	});

	$('.text-module__edit-font-list select').select2({

	});

	$('.canvas-block__options-select select').select2({
		minimumResultsForSearch: -1,
		placeholder: "Inside elastic bands"
	});

	$(".std-select--state").select2({
		placeholder: "State"
	});
	$(".std-select--country").select2({
		placeholder: "Country"
	});

	// product-card-color-options
	(function () {
		var colorItem = document.querySelectorAll('.card-product__content-color-prop'),
		colorAttr,
		label = document.querySelectorAll('.card-product__content-color-item input[type=radio]');

		for(var i=0;i<colorItem.length;i++) {
			colorAttr = colorItem[i].getAttribute('data-color');
			colorItem[i].style.backgroundColor = colorAttr;
			colorItem[i].firstChild.style.color = colorAttr;
		}

		for(var i=0;i<label.length;i++) {
			label[0].setAttribute('checked', 'checked');
			if(label[i].getAttribute('checked') !== null) {
				if(label[i].nextElementSibling.classList.contains('is-white')) {
					label[i].nextElementSibling.style.backgroundColor = '#e6e6e6';
				} else {
					label[i].nextElementSibling.style.borderColor = label[i].nextElementSibling.getAttribute('data-color');
					label[i].nextElementSibling.style.backgroundColor = 'transparent';
				}
			}

			label[i].addEventListener('change',function () {
				for(var k=0;k<label.length;k++) {
					label[k].removeAttribute('checked');
				}
				this.setAttribute('checked', 'checked');
				for(var j=0;j<colorItem.length;j++) {
					colorAttr = colorItem[j].getAttribute('data-color');
					colorItem[j].style.backgroundColor = colorAttr;
					colorItem[j].firstChild.style.color = colorAttr;
				}

				if(this.nextElementSibling.classList.contains('is-white')) {
					this.nextElementSibling.style.backgroundColor = '#e6e6e6';
				} else {
					this.nextElementSibling.style.borderColor = this.nextElementSibling.getAttribute('data-color');
					this.nextElementSibling.style.backgroundColor = 'transparent';
				}

			});
		}
	})();

	// catalog options color
	(function () {
		let container = document.querySelector('.aside__option-values .card-product__content-color-array');
		function catalogColorOptions(container) {
			function toggleOptions() {
				// check attribute
				let checkbox = this.closest('label').querySelector('[data-color]');
				if(!this.getAttribute('checked')) {
					this.setAttribute('checked', 'checked');
					if(checkbox.classList.contains('is-white')) {
						checkbox.style.backgroundColor = '#e6e6e6';
						checkbox.querySelector('i').style.color = checkbox.getAttribute('data-color');
					} else {
						checkbox.style.backgroundColor = 'transparent';
						checkbox.style.borderColor =  checkbox.getAttribute('data-color');
						checkbox.querySelector('i').style.color = checkbox.getAttribute('data-color');
					}
				} else {
					this.removeAttribute('checked');
					if(checkbox.classList.contains('is-white')) {
						checkbox.style.backgroundColor = '#fff';
						checkbox.style.borderColor =  '#e6e6e6';
					} else {
						checkbox.style.backgroundColor = checkbox.getAttribute('data-color');
						checkbox.style.borderColor = 'transparent';
					}
				}
			}

			if(container) {
				let item = container.querySelectorAll('input');
				for(let i=0;i<item.length;i++) {
					item[i].addEventListener('click', toggleOptions);
				}
			}
		}
		catalogColorOptions(container);


	})();

	// card-page options toggle
	// (function () {
	//
	//     var container = document.querySelector('.card-product__content-additional-options'),
	//         btnOpenBlock = document.querySelector('.card-product__content-additional-options-title'),
	//         openedBlock = document.querySelector('.card-product__content-additional-options-content'),
	//         btnOption = document.querySelectorAll('.card-product__content-additional-label input'),
	//         textBlock = [];
	//
	//     if(btnOpenBlock) {
	//         btnOpenBlock.addEventListener('click', toggleBlock);
	//     }
	//     function toggleBlock() {
	//         $(openedBlock).slideToggle(200);
	//         if(this.classList.contains('is-down')) {
	//             this.classList.remove('is-down');
	//         } else {
	//             this.classList.add('is-down');
	//         }
	//     }
	//
	//     if(btnOption) {
	//         for(var i=0;i<btnOption.length;i++) {
	//             btnOption[i].addEventListener('click', toggleOptions);
	//         }
	//     }
	//
	//     function removeChecked() {
	//         for(var i=0;i<btnOption.length;i++) {
	//             btnOption[i].removeAttribute('checked');
	//         }
	//     }
	//     removeChecked();
	//
	//     function saveCache() {
	//         for(var i=0;i<btnOption.length;i++) {
	//             btnOption[i].classList.add('tc-' + i);
	//             var textCache = btnOption[i].closest('.card-product__content-additional-label').querySelector('.card-product__content-additional-label-text--changed').textContent;
	//
	//             textBlock.push(textCache);
	//         }
	//     }
	//     saveCache();
	//
	//     function toggleOptions() {
	//         var self = this,
	//             hiddenBlock = this.closest('.card-product__content-additional-label').nextElementSibling,
	//             hiddenInput = hiddenBlock.querySelector('input'),
	//             hiddenBtn = hiddenBlock.querySelector('.card-product__content-additional-hidden-btn'),
	//             textField = this.closest('.card-product__content-additional-label').querySelector('.card-product__content-additional-label-text--changed');
	//
	//         for(var i=0;i<btnOption.length;i++) {
	//             btnOption[i].setAttribute('disabled', 'disabled');
	//         }
	//         self.removeAttribute('disabled');
	//
	//         $(hiddenBlock).fadeIn(200);
	//
	//         hiddenInput.addEventListener('change', function () {
	//            if(this.value !== '') {
	//                self.setAttribute('checked', 'checked');
	//                textField.textContent = this.value + ' - ';
	//            } else {
	//                self.removeAttribute('checked');
	//                var val =  self.classList.value.slice(3);
	//                textField.textContent = textBlock[val];
	//            }
	//         });
	//
	//         hiddenBtn.addEventListener('click', function () {
	//             $(hiddenBlock).fadeOut(200);
	//             for(var i=0;i<btnOption.length;i++) {
	//                 btnOption[i].removeAttribute('disabled');
	//             }
	//             if(self.getAttribute('checked')) {
	//                 self.nextElementSibling.style.borderColor = '#7da747';
	//                 self.nextElementSibling.classList.add('is-checked');
	//             } else {
	//                 self.nextElementSibling.style.borderColor = '';
	//                 self.nextElementSibling.classList.remove('is-checked');
	//             }
	//         });
	//     }
	//
	// })();
	(function () {

		var btnOpenBlock = document.querySelector('.card-product__content-additional-options-title'),
		openedBlock = document.querySelector('.card-product__content-additional-options-content'),
		btnOption = document.querySelector('.card-product__content-additional-label--initial input'),
		textCache;

		if(btnOption) {
			btnOption.addEventListener('click', toggleOption);
		}

		if(btnOpenBlock) {
			btnOpenBlock.addEventListener('click', toggleBlock);
		}
		function toggleBlock() {
			$(openedBlock).slideToggle(200);
			if(this.classList.contains('is-down')) {
				this.classList.remove('is-down');
			} else {
				this.classList.add('is-down');
			}
		}


		function saveCache() {
			if(btnOption) {
				textCache = btnOption.closest('.card-product__content-additional-label').querySelector('.card-product__content-additional-label-text--changed').textContent;
			}
		}
		saveCache();

		function toggleOption() {
			var self = this,
			hiddenBlock = this.closest('.card-product__content-additional-label').nextElementSibling,
			hiddenInput = hiddenBlock.querySelector('input'),
			hiddenBtn = hiddenBlock.querySelector('.card-product__content-additional-hidden-btn'),
			textField = this.closest('.card-product__content-additional-label').querySelector('.card-product__content-additional-label-text--changed');

			$(hiddenBlock).fadeIn(200);

			hiddenInput.addEventListener('change', function () {
				if(this.value !== '') {
					self.setAttribute('checked', 'checked');
					textField.textContent = this.value + ' - ';
				} else {
					self.removeAttribute('checked');
					textField.textContent = textCache;
				}
			});

			hiddenBtn.addEventListener('click', function () {
				$(hiddenBlock).fadeOut(200);
				if(self.getAttribute('checked')) {
					self.nextElementSibling.style.borderColor = '#7da747';
					self.nextElementSibling.classList.add('is-checked');
				} else {
					self.nextElementSibling.style.borderColor = '';
					self.nextElementSibling.classList.remove('is-checked');
				}
			});
		}

	})();


	// count
	(function () {
		$(".count__input").keydown(function(event) {
			if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
				(event.keyCode == 65 && event.ctrlKey === true) ||
				(event.keyCode >= 35 && event.keyCode <= 39)) {
				return;
		}
		else {
			if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				event.preventDefault();
			}
		}
	});

		$('.count__min').on('click', min);
		$('.count__max').on('click', max);

		function min() {
			var input = $(this).parent().find('.count__input'),
			currentVal = parseInt(input.val()),
			newVal = (!isNaN(currentVal) && currentVal > 1) ? currentVal - 1 : 1;
			input.val(newVal);
		}
		function max() {
			var input = $(this).parent().find('.count__input'),
			currentVal = parseInt(input.val()),
			newVal = (!isNaN(currentVal)) ? currentVal + 1 : 1;
			input.val(newVal);
		}
	})();

	// set equal height blocks
	function setEqualHeight(columns, autoHeight) {
		var tallest = 0;
		if (autoHeight === true) {
			for (var i=0; i<columns.length; ++i) {
				columns[i].style.height = 'auto';
			}
			return false;
		}
		for (var i=0; i<columns.length; ++i) {
			columns[i].style.height = '';
			var currentHeight = columns[i].clientHeight;
			if (currentHeight > tallest) {
				tallest = currentHeight;
			}
		}
		for (var i=0; i<columns.length; ++i) {
			columns[i].style.height = tallest + 'px';
		}
	}

	// equal height product-slider blocks title
	function productCatalog() {
		if (document.querySelector('.pr-item__content-title a') !== null) {
			if (window.innerWidth > 600)
				setEqualHeight(document.querySelectorAll('.pr-item__content-title a'));
			else
				setEqualHeight(document.querySelectorAll('.pr-item__content-title a'), true);
		}
	}

	productCatalog();

	//likes dislikes
	(function () {
		var likes = document.querySelectorAll('.r-item__content-likes');

		for (var i = 0; i < likes.length; i++) {
			likes[i].addEventListener('click', function (e) {
				e.preventDefault();
				var link = e.target;
				var links = this.children;

				for(var i = 0; i < links.length; i++) {
					links[i].classList.remove('active');
					link.classList.add('active');
				}
			});
		}

	})();

	// self tabs
	(function () {
		var selfTabs = {
			title: jQuery('.self-tabs .self-tabs__title'),
			content: jQuery('.self-tabs .self-tabs__content')
		};

		function initializeSelfTabs() {
			"use strict";
			selfTabs.title.on('click', function (e) {
				var id = '#' + jQuery(this).data('id');
				if (!$(this).hasClass('self-tabs__title--active')) {
					selfTabs.title.removeClass('self-tabs__title--active');
					selfTabs.content.animate({"opacity": 0}, 200).hide();
					$(this).addClass('self-tabs__title--active');
					$(id).show().animate({"opacity": 1}, 200);
				}
				e.preventDefault();
			});
		}

		initializeSelfTabs();
	})();

	// cart tabs
	(function () {
		var cartTabs = {
			title: jQuery('.cart-tabs .cart-tabs__title'),
			content: jQuery('.cart-tabs .cart-tabs__content')
		};

		function initializeSelfTabs() {
			"use strict";
			cartTabs.title.on('click', function (e) {
				var id = '#' + jQuery(this).data('id');
				if (!$(this).hasClass('cart-tabs__title--active')) {
					cartTabs.title.removeClass('cart-tabs__title--active');
					cartTabs.content.animate({"opacity": 0}, 200).hide();
					cartTabs.content.removeClass('is-active');
					$(this).addClass('cart-tabs__title--active');
					$(id).show().animate({"opacity": 1}, 200);
					$(id).addClass('is-active');
				}
				e.preventDefault();
			});
		}

		initializeSelfTabs();
	})();

	// product-card block hide
	(function () {
		var btns = document.querySelectorAll('.h-link');

		for(var i=0;i<btns.length;i++) {
			btns[i].addEventListener('click', function (e) {
				e.preventDefault();
				var link = e.target,
				blocks = document.querySelectorAll('.card-description__tabs-block');

				if(link.classList.contains('h-link-write')) {
					setTimeout(function () {
						var form = document.querySelector('.reviews-form'),
						input = form.children[1].firstElementChild;
						input.focus();
					}, 100);
					for(var i=0;i<blocks.length;i++) {
						blocks[i].classList.toggle('block-hidden');
					}
				} else if(link.classList.contains('h-link-nowrite')) {
					for(var i=0;i<blocks.length;i++) {
						blocks[i].classList.toggle('block-hidden');
					}
					setTimeout(function () {
						var sc = document.getElementById('sc-block'),
						headerHeight = document.querySelector('.header').clientHeight;
						$('html, body').animate({
							scrollTop: $(sc).offset().top - headerHeight - 60
						}, 100);
					}, 100);
				} else {
					for(var i=0;i<blocks.length;i++) {
						blocks[i].classList.toggle('block-hidden');
					}
				}
			});
		}

	})();

	if(document.querySelector('.easyzoom') !== null) {
		//slider
		var $easyzoom = $('.easyzoom').easyZoom();
		var api = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');
		var block =  $('.card-product__slider-container a img');

		$('.card-product__thumbnail-item a').on('click', function (e) {
			var src = $(this).data('standard');
			var src_easyzoom = $(this).data('easyzoom');
			$('.card-product__thumbnail-item').removeClass('card-product__thumbnail-item--active');
			$(this).parent().addClass('card-product__thumbnail-item--active');
			block.fadeOut(300, function () {
				api.swap(src_easyzoom, src_easyzoom);
				block.attr('src', src);
			}).fadeIn(300);
		});
	}
	// easyzoom off
	if(matchMedia) {
		var screen = window.matchMedia('(max-width:992px)');
		screen.addListener(tearDown);
		tearDown(screen);
	}
	function tearDown(screen) {
		if(screen.matches) {
			if(typeof api !== 'undefined') {
				api.teardown();
			}
		} else {
			if(typeof api !== 'undefined') {
				api._init();
			}
		}
	}

	// catalog input value
	(function () {
		var handlesSlider = document.getElementById('slider-handles');

		if(handlesSlider) {
			noUiSlider.create(handlesSlider, {
				start: [ 25, 120 ],
				connect: true,
				range: {
					'min': [  10 ],
					'max': [ 255 ]
				},
				format: wNumb({
					decimals: 0,
					thousand: '.',
					prefix: '$',
				})
			});

			var handlesValue = [
			document.getElementById('min-price-value'),
			document.getElementById('max-price-value')
			];

			handlesSlider.noUiSlider.on('update', function( values, handle ) {
				handlesValue[handle].innerHTML = values[handle];
			});
		}
	})();

	// canvas scale value
	(function () {
		window.canvasScaleImageValue = document.querySelector('.canvas-block__options-control-method-scale');

		if(canvasScaleImageValue) {
			noUiSlider.create(canvasScaleImageValue, {
				start: [ 100 ],
				range: {
					'min': [ 10 ],
					'max': [ 500 ]
				},
				format: wNumb({
					decimals: 0,
					postfix: '%',
				})
			});

			var handlesValue = [
			document.querySelector('.canvas-block__options-control-method-output-scale')
			];

			canvasScaleImageValue.noUiSlider.on('update', function( values, handle ) {
				handlesValue[handle].innerHTML = values[handle];
			});
		}
	})();

	// canvas scale text value
	(function () {
		window.canvasScaleTextValue = document.querySelector('.canvas-block__options-control-method-scale-text');
		var textScaleValue = document.querySelector('#text-scale-value');

		if(canvasScaleTextValue) {
			noUiSlider.create(canvasScaleTextValue, {
				start: [ 100 ],
				range: {
					'min': [ 30 ],
					'max': [ 500 ]
				},
				format: wNumb({
					decimals: 0,
					postfix: '%',
				})
			});

			var handlesValue = [
			document.querySelector('.canvas-block__options-control-method-output-text-scale')
			];

			canvasScaleTextValue.noUiSlider.on('update', function( values, handle ) {
				handlesValue[handle].innerHTML = values[handle];
			});
		}
	})();

	// canvas rotate value
	(function () {
		window.canvasRotateImageValue = document.querySelector('.canvas-block__options-control-method-rotate');

		if(canvasRotateImageValue) {
			noUiSlider.create(canvasRotateImageValue, {
				start: [ 0 ],
				range: {
					'min': [ 0 ],
					'max': [ 360 ]
				},
				format: wNumb({
					decimals: 0,
					postfix: '<sup>o</sup>',
				})
			});

			var handlesValue = [
			document.querySelector('.canvas-block__options-control-method-output-rotate')
			];

			canvasRotateImageValue.noUiSlider.on('update', function( values, handle ) {
				handlesValue[handle].innerHTML = values[handle];
			});
		}
	})();

	// canvas rotate text value
	(function () {
		window.canvasRotateTextValue = document.querySelector('.canvas-block__options-control-method-rotate-text');

		if(canvasRotateTextValue) {
			noUiSlider.create(canvasRotateTextValue, {
				start: [ 0 ],
				range: {
					'min': [ 0 ],
					'max': [ 360 ]
				},
				format: wNumb({
					decimals: 0,
					postfix: '<sup>o</sup>',
				})
			});

			var handlesValue = [
			document.querySelector('.canvas-block__options-control-method-output-text-rotate')
			];

			canvasRotateTextValue.noUiSlider.on('update', function( values, handle ) {
				handlesValue[handle].innerHTML = values[handle];
			});
		}
	})();

	// catalog count items
	(function () {
		var item = document.querySelectorAll('.items-count__list-link');

		for(var i=0;i<item.length;i++) {
			item[i].addEventListener('click', function (e) {
				e.preventDefault();
				for(var i=0;i<item.length;i++) {
					item[i].classList.remove('items-count__list-link--active');
				}
				e.target.classList.add('items-count__list-link--active');
			});
		}

	})();

	// custom scrollbar
	$(".option-model").mCustomScrollbar({
		theme:"my-theme"
	});

	$(".g-block__inner").mCustomScrollbar({
		theme:"my-theme",
		scrollButtons:{enable:true},
	});


	// catalog aside options
	(function () {
		var asideNav = {
			navTrigger:     jQuery('.aside-mobile-btn, .g-overlay-side'),
			navContainer:   jQuery('.catalog__aside'),
			body:           jQuery('body')
		};

		function toggleMenu() {
			asideNav.navTrigger.on('click', function(e) {
				asideNav.navTrigger.toggleClass('is-active');
				asideNav.navContainer.toggleClass('is-active');
				asideNav.body.toggleClass('is-hidden');
				e.preventDefault();
			});
		}
		toggleMenu();
	})();

	(function () {
		var btn = document.querySelectorAll('.g-block-both__btn'),
		container = document.querySelector('.g-block-both'),
		block = document.querySelectorAll('.g-block'),
		blockCart = document.querySelector('.g-block--cart'),
		blockFav = document.querySelector('.g-block--fav'),
		btnCart = document.querySelector('.g-block-both__btn--fav');

		for(var i=0;i< btn.length;i++) {
			btn[i].classList.remove('is-active');

			if(btnCart.classList.contains('g-block-both__btn--fav')) {
				if(blockFav.firstElementChild.firstElementChild.firstElementChild.childElementCount !== 0) {
					btnCart.classList.remove('g-block-both__btn--fav-empty');
				} else {
					btnCart.classList.add('g-block-both__btn--fav-empty');
				}
			}
			if(btn) {
				btn[i].addEventListener('click', function (e) {
					e.preventDefault();
					for(var i=0;i< btn.length;i++) {
						btn[i].classList.remove('is-active');
					}
					container.classList.add('is-active');
					this.classList.add('is-active');

					for(var i=0;i< block.length;i++) {
						block[i].style.display = 'none';
					}
					if(this.classList.contains('g-block-both__btn--cart')) {
						blockCart.style.display = 'block';
					}
					if(this.classList.contains('g-block-both__btn--fav')) {
						blockFav.style.display = 'block';
					}
				});
			}
		}

		document.addEventListener('mouseup', function (e) {
			if (!$(container).is(e.target) // if click was not an our container
				&& $(container).has(e.target).length === 0) { // and not an our container children
				container.classList.remove('is-active'); // remove class
			for(var i=0;i< btn.length;i++) {
				btn[i].classList.remove('is-active');
			}
		}
	});

	})();

	// cart tabs content
	(function () {
		var content = document.querySelectorAll('.cart-tabs__content'),
		toggle,
		remember;
		for(var i=0;i<content.length;i++) {
			content[i].addEventListener('click', function () {
				for(var j=0;j<content.length;j++) {
					if(content[j].classList.contains('is-active')) {
						var radio = content[j].querySelectorAll('.cart-block-payment__left input[type=radio]');
						for(var x=0;x<radio.length;x++) {
							radio[x].addEventListener('click', function () {
								for(var x=0;x<radio.length;x++) {
									radio[x].removeAttribute('checked');
								}
								this.setAttribute('checked', 'checked');
								if(this.classList.contains('cart-block__option-different') && this.getAttribute('checked')) {
									toggle = this.closest('.cart-block__address').querySelector('.address-block--toggle');
									remember = this.closest('.cart-block__address').querySelector('.cart-block__total .f-block__field');
									$(toggle).fadeIn(200);
									remember.classList.remove('is-active');
								} else {
									$(toggle).fadeOut(200);
									remember.classList.add('is-active');
									var field = toggle.querySelectorAll('.address-block__field input');
									for(var i=0;i<field.length;i++) {
										field[i].classList.remove('error');
										if(field[i].nextElementSibling !== null) {
											field[i].nextElementSibling.remove();
										}
									}
								}
							});
						}
					}
				}
			});

		}
	})();

	// self phone methods
	$.validator.addMethod("minlenghtphone", function (value) {
		return value.replace(/\D+/g, '').length > 11;
	},
	"Enter your number");
	$.validator.addMethod("requiredphone", function (value) {
		return value.replace(/\D+/g, '').length > 1;
	},
	"This field required");


	$('.subscribe__form').validate({
		rules: {
			email: {required: true, email: true},
		},
		messages: {
			email: {required: 'This field is required', email: 'Enter your email'}
		}
	});

	$('.f-block').validate({
		rules: {
			email: {required: true, email: true},
			password: {required: true, minlength: 6, maxlength: 16}
		},
		messages: {
			email: {required: 'This field is required', email: 'Enter your email'},
			password: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'}
		}
	});

	$('#step1').validate({
		rules: {
			email: {required: true, email: true},
			name: {required: true, minlength: 6, maxlength: 16},
			password: {required: true, minlength: 6, maxlength: 16},
			phone: {requiredphone: true, minlenghtphone: true}
		},
		messages: {
			email: {required: 'This field is required', email: 'Enter your email'},
			password: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			name: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'}
		}
	});

	$('#step2').validate({
		rules: {
			address1: {required: true, minlength: 6, maxlength: 16},
			address2: {required: true, minlength: 6, maxlength: 16},
			city: {required: true, minlength: 6, maxlength: 16},
			zipcode: {required: true, minlength: 4, maxlength: 6}
		},
		messages: {
			address1: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			address2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			city: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			zipcode: {required: 'This field is required', minlength: 'Minimum 4 symbols', maxlength: 'Maximum 6 symbols'}
		}
	});

	$('#form1').validate({
		rules: {
			email: {required: true, email: true},
			email2: {required: true, email: true},
			address1: {required: true, minlength: 6, maxlength: 16},
			address1_2: {required: true, minlength: 6, maxlength: 16},
			address2: {required: true, minlength: 6, maxlength: 16},
			address2_2: {required: true, minlength: 6, maxlength: 16},
			city: {required: true, minlength: 6, maxlength: 16},
			city2: {required: true, minlength: 6, maxlength: 16},
			zipcode: {required: true, minlength: 4, maxlength: 6},
			zipcode2: {required: true, minlength: 4, maxlength: 6},
			lastname: {required: true, minlength: 6, maxlength: 16},
			lastname2: {required: true, minlength: 6, maxlength: 16},
			firstname: {required: true, minlength: 6, maxlength: 16},
			firstname2: {required: true, minlength: 6, maxlength: 16},
			area: {required: true, minlength: 16, maxlength: 70},
			password: {required: true, minlength: 6, maxlength: 16},
			phone: {requiredphone: true, minlenghtphone: true},
			phone2: {requiredphone: true, minlenghtphone: true}
		},
		messages: {
			email: {required: 'This field is required', email: 'Enter your email'},
			email2: {required: 'This field is required', email: 'Enter your email'},
			address1: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			address1_2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			address2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			address2_2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			city: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			zipcode: {required: 'This field is required', minlength: 'Minimum 4 symbols', maxlength: 'Maximum 6 symbols'},
			zipcode2: {required: 'This field is required', minlength: 'Minimum 4 symbols', maxlength: 'Maximum 6 symbols'},
			password: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			area: {required: 'This field is required', minlength: 'Minimum 16 symbols', maxlength: 'Maximum 70 symbols'},
			firstname: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			firstname2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			lastname: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			lastname2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'}
		}
	});

	$('#form3').validate({
		rules: {
			email: {required: true, email: true},
			email2: {required: true, email: true},
			address1: {required: true, minlength: 6, maxlength: 16},
			address1_2: {required: true, minlength: 6, maxlength: 16},
			address2: {required: true, minlength: 6, maxlength: 16},
			address2_2: {required: true, minlength: 6, maxlength: 16},
			city: {required: true, minlength: 6, maxlength: 16},
			city2: {required: true, minlength: 6, maxlength: 16},
			zipcode: {required: true, minlength: 4, maxlength: 6},
			zipcode2: {required: true, minlength: 4, maxlength: 6},
			lastname: {required: true, minlength: 6, maxlength: 16},
			lastname2: {required: true, minlength: 6, maxlength: 16},
			firstname: {required: true, minlength: 6, maxlength: 16},
			firstname2: {required: true, minlength: 6, maxlength: 16},
			area: {required: true, minlength: 16, maxlength: 70},
			password: {required: true, minlength: 6, maxlength: 16},
			phone: {requiredphone: true, minlenghtphone: true},
			phone2: {requiredphone: true, minlenghtphone: true}
		},
		messages: {
			email: {required: 'This field is required', email: 'Enter your email'},
			email2: {required: 'This field is required', email: 'Enter your email'},
			address1: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			address1_2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			address2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			address2_2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			city: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			zipcode: {required: 'This field is required', minlength: 'Minimum 4 symbols', maxlength: 'Maximum 6 symbols'},
			zipcode2: {required: 'This field is required', minlength: 'Minimum 4 symbols', maxlength: 'Maximum 6 symbols'},
			password: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			area: {required: 'This field is required', minlength: 'Minimum 16 symbols', maxlength: 'Maximum 70 symbols'},
			firstname: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			firstname2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			lastname: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			lastname2: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'}
		}
	});

	$('.f-block__left').validate({
		rules: {
			email: {required: true, email: true},
			password: {required: true, minlength: 6, maxlength: 16}
		},
		messages: {
			email: {required: 'This field is required', email: 'Enter your email'},
			password: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'}
		}
	});

	$('#review-form').validate({
		rules: {
			email: {required: true, email: true},
			name: {required: true, minlength: 6, maxlength: 16},
			area: {required: true, minlength: 16, maxlength: 70}
		},
		messages: {
			email: {required: 'This field is required', email: 'Enter your email'},
			name: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'},
			area: {required: 'This field is required', minlength: 'Minimum 16 symbols', maxlength: 'Maximum 70 symbols'}
		}
	});

	$('.promo-block').validate({
		rules: {
			coupon: {required: true, minlength: 4, maxlength: 6}
		},
		messages: {
			coupon: {required: 'This field is required', minlength: 'Minimum 6 symbols', maxlength: 'Maximum 16 symbols'}
		}
	});

	// canvas page / dropdown select
	(function () {
		var container = document.querySelector('.canvas-block__options-select');

		if(container) {
			container.addEventListener('click', selectOption);
		}

		function selectOption(e) {
			var output = this.firstElementChild;
			this.classList.toggle('is-active');

			if(e.target.classList.contains('canvas-block__options-select-drop-item')) {
				var price = e.target.textContent;
				output.textContent = price;
			}
		}

	})();

	// canvas page / dropdown select font options
	(function () {
		var container = document.querySelector('.text-module__edit-font-list');

		if(container) {
			container.addEventListener('click', selectOption);
		}

		function selectOption(e) {
			var output = this.firstElementChild;
			this.classList.toggle('is-active');

			if(e.target.classList.contains('text-module__edit-font-list-drop-item')) {
				var price = e.target.textContent;
				output.textContent = price;
			}
		}

	})();


	// canvas color options
	(function () {
		// Global color object
		window.currentColor = {
			'Inside velvet': 'red',
			'Inside velvet HEX': '#e03943',
			'Back cover': 'chocolate',
			'Back cover HEX': '#3b201a',
			'Spine & zipper pulls': 'chocolate',
			'Spine & zipper pulls HEX': '#3b201a',
			'Thread': 'red',
			'Thread HEX': '#e03943'
		}
		var btn = document.querySelectorAll('.canvas-block__options-color-item-inner'),
			cancelBtn = document.querySelectorAll('.canvas-block__options-color-hidden-control-btn-cancel'),
			applyBtn = document.querySelectorAll('.canvas-block__options-color-hidden-control-btn-apply'),
			$colorItems = document.querySelectorAll('[name="color-item"]'),
			// backface = document.getElementById('backface'),
			// spine = document.getElementById('spine'),
			newColor = {
				'Inside velvet': 'white',
				'Back cover': 'white',
				'Spine & zipper pulls': 'white',
				'Thread': 'white'
			};

		// Add event`s listeners on color dots
		if(btn) {
			for (var i = 0; i < btn.length; i++) {
				btn[i] && btn[i].addEventListener('click', _colorDotBtn_clickHandler);
			}
			function _colorDotBtn_clickHandler ( e ) {
				e.preventDefault();
				var color = window.currentColor.get(this.title),
						target = color? this.nextElementSibling.querySelector('input[type="radio"][data-color-name="' + color + '"]'): false;
				if ( target ) {
					var change = new Event('change');
					target.dispatchEvent(change);
				}
				this.classList.add('is-active');
				this.nextElementSibling.classList.add('is-active');
			}
		}
		// /Add event`s listeners on color dots


		// Add event`s listeners on cancel buttons
		if(cancelBtn) {
			for (var i = 0; i < cancelBtn.length; i++) {
				cancelBtn[i] && cancelBtn[i].addEventListener('click', _cancelBtn_clickHandler);
			}
			function _cancelBtn_clickHandler ( e ) {
				var grandparent = this.parentNode.parentNode.parentNode,
				grandparentType = grandparent.getAttribute('data-type');
				if ( 'inside-velvet' === grandparentType ) {
					newColor.set('Inside velvet', window.currentColor.get('Inside velvet'));
				}
				else if ( 'back-cover' === grandparentType ) {
					newColor.set('Back cover', window.currentColor.get('Back cover'));
					saveChangesBackFace(window.currentColor.get('Back cover'));
				}
				else if ( 'spine-n-zipper-pulls' === grandparentType ) {
					newColor.set('Spine & zipper pulls', window.currentColor.get('Spine & zipper pulls'));
					saveChangesSpine(window.currentColor.get('Spine & zipper pulls'));
				}
				else if ( 'thread' === grandparentType ) {
					newColor.set('Thread', window.currentColor.get('Thread'));
				}
				closeColorPicker.call(this, e);
			}
		}
		// /Add event`s listeners on cancel buttons

		// Add event`s listeners on apply buttons
		if(applyBtn) {
			for (var i = 0; i < applyBtn.length; i++) {
				applyBtn[i] && applyBtn[i].addEventListener('click', _applyBtn_clickHandler);
			}
			function _applyBtn_clickHandler ( e ) {
				var grandparent = this.parentNode.parentNode.parentNode,
				grandparentType = grandparent.getAttribute('data-type');
				if ( 'inside-velvet' === grandparentType ) {
					window.currentColor.set('Inside velvet', newColor.get('Inside velvet'));
				}
				else if ( 'back-cover' === grandparentType ) {
					window.currentColor.set('Back cover', newColor.get('Back cover'));
					saveChangesBackFace(window.currentColor.get('Back cover'));
				}
				else if ( 'spine-n-zipper-pulls' === grandparentType ) {
					window.currentColor.set('Spine & zipper pulls', newColor.get('Spine & zipper pulls'));
					saveChangesSpine(window.currentColor.get('Spine & zipper pulls'));
				}
				else if ( 'thread' === grandparentType ) {
					window.currentColor.set('Thread', newColor.get('Thread'));
				}
				closeColorPicker.call(this, e);
			}
		}
		// /Add event`s listeners on apply buttons

		// Add event`s listeners on color picker items
		if($colorItems) {
			for (var i = 0; i < $colorItems.length; i++) {
				$colorItems[i] && $colorItems[i].addEventListener('change', _colorItems_changeHandler);
			}
			function _colorItems_changeHandler ( e ) {
				var grandparent = this.parentNode.parentNode.parentNode.parentNode.parentNode,
				grandparentType = grandparent.getAttribute('data-type'),
				color = this.getAttribute('data-color-name');

				if ( 'inside-velvet' === grandparentType ) {
					newColor.set('Inside velvet', color);
				}
				else if ( 'back-cover' === grandparentType ) {
					newColor.set('Back cover', color);
					saveChangesBackFace(color);
				}
				else if ( 'spine-n-zipper-pulls' === grandparentType ) {
					newColor.set('Spine & zipper pulls', color);
					saveChangesSpine(color);
				}
				else if ( 'thread' === grandparentType ) {
					newColor.set('Thread', color);
				}
			}
		}
		// /Add event`s listeners on color picker items

		function closeColorPicker(e) {
			e.preventDefault();
			var grandparent = this.parentNode.parentNode.parentNode,
			grandparentType = grandparent.getAttribute('data-type');
			grandparent.classList.remove('is-active');
			grandparent.previousElementSibling.classList.remove('is-active');
			if ( 'back-cover' === grandparentType ) {
				saveChangesBackFace(window.currentColor.get('Back cover'));
			}

		}

		// Change backface color
		function saveChangesBackFace(color) {
			backface.classList.add(color);
			for (var i = 1; i < backface.classList.length; i++) {
				if ( color !== backface.classList[i] ) {
					backface.classList.remove(backface.classList[i]);
				}
			}
			window.overlay['middle'].object.set({fill: getHEX ( color )});
			window._canvas.renderAll();
		}

		// Change backface color
		function saveChangesSpine(color) {
			spine.classList.add(color);
			for (var i = 1; i < spine.classList.length; i++) {
				if ( color !== spine.classList[i] ) {
					spine.classList.remove(spine.classList[i]);
				}
			}
		}

		// Save colors change
		function saveChangesColor(target, color) {
			target.classList.add(color);
			for (var i = 2; i < target.classList.length; i++) {
				if ( color !== target.classList[i] ) {
					target.classList.remove(target.classList[i]);
				}
			}
		}
		// /Save colors change

		// Getting color
		window.currentColor.get = function (name) {
			return currentColor[name];
		};
		// /Getting color
		// Saving Color
		window.currentColor.set = function (name, value) {
			currentColor[name] = value;
			var target;
			// Change color of related points
			if ( 'Inside velvet' === name ) {
				target = document.querySelector('.canvas-block__options-color-item-img-value--velvet');
			}
			else if ( 'Back cover' === name ) {
				target = document.querySelector('.canvas-block__options-color-item-img-value--cover');
			}
			else if ( 'Spine & zipper pulls' === name ) {
				target = document.querySelector('.canvas-block__options-color-item-img-value--spine');
			}
			else if ( 'Thread' === name ) {
				target = document.querySelector('.canvas-block__options-color-item-img-value--thread');
			}
			target && saveChangesColor( target, value );
			// /Change color of related points
			// Saving Color`s HEX
			currentColor[name + ' HEX'] = getHEX ( value );
			// /Saving Color`s HEX
		};
		// /Saving Color


		// Getting temporary color
		newColor.get = function (name) {
			return newColor[name];
		};
		// /Getting temporary color
		// Saving temporary Color
		newColor.set = function (name, value) {
			newColor[name] = value;
		};

		function getHEX ( color ) {
			if ( color === 'black' ) { return '#000000'; }
			else if ( color === 'chocolate' ) { return '#3b201a'; }
			else if ( color === 'gold' ) { return '#f0e1b7'; }
			else if ( color === 'gray' ) { return '#717175'; }
			else if ( color === 'ivory' ) { return '#f4f3e5'; }
			else if ( color === 'navy' ) { return '#3a5679'; }
			else if ( color === 'olive' ) { return '#666c49'; }
			else if ( color === 'orange' ) { return '#fd8b42'; }
			else if ( color === 'purple' ) { return '#7a4d78'; }
			else if ( color === 'red' ) { return '#e03943'; }
			else if ( color === 'sky' ) { return '#aacddb'; }
			else if ( color === 'yellow' ) { return '#ffe649'; }
		}
		// /Saving temporary Color
		// 
		// 
		// if(btn) {
		//     for (var i = 0; i < btn.length; i++) {
		//         btn[i].addEventListener('click', function (e) {
		//             e.preventDefault();
		//             var title = this.lastElementChild.firstElementChild.textContent;
		//             this.classList.add('is-active');
		//             titleOutput.textContent = title;
		//             container.classList.add('is-active');
		//         });
		//     }
		// }

		// if(cancelBtn) {
		//     cancelBtn.addEventListener('click', function (e) {
		//         e.preventDefault();
		//         container.classList.remove('is-active');
		//         for (var i = 0; i < btn.length; i++) {
		//             btn[i].classList.remove('is-active');
		//         }
		//     });
		// }

		// if(applyBtn) {
		//     applyBtn.addEventListener('click', function (e) {
		//         e.preventDefault();
		//         takeColor();
		//         addColor();
		//         container.classList.remove('is-active');
		//         for (var i = 0; i < btn.length; i++) {
		//             btn[i].classList.remove('is-active');
		//         }
		//     });
		// }

		// function takeColor() {
		//     for(var i=0;i<colorArray.length;i++) {
		//         var checked = colorArray[i].firstElementChild.getAttribute('checked');
		//         if(checked) {
		//             currentColor = colorArray[i].firstElementChild.nextElementSibling.getAttribute('data-color');
		//         }
		//     }
		// }

		// function addColor() {
		//     for (var i = 0; i < btn.length; i++) {
		//         if(btn[i].classList.contains('is-active')) {
		//             for(var j=0;j<colorArray.length;j++) {
		//                 if(colorArray[j].firstElementChild.nextElementSibling.classList.contains('is-white')) {
		//                     btn[i].firstElementChild.firstElementChild.style.backgroundColor = currentColor;
		//                     btn[i].firstElementChild.firstElementChild.style.borderColor = '#e6e6e6';
		//                 } else {
		//                     btn[i].firstElementChild.firstElementChild.style.backgroundColor = currentColor;
		//                 }
		//             }
		//         }
		//     }
		// }
	})();


	(function () {
		/* product card options choice */
		var outputInputs = document.querySelectorAll('.card-product__content-search-input-wrap input'),
		$select = $('.m-select2'),
		i;

		$select.on('change', choiceModel);

		function choiceModel() {
			var option = this.options[this.selectedIndex];
			/* if options has not text remove attribute `disabled` from device */
			if(option.textContent === '') {
				/* remove attribute `disabled` from device */
				for(i = 0; i < outputInputs.length; i++) {
					outputInputs[i].removeAttribute('disabled');
					/* clear all values for device */
					outputInputs[i].value = '';
				}
			} else {
				/* get data attributes sizes from device */
				var valLength = this.options[this.selectedIndex].getAttribute('data-length'),
				valHeight = this.options[this.selectedIndex].getAttribute('data-height'),
				valWidth = this.options[this.selectedIndex].getAttribute('data-width');

				/* create empty array for values */
				var sourceValues = [];
				/* push values on array */
				sourceValues.push(valLength,valHeight,valWidth);

				for(i = 0; i < outputInputs.length; i++) {
					/* set attribute `disabled` for device */
					outputInputs[i].setAttribute('disabled', 'disabled');
					/* set all values for device */
					outputInputs[i].value = sourceValues[i];
				}
			}
		}


	})();


	// cart total
	// (function () {
	//     if(matchMedia) {
	//         var screen = window.matchMedia('(max-width:1200px)');
	//         screen.addListener(cartChange);
	//         cartChange(screen);
	//     }
	//     function cartChange(screen) {
	//         var total = document.querySelector('.main-total'),
	//             cartBlock = document.querySelector('.cart-block__inner'),
	//             cartProducts = document.querySelector('.cart-block__products');
	//
	//         if (screen.matches) {
	//             cartBlock.append(total);
	//         } else {
	//             cartProducts.append(total);
	//         }
	//     }
	//
	// })();

}());

// Window load event used just in case window height is dependant upon images
$(window).bind("load", function() {

	var footerHeight = 0,
	footerTop = 0,
	$footer = $(".footer");

	positionFooter();

	function positionFooter() {

		footerHeight = $footer.height();
		footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)+"px";

		/* DEBUGGING STUFF

		 console.log("Document height: ", $(document.body).height());
		 console.log("Window height: ", $(window).height());
		 console.log("Window scroll: ", $(window).scrollTop());
		 console.log("Footer height: ", footerHeight);
		 console.log("Footer top: ", footerTop);
		 console.log("-----------")

		 */

		 if ( ($(document.body).height()+footerHeight) < $(window).height()) {
		 	$footer.css({
		 		position: "absolute"
		 	}).stop().animate({
		 		top: footerTop
		 	})
		 } else {
		 	$footer.css({
		 		position: "static"
		 	})
		 }

		}

		$(window)
		.scroll(positionFooter)
		.resize(positionFooter)

	});
