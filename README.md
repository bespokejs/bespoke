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

To create a Bespoke.js presentation, follow these 3 simple steps:

 * Create a new page with [required slide markup](#markup) and resources
 * Activate your presentation via the [JavaScript API](#javascript)
 * Create a custom style sheet, using the provided [Bespoke.js classes](#css) to power your CSS transitions

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
<script src="path/to/my/script.js"></script>
```

### JavaScript

Decks are created by selecting the parent element with the `from(selector)` method, with optional 'horizontal' or 'vertical' event handlers.

##### Horizontal Deck

Uses space bar, horizontal arrows and swipes for navigation.

```js
bespoke.horizontal.from('article');
```

##### Vertical Deck

Uses space bar, vertical arrows and swipes for navigation.

```js
bespoke.vertical.from('article');
```

##### Minimal Deck

For the purist. Minimal decks provide a [simple control API](#control-api) with zero event handlers.

```js
bespoke.from('article');
```

### CSS

To create your own custom deck styles, Bespoke.js provides the necessary classes to your elements.

<table>
	 <tr>
	 	<td><b>bespoke-parent</b></td>
	 	<td>The deck's containing element</td>
	 </tr>
	 <tr>
	 	<td><b>bespoke-slide</b></td>
	 	<td>Every slide element</td>
	 </tr>
	 <tr>
	 	<td><b>bespoke-active</b></td>
	 	<td>The active slide</td>
	 </tr>
	 <tr>
	 	<td><b>bespoke-inactive</b></td>
	 	<td>All inactive slides</td>
	 </tr>
	 <tr>
	 	<td><b>bespoke-before</b></td>
	 	<td>All slides before the active slide</td>
	 </tr>
	 <tr>
	 	<td><b>bespoke-before-<em>n</em></b></td>
	 	<td>All slides before the active slive, with <em>n</em> value incrementing</td>
	 </tr>
	 <tr>
	 	<td><b>bespoke-after</b></td>
	 	<td>All slides after the active slide</td>
	 </tr>
	 <tr>
	 	<td><b>bespoke-after-<em>n</em></b></td>
	 	<td>All slides after the active slive, with <em>n</em> value incrementing</td>
	 </tr>
</table>

## Advanced Usage

### Control API

Programmatically control your presentation, or implement a custom interface when using a [minimal deck](#minimal-deck).

```js
bespoke.next();
bespoke.prev();
bespoke.slide(0);
```

### Events

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

### Deck Instances

##### Creating Deck Instances

Individual deck instances can be created and controlled separately.

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
##### Deck Instance Properties

The following properties are available on each instance:

<table>
	<tr>
		<td><strong>next()</strong></td>
		<td>Next slide</td>
	</tr>
	<tr>
		<td><strong>prev()</strong></td>
		<td>Previous slide</td>
	</tr>
	<tr>
		<td><strong>slide(<em>index</em>)</strong></td>
		<td>Activate a specific slide by index</td>
	</tr>
	<tr>
		<td><strong>on(<em>event, callback</em>)</strong></td>
		<td>Attach event handlers</td>
	</tr>
	<tr>
		<td><strong>off(<em>event, callback</em>)</strong></td>
		<td>Remove event handlers</td>
	</tr>
	<tr>
		<td><strong>parent</strong></td>
		<td>The deck's parent element</td>
	</tr>
	<tr>
		<td><strong>slides</strong></td>
		<td>An array of slide elements</td>
	</tr>
</table>

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org