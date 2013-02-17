(function() {
	"use strict";

	describe("bespoke", function() {

		var PARENT_TAG = 'article',
			SLIDE_TAG = 'section',
			NO_OF_SLIDES = 10,
			article,
			slides,
			deck;

		beforeEach(function() {
			slides = [];

			article = document.createElement(PARENT_TAG);
			for (var i = 0; i < NO_OF_SLIDES; i++) {
				slides.push(document.createElement(SLIDE_TAG));
				article.appendChild(slides[i]);
			}

			document.body.appendChild(article);

			deck = bespoke.from(PARENT_TAG);
		});

		afterEach(function() {
			document.body.removeChild(article);
		});

		describe("classes", function() {

			it("should add a 'bespoke' class to the container", function() {
				expect(article.className).toBe('bespoke-parent');
			});

			it("should add a 'bespoke-slide' class to the slides", function() {
				slides.forEach(function(slide) {
					expect(slide.className).toMatch(/bespoke-slide(\s|$)/);
				});
			});

			describe("bespoke-active", function() {

				it("should add a 'bespoke-active' class to the active slide", function() {
					deck.to(3);
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
					deck.to(5);
					
					var beforeSlides = slides.slice(0, 4);

					beforeSlides.forEach(function(slide) {
						expect(slide.className).toMatch(/bespoke-before(\s|$)/);
					});
				});

				it("should not add a 'bespoke-before' class to all slides after active slide", function() {
					deck.to(5);
					
					var notBeforeSlides = slides.slice(5, 9);

					notBeforeSlides.forEach(function(slide) {
						expect(slide.className).not.toMatch(/bespoke-before(\s|$)/);
					});
				});

			});

			describe("bespoke-before", function() {

				it("should add a 'bespoke-after' class to all slides after active slide", function() {
					deck.to(5);
					
					var afterSlides = slides.slice(6);

					afterSlides.forEach(function(slide) {
						expect(slide.className).toMatch(/bespoke-after(\s|$)/);
					});
				});

				it("should not add a 'bespoke-after' class to all slides before active slide", function() {
					deck.to(5);
					
					var notAfterSlides = slides.slice(0, 5);

					notAfterSlides.forEach(function(slide) {
						expect(slide.className).not.toMatch(/bespoke-after(\s|$)/);
					});
				});

			});

		});

		describe("API", function() {

			describe("global 'bespoke' object", function() {

				describe("decks", function() {

					it("should contain a reference to created decks", function() {
						expect(deck).toBe(bespoke.decks[bespoke.decks.length - 1]);
					});

				});

				describe("next", function() {

					it("should call 'next' on all deck instances", function() {
						bespoke.decks.forEach(function(deck) {
							deck.next = sinon.spy();
						});

						bespoke.next();

						bespoke.decks.forEach(function(deck) {
							expect(deck.next.called).toBe(true);
						});
					});

				});

				describe("prev", function() {

					it("should call 'prev' on all deck instances", function() {
						bespoke.decks.forEach(function(deck) {
							deck.prev = sinon.spy();
						});

						bespoke.prev();

						bespoke.decks.forEach(function(deck) {
							expect(deck.prev.called).toBe(true);
						});
					});

				});

				describe("to", function() {

					it("should call 'to' on all deck instances", function() {
						bespoke.decks.forEach(function(deck) {
							deck.to = sinon.spy();
						});

						bespoke.to(0);

						bespoke.decks.forEach(function(deck) {
							expect(deck.to.calledWith(0)).toBe(true);
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
						deck.to(9);
						deck.next();
						expect(slides[9].className).toMatch(/bespoke-active(\s|$)/);
					});

				});

				describe("prev", function() {

					it("should go to the previous slide when not first slide", function() {
						deck.to(1);
						deck.prev();
						expect(slides[0].className).toMatch(/bespoke-active(\s|$)/);
					});

					it("should do nothing when on first slide", function() {
						deck.prev();
						expect(slides[0].className).toMatch(/bespoke-active(\s|$)/);
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

					describe("shorthand plugins", function() {

						describe("horizontal", function() {

							var horizontal,
								oldHorizontal;

							beforeEach(function() {
								oldHorizontal = bespoke.plugins.horizontal;
								bespoke.plugins.horizontal = horizontal = sinon.spy();
							});

							afterEach(function() {
								bespoke.plugins.horizontal = oldHorizontal;
							});

							it("should allow the 'horizontal' plugin using the shorthand", function() {
								var deck = bespoke.horizontal.from("article");
								expect(horizontal.calledWith(deck)).toBe(true);
							});

							it("should allow custom plugins to be specified", function() {
								bespoke.plugins.testPlugin = sinon.spy();
								
								var deck = bespoke.horizontal.from("article", { testPlugin: true });
								
								expect(horizontal.calledWith(deck)).toBe(true);
								expect(bespoke.plugins.testPlugin.calledWith(deck)).toBe(true);

								delete bespoke.plugins.testPlugin;
							});

							it("should allow custom plugins to be specified with options", function() {
								bespoke.plugins.testPlugin = sinon.spy();
								
								var deck = bespoke.horizontal.from("article", { testPlugin: { foo: 'bar' } });
								
								expect(horizontal.calledWith(deck)).toBe(true);
								expect(bespoke.plugins.testPlugin.calledWith(deck, { foo: 'bar' })).toBe(true);

								delete bespoke.plugins.testPlugin;
							});

						});

						describe("vertical", function() {

							var vertical,
								oldVertical;

							beforeEach(function() {
								oldVertical = bespoke.plugins.vertical;
								bespoke.plugins.vertical = vertical = sinon.spy();
							});

							afterEach(function() {
								bespoke.plugins.vertical = oldVertical;
							});

							it("should allow the 'vertical' plugin using the shorthand", function() {
								var deck = bespoke.vertical.from("article");
								expect(vertical.calledWith(deck)).toBe(true);
							});

							it("should allow custom plugins to be specified", function() {
								bespoke.plugins.testPlugin = sinon.spy();
								
								var deck = bespoke.vertical.from("article", { testPlugin: true });
								
								expect(vertical.calledWith(deck)).toBe(true);
								expect(bespoke.plugins.testPlugin.calledWith(deck)).toBe(true);

								delete bespoke.plugins.testPlugin;
							});

							it("should allow custom plugins to be specified with options", function() {
								bespoke.plugins.testPlugin = sinon.spy();
								
								var deck = bespoke.vertical.from("article", { testPlugin: { foo: 'bar' } });
								
								expect(vertical.calledWith(deck)).toBe(true);
								expect(bespoke.plugins.testPlugin.calledWith(deck, { foo: 'bar' })).toBe(true);

								delete bespoke.plugins.testPlugin;
							});

						});

					});

					describe("custom", function() {

						var testPlugin;

						beforeEach(function() {
							bespoke.plugins.testPlugin = testPlugin = sinon.spy();
						});

						afterEach(function() {
							delete bespoke.plugins.testPlugin;
						});

						it("should pass the deck instance as the first parameter", function() {
							var deck = bespoke.from("article", { testPlugin: true });
							expect(testPlugin.calledWith(deck)).toBe(true);
						});

						it("should pass a blank object as the second parameter if option is 'true'", function() {
							var deck = bespoke.from("article", { testPlugin: true });
							expect(testPlugin.calledWith(deck, {})).toBe(true);
						});

						it("should pass the options hash as the second parameter", function() {
							var deck = bespoke.from("article", { testPlugin: { foo: 'bar' } });
							expect(testPlugin.calledWith(deck, { foo: 'bar' })).toBe(true);
						});

						it("should not run the plugin if option is 'false'", function() {
							bespoke.from("article", { testPlugin: false });
							expect(testPlugin.called).toBe(false);
						});

					});

				});

			});

		});

	});

}());