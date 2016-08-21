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

	/*
		Plugin entry point and init function.
	*/
	$.fn.cypSlider = function( options ) {
		// Use the default options params for options that are not passed in.
		var settings = $.extend({
			width: 600,
			height: 300,
			showDots: false,
			animation: 'slide',
			images: [],
			path: "slider-images/"
		}, options);

		if(settings.showDots) {
			addDots(settings.images.length);
		}
	}

	function addDots( number ) {
		for(var i=0; i < number; i++) {

		}
	}


})( (typeof(jQuery) !== 'undefined' ? jQuery : undefined) );

/*
	Debug / Test code
*/

$(document).ready(function() {
	$('body').cypSlider({
		showDots: true,
		images: ["test1.jpg","test2.jpg","test3.jpg","test4.jpg"]
	});
});