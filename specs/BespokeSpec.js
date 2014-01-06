(function() {
	"use strict";

	describe("bespoke", function() {

		['selector', 'element'].forEach(function(fromType) {

			describe("from " + fromType, function() {

				var PARENT_TAG = 'article',
					SLIDE_TAG = 'section',
					NO_OF_SLIDES = 10,
					article,
					slides,
					decks = [],
					deck;

				beforeEach(function() {
					slides = [];

					article = document.createElement(PARENT_TAG);
					for (var i = 0; i < NO_OF_SLIDES; i++) {
						slides.push(document.createElement(SLIDE_TAG));
						article.appendChild(slides[i]);
						// Ensure script tags are ignored
						article.appendChild(document.createElement('script'));
					}

					document.body.appendChild(article);

					var from = {
						selector: PARENT_TAG,
						element: article
					};

					decks.push((deck = bespoke.from(from[fromType])));
				});

				afterEach(function() {
					document.body.removeChild(article);
				});

				describe("classes", function() {

					it("should add a 'bespoke' class to the container", function() {
						expect(article.className).toMatch(/bespoke-parent/);
					});

					it("should add a 'bespoke-slide' class to the slides", function() {
						slides.forEach(function(slide) {
							expect(slide.className).toMatch(/bespoke-slide(\s|$)/);
						});
					});

					describe("bespoke-active", function() {

						it("should add a 'bespoke-active' class to the active slide", function() {
							deck.slide(3);
							expect(slides[3].className).toMatch(/bespoke-active(\s|$)/);
						});

						it("should not add a 'bespoke-active' class to all inactive slides", function() {
							slides = slides.reverse().slice(0, slides.length - 2).reverse();

							slides.forEach(function(slide) {
								expect(slide.className).not.toMatch(/bespoke-active(\s|$)/);
							});
						});

					});

					describe("bespoke-inactive", function() {

						it("should add a 'bespoke-inactive' class to all inactive slides", function() {
							slides = slides.reverse().slice(0, slides.length - 2).reverse();

							slides.forEach(function(slide) {
								expect(slide.className).toMatch(/bespoke-inactive(\s|$)/);
							});
						});

						it("should not add a 'bespoke-inactive' class to the active slide", function() {
							expect(slides[0].className).not.toMatch(/bespoke-inactive(\s|$)/);
						});

					});

					describe("bespoke-before", function() {

						it("should add a 'bespoke-before' class to all slides before active slide", function() {
							deck.slide(5);

							var beforeSlides = slides.slice(0, 4);

							beforeSlides.forEach(function(slide) {
								expect(slide.className).toMatch(/bespoke-before(\s|$)/);
							});
						});

						it("should not add a 'bespoke-before' class to all slides after active slide", function() {
							deck.slide(5);

							var notBeforeSlides = slides.slice(5, 9);

							notBeforeSlides.forEach(function(slide) {
								expect(slide.className).not.toMatch(/bespoke-before(\s|$)/);
							});
						});

					});

					describe("bespoke-before", function() {

						it("should add a 'bespoke-after' class to all slides after active slide", function() {
							deck.slide(5);

							var afterSlides = slides.slice(6);

							afterSlides.forEach(function(slide) {
								expect(slide.className).toMatch(/bespoke-after(\s|$)/);
							});
						});

						it("should not add a 'bespoke-after' class to all slides before active slide", function() {
							deck.slide(5);

							var notAfterSlides = slides.slice(0, 5);

							notAfterSlides.forEach(function(slide) {
								expect(slide.className).not.toMatch(/bespoke-after(\s|$)/);
							});
						});

					});

				});

				describe("API", function() {

					describe("global 'bespoke' object", function() {

						describe("next", function() {

							it("should call 'next' on all deck instances", function() {
								decks.forEach(function(deck) {
									deck.next = sinon.spy();
								});

								bespoke.next();

								decks.forEach(function(deck) {
									expect(deck.next.called).toBe(true);
								});
							});

							it("should call 'next' with custom event data on all deck instances", function() {
								var customEventData = { foo: 'bar' };

								decks.forEach(function(deck) {
									deck.next = sinon.spy();
								});

								bespoke.next(customEventData);

								decks.forEach(function(deck) {
									expect(deck.next.calledWith(customEventData)).toBe(true);
								});
							});

						});

						describe("prev", function() {

							it("should call 'prev' on all deck instances", function() {
								decks.forEach(function(deck) {
									deck.prev = sinon.spy();
								});

								bespoke.prev();

								decks.forEach(function(deck) {
									expect(deck.prev.called).toBe(true);
								});
							});

							it("should call 'prev' with custom event data on all deck instances", function() {
								var customEventData = { foo: 'bar' };

								decks.forEach(function(deck) {
									deck.prev = sinon.spy();
								});

								bespoke.prev(customEventData);

								decks.forEach(function(deck) {
									expect(deck.prev.calledWith(customEventData)).toBe(true);
								});
							});

						});

						describe("slide", function() {

							it("should call 'slide' on all deck instances", function() {
								decks.forEach(function(deck) {
									deck.slide = sinon.spy();
								});

								bespoke.slide(0);

								decks.forEach(function(deck) {
									expect(deck.slide.calledWith(0)).toBe(true);
								});
							});

							it("should call 'slide' with custom event data on all deck instances", function() {
								var customEventData = { foo: 'bar' };

								decks.forEach(function(deck) {
									deck.slide = sinon.spy();
								});

								bespoke.slide(0, customEventData);

								decks.forEach(function(deck) {
									expect(deck.slide.calledWith(0, customEventData)).toBe(true);
								});
							});

						});

					});

					describe("deck instances", function() {

						describe("next", function() {

							it("should go to the next slide when not last slide", function() {
								deck.next();
								expect(slides[1].className).toMatch(/bespoke-active(\s|$)/);
							});

							it("should do nothing when on last slide", function() {
								deck.slide(9);
								deck.next();
								deck.next();
								expect(slides[9].className).toMatch(/bespoke-active(\s|$)/);
							});

							it("should do nothing when on last slide and not change any state", function() {
								deck.slide(9);
								deck.next();
								deck.next();
								deck.prev();
								expect(slides[8].className).toMatch(/bespoke-active(\s|$)/);
							});

							it("shouldn't activate the next slide if event handler activates an earlier slide while on last slide", function() {
								var activateAnotherSlide = function() { deck.slide(5); };

								deck.slide(deck.slides.length - 1);
								var off = deck.on("next", activateAnotherSlide);
								deck.next();

								expect(deck.slides[5].classList.contains('bespoke-active')).toBe(true);

								off();
							});

							it("should merge the custom user payload with the event object", function() {
								var event;
								deck.on("next", function(e) {
									event = e;
								});
								deck.next({ foo: "bar" });

								expect(event.foo).toBe("bar");
							});

						});

						describe("prev", function() {

							it("should go to the previous slide when not first slide", function() {
								deck.slide(1);
								deck.prev();
								expect(slides[0].className).toMatch(/bespoke-active(\s|$)/);
							});

							it("should do nothing when on first slide", function() {
								deck.prev();
								deck.prev();
								expect(slides[0].className).toMatch(/bespoke-active(\s|$)/);
							});

							it("should do nothing when on first slide and not change any state", function() {
								deck.prev();
								deck.next();
								expect(slides[1].className).toMatch(/bespoke-active(\s|$)/);
							});

							it("shouldn't activate the previous slide if event handler activates a later slide while on first slide", function() {
								var activateAnotherSlide = function() { deck.slide(5); };

								var off = deck.on("prev", activateAnotherSlide);
								deck.prev();

								expect(deck.slides[5].classList.contains('bespoke-active')).toBe(true);

								off();
							});

							it("should merge the custom user payload with the event object", function() {
								var event;
								deck.on("prev", function(e) {
									event = e;
								});
								deck.prev({ foo: "bar" });

								expect(event.foo).toBe("bar");
							});

						});

						describe("on", function() {

							it("should return a function to unbind the event", function() {
								var callback = sinon.spy();
								var off = deck.on("foo", callback);
								deck.fire("foo");
								expect(callback.callCount).toBe(1);
								off();
								deck.fire("foo");
								expect(callback.callCount).toBe(1);
							});

							it("should allow multiple events to be bound", function() {
								var callback1 = sinon.spy(),
									callback2 = sinon.spy();
								deck.on("bar", callback1);
								deck.on("bar", callback2);
								deck.fire("bar");
								expect(callback1.called).toBe(true);
								expect(callback2.called).toBe(true);
							});

							describe("activate", function() {

								it("should call handler when slide is activated", function() {
									var callback = sinon.spy();
									deck.on("activate", callback);
									deck.next();
									expect(callback.called).toBe(true);
								});

								it("should pass payload to 'activate' handler when slide is activated", function() {
									var callback = sinon.spy(),
										SLIDE_INDEX = 0,
										ACTIVATED_SLIDE = deck.slides[SLIDE_INDEX];

									deck.on("activate", callback);
									deck.slide(SLIDE_INDEX);

									expect(callback.calledWith({
										slide: ACTIVATED_SLIDE,
										index: SLIDE_INDEX
									})).toBe(true);
								});

								it("should pass merged payload to 'activate' handler when next slide is activated with user payload", function() {
									var event;
									deck.on("activate", function(e) {
										event = e;
									});
									deck.next({ foo: "bar" });

									expect(event.foo).toBe("bar");
								});

								it("should pass merged payload to 'activate' handler when previous slide is activated with user payload", function() {
									var event;
									deck.slide(1);
									deck.on("activate", function(e) {
										event = e;
									});
									deck.prev({ foo: "bar" });

									expect(event.foo).toBe("bar");
								});

								it("should pass merged payload to 'deactivate' handler when specific slide is activated with user payload", function() {
									var event;
									deck.on("activate", function(e) {
										event = e;
									});
									deck.slide(1, { foo: "bar" });

									expect(event.foo).toBe("bar");
								});

							});

							describe("deactivate", function() {

								it("should call handler when slide is deactivated", function() {
									var callback = sinon.spy();
									deck.on("deactivate", callback);
									deck.next();
									expect(callback.called).toBe(true);
								});

								it("should pass payload to 'deactivate' handler once when slide is activated", function() {
									var callback = sinon.spy(),
										SLIDE_INDEX = 0,
										DEACTIVATED_SLIDE = deck.slides[SLIDE_INDEX];

									deck.on("deactivate", callback);
									deck.slide(1);

									expect(callback.calledWith({
										slide: DEACTIVATED_SLIDE,
										index: SLIDE_INDEX
									})).toBe(true);
									expect(callback.callCount).toBe(1);
								});

								it("should pass merged payload to 'deactivate' handler when next slide is activated with user payload", function() {
									var event;
									deck.on("deactivate", function(e) {
										event = e;
									});
									deck.next({ foo: "bar" });

									expect(event.foo).toBe("bar");
								});

								it("should pass merged payload to 'deactivate' handler when previous slide is activated with user payload", function() {
									var event;
									deck.slide(1);
									deck.on("deactivate", function(e) {
										event = e;
									});
									deck.prev({ foo: "bar" });

									expect(event.foo).toBe("bar");
								});

								it("should pass merged payload to 'deactivate' handler when specific slide is activated with user payload", function() {
									var event;
									deck.on("deactivate", function(e) {
										event = e;
									});
									deck.slide(1, { foo: "bar" });

									expect(event.foo).toBe("bar");
								});

							});

							describe("next", function() {

								it("should call handler when next slide is requested", function() {
									var callback = sinon.spy();

									deck.on("next", callback);
									deck.next();

									expect(callback.callCount).toBe(1);
								});

								it("should call handler when next slide is requested while on last slide", function() {
									var callback = sinon.spy();

									deck.slide(deck.slides.length - 1);
									deck.on("next", callback);
									deck.next();

									expect(callback.called).toBe(true);
								});

								it("should pass payload to 'next' handler when next slide is requested", function() {
									var callback = sinon.spy(),
										ACTIVE_SLIDE_INDEX = 0,
										ACTIVE_SLIDE = deck.slides[ACTIVE_SLIDE_INDEX];

									deck.on("next", callback);
									deck.slide(ACTIVE_SLIDE_INDEX);
									deck.next();

									expect(callback.calledWith({
										slide: ACTIVE_SLIDE,
										index: ACTIVE_SLIDE_INDEX
									})).toBe(true);
									expect(callback.callCount).toBe(1);
								});

								it("should not activate next slide if an event handler returns false", function() {
									var activateCallback = sinon.spy();

									deck.on("activate", activateCallback);
									deck.on("next", function() {
										return false;
									});
									deck.next();

									expect(activateCallback.called).toBe(false);
								});

								it("should not call subsequent 'next' handlers if an earlier event handler returns false", function() {
									var nextCallback = sinon.spy();

									deck.on("next", function() {
										return false;
									});
									deck.on("next", nextCallback);
									deck.next();

									expect(nextCallback.called).toBe(false);
								});

								it("should activate next slide if event handler returns true", function() {
									var activateCallback = sinon.spy();

									deck.on("activate", activateCallback);
									deck.on("next", function() {
										return true;
									});
									deck.next();

									expect(activateCallback.called).toBe(true);
								});

							});

							describe("prev", function() {

								it("should call handler when previous slide is requested", function() {
									var callback = sinon.spy();

									deck.slide(1);
									deck.on("prev", callback);
									deck.prev();

									expect(callback.callCount).toBe(1);
								});

								it("should call handler when previous slide is requested while on first slide", function() {
									var callback = sinon.spy();

									deck.on("prev", callback);
									deck.prev();

									expect(callback.called).toBe(true);
								});

								it("should pass payload to 'prev' handler when previous slide is requested", function() {
									var callback = sinon.spy(),
										ACTIVE_SLIDE_INDEX = 1,
										ACTIVE_SLIDE = deck.slides[ACTIVE_SLIDE_INDEX];

									deck.on("prev", callback);
									deck.slide(ACTIVE_SLIDE_INDEX);
									deck.prev();

									expect(callback.calledWith({
										slide: ACTIVE_SLIDE,
										index: ACTIVE_SLIDE_INDEX
									})).toBe(true);
									expect(callback.callCount).toBe(1);
								});

								it("should not activate previous slide if an event handler returns false", function() {
									var activateCallback = sinon.spy();

									deck.on("activate", activateCallback);
									deck.on("prev", function() {
										return false;
									});
									deck.prev();

									expect(activateCallback.called).toBe(false);
								});

								it("should not call subsequent 'prev' handlers if an earlier event handler returns false", function() {
									var prevCallback = sinon.spy();

									deck.slide(1);
									deck.on("prev", function() {
										return false;
									});
									deck.on("prev", prevCallback);
									deck.prev();

									expect(prevCallback.called).toBe(false);
								});

								it("should activate previous slide if event handler returns true", function() {
									var activateCallback = sinon.spy();

									deck.slide(1);
									deck.on("activate", activateCallback);
									deck.on("prev", function() {
										return true;
									});
									deck.prev();

									expect(activateCallback.called).toBe(true);
								});

							});

							describe("slide", function() {

								it("should return the current slide index when called without arguments", function() {
									deck.slide(1);
									expect(deck.slide()).toBe(1);

									deck.slide(2);
									expect(deck.slide()).toBe(2);
								});

								it("should call handler when specific slide is requested", function() {
									var callback = sinon.spy();

									deck.on("slide", callback);
									deck.slide(1);

									expect(callback.callCount).toBe(1);
								});

								it("should pass payload to 'slide' handler when specific slide is requested", function() {
									var callback = sinon.spy(),
										ACTIVE_SLIDE_INDEX = 1,
										ACTIVE_SLIDE = deck.slides[ACTIVE_SLIDE_INDEX];

									deck.on("slide", callback);
									deck.slide(ACTIVE_SLIDE_INDEX);

									expect(callback.calledWith({
										slide: ACTIVE_SLIDE,
										index: ACTIVE_SLIDE_INDEX
									})).toBe(true);
								});

								it("should not activate requested slide if an event handler returns false", function() {
									var activateCallback = sinon.spy();

									deck.on("activate", activateCallback);
									deck.on("slide", function() {
										return false;
									});
									deck.slide(1);

									expect(activateCallback.called).toBe(false);
								});

								it("should merge the custom user payload with the event object", function() {
									var event;
									deck.on("slide", function(e) {
										event = e;
									});
									deck.slide(0, { foo: "bar" });

									expect(event.foo).toBe("bar");
								});

							});

						});

						describe("fire", function() {

							it("should allow custom events to be triggered", function() {
								var customEventHandler = sinon.spy(),
									payload = { foo: 'bar' };

								deck.on('custom-event', customEventHandler);
								deck.fire('custom-event', payload);
								expect(customEventHandler.calledWith(payload)).toBe(true);
							});

						});

						describe("parent", function() {

							it("should refer to the parent element", function() {
								expect(deck.parent).toBe(article);
							});

						});

						describe("slides", function() {

							it("should be an array", function() {
								expect(Array.isArray(deck.slides)).toBe(true);
							});

							it("should have the same number of items as elements", function() {
								expect(deck.slides.length).toBe(NO_OF_SLIDES);
							});

							it("should match all slide elements in the DOM", function() {
								[].slice.call(document.querySelectorAll(SLIDE_TAG), 0).forEach(function(domSlide, i) {
									expect(domSlide).toBe(deck.slides[i]);
								});
							});

						});

						describe("plugins", function() {

							describe("custom", function() {

								var testPlugin,
									onActivate;

								beforeEach(function() {
									bespoke.plugins.testPlugin = testPlugin = sinon.spy();

									bespoke.plugins.onActivatePlugin = function(deck) {
										onActivate = sinon.spy();
										deck.on('activate', onActivate);
									};
								});

								afterEach(function() {
									delete bespoke.plugins.testPlugin;
									delete bespoke.plugins.onActivatePlugin;
								});

								it("should pass the deck instance as the first parameter", function() {
									var deck = bespoke.from("article", { testPlugin: true });
									expect(testPlugin.calledWith(deck)).toBe(true);
								});

								it("should pass 'true' as the second parameter if option is 'true'", function() {
									var deck = bespoke.from("article", { testPlugin: true });
									expect(testPlugin.calledWith(deck, true)).toBe(true);
								});

								it("should pass the options hash as the second parameter", function() {
									var deck = bespoke.from("article", { testPlugin: { foo: 'bar' } });
									expect(testPlugin.calledWith(deck, { foo: 'bar' })).toBe(true);
								});

								it("should not run the plugin if option is 'false'", function() {
									bespoke.from("article", { testPlugin: false });
									expect(testPlugin.called).toBe(false);
								});

								it("should call any 'activate' event handlers immediately", function() {
									bespoke.from("article", { onActivatePlugin: true });
									expect(onActivate.called).toBe(true);
								});

								it("should throw an error if a plugin isn't found", function() {
									var createDeckWithMissingPlugin = function() {
										bespoke.from("article", { foobar: true });
									};
									expect(createDeckWithMissingPlugin).toThrow("Missing plugin: bespoke-foobar");
								});

								it("should throw an error if a plugin isn't found even if the plugin is disabled", function() {
									var createDeckWithMissingDisabledPlugin = function() {
										bespoke.from("article", { foobar: false });
									};
									expect(createDeckWithMissingDisabledPlugin).toThrow("Missing plugin: bespoke-foobar");
								});

							});

						});

					});

				});

			});

		});

	});

}());
