(function(moduleName, window, document){
	var from = function(selector, selectedPlugins) {
			var parent = document.querySelector(selector),
				slides = [].slice.call(parent.children, 0),
				activeSlide = slides[0],
				deckListeners = {},

				activate = function(index) {
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
					var offset = index - slides.indexOf(activeSlide),
						offsetClass = offset > 0 ? 'after' : 'before';

					[
						'before',
						'before-\\d+',
						'after',
						'after-\\d+',
						'active',
						'inactive'
					].map(removeClass.bind(null, slide));

					slide !== activeSlide && [
						'inactive',
						offsetClass,
						offsetClass + '-' + Math.abs(offset)
					].map(addClass.bind(null, slide));
				},

				next = function() {
					slides.indexOf(activeSlide) < slides.length - 1 &&
					fire(deckListeners, 'next', {
						slide: activeSlide,
						index: slides.indexOf(activeSlide)
					}) &&
					activate(slides.indexOf(activeSlide) + 1);
				},

				prev = function() {
					slides.indexOf(activeSlide) > 0 &&
					fire(deckListeners, 'prev', {
						slide: activeSlide,
						index: slides.indexOf(activeSlide)
					}) &&
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

		decks = [],

		bespokeListeners = {},

		on = function(listeners, eventName, callback) {
			(listeners[eventName] || (listeners[eventName] = [])).push(callback);
		},

		off = function(listeners, eventName, callback) {
			listeners[eventName] = (listeners[eventName] || []).filter(function(listener) {
				return listener !== callback;
			});
		},

		fire = function(listeners, eventName, payload) {
			return (listeners[eventName] || [])
				.concat((listeners !== bespokeListeners && bespokeListeners[eventName]) || [])
				.reduce(function(notCancelled, callback) {
					return callback(payload) !== false && notCancelled;
				}, true);
		},

		addClass = function(el, cls) {
			el.classList.add(moduleName + '-' + cls);
		},

		removeClass = function(el, cls) {
			el.classList.remove(moduleName + '-' + cls);
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
		},

		makePluginForAxis = function(axis) {
			return function(deck) {
				var startPosition,
					delta;

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

				deck.parent.addEventListener('touchstart', function(e) {
					if (e.touches.length === 1) {
						startPosition = e.touches[0]['page' + axis];
						delta = 0;
					}
				});

				deck.parent.addEventListener('touchmove', function(e) {
					if (e.touches.length === 1) {
						e.preventDefault();
						delta = e.touches[0]['page' + axis] - startPosition;
					}
				});

				deck.parent.addEventListener('touchend', function() {
					Math.abs(delta) > 50 && (delta > 0 ? deck.prev() : deck.next());
				});
			};
		},

		plugins = {
			horizontal: makePluginForAxis('X'),
			vertical: makePluginForAxis('Y')
		};

	window[moduleName] = {
		from: from,
		slide: callOnAllInstances('slide'),
		next: callOnAllInstances('next'),
		prev: callOnAllInstances('prev'),
		horizontal: bindPlugin('horizontal'),
		vertical: bindPlugin('vertical'),
		on: on.bind(null, bespokeListeners),
		off: off.bind(null, bespokeListeners),
		plugins: plugins,
		decks: decks
	};

}('bespoke', this, document));