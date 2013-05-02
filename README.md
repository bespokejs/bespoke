[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke.js.png)](http://travis-ci.org/markdalgleish/bespoke.js)

# Bespoke.js

### DIY Presentation Micro-Framework

Less than 1KB minified and gzipped, with no dependencies.

Bespoke.js provides the foundation, then gets out of your way so you can focus on uniquely crafting your own personal deck style.

Using keyboard and touch events, Bespoke.js adds classes to your slides, while you provide the CSS transitions.

With its robust plugin system, new functionality can be added to Bespoke.js easily.

## Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.min.js
[max]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.js

Bespoke.js requires a modern browser with [ES5 support](http://kangax.github.com/es5-compat-table/). If supporting old IE is your thing, there's always [es5-shim](https://github.com/kriskowal/es5-shim) and [classList.js](https://github.com/eligrey/classList.js).

### Bower

Bespoke.js can be installed from [Bower](http://twitter.github.com/bower/) using the following command:

```bash
$ bower install bespoke.js
```

## Demo

[View the demo](http://markdalgleish.com/projects/bespoke.js) at the official [Bespoke.js project page](http://markdalgleish.com/projects/bespoke.js).

### Presentations

 - [DIY Presentations With Bespoke.js](http://markdalgleish.com/presentations/bespoke.js/) by [Mark Dalgleish](http://twitter.com/markdalgleish)
 - [Javascript's Slightly Stricter Mode](http://geelen.github.io/web-directions-talk/) by [Glen Maddern](http://twitter.com/glenmaddern)
 - [The Trials of Transition Height: Auto](http://superhighfives.github.io/tweetflight-presentation/) by [Charlie Gleason](http://twitter.com/superhighfives)
 - [Rapid Web App Dev With Yeoman](http://mjt01.github.io/slides-yeoman/) by [Michael Taranto](http://twitter.com/michaeltaranto)
 - [Introduction to hapi](http://wolfe.id.au/presentations/hapi/) by [Mark Wolfe](http://twitter.com/wolfeidau)

Made a presentation with Bespoke.js? [Let me know](http://twitter.com/markdalgleish).

## Getting Started

To create a Bespoke.js presentation, follow these 3 simple steps:

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

 - [bespoke-bullets](https://github.com/markdalgleish/bespoke-bullets) for animated bullet lists.
 - [bespoke-hash](https://github.com/markdalgleish/bespoke-hash) for hash routing.
 - [bespoke-loop](https://github.com/markdalgleish/bespoke-loop) for looped presentations.
 - [bespoke-vcr](https://github.com/markdalgleish/bespoke-vcr) for recording and playback.
 - [bespoke-spotlight](https://github.com/mobz/bespoke-spotlight) by [@mobz](http://twitter.com/mobz), for quick-searching slide content.
 - [bespoke-blackout](https://github.com/originell/bespoke-blackout) by [@originell](http://twitter.com/originell), for temporarily blacking out the screen.

If you'd like your plugin added to this list, [let me know](http://twitter.com/markdalgleish).

## Advanced Usage

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

### Events

##### Binding Events

Each event is passed an event object containing a reference to the relevant slide and its index.

```js
bespoke.on(eventName, function(event) {
  event.slide; // Relevant slide
  event.index; // Index of relevant slide

  // Prevent default functionality (for user interaction events only)
  return false;
});
```

If you need more detail about the deck in your event handlers, you may need to retain a reference to the individual [deck instance](deck-instances).

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

Events handlers can be removed with the `off(event, callback)` method.

*Note: To remove an event handler, you must retain a reference to the original function.*

```js
var myEventHandler = function() {
  // Do something...
};

// Bind event
bespoke.on('activate', myEventHandler);

// Unbind event
bespoke.off('activate', myEventHandler);
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
    <td>Attach <a href="#events">event handlers</a></td>
  </tr>
  <tr>
    <td><strong>off(<em>event, callback</em>)</strong></td>
    <td>Remove <a href="#events">event handlers</a></td>
  </tr>
  <tr>
    <td><strong>fire(<em>event[, payload]</em>)</strong></td>
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

*Note: If the value provided is `false` instead of `true`, your plugin won't run.*

### Plugins with Options

If your plugin needs some configurability, options can be passed through as the second parameter.

*Note: The 'options' parameter is an empty object if no options are provided.*

```js
// Creating the plugin with options
bespoke.plugins.myPlugin = function(deck, options) {
  options.showTotal = options.showTotal || true;

  deck.on('activate', function(e) {
    console.log('Activated slide ' + (e.index + 1) +
      (options.showTotal ? ' of ' + deck.slides.length : ''));
  });
};

// Using the plugin with options
bespoke.from('article', {
  myPlugin: {
    showTotal: true
  }
});
```

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

Copyright 2013, Mark Dalgleish  
This content is released under the MIT license  
http://markdalgleish.mit-license.org
