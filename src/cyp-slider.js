var ButtonFactory = (function(){
	var self = {};

	self.createButton = function( name, btnClass ) {
		var button = $("<button>").append(name).addClass(btnClass); 
		return button;
	}

	return self;
})();

(function($) {
	/*
		Error to check is jQuery loaded.
		Print a error message to the console if jQuery isn't found.
	*/
	if($ === undefined) {
		console.error("Error: jQuery not found. Did you forget to include it or include it?");
		return;
	}

	// Instance variables
	var $container;
	var $images;
	var $dotcontainer;
	var imageIndex;

	/*
		Plugin entry point and init function.
	*/
	$.fn.cypSlider = function( options ) {
		// Cache the DOM element containg the image gallery.
		if(!cacheDom()) {
			console.error("Error: Object with id of 'cyp-gallery' wasn't found, did you forget to add it?");
			return;
		}

		// Use the default options params for options that are not passed in.
		var settings = $.extend({
			width: 600,
			height: 300,
			showDots: false,
			animation: 'slide',
			images: [],
			path: "slider-images/"
		}, options);

		// Set the container to the given width and height
		$container.css({width: settings.width, height: settings.height});

		// Stop the plugin if not enough images are given.
		if(settings.images.length < 2) {
			console.error("Error: You've provided less than 2 images.")
			return;
		}

		// Create and cache the image elements
		cacheImages( settings );
		
		// Create the next/previous buttons
		var prev = ButtonFactory.createButton("Prev", "cyp-btn-left");	
		var next = ButtonFactory.createButton("Next", "cyp-btn-right");
		
		// Bind events to buttons
		prev.click(previousImage);
		next.click(nextImage);
		imageIndex = 0;

		$container.append(prev);
		$container.append(next);

		if(settings.showDots) {
			addDots(settings.images.length);
		}


		$container.append($images[0]);

	}

	function nextImage() {
		alert('next image');
	}

	function previousImage() {
		alert('previous image');
	}

	function cacheImages( settings ) {
		$images = [];
		for(var i=0; i<settings.images.length; i++) {
			$images.push($("<img>", {
				src: settings.path + settings.images[i],
				width: settings.width,
				height: settings.height
			}));
		}
	}

	function cacheDom() {
		$container = $("#cyp-gallery");
		if($container.length === 0) {
			return false;
		}
		return true;
	}

	function addDots( number ) {
		for(var i=0; i < number; i++) {
			var dot = $("<span>", {class: 'cyp-dot'});
			$container.append(dot);
		}
	}


})( (typeof(jQuery) !== 'undefined' ? jQuery : undefined) );

/*
	Debug / Test code
*/

$(document).ready(function() {
	$('body').cypSlider({
		showDots: true,
		images: ["test-1.jpg","test-2.jpg","test-3.jpg","test-4.jpg"]
	});
});