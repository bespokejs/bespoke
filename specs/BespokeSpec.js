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

			it("should add a 'bespoke-inactive' class to all inactive slides", function() {
				slides = slides.reverse().slice(0, slides.length - 2).reverse();

				slides.forEach(function(slide) {
					expect(slide.className).toMatch(/bespoke-inactive(\s|$)/);
				});
			});

			it("should not add a 'bespoke-inactive' class to the active slide", function() {
				expect(slides[0].className).not.toMatch(/bespoke-inactive(\s|$)/);
			});

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

}());