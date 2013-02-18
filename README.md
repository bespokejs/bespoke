[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke.js.png)](http://travis-ci.org/markdalgleish/bespoke.js)

# Bespoke.js

### DIY Presentation Micro-Framework

Bespoke.js provides the class names to your slides, you provide the CSS.

Less than 1KB minified and gzipped, no dependencies, harnessing the power of CSS transforms and transitions.

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.min.js
[max]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.js

In your web page:

```html
<article>
	<section>Slide 1</section>
	<section>Slide 2</section>
	<section>Slide 3</section>
</article>

<script src="bespoke.min.js"></script>
```

In your JavaScript:

```js
bespoke.horizontal.from('article');
```

Or, for a vertical presentation:

```js
bespoke.vertical.from('article');
```

Or, to disable the inbuilt event handlers and implement your own:

```js
bespoke.from('article');
```

To control the state of the presentation:

```js
bespoke.next();
bespoke.prev();
bespoke.slide(0);
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

All deck instances are exposed via the 'decks' array:

```js
var deck = bespoke.horizontal.from('article');

deck === bespoke.decks[0]; // true
```

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org