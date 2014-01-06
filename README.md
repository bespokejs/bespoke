[![Build Status](https://secure.travis-ci.org/markdalgleish/bespoke.js.png)](http://travis-ci.org/markdalgleish/bespoke.js)

# Bespoke.js

### DIY Presentation Micro-Framework

[Bespoke.js](http://markdalgleish.com/projects/bespoke.js) is a super minimal (<1KB min'd and gzipped), modular presentation library for modern browsers, designed to foster a rich [plugin ecosystem](#plugins).

The core library [sets up the presentation](#javascript), provides a simple [control API](#control-api), manages [events](#events) and adds [classes](#CSS) to the slides to allow CSS transitions.

Any other functionality, from [keyboard](https://github.com/markdalgleish/bespoke-keys) and [touch](https://github.com/markdalgleish/bespoke-touch) interactions to [bullet lists](https://github.com/markdalgleish/bespoke-bullets) and [hash routing](https://github.com/markdalgleish/bespoke-hash), is implemented as a [plugin](#plugins). Joining the Bespoke.js plugin ecosystem is simple with [Bespoke.js Plugin Generator](https://github.com/markdalgleish/generator-bespokeplugin).

## Creating a Presentation

Due to the highly modular nature of Bespoke.js, the quickest way to get started is with [Bespoke.js Generator](https://github.com/markdalgleish/generator-bespoke), a [Yeoman](http://yeoman.io) generator that scaffolds a boilerplate presentation with a [Grunt](http://gruntjs.com) build system.

Assuming you have [Node.js](http://nodejs.org) installed, in a blank directory:

```bash
$ npm install -g generator-bespoke
$ yo bespoke
```

In your newly scaffolded project, you can use the following Grunt tasks:

 * ```$ grunt server``` to run a preview server with LiveReload.
 * ```$ grunt deploy``` to deploy to GitHub Pages.
 * ```$ grunt``` to compile static assets to 'public'.

For more detailed instructions, check out the [Bespoke.js Generator](https://github.com/markdalgleish/generator-bespoke) repo.

If you'd prefer to craft a new presentation from scratch, you can install Bespoke.js from [Bower](http://bower.io) with `bower install bespoke.js`, from [npm](http://npmjs.org) with `npm install bespoke`, or manually download either the [production version][min] or the [development version][max]. The Bespoke.js core is extremely lightweight, so you'll probably want to include some [plugins](#plugins).

[min]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.min.js
[max]: https://raw.github.com/markdalgleish/bespoke.js/master/dist/bespoke.js

## Basic Usage

### Markup

It's completely up to you which tags you use, but the following is a good starting point:

```html
<link rel="stylesheet" href="path/to/my/theme.css">

<article id="presentation">
  <section>Slide 1</section>
  <section>Slide 2</section>
  <section>Slide 3</section>
</article>

<script src="bespoke.min.js"></script>
<script src="bespoke-keys.min.js"></script>
<script src="bespoke-touch.min.js"></script>
<script src="path/to/my/script.js"></script>
```

### JavaScript

Decks are created by selecting the parent element with the `from(selector[, plugins])` method. Once a parent element is selected, the child elements become slides.

```js
var deck = bespoke.from('#presentation', {
  // Plugins:
  keys: true,
  touch: true
});
```

#### Control API

Programmatically control the state of the presentation.

```js
var deck = bespoke.from('#presentation');

// Next slide
deck.next();

// Previous slide
deck.prev();

// Go to a specific slide
deck.slide(0);

// Get the active slide index
deck.slide(); // 0
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

## Plugins

### Using Plugins

Plugins are specified when instantiating your presentation, like so:

```js
var deck = bespoke.from('#presentation', {
  // Plugins:
  keys: true,
  touch: true
});
```

### Official Plugins

All official plugins can be installed from Bower or npm, e.g. `$ bower install bespoke-keys` or `$ npm install bespoke-touch`

 - [bespoke-keys](https://github.com/markdalgleish/bespoke-keys) for keyboard interaction.
 - [bespoke-touch](https://github.com/markdalgleish/bespoke-touch) for touch interaction.
 - [bespoke-bullets](https://github.com/markdalgleish/bespoke-bullets) for animated bullet lists.
 - [bespoke-scale](https://github.com/markdalgleish/bespoke-scale) for responsive slide scaling.
 - [bespoke-hash](https://github.com/markdalgleish/bespoke-hash) for hash routing.
 - [bespoke-state](https://github.com/markdalgleish/bespoke-state) for slide-specific deck styles.
 - [bespoke-progress](https://github.com/markdalgleish/bespoke-progress) for progress bars.
 - [bespoke-forms](https://github.com/markdalgleish/bespoke-forms) for form element support.
 - [bespoke-loop](https://github.com/markdalgleish/bespoke-loop) for looped presentations.
 - [bespoke-vcr](https://github.com/markdalgleish/bespoke-vcr) for recording and playback.

### Third-Party Plugins

 - [bespoke-fx](https://github.com/ebow/bespoke-fx) by [@tdhc](http://twitter.com/tdhc), for configurable slide transitions.
 - [bespoke-dir](https://github.com/ryanseddon/bespoke-dir) by [@ryanseddon](http://twitter.com/ryanseddon), for direction-based deck classes.
 - [bespoke-spotlight](https://github.com/mobz/bespoke-spotlight) by [@mobz](http://twitter.com/mobz), for quick-searching slide content.
 - [bespoke-blackout](https://github.com/originell/bespoke-blackout) by [@originell](http://twitter.com/originell), for temporarily blacking out the screen.
 - [bespoke-secondary](https://github.com/joelpurra/bespoke-secondary) by [@joelpurra](https://github.com/joelpurra), for slide notes in a secondary window.
 - [bespoke-advanced](https://github.com/joelpurra/bespoke-advanced) by [@joelpurra](https://github.com/joelpurra), to automatically advance slides on a timer.
 - [bespoke-jumpy](https://github.com/joelpurra/bespoke-jumpy) by [@joelpurra](https://github.com/joelpurra), for keyboard shortcuts to jump straight to specific slides.

If you'd like your plugin added to this list, [let me know](http://twitter.com/markdalgleish).

## Advanced Usage

### From HTMLElement

If you already have a reference to a DOM node, you can pass it directly to the `from` method.

```js
bespoke.from(element);
```

### Deck Instances

##### Creating Deck Instances

Individual deck instances can be created and controlled separately.

```js
// First deck instance
var one = bespoke.from('#deck-one');
one.next();
one.prev();
one.slide(0);

// Second deck instance
var two = bespoke.from('#deck-two');
two.next();
two.prev();
two.slide(0);
```

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
    <td><strong>slide([<em>index[, eventData]]</em>)</strong></td>
    <td>Get or set the active slide index.</td>
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

  // Prevent default functionality (for deck interaction events only)
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

##### Deck Interaction Events

These events are fired when the deck has been interacted with, but *before* the interaction has had any effect.

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

Want a boilerplate plugin? Use the official [Bespoke.js Plugin Generator](https://github.com/markdalgleish/generator-bespokeplugin).

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
bespoke.from('#presentation', { myPlugin: true });
```

*Note: Your plugin won't run if the option value provided is `false`.*

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
bespoke.from('#presentation', {
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

## Presentations

 - [DIY Presentations With Bespoke.js](http://markdalgleish.com/presentations/bespoke.js/) by [Mark Dalgleish](http://twitter.com/markdalgleish)
 - [Bespoke.js: The Road to 1KB](http://markdalgleish.github.io/presentation-bespoke.js-the-road-to-1kb/) by [Mark Dalgleish](http://twitter.com/markdalgleish)
 - [Javascript's Slightly Stricter Mode](http://geelen.github.io/web-directions-talk/) by [Glen Maddern](http://twitter.com/glenmaddern)
 - [The Trials of Transition Height: Auto](http://superhighfives.github.io/tweetflight-presentation/) by [Charlie Gleason](http://twitter.com/superhighfives)
 - [Welcome Our New ES5 Overlords](http://mikemaccana.github.io/rejectjs2013) by [Mike MacCana](https://twitter.com/mikemaccana)
 - [Rapid Web App Dev With Yeoman](http://mjt01.github.io/slides-yeoman/) by [Michael Taranto](http://twitter.com/michaeltaranto)
 - [Projects vs Products](http://joho.github.io/wdyk/) by [John Barton](http://twitter.com/johnbarton)
 - [Learn You The Node.js For Much Win](http://r.va.gg/presentations/campjs-learn-you-node/) by [Rod Vagg](http://twitter.com/rvagg)
 - [A Real Database Rethink](http://r.va.gg/presentations/nodeconfeu.2013) by [Rod Vagg](http://twitter.com/rvagg)
 - [Feature Flags with Directives](http://mjt01.github.io/slides-feature-flags/) by [Michael Taranto](http://twitter.com/michaeltaranto)
 - [Introduction to hapi](http://wolfe.id.au/presentations/hapi/) by [Mark Wolfe](http://twitter.com/wolfeidau)

Made a presentation with Bespoke.js? [Let me know](http://twitter.com/markdalgleish).

## Questions?

Contact me on GitHub or Twitter: [@markdalgleish](http://twitter.com/markdalgleish)

## License

[MIT License](http://markdalgleish.mit-license.org)
