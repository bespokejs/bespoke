(function(moduleName, window, document){
	'use strict';

	var decks = [],

		bespokeListeners = {},

		on = function(listeners, eventName, callback) {
			(listeners[eventName] || (listeners[eventName] = [])).push(callback);
		},

		off = function(listeners, eventName, callback) {
			(listeners[eventName] || []).reduce(function(listener) {
				return listener !== callback;
			});
		},

		fire = function(listeners, eventName, payload) {
			(listeners[eventName] || [])
				.concat((listeners !== bespokeListeners && bespokeListeners[eventName]) || [])
				.map(function(callback) {
					setTimeout(callback.bind(null, payload), 0);
				});
		},

		from = function(selector, selectedPlugins) {
			var parent = document.querySelector(selector),
				slides = [].slice.call(parent.children, 0),
				activeSlide = slides[0],
				deckListeners = {},

				activate = function(index) {
					if (!slides[index]) {
						return;
					}

					fire(deckListeners, 'deactivate', {
						slide: activeSlide,
						index: slides.indexOf(activeSlide)
					});

					activeSlide = slides[index];

					slides.map(deactivate);

					addClass(activeSlide, 'active');
					removeClass(activeSlide, 'inactive');

					fire(deckListeners, 'activate', {
						slide: activeSlide,
						index: index
					});
				},

				deactivate = function(slide, index) {
					[
						'before',
						'before-\\d+',
						'after',
						'after-\\d+',
						'active',
						'inactive'
					].map(removeClass.bind(null, slide));

					if (slide === activeSlide) {
						return;
					}

					var offset = index - slides.indexOf(activeSlide),
						offsetClass = offset > 0 ? 'after' : 'before';

					[
						'inactive',
						offsetClass,
						offsetClass + '-' + Math.abs(offset)
					].map(addClass.bind(null, slide));
				},

				next = function() {
					activate(slides.indexOf(activeSlide) + 1);
				},

				prev = function() {
					activate(slides.indexOf(activeSlide) - 1);
				},

				deck = {
					on: on.bind(null, deckListeners),
					off: off.bind(null, deckListeners),
					slide: activate,
					next: next,
					prev: prev,
					parent: parent,
					slides: slides
				};

			activate(0);

			addClass(parent, 'parent');
			
			slides.map(function(slide) {
				addClass(slide, 'slide');
			});

			Object.keys(selectedPlugins || {}).map(function(pluginName) {
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

		prefixClass = function(cls) {
			return moduleName + '-' + cls;
		},

		addClass = function(el, cls) {
			el.className += ' ' + prefixClass(cls);
		},

		removeClass = function(el, cls) {
			cls = prefixClass(cls);

			var classMatcher = new RegExp('(\\s|^)'+cls+'(\\s|$)', 'gi');

			if (classMatcher.test(el.className)) {
				el.className = el.className
					.replace(classMatcher, ' ')
					.replace(/^\s+|\s+$/g, '');
			}
		},

		callOnAllInstances = function(method) {
			return function(arg) {
				decks.map(function(deck) {
					deck[method].call(null, arg);
				});
			};
		},

		bindPlugin = function(pluginName) {
			return {
				from: function(selector, selectedPlugins) {
					(selectedPlugins = selectedPlugins || {})[pluginName] = true;
					return from(selector, selectedPlugins);
				}
			};
		};

	window[moduleName] = {
		on: on.bind(null, bespokeListeners),
		off: off.bind(null, bespokeListeners),
		from: from,
		slide: callOnAllInstances('slide'),
		next: callOnAllInstances('next'),
		prev: callOnAllInstances('prev'),
		horizontal: bindPlugin('horizontal'),
		vertical: bindPlugin('vertical'),
		plugins: plugins,
		decks: decks
	};

}('bespoke', this, document));