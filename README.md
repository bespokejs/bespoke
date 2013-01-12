[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke.js.png)](http://travis-ci.org/markdalgleish/bespoke.js)

# Bespoke.js

### HTML5 Presentation Microlib

Less than 1KB minified and gzipped, no dependencies, harnessing the power of CSS transitions.

Bespoke.js listens to keyboard/touch events, and adds the CSS classes needed to create your own slide transitions.

This project is currently in alpha, use at your own risk.

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
<script>
bespoke.from('article');

// Control API:
bespoke.next();
bespoke.prev();
bespoke.activate(0);
</script>
```

## Advanced Usage

Individual presentation instances can be created and controlled seperately.

```js
var presOne = bespoke.from('#pres-one');

presOne.next();
presOne.prev();
presOne.activate(0);

var presTwo = bespoke.from('#pres-two');

presTwo.next();
presTwo.prev();
presTwo.activate(0);
```

All presentation instances exposed via the 'presentations' array:

```js
var presentation = bespoke.from('article');

presentation === bespoke.presentations[0]; // true
```

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org