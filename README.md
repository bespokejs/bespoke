# Bespoke.js

### HTML5 Presentation Microlib

Less than 1KB when minified and gzipped, with no dependencies, harnessing the power of CSS transitions.

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