[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke.js.png)](http://travis-ci.org/markdalgleish/bespoke.js)

# Bespoke.js

### HTML5 Presentation Microlib

Less than 1KB when minified and gzipped, no dependencies, harnessing the power of CSS transitions.

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
var presentation = bespoke.from('article');

// Control API:
presentation.next();
presentation.prev();
</script>
```

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2012, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org