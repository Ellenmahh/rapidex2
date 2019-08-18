jQuery(function($) {'use strict',
		
	//Scroll Menu

	
	
	// Carousel Auto Slide Off
	$('#event-carousel, #twitter-feed, #sponsor-carousel ').carousel({
		interval: false
	});


	// Contact form validation
	var form = $('.contact-form');
	form.submit(function () {'use strict',
		$this = $(this);
		$.post($(this).attr('action'), function(data) {
			$this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
		},'json');
		return false;
	});

	// $( window ).resize(function() {
	// 	menuToggle();
	// });

	$('.main-nav ul').onePageNav({
		currentClass: 'active',
	    changeHash: false,
	    scrollSpeed: 900,
	    scrollOffset: 0,
	    scrollThreshold: 0.3,
	    filter: ':not(.no-scroll)'
	});

});


// Google Map Customization
// (function(){

// 	var map;

// 	map = new GMaps({
// 		el: '#gmap',
// 		lat: -23.5608055,
// 		lng: -46.6600739,
// 		scrollwheel:false,
// 		zoom: 16,
// 		zoomControl : false,
// 		panControl : false,
// 		streetViewControl : false,
// 		mapTypeControl: false,
// 		overviewMapControl: false,
// 		clickable: false
// 	});


// 	map.addMarker({
// 		lat: -23.5608055,
// 		lng: -46.6600739,
// 		icon: '',
// 		animation: google.maps.Animation.DROP,
// 		verticalAlign: 'bottom',
// 		horizontalAlign: 'center',
// 		backgroundColor: '#3e8bff',
// 	});


// 	var styles = [ 

// 	{
// 		"featureType": "road",
// 		"stylers": [
// 		{ "color": "#b4b4b4" }
// 		]
// 	},{
// 		"featureType": "water",
// 		"stylers": [
// 		{ "color": "#d8d8d8" }
// 		]
// 	},{
// 		"featureType": "landscape",
// 		"stylers": [
// 		{ "color": "#f1f1f1" }
// 		]
// 	},{
// 		"elementType": "labels.text.fill",
// 		"stylers": [
// 		{ "color": "#000000" }
// 		]
// 	},{
// 		"featureType": "poi",
// 		"stylers": [
// 		{ "color": "#d9d9d9" }
// 		]
// 	},{
// 		"elementType": "labels.text",
// 		"stylers": [
// 		{ "saturation": 1 },
// 		{ "weight": 0.1 },
// 		{ "color": "#000000" }
// 		]
// 	}

// 	];

// 	map.addStyle({
// 		styledMapName:"Styled Map",
// 		styles: styles,
// 		mapTypeId: "map_style"  
// 	});

// 	map.setStyle("map_style");
// }());



