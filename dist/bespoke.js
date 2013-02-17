/*!
 * Bespoke.js v0.0.1-alpha-5
 *
 * Copyright 2013, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

(function(moduleName, window, document){
	'use strict';

	var decks = [],

		from = function(selector, selectedPlugins) {
			var parent = document.querySelector(selector),
				slides = [].slice.call(parent.children, 0),
				activeSlide = slides[0],

				next = function() {
					activateSlideWithOffset(1);
				},

				prev = function() {
					activateSlideWithOffset(-1);
				},

				activate = function(indexOrElem) {
					if (indexOrElem == null) {
						return;
					}

					activeSlide = slides[indexOrElem] || indexOrElem;

					slides.forEach(deactivate);

					addClass(activeSlide, 'active');
					removeClass(activeSlide, 'inactive');
				},

				deactivate = function(slide, i) {
					[
						'before+',
						'before-[0-9]+',
						'after',
						'after-[0-9]+',
						'active'
					].forEach(removeClass.bind(null, slide));

					if (slide === activeSlide) {
						return;
					}

					var offset = i - slides.indexOf(activeSlide),
						offsetClass = offset > 0 ? 'after' : 'before';

					[
						'inactive',
						offsetClass,
						offsetClass + '-' + Math.abs(offset)
					].forEach(addClass.bind(null, slide));
				},

				activateSlideWithOffset = function(offset) {
					activate(slides[slides.indexOf(activeSlide) + offset]);
				};

			activate(slides[0]);

			addClass(parent, 'parent');
			
			slides.forEach(function(slide) {
				addClass(slide, 'slide');
			});

			var deck = {
				to: activate,
				next: next,
				prev: prev,
				parent: parent,
				slides: slides
			};

			Object.keys(selectedPlugins || {}).forEach(function(pluginName) {
				var config = selectedPlugins[pluginName];
				config && plugins[pluginName](deck, config === true ? {} : config);
			});

			decks.push(deck);

			return deck;
		},

		makePluginForAxis = function(axis) {
			return function(deck) {
				var startPosition,
					delta,

					singleTouch = function(fn) {
						return function(e) {
							e.preventDefault();
							e.touches.length === 1 && fn(e.touches[0]['page' + axis]);
						};
					};

				document.addEventListener('keydown', function(e) {
					var key = e.which;

					if (axis === 'X') {
						key === 37 && deck.prev();
						(key === 32 || key === 39) && deck.next();
					} else {
						key === 38 && deck.prev();
						(key === 32 || key === 40) && deck.next();
					}
				});

				document.addEventListener('touchstart', singleTouch(function(position) {
					startPosition = position;
				}));

				document.addEventListener('touchmove', singleTouch(function(position) {
					delta = position - startPosition;
				}));

				document.addEventListener('touchend', function() {
					if (Math.abs(delta) < 100) {
						return;
					}

					delta > 0 ? deck.prev() : deck.next();
				});
			};
		},

		plugins = {
			horizontal: makePluginForAxis('X'),
			vertical: makePluginForAxis('Y')
		},

		hasClass = function(el, cls) {
			return classMatcher(cls).test(el.className);
		},

		prefixClass = function(cls) {
			return cls = cls === moduleName ? cls : moduleName + '-' + cls;
		},

		classMatcher = function(cls) {
			return new RegExp('(\\s|^)'+cls+'(\\s|$)', 'gi');
		},

		addClass = function(el, cls) {
			cls = prefixClass(cls);
			if (!hasClass(el, cls)) {
				el.className += (el.className ? ' ' : '') + cls;
			}
		},

		removeClass = function(el, cls) {
			cls = prefixClass(cls);
			if (hasClass(el, cls)) {
				el.className = el.className
					.replace(classMatcher(cls), ' ')
					.replace(/^\s+|\s+$/g, '');
			}
		},

		callOnAllInstances = function(method) {
			return function(arg) {
				decks.forEach(function(deck) {
					deck[method].call(null, arg);
				});
			};
		},

		bindPlugin = function(pluginName) {
			return {
				from: function(selector, selectedPlugins) {
					selectedPlugins = selectedPlugins || {};
					selectedPlugins[pluginName] = true;
					return from(selector, selectedPlugins);
				}
			};
		};

	window[moduleName] = {
		from: from,
		to: callOnAllInstances('to'),
		next: callOnAllInstances('next'),
		prev: callOnAllInstances('prev'),
		horizontal: bindPlugin('horizontal'),
		vertical: bindPlugin('vertical'),
		plugins: plugins,
		decks: decks
	};

}('bespoke', this, this.document));