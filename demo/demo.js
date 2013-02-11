(function() {

	// Create presentation
	bespoke.from('article');

	// Set up themes
	var themes = [
		'coverflow',
		'cube',
		'concave',
		'classic'
	];

	var selectedThemeIndex = 0;

	function nextTheme() { offsetSelectedTheme(1) }

	function prevTheme() { offsetSelectedTheme(-1) }

	function offsetSelectedTheme(n) {
		selectTheme(modulo(selectedThemeIndex + n, themes.length));
	}

	function modulo(num, n) { return ((num % n) + n) % n; }

	function selectTheme(index) {
		var theme = themes[index];
		document.body.className = theme;
		document.getElementById('theme').innerHTML = theme[0].toUpperCase() + theme.slice(1);
		selectedThemeIndex = index;
	}

	function isTouch() {
		return !!('ontouchstart' in window) || navigator.msMaxTouchPoints;
	}

	// Allow theme changes via keyboard
	document.addEventListener('keyup', function(e) {
		e.which === 38 && prevTheme();
		e.which === 40 && nextTheme();
	});

	// Allow theme changes via vertical swipe
	(function() {
		var startY,
			moveY,

			singleTouch = function(fn) {
				return function(e) {
					e.preventDefault();
					e.touches.length === 1 && fn(e.touches[0].pageY);
				};
			};

		document.addEventListener('touchstart', singleTouch(function(y) {
			startY = y;
		}));

		document.addEventListener('touchmove', singleTouch(function(y) {
			moveY = y;
		}));

		document.addEventListener('touchend', function() {
			var delta = moveY - startY;
			
			if (Math.abs(delta) < 100) {
				return;
			}

			delta < 0 ? prevTheme() : nextTheme();
		});
	}());

	// Allow theme changes via arrows
	document.getElementById('up-arrow').addEventListener('click', prevTheme);
	document.getElementById('down-arrow').addEventListener('click', nextTheme);

	selectTheme(0);

}());