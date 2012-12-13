(function(moduleName, window, isArray){
	'use strict';

	function from(options) {
		options = typeof options === 'string' ? { selector: defaults.selector } : options;

		var config = extend({}, defaults, options),
			parent = document.querySelectorAll(config.selector)[0],
			slides = arrayFrom(parent.children),
			activeSlide = slides[0];

		var getSlide = function(indexOrElem) { return slides[indexOrElem] || indexOrElem; },

			getSlideWithOffset = function(s, offset) { return slides[slides.indexOf(s) + offset]; },

			slideAfter = function(slide) { return getSlideWithOffset(slide, 1); },

			slideBefore = function(slide) { return getSlideWithOffset(slide, -1); },

			next = function() {
				activate(slideAfter(activeSlide));
			},

			prev = function() {
				activate(slideBefore(activeSlide));
			},

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

		return {
			activate: activate,
			next: next,
			prev: prev
		};
	}

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

	window[moduleName] = {
		defaults: defaults,
		from: from
	};

}('bespoke', this, Array.isArray));