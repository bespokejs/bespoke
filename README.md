[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke.js.png)](http://travis-ci.org/markdalgleish/bespoke.js)

# Bespoke.js

### DIY Presentation Micro-Framework

Less than 1KB minified and gzipped, with no dependencies.

Bespoke.js provides the foundation, then gets out of your way so you can focus on uniquely crafting your own personal deck style.

Using keyboard and touch events, Bespoke.js adds classes to your slides, while you provide the CSS transitions.

## Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.min.js
[max]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.js

## Getting Started

### Markup

The tags you use are completely optional. Once a parent element is selected, the child elements become slides.

```html
<link rel="stylesheet" href="path/to/my/theme.css">

<article>
	<section>Slide 1</section>
	<section>Slide 2</section>
	<section>Slide 3</section>
</article>

<script src="bespoke.min.js"></script>
```

### JavaScript

Decks are created by selecting the parent element with the `from()` method, with optional 'horizontal' or 'vertical' event handlers.

##### Horizontal Deck

Uses horizontal arrows and swipes for navigation.

```js
bespoke.horizontal.from('article');
```

##### Vertical Deck

Uses vertical arrows and swipes for navigation.

```js
bespoke.vertical.from('article');
```

##### Minimal Deck

For the purist. Minimal decks provide an API with zero event handlers, giving you complete control.

```js
bespoke.from('article');
```

##### Control API

Programmatically control your presentation, or to implement a custom interface when using a minimal deck.

```js
bespoke.next();
bespoke.prev();
bespoke.slide(0);
```

##### Events

Attach event handlers to slide `activate` and `deactivate` events.

```js
bespoke.on('activate', function(e) {
	e.slide; // Activated slide
	e.index; // Index of activated slide
});
```

```js
bespoke.on('deactivate', function(e) {
	e.slide; // Deactivated slide
	e.index; // Index of deactivated slide
});
```

## Advanced Usage

### Deck Instances

Individual deck instances can be created and controlled seperately.

```js
var one = bespoke.horizontal.from('#deck-one');
one.next();
one.prev();
one.slide(0);

var two = bespoke.horizontal.from('#deck-two');
two.next();
two.prev();
two.slide(0);
```

The following properties are available on each instance:

 * `next()`
 * `prev()`
 * `slide(index)`
 * `on(eventname, callback)`, for attaching event handlers
 * `off(eventname, callback)`, for removing event handlers
 * `parent`, a reference to the deck's parent element
 * `slides`, an array of slide elements

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org