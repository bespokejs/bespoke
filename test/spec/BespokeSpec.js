Function.prototype.bind = require('function-bind');

var bespoke = require('../../lib-instrumented/bespoke.js');

describe("bespoke", function() {

  ['selector', 'element', 'selectors', 'elements'].forEach(function(fromType) {

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
          element: article,
          selectors: { parent: PARENT_TAG, slides: SLIDE_TAG },
          elements: { parent: article, slides: article.children }
        };

        decks.push((deck = bespoke.from(from[fromType])));
      });

      afterEach(function() {
        document.body.removeChild(article);
      });

      describe("API", function() {

        describe("deck instances", function() {

          describe("next", function() {

            it("should go to the next slide when not last slide", function() {
              deck.next();
              expect(deck.slide()).toBe(1);
            });

            it("should do nothing when on last slide", function() {
              deck.slide(9);
              deck.next();
              deck.next();
              expect(deck.slide()).toBe(9);
            });

            it("should do nothing when on last slide and not change any state", function() {
              deck.slide(9);
              deck.next();
              deck.next();
              deck.prev();
              expect(deck.slide()).toBe(8);
            });

            it("shouldn't activate the next slide if event handler activates an earlier slide while on last slide", function() {
              var activateAnotherSlide = function() { deck.slide(5); };

              deck.slide(deck.slides.length - 1);
              var off = deck.on("next", activateAnotherSlide);
              deck.next();

              expect(deck.slide()).toBe(5);

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
              expect(deck.slide()).toBe(0);
            });

            it("should do nothing when on first slide", function() {
              deck.prev();
              deck.prev();
              expect(deck.slide()).toBe(0);
            });

            it("should do nothing when on first slide and not change any state", function() {
              deck.prev();
              deck.next();
              expect(deck.slide()).toBe(1);
            });

            it("shouldn't activate the previous slide if event handler activates a later slide while on first slide", function() {
              var activateAnotherSlide = function() { deck.slide(5); };

              var off = deck.on("prev", activateAnotherSlide);
              deck.prev();

              expect(deck.slide()).toBe(5);

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
              var callback = jasmine.createSpy('callback');
              var off = deck.on("foo", callback);
              deck.fire("foo");
              expect(callback.callCount).toBe(1);
              off();
              deck.fire("foo");
              expect(callback.callCount).toBe(1);
            });

            it("should allow multiple events to be bound", function() {
              var callback1 = jasmine.createSpy('callback1'),
                callback2 = jasmine.createSpy('callback2');
              deck.on("bar", callback1);
              deck.on("bar", callback2);
              deck.fire("bar");
              expect(callback1).toHaveBeenCalled();
              expect(callback2).toHaveBeenCalled();
            });

            describe("activate", function() {

              it("should call handler when slide is activated", function() {
                var callback = jasmine.createSpy('callback');
                deck.on("activate", callback);
                deck.next();
                expect(callback).toHaveBeenCalled();
              });

              it("should pass payload to 'activate' handler when slide is activated", function() {
                var callback = jasmine.createSpy('callback'),
                  SLIDE_INDEX = 0,
                  ACTIVATED_SLIDE = deck.slides[SLIDE_INDEX];

                deck.on("activate", callback);
                deck.slide(SLIDE_INDEX);

                expect(callback).toHaveBeenCalledWith({
                  slide: ACTIVATED_SLIDE,
                  index: SLIDE_INDEX
                });
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
                var callback = jasmine.createSpy('callback');
                deck.on("deactivate", callback);
                deck.next();
                expect(callback).toHaveBeenCalled();
              });

              it("should pass payload to 'deactivate' handler once when slide is activated", function() {
                var callback = jasmine.createSpy('callback'),
                  SLIDE_INDEX = 0,
                  DEACTIVATED_SLIDE = deck.slides[SLIDE_INDEX];

                deck.on("deactivate", callback);
                deck.slide(1);

                expect(callback).toHaveBeenCalledWith({
                  slide: DEACTIVATED_SLIDE,
                  index: SLIDE_INDEX
                });
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
                var callback = jasmine.createSpy('callback');

                deck.on("next", callback);
                deck.next();

                expect(callback.callCount).toBe(1);
              });

              it("should call handler when next slide is requested while on last slide", function() {
                var callback = jasmine.createSpy('callback');

                deck.slide(deck.slides.length - 1);
                deck.on("next", callback);
                deck.next();

                expect(callback).toHaveBeenCalled();
              });

              it("should pass payload to 'next' handler when next slide is requested", function() {
                var callback = jasmine.createSpy('callback'),
                  ACTIVE_SLIDE_INDEX = 0,
                  ACTIVE_SLIDE = deck.slides[ACTIVE_SLIDE_INDEX];

                deck.on("next", callback);
                deck.slide(ACTIVE_SLIDE_INDEX);
                deck.next();

                expect(callback).toHaveBeenCalledWith({
                  slide: ACTIVE_SLIDE,
                  index: ACTIVE_SLIDE_INDEX
                });
                expect(callback.callCount).toBe(1);
              });

              it("should not activate next slide if an event handler returns false", function() {
                var activateCallback = jasmine.createSpy('activateCallback');

                deck.on("activate", activateCallback);
                deck.on("next", function() {
                  return false;
                });
                deck.next();

                expect(activateCallback).not.toHaveBeenCalled();
              });

              it("should not call subsequent 'next' handlers if an earlier event handler returns false", function() {
                var nextCallback = jasmine.createSpy('nextCallback');

                deck.on("next", function() {
                  return false;
                });
                deck.on("next", nextCallback);
                deck.next();

                expect(nextCallback).not.toHaveBeenCalled();
              });

              it("should activate next slide if event handler returns true", function() {
                var activateCallback = jasmine.createSpy('activateCallback');

                deck.on("activate", activateCallback);
                deck.on("next", function() {
                  return true;
                });
                deck.next();

                expect(activateCallback).toHaveBeenCalled();
              });

            });

            describe("prev", function() {

              it("should call handler when previous slide is requested", function() {
                var callback = jasmine.createSpy('callback');

                deck.slide(1);
                deck.on("prev", callback);
                deck.prev();

                expect(callback.callCount).toBe(1);
              });

              it("should call handler when previous slide is requested while on first slide", function() {
                var callback = jasmine.createSpy('callback');

                deck.on("prev", callback);
                deck.prev();

                expect(callback).toHaveBeenCalled();
              });

              it("should pass payload to 'prev' handler when previous slide is requested", function() {
                var callback = jasmine.createSpy('callback'),
                  ACTIVE_SLIDE_INDEX = 1,
                  ACTIVE_SLIDE = deck.slides[ACTIVE_SLIDE_INDEX];

                deck.on("prev", callback);
                deck.slide(ACTIVE_SLIDE_INDEX);
                deck.prev();

                expect(callback).toHaveBeenCalledWith({
                  slide: ACTIVE_SLIDE,
                  index: ACTIVE_SLIDE_INDEX
                });
                expect(callback.callCount).toBe(1);
              });

              it("should not activate previous slide if an event handler returns false", function() {
                var activateCallback = jasmine.createSpy('activateCallback');

                deck.on("activate", activateCallback);
                deck.on("prev", function() {
                  return false;
                });
                deck.prev();

                expect(activateCallback).not.toHaveBeenCalled();
              });

              it("should not call subsequent 'prev' handlers if an earlier event handler returns false", function() {
                var prevCallback = jasmine.createSpy('prevCallback');

                deck.slide(1);
                deck.on("prev", function() {
                  return false;
                });
                deck.on("prev", prevCallback);
                deck.prev();

                expect(prevCallback).not.toHaveBeenCalled();
              });

              it("should activate previous slide if event handler returns true", function() {
                var activateCallback = jasmine.createSpy('activateCallback');

                deck.slide(1);
                deck.on("activate", activateCallback);
                deck.on("prev", function() {
                  return true;
                });
                deck.prev();

                expect(activateCallback).toHaveBeenCalled();
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
                var callback = jasmine.createSpy('callback');

                deck.on("slide", callback);
                deck.slide(1);

                expect(callback.callCount).toBe(1);
              });

              it("should pass payload to 'slide' handler when specific slide is requested", function() {
                var callback = jasmine.createSpy('callback'),
                  ACTIVE_SLIDE_INDEX = 1,
                  ACTIVE_SLIDE = deck.slides[ACTIVE_SLIDE_INDEX];

                deck.on("slide", callback);
                deck.slide(ACTIVE_SLIDE_INDEX);

                expect(callback).toHaveBeenCalledWith({
                  slide: ACTIVE_SLIDE,
                  index: ACTIVE_SLIDE_INDEX
                });
              });

              it("should not activate requested slide if an event handler returns false", function() {
                var activateCallback = jasmine.createSpy('activateCallback');

                deck.on("activate", activateCallback);
                deck.on("slide", function() {
                  return false;
                });
                deck.slide(1);

                expect(activateCallback).not.toHaveBeenCalled();
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

          describe("off", function() {
            it("should unbind the event", function() {
              var callback = jasmine.createSpy('callback');
              deck.on("foo", callback);
              deck.fire("foo");
              expect(callback.callCount).toBe(1);
              deck.off("foo", callback);
              deck.fire("foo");
              expect(callback.callCount).toBe(1);
            });
          });

          describe("fire", function() {

            it("should allow custom events to be triggered", function() {
              var customEventHandler = jasmine.createSpy('customEventHandler'),
                payload = { foo: 'bar' };

              deck.on('custom-event', customEventHandler);
              deck.fire('custom-event', payload);
              expect(customEventHandler).toHaveBeenCalledWith(payload);
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

            describe("when passed an array of plugins", function() {

              var plugins;

              beforeEach(function() {
                plugins = [
                  jasmine.createSpy('plugin1'),
                  jasmine.createSpy('plugin2'),
                  jasmine.createSpy('plugin3')
                ];
                deck = bespoke.from("article", plugins);
              });

              it("should call all plugin functions, passing a deck instance", function() {
                plugins.forEach(function(plugin) {
                  expect(plugin).toHaveBeenCalledWith(deck);
                });
              });

            });

          });

        });

      });

    });

  });

});
