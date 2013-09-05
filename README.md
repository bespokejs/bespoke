[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke.js.png)](http://travis-ci.org/markdalgleish/bespoke.js)

# Bespoke.js

### DIY Presentation Micro-Framework

Less than 1KB minified and gzipped, with no dependencies.

Bespoke.js provides the foundation, then gets out of your way so you can focus on uniquely crafting your own personal deck style.

Using keyboard and touch events, Bespoke.js adds classes to your slides, while you provide the CSS transitions.

With its robust plugin system, new functionality can be added to Bespoke.js easily.

Want a boilerplate presentation? Use the official [Bespoke.js Yeoman Generator](https://github.com/markdalgleish/generator-bespoke).

## Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.min.js
[max]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.js

Bespoke.js requires a modern browser with [ES5 support](http://kangax.github.com/es5-compat-table/).

### Bower

Bespoke.js can be installed from [Bower](http://twitter.github.com/bower/) using the following command:

```bash
$ bower install bespoke.js
```

## Demo

[View the demo](http://markdalgleish.com/projects/bespoke.js) at the official [Bespoke.js project page](http://markdalgleish.com/projects/bespoke.js).

### Presentations

 - [DIY Presentations With Bespoke.js](http://markdalgleish.com/presentations/bespoke.js/) by [Mark Dalgleish](http://twitter.com/markdalgleish)
 - [Bespoke.js: The Road to 1KB](http://markdalgleish.github.io/presentation-bespoke.js-the-road-to-1kb/) by [Mark Dalgleish](http://twitter.com/markdalgleish)
 - [Javascript's Slightly Stricter Mode](http://geelen.github.io/web-directions-talk/) by [Glen Maddern](http://twitter.com/glenmaddern)
 - [The Trials of Transition Height: Auto](http://superhighfives.github.io/tweetflight-presentation/) by [Charlie Gleason](http://twitter.com/superhighfives)
 - [Rapid Web App Dev With Yeoman](http://mjt01.github.io/slides-yeoman/) by [Michael Taranto](http://twitter.com/michaeltaranto)
 - [Projects vs Products](http://joho.github.io/wdyk/) by [John Barton](http://twitter.com/johnbarton)
 - [Learn You The Node.js For Much Win](http://r.va.gg/presentations/campjs-learn-you-node/) by [Rod Vagg](http://twitter.com/rvagg)
 - [Introduction to hapi](http://wolfe.id.au/presentations/hapi/) by [Mark Wolfe](http://twitter.com/wolfeidau)

Made a presentation with Bespoke.js? [Let me know](http://twitter.com/markdalgleish).

## Getting Started

The simplest way to get started is by using [generator-bespoke](https://github.com/markdalgleish/generator-bespoke), a generator for [Yeoman](http://yeoman.io) that scaffolds a boilerplate presentation.

Assuming you have [Node.js](http://nodejs.org) installed:

```bash
$ npm install -g yo generator-bespoke
$ mkdir my-presentation && cd $_
$ yo bespoke
```

The generated project includes a [Grunt](http://gruntjs.com) build system, a preview server with [LiveReload](http://livereload.com), static asset compilation ([Jade](http://jade-lang.com), [Stylus](http://learnboost.github.io/stylus) and [CoffeeScript](http://coffeescript.org)), and a [GitHub Pages](http://pages.github.com) deployment task.

In your newly scaffolded project, you can use the following Grunt tasks:

 * ```$ grunt server``` to run a preview server with LiveReload.
 * ```$ grunt deploy``` to deploy to GitHub Pages.
 * ```$ grunt``` to compile static assets to 'public'.

For more detailed instructions, check out the [generator-bespoke](https://github.com/markdalgleish/generator-bespoke) repo.

### The old fashioned way

To create a Bespoke.js presentation by hand, follow these 3 simple steps:

 * Create a page with [required slide markup](#markup) and resources
 * Activate your deck via the [JavaScript API](#javascript)
 * Create a custom style sheet using the [Bespoke.js classes](#css)

Need more functionality? [Use an existing plugin](#plugins), or [create a new one](#creating-plugins).

## Basic Usage

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

*For the absolute purist only.* Minimal decks provide a [simple control API](#control-api) with *zero default event handlers*. Key presses and swipes have no effect, it's up to you to implement your own interactions from scratch.

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
    <td>All slides before the active slide, with <em>n</em> value incrementing</td>
   </tr>
   <tr>
    <td><b>bespoke-after</b></td>
    <td>All slides after the active slide</td>
   </tr>
   <tr>
    <td><b>bespoke-after-<em>n</em></b></td>
    <td>All slides after the active slide, with <em>n</em> value incrementing</td>
   </tr>
</table>

If you've created an awesome theme you'd like me to share, [let me know](http://twitter.com/markdalgleish).

## Plugins

The following plugins are available for Bespoke.js.

### Official Plugins

All official plugins can be installed from Bower, e.g. `$ bower install bespoke-bullets`

 - [bespoke-bullets](https://github.com/markdalgleish/bespoke-bullets) for animated bullet lists.
 - [bespoke-hash](https://github.com/markdalgleish/bespoke-hash) for hash routing.
 - [bespoke-state](https://github.com/markdalgleish/bespoke-state) for slide-specific deck styles.
 - [bespoke-loop](https://github.com/markdalgleish/bespoke-loop) for looped presentations.
 - [bespoke-vcr](https://github.com/markdalgleish/bespoke-vcr) for recording and playback.

### Third-Party Plugins

 - [bespoke-spotlight](https://github.com/mobz/bespoke-spotlight) by [@mobz](http://twitter.com/mobz), for quick-searching slide content.
 - [bespoke-blackout](https://github.com/originell/bespoke-blackout) by [@originell](http://twitter.com/originell), for temporarily blacking out the screen.

If you'd like your plugin added to this list, [let me know](http://twitter.com/markdalgleish).

## Advanced Usage

### From HTMLElement

If you already have a reference to a DOM node, you can pass it directly to the `from` method.

```js
bespoke.horizontal.from(element);
```

### Control API

Programmatically control your presentation, or implement a custom interface when using a [minimal deck](#minimal-deck).

```js
// Next slide
bespoke.next();

// Previous slide
bespoke.prev();

// Go to a specific slide
bespoke.slide(0);
```

### Deck Instances

##### Creating Deck Instances

Individual deck instances can be created and controlled separately.

```js
// First deck instance
var one = bespoke.horizontal.from('#deck-one');
one.next();
one.prev();
one.slide(0);

// Second deck instance
var two = bespoke.horizontal.from('#deck-two');
two.next();
two.prev();
two.slide(0);
```

The global `bespoke` API interacts with all deck instances. For example, calling `bespoke.next()` is actually calling `next()` on all decks.

##### Deck Instance Properties

The following properties are available on each instance.

*Note: The optional [`eventData`](#custom-event-data) parameter is an object that will be merged with the `event` object in subsequent [event handlers](#events).*

<table>
  <tr>
    <td><strong>next(<em>[eventData]</em>)</strong></td>
    <td>Next slide.</td>
  </tr>
  <tr>
    <td><strong>prev(<em>[eventData]</em>)</strong></td>
    <td>Previous slide.</td>
  </tr>
  <tr>
    <td><strong>slide(<em>index[, eventData]</em>)</strong></td>
    <td>Activate a specific slide by index.</td>
  </tr>
  <tr>
    <td><strong>on(<em>event, callback</em>)</strong></td>
    <td>Attach <a href="#events">event handlers</a></td>
  </tr>
  <tr>
    <td><strong>fire(<em>event[, eventData]</em>)</strong></td>
    <td>Fire custom events. <em>This method is primarily designed for plugin authors.</em></td>
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

### Events

##### Binding Events

Events are bound via the [deck instance](deck-instances). Each event is passed an event object containing a reference to the relevant slide and its index.

```js
deck.on(eventName, function(event) {
  event.slide; // Relevant slide
  event.index; // Index of relevant slide

  // Prevent default functionality (for user interaction events only)
  return false;
});
```

##### Standard Events

In most cases, you will only need to use these standard events.

<table>
  <tr>
    <td><strong>activate</strong></td>
    <td>A slide has been activated. <strong>event.slide</strong> is the <em>activated</em> slide.</td>
  </tr>
  <tr>
    <td><strong>deactivate</strong></td>
    <td>A slide has been deactivated. <strong>event.slide</strong> is the <em>deactivated</em> slide.</td>
  </tr>
</table>

##### User Interaction Events

These events are fired when the user has interacted with the presentation, but *before* their interaction has had any effect.

This allows you to intercept the default behaviour by returning `false` from the event handler.

<table>
  <tr>
    <td><strong>next</strong></td>
    <td>The next slide has been requested, even if last slide is active. <strong>event.slide</strong> is the <em>current</em> slide.</td>
  </tr>
  <tr>
    <td><strong>prev</strong></td>
    <td>The previous slide has been requested, even if first slide is active. <strong>event.slide</strong> is the <em>current</em> slide.</td>
  </tr>
  <tr>
    <td><strong>slide</strong></td>
    <td>A specific slide has been requested. <strong>event.slide</strong> is the <em>requested</em> slide.</td>
  </tr>
</table>

##### Unbinding events

When binding events, the `on` method returns a function that can be used to remove the event handler.

```js
var off = deck.on('activate', function() {
  // ...
});

// Unbind event
off();
```

## Creating Plugins

If you need to expand upon the core Bespoke.js feature set, additional functionality can be packaged up as plugins.

If you'd like to learn by example, check out the [list of existing plugins](#plugins).

### Basic Plugins

Plugins are simply functions that are called when presentations are created.

They are passed a [deck instance](#deck-instance-properties) which allows you to interact with the deck's state, bind events and modify its elements.

```js
// Creating the plugin
bespoke.plugins.myPlugin = function(deck) {
  deck.on('activate', function(e) {
    console.log('Activated slide ' + (e.index + 1) + ' of ' + deck.slides.length);
  });
};
```

The plugin can now be provided to the second parameter of the `from(selector[, plugins])` method.

```js
// Using the plugin
bespoke.horizontal.from('article', { myPlugin: true });
```

### Plugins with Options

If your plugin needs some configurability, options can be passed through as the second parameter.

```js
// Creating the plugin with options
bespoke.plugins.myPlugin = function(deck, options) {
  var showTotal = options && options.showTotal;

  deck.on('activate', function(e) {
    console.log('Activated slide ' + (e.index + 1) +
      (showTotal ? ' of ' + deck.slides.length : ''));
  });
};

// Using the plugin with options
bespoke.from('article', {
  myPlugin: {
    showTotal: true
  }
});
```

### Custom Event Data

Additional event data can be supplied to `next`, `prev` and `slide`, which is merged with the final `event` object in subsequent event handlers.

This functionality is particularly useful if you need to differentiate between events caused by your plugin, and those caused by your end users or other plugins.

```js
bespoke.plugins.myPlugin = function(deck) {

  // Differentiating our plugin's events
  deck.on('activate', function(event) {
    if (event.foo === 'bar') {
      // Triggered by my plugin...
    } else {
      // Triggered by end user, or another plugin...
    }
  });

  // Providing custom event data
  deck.next({
    foo: 'bar'
  });

};
```

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org
