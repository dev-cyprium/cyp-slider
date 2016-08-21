(function($) {
	/*
		Error to check is jQuery loaded.
		Print a error message to the console if jQuery isn't found.
	*/
	if($ === undefined) {
		console.error("Error: jQuery not found. Did you forget to include it or include it?");
		return;
	}


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
			images: []
		}, options);

		
	}


})( (typeof(jQuery) !== 'undefined' ? jQuery : undefined) );