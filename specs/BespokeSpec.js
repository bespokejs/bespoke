(function() {
	"use strict";

	describe("bespoke", function() {

		var article,
			slides,
			presentation;

		beforeEach(function() {
			slides = [];

			article = document.createElement('article');
			for (var i = 0; i < 10; i++) {
				slides.push(document.createElement('section'));
				article.appendChild(slides[i]);
			}

			document.body.appendChild(article);

			presentation = bespoke.from('article');
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
					presentation.activate(3);
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
					presentation.activate(5);
					
					var beforeSlides = slides.slice(0, 4);

					beforeSlides.forEach(function(slide) {
						expect(slide.className).toMatch(/bespoke-before(\s|$)/);
					});
				});

				it("should not add a 'bespoke-before' class to all slides after active slide", function() {
					presentation.activate(5);
					
					var notBeforeSlides = slides.slice(5, 9);

					notBeforeSlides.forEach(function(slide) {
						expect(slide.className).not.toMatch(/bespoke-before(\s|$)/);
					});
				});

			});

			describe("bespoke-before", function() {

				it("should add a 'bespoke-after' class to all slides after active slide", function() {
					presentation.activate(5);
					
					var afterSlides = slides.slice(6);

					afterSlides.forEach(function(slide) {
						expect(slide.className).toMatch(/bespoke-after(\s|$)/);
					});
				});

				it("should not add a 'bespoke-after' class to all slides before active slide", function() {
					presentation.activate(5);
					
					var notAfterSlides = slides.slice(0, 5);

					notAfterSlides.forEach(function(slide) {
						expect(slide.className).not.toMatch(/bespoke-after(\s|$)/);
					});
				});

			});

		});

		describe("API", function() {

			describe("global 'bespoke' object", function() {

				describe("presentations", function() {

					it("should contain a reference to created presentations", function() {
						expect(presentation).toBe(bespoke.presentations[bespoke.presentations.length - 1]);
					});

				});

				describe("next", function() {

					it("should call 'next' on all presentation instances", function() {
						bespoke.presentations.forEach(function(presentation) {
							presentation.next = sinon.spy();
						});

						bespoke.next();

						bespoke.presentations.forEach(function(presentation) {
							expect(presentation.next.called).toBe(true);
						});
					});

				});

				describe("prev", function() {

					it("should call 'prev' on all presentation instances", function() {
						bespoke.presentations.forEach(function(presentation) {
							presentation.prev = sinon.spy();
						});

						bespoke.prev();

						bespoke.presentations.forEach(function(presentation) {
							expect(presentation.prev.called).toBe(true);
						});
					});

				});

				describe("activate", function() {

					it("should call 'activate' on all presentation instances", function() {
						bespoke.presentations.forEach(function(presentation) {
							presentation.activate = sinon.spy();
						});

						bespoke.activate(0);

						bespoke.presentations.forEach(function(presentation) {
							expect(presentation.activate.calledWith(0)).toBe(true);
						});
					});

				});

			});

			describe("presentation instances", function() {

				describe("next", function() {

					it("should go to the next slide when not last slide", function() {
						presentation.next();
						expect(slides[1].className).toMatch(/bespoke-active(\s|$)/);
					});

					it("should do nothing when on last slide", function() {
						presentation.activate(9);
						presentation.next();
						expect(slides[9].className).toMatch(/bespoke-active(\s|$)/);
					});

				});

				describe("prev", function() {

					it("should go to the previous slide when not first slide", function() {
						presentation.activate(1);
						presentation.prev();
						expect(slides[0].className).toMatch(/bespoke-active(\s|$)/);
					});

					it("should do nothing when on first slide", function() {
						presentation.prev();
						expect(slides[0].className).toMatch(/bespoke-active(\s|$)/);
					});

				});

			});

		});

	});

}());