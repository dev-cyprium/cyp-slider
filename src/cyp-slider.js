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
	var $dots;
	var imageIndex;
	var imageCount;
	var settings;
	/*
		Plugin entry point and init function.
	*/
	$.fn.cypSlider = function( options ) {
		// Sets the container to the image-frame
		$container = this;
		
		if(this.attr('id') !== 'cyp-gallery') {
			console.error("Error: This function must be bound to a #cyp-gallery type container.");
			return;
		}

		// Use the default options params for options that are not passed in.
		settings = $.extend({
			width: 600,
			height: 300,
			showDots: false,
			images: [],
			path: "slider-images/"
		}, options);
		imageIndex = 0;
		$dots = [];
		imageCount = options.images.length;

		// Set the container to the given width and height
		$container.css({width: settings.width, height: settings.height});

		// Stop the plugin if not enough images are given.
		if(imageCount < 2) {
			console.error("Error: You've provided less than 2 images.")
			return;
		}

		// Create and cache the image elements
		cacheImages();
		
		// Create the next/previous buttons
		var prev = ButtonFactory.createButton("Prev", "cyp-btn-left");	
		var next = ButtonFactory.createButton("Next", "cyp-btn-right");
		
		// Add 'dots' to the screen, if the settings are configured to show them
		if(settings.showDots) {
			addDots(settings.images.length);
		}

		// Bind events to buttons and dots
		prev.click(function() { clickHandler( previousImage ) });
		next.click(function() { clickHandler( nextImage ) });
		for(var i=0; i < imageCount; i++) { 
			$dots[i].click(function() {
				dotClick.call(this);
			}); 
		}
		// Append the buttons to the screen
		$container.append(prev);
		$container.append(next);

		// Append the first image to the slider
		$container.append($images[0]);

	}

	/*
		Handles the click of both buttons and
		calls the appropriate callback function
	*/
	function clickHandler( callback ) {
		var prevIndex = imageIndex;

		callback();

		if(settings.showDots === true) {
			$dots[prevIndex].removeClass('active');
			$dots[imageIndex].addClass('active'); 
		}

	}

	/*
		Handles the dot controlls
		Move image to the image index when dot is clicked
	*/

	function dotClick() {
		// Remove the active from the active dot
		// FIXME: Keep track of active dot to simplify iteration and save processor time
		for(var i=0; i < imageCount; i++) { $dots[i].removeClass('active'); }
		$container.find(this).addClass('active');
	}

	/*
		Moves the image index forward;
		renders the image to the screen with animation
	*/
	function nextImage() {
		imageIndex++
		if(imageIndex > imageCount - 1) {
			imageIndex = 0;
		}
	}

	/*
		Moves the image index backward;
		renders the image to the screen with animation
	*/
	function previousImage() {
		imageIndex--;
		if(imageIndex < 0) {
			imageIndex = imageCount - 1;
		}

	}

	/*
		Creates the required <img> tags
		that will store the image data
	*/
	function cacheImages() {
		$images = [];
		for(var i=0; i<settings.images.length; i++) {
			$images.push($("<img>", {
				src: settings.path + settings.images[i],
				width: settings.width,
				height: settings.height
			}));
		}
	}

	/*
		Caches the canvas for displaying images
	*/
	function cacheDom() {
		$container = $("#cyp-gallery");
		if($container.length === 0) {
			return false;
		}
		return true;
	}


	/*
		Adds the GUI dots
		at the bottom of the slider
	*/
	function addDots( number ) {
		var dotContainer = $("<div>", {class: 'cyp-dot-container'});
		for(var i=0; i < number; i++) {
			var dot = $("<span>", {class: 'cyp-dot'});
			dotContainer.append(dot);
			$dots.push(dot);
		}
		$container.append(dotContainer);
		$dots[0].addClass('active');
	}


})( (typeof(jQuery) !== 'undefined' ? jQuery : undefined) );

/*
	Debug / Test code
*/
$(document).ready(function() {
	$('#cyp-gallery').cypSlider({
		showDots: true,
		images: ["test-1.jpg","test-2.jpg","test-3.jpg","test-4.jpg"]
	});
});