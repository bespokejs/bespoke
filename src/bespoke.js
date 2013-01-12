(function(moduleName, window, document, isArray){
	'use strict';

	var presentations = [];

	var from = function(options) {
		options = typeof options === 'string' ? { selector: defaults.selector } : options;

		var config = extend({}, defaults, options),
			parent = document.querySelectorAll(config.selector)[0],
			slides = arrayFrom(parent.children),
			activeSlide = slides[0];

		var getSlide = function(indexOrElem) { return slides[indexOrElem] || indexOrElem; },

			getSlideWithOffset = function(s, offset) { return slides[slides.indexOf(s) + offset]; },

			slideAfter = function(slide) { return getSlideWithOffset(slide, 1); },

			slideBefore = function(slide) { return getSlideWithOffset(slide, -1); },

			next = function() { activate(slideAfter(activeSlide)); },

			prev = function() { activate(slideBefore(activeSlide)); },

			activate = function(indexOrElem) {
				if (indexOrElem == null) {
					return;
				}

				activeSlide = getSlide(indexOrElem);

				slides.forEach(deactivate);

				addClass(activeSlide, 'active');
				removeClass(activeSlide, 'inactive');
			},

			deactivate = function(slide, i) {
				removeClasses(slide, [
					'before+',
					'before-[0-9]+',
					'after',
					'after-[0-9]+',
					'active'
				]);

				if (slide === activeSlide) {
					return;
				}

				var offset = i - slides.indexOf(activeSlide),
					offsetClass = offset > 0 ? 'after' : 'before';

				addClasses(slide, [
					'inactive',
					offsetClass,
					offsetClass + '-' + Math.abs(offset)
				]);
			},

			handleKeydown = function(e) {
				var key = e.which || e.keyCode;
				if (key === 37) {
					prev();
				} else if (key === 32 || key === 39) {
					next();
				}
			};

		activate(slides[0]);

		addClass(parent, 'parent');
		addClass(slides, 'slide');

		document.addEventListener('keydown', handleKeydown);

		(function() {
			var startX,
				moveX,

				singleTouch = function(fn) {
					return function(e) {
						e.preventDefault();
						e.touches.length === 1 && fn(e.touches[0].pageX);
					};
				};

			document.addEventListener('touchstart', singleTouch(function(x) {
				startX = x;
			}));

			document.addEventListener('touchmove', singleTouch(function(x) {
				moveX = x;
			}));

			document.addEventListener('touchend', function() {
				var delta = moveX - startX;
				
				if (Math.abs(delta) < 50) {
					return;
				}

				delta > 0 ? prev() : next();
			});
		}());

		var presentation = {
			activate: activate,
			next: next,
			prev: prev
		};

		presentations.push(presentation);

		return presentation;
	};

	var defaults = {
		selector: 'article'
	};

	var arrayFrom = function(arrayLike) { return [].slice.call(arrayLike, 0); },

		extend = function(obj) {
			arrayFrom(arguments).forEach(function(source) {
				if (source) {
					for (var prop in source) {
						obj[prop] = source[prop];
					}
				}
			});

			return obj;
		},

		prefixClass = function(cls) { return cls = cls === moduleName ? cls : moduleName + '-' + cls; },

		classMatcher = function(cls) { return new RegExp('(\\s|^)'+cls+'(\\s|$)', 'gi'); },

		hasClass = function(el, cls) { return classMatcher(cls).test(el.className); },

		addClass = function(el, className) {
			return (isArray(el) && addClassToElements(el, className)) ||
				(isArray(className) && addClasses(el, className)) ||
				addClassToElement(el, className);
		},

		addClassToElements = function(elements, classNames) {
			elements.forEach(function(el) { addClass(el, classNames); });
		},

		addClasses = function(el, classNames) {
			classNames.forEach(function(cls) { addClass(el, cls); });
		},

		addClassToElement = function(el, cls) {
			cls = prefixClass(cls);
			if (!hasClass(el, cls)) {
				el.className += (el.className ? ' ' : '') + cls;
			}
		},

		removeClass = function(el, className) {
			return (isArray(el) && removeClassFromElements(el, className)) ||
				(isArray(className) && removeClasses(el, className)) ||
				removeClassFromElement(el, className);
		},

		removeClassFromElements = function(elements, className) {
			elements.forEach(function(el) { removeClass(el, className); });
		},

		removeClasses = function(el, classNames) {
			classNames.forEach(function(className) { removeClass(el, className); });
		},

		removeClassFromElement = function(el, cls) {
			cls = prefixClass(cls);
			if (hasClass(el, cls)) {
				el.className = el.className
					.replace(classMatcher(cls), ' ')
					.replace(/^\s+|\s+$/g, '');
			}
		};

	var callOnAllInstances = function(method) {
		return function() {
			var args = arguments;
			presentations.forEach(function(presentation) {
				presentation[method].apply(null, args);
			});
		};
	};

	window[moduleName] = {
		presentations: presentations,
		defaults: defaults,
		from: from,
		next: callOnAllInstances('next'),
		prev: callOnAllInstances('prev'),
		activate: callOnAllInstances('activate')
	};

}('bespoke', this, this.document, Array.isArray));