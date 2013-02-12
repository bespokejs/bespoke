(function() {
	'use strict';

	var themes,
		selectedThemeIndex,
		instructionsTimeout;

	init();

	function init() {
		bespoke.from('article');
		initThemeSwitching();
	}

	function initThemeSwitching() {
		themes = [
			'coverflow',
			'cube',
			'concave',
			'classic'
		];
		
		selectedThemeIndex = 0;

		initInstructions();
		initKeys();
		initGestures();
		initButtons();

		selectTheme(0);
	}

	function initInstructions() {
		if (isTouch()) {
			document.getElementById('input-method').innerHTML = 'Swipe up and down';
		}

		instructionsTimeout = setTimeout(showInstructions, 5000);
	}

	function initKeys() {
		document.addEventListener('keyup', function(e) {
			e.which === 38 && prevTheme();
			e.which === 40 && nextTheme();
		});
	}

	function initGestures() {
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
	}

	function initButtons() {
		document.getElementById('up-arrow').addEventListener('click', prevTheme);
		document.getElementById('down-arrow').addEventListener('click', nextTheme);
	}

	function selectTheme(index) {
		var theme = themes[index];
		document.body.className = theme;
		document.getElementById('theme').innerHTML = theme[0].toUpperCase() + theme.slice(1);
		selectedThemeIndex = index;
	}

	function nextTheme() {
		offsetSelectedTheme(1);
		hideInstructions();
	}

	function prevTheme() {
		offsetSelectedTheme(-1);
		hideInstructions();
	}

	function offsetSelectedTheme(n) {
		selectTheme(modulo(selectedThemeIndex + n, themes.length));
	}

	function showInstructions() {
		document.querySelectorAll('header p')[0].className = 'visible';
	}

	function hideInstructions() {
		clearTimeout(instructionsTimeout);
		document.querySelectorAll('header p')[0].className = 'hidden';
	}

	function isTouch() {
		return !!('ontouchstart' in window) || navigator.msMaxTouchPoints;
	}

	function modulo(num, n) {
		return ((num % n) + n) % n;
	}

}());