(function() {
	"use strict";

	describe("bespoke", function() {

		var article,
			slides,
			deck;

		beforeEach(function() {
			slides = [];

			article = document.createElement('article');
			for (var i = 0; i < 10; i++) {
				slides.push(document.createElement('section'));
				article.appendChild(slides[i]);
			}

			document.body.appendChild(article);

			deck = bespoke.from('article');
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
					deck.goto(3);
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
					deck.goto(5);
					
					var beforeSlides = slides.slice(0, 4);

					beforeSlides.forEach(function(slide) {
						expect(slide.className).toMatch(/bespoke-before(\s|$)/);
					});
				});

				it("should not add a 'bespoke-before' class to all slides after active slide", function() {
					deck.goto(5);
					
					var notBeforeSlides = slides.slice(5, 9);

					notBeforeSlides.forEach(function(slide) {
						expect(slide.className).not.toMatch(/bespoke-before(\s|$)/);
					});
				});

			});

			describe("bespoke-before", function() {

				it("should add a 'bespoke-after' class to all slides after active slide", function() {
					deck.goto(5);
					
					var afterSlides = slides.slice(6);

					afterSlides.forEach(function(slide) {
						expect(slide.className).toMatch(/bespoke-after(\s|$)/);
					});
				});

				it("should not add a 'bespoke-after' class to all slides before active slide", function() {
					deck.goto(5);
					
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

				describe("goto", function() {

					it("should call 'goto' on all deck instances", function() {
						bespoke.decks.forEach(function(deck) {
							deck.goto = sinon.spy();
						});

						bespoke.goto(0);

						bespoke.decks.forEach(function(deck) {
							expect(deck.goto.calledWith(0)).toBe(true);
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
						deck.goto(9);
						deck.next();
						expect(slides[9].className).toMatch(/bespoke-active(\s|$)/);
					});

				});

				describe("prev", function() {

					it("should go to the previous slide when not first slide", function() {
						deck.goto(1);
						deck.prev();
						expect(slides[0].className).toMatch(/bespoke-active(\s|$)/);
					});

					it("should do nothing when on first slide", function() {
						deck.prev();
						expect(slides[0].className).toMatch(/bespoke-active(\s|$)/);
					});

				});

			});

		});

	});

}());